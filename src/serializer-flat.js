var uuid = 0;                                   // уникальный идентификтор объекта

/**
 * проверить, что переменная является объектом
 * @param {any} value переменная
 * @returns {boolean} результат проверки
 */
function isObject(value) {
    return value !== null && typeof value === 'object';
}

/**
 * проверить, что переменная является строкой
 * @param {any} value переменная
 * @returns {boolean} результат проверки
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * проверить, что переменная является целым числом
 * @param {any} value переменная
 * @returns {boolean} результат проверки
 */
function isInteger(value) {
    return !isString(value) && parseInt(value) === value;
}

/**
 * очередь
 */
class Queue {
    /**
     * конструктор
     */
    constructor() {
        this._oldIndex = 1;
        this._newIndex = 1;
        this._data = {};
    }

    /**
     * добавить элемент в очередь
     * @param {any} item элемент
     */
    enqueue(item) {
        this._data[this._newIndex] = item;
        this._newIndex++;
    }

    /**
     * получить элемент из очереди
     * @returns {any} элемент
     */
    dequeue() {
        const oldIndex = this._oldIndex;
        const newIndex = this._newIndex;

        if (oldIndex !== newIndex) {
            let item = this._data[oldIndex];
            delete this._data[oldIndex];
            this._oldIndex++;
            return item;
        } else {
            return undefined;
        }
    }
}

/**
 * контекст сериализации
 */
class SerializationContext {
    /**
     * конструктор
     * @param {Serializer} ser сериализатор
     */
    constructor(ser) {
        this.__proto__.__proto__ = ser;
        this.cache = [];                        // кеш сериализованных объектов
        this.index = 0;                         // идентификатор объекта для ссылки
        this.queue = new Queue();               // очередь
    }

    /**
     * сериализовать объект
     * @param {any} val объект
     * @returns {string} строка
     */
    serialize(val) {
        let res;

        // добавляем в очередь исходный объект
        this.addQueue(val, e => res = e);

        // главный цикл
        for (let item = this.queue.dequeue(); item; item = this.queue.dequeue()) {
            this.processItem(item);
        }

        return res;
    }

    /**
     * добавить в очередь значение для обработки
     * @param {any} val значение
     * @param {Function} callback функция обработки
     */
    addQueue(val, callback) {
        this.queue.enqueue({ val, callback });
    }

    /**
     * обработать элемент очереди
     * @param {{val:any, callback:Function}} item элемент очереди
     */
    processItem(item) {
        let [val, callback] = [item.val, item.callback];

        if (Array.isArray(val)) {
            // массив
            let res = [];
            for (let item of val) {
                this.addQueue(item, e => {
                    if (typeof e !== 'undefined') res.push(e);
                });
            }
            callback(res);
        } else if (isObject(val)) {
            // объект
            if (this._ignore.some(e => val instanceof e)) {
                // игнорируемый тип
                callback(undefined);
            } else {
                let name = this._ctorToName[val.constructor];
                if (name) {
                    // зарегистрированный для сериализации тип
                    if (!val.__uuid) val.__uuid = ++uuid;
                    let cached = this.cache[val.__uuid];
                    if (cached) {
                        // объект есть в кеше
                        if (!cached.index) {
                            // индекс еще не назначен
                            cached.index = ++this.index;
                            let key = Object.keys(cached.ref)[0];
                            let old = cached.ref[key];
                            cached.ref[`@${name}|${cached.index}`] = old;
                            delete cached.ref[key];
                        }

                        // возвращаем ссылку на объект
                        callback({ [`@${name}`]: cached.index });
                    } else {
                        let res;
                        if (typeof val.serialize === 'function') {
                            // класс реализует интерфейс сериализации
                            res = val.serialize();
                        } else {
                            // обычная сериализация
                            res = this.serializeObjectInner(val);
                        }

                        let cached = { ref: { [`@${name}`]: res } };
                        this.cache[val.__uuid] = cached;

                        callback(cached.ref);
                    }
                } else {
                    let res = this.serializeObjectInner(val);
                    callback(res);
                }
            }
        } else {
            // прочие значения
            callback(val);
        }
    }

    /**
     * сериализовать объект
     * @param {Object} val объект
     * @returns {Object} целевой объект
     */
    serializeObjectInner(val) {
        let res = {};
        for (let key of Object.getOwnPropertyNames(val)) {
            if (!(isString(key) && key.startsWith('__'))) {
                // игнорируем поля, начинающиеся на два символа подчеркивания
                this.addQueue(val[key], e => {
                    if (typeof e !== 'undefined') res[key] = e;
                });
            }
        }
        return res;
    }
}

/**
 * контекст десериализации
 */
class DeserializationContext {
    /**
     * конструктор
     * @param {Serializer} ser сериализатор
     */
    constructor(ser) {
        this.__proto__.__proto__ = ser;
        this.cache = [];                        // кеш сериализованных объектов
        this.queue = new Queue();               // очередь
    }

    /**
     * десериализовать объект json
     * @param {any} val объект json
     * @returns {any} объект
     */
    deserialize(val) {
        let res;

        // добавляем в очередь исходный объект
        this.addQueue(val, e => res = e);

        // главный цикл
        for (let item = this.queue.dequeue(); item; item = this.queue.dequeue()) {
            this.processItem(item);
        }

        return res;
    }

    /**
     * обработать элемент очереди
     * @param {{val:any, callback:Function}} item элемент очереди
     */
    processItem(item) {
        let [val, callback] = [item.val, item.callback];

        if (Array.isArray(val)) {
            // массив
            let res = [];
            for (let item of val) {
                this.addQueue(item, e => res.push(e));
            }
            callback(res);
        } else if (isObject(val)) {
            // объект
            let res = {};
            for (let key of Object.getOwnPropertyNames(val)) {
                let data = val[key];
                if (isString(key) && key.startsWith('@')) {
                    // указание типа
                    if (isInteger(data)) {
                        // ссылка
                        res = this.cache[data];
                        if (!res) {
                            console.error(`Не найден объект с идентификатором ${data}`);
                            res = data;
                        }
                        break;
                    }
                    else {
                        // описание объекта
                        let [name, id] = key.substr(1).split('|');
                        let ctor = this._nameToCtor[name];
                        if (ctor) {
                            // конструктор есть в описании
                            res = new ctor();

                            // сохраняем в кеше, если указан айдишник
                            if (id) this.cache[id] = res;

                            if (typeof res.deserialize === 'function') {
                                // класс реализует интерфейс сериализации
                                res.deserialize(data);
                            } else {
                                // десериализуем свойства объекта
                                for (let key of Object.getOwnPropertyNames(data)) {
                                    this.addQueue(data[key], e => res[key] = e);
                                }
                            }

                            break;
                        }
                    }
                } else {
                    // простое поле
                    this.addQueue(val[key], e => res[key] = e);
                }
            }
            callback(res);
        } else {
            // прочие значения
            callback(val);
        }
    }

    /**
     * добавить в очередь значение для обработки
     * @param {any} val значение
     * @param {Function} callback функция обработки
     */
    addQueue(val, callback) {
        this.queue.enqueue({ val, callback });
    }
}

/**
 * сериализатор
 */
export default class Serializer {
    /**
     * конструктор
     */
    constructor() {
        this._nameToCtor = [];                  // словарь сопоставлений типов
        this._ctorToName = [];                  // словарь сопоставлений типов
        this._ignore = [Element];               // список игнорируемых типов
    }

    /**
     * зарегистрировать сопоставление
     * @param {string} alias псевдоним
     * @param {Function} ctor конструктор
     */
    register(alias, ctor) {
        if (typeof ctor === 'undefined' && typeof alias === 'function') {
            // передан один аргумент - конструктор
            ctor = alias;
            alias = ctor.name;
        }

        this._nameToCtor[alias] = ctor;
        this._ctorToName[ctor] = alias;
    }

    /**
     * зарегистрировать тип для игнорирования
     * @param {Function} ctor конструктор
     */
    ignore(ctor) {
        if (this._ignore.indexOf(ctor) < 0) {
            this._ignore.push(ctor);
        }
    }

    /**
     * сериализовать объект
     * @param {any} val объект
     * @param {Function} [replacer] функция преобразования или массив свойств сериализации
     * @param {string} [space] для отступов
     * @returns {string} строка
     */
    serialize(val, replacer, space) {
        return JSON.stringify(new SerializationContext(this).serialize(val), replacer, space);
    }

    /**
     * десериализовать строку или объект json
     * @param {any} val строка или объект json
     * @returns {any} объект
     */
    deserialize(val) {
        // преобразуем строку в объект
        if (isString(val)) val = JSON.parse(val);
        return new DeserializationContext(this).deserialize(val);
    }
}
