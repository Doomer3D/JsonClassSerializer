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
    }

    /**
     * сериализовать объект
     * @param {any} val объект
     * @returns {string} строка
     */
    serialize(val) {
        if (/*val instanceof $ ||*/ val instanceof Element) {
            // несериализуемые элементы - JQuery и DOM
            return undefined;
        } else if (Array.isArray(val)) {
            // массив
            return this.serializeArray(val);
        } else if (isObject(val)) {
            // объект
            return this.serializeObject(val);
        } else {
            // прочие значения
            return val;
        }
    }

    /**
     * сериализовать массив
     * @param {Array} val массив
     * @returns {Array} результат
     */
    serializeArray(val) {
        let res = [];
        for (let item of val) {
            res.push(this.serialize(item));
        }
        return res;
    }

    /**
     * сериализовать объект
     * @param {Object} val объект
     * @returns {Object} результат
     */
    serializeObject(val) {
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
                return { [`@${name}`]: cached.index };
            } else {
                let cached = { ref: { [`@${name}`]: {} } };
                this.cache[val.__uuid] = cached;
                let res = this.serializeObjectInner(val);
                cached.ref[Object.keys(cached.ref)[0]] = res;
                return cached.ref;
            }
        } else {
            // простой объект
            return this.serializeObjectInner(val);
        }
    }

    /**
     * сериализовать объект
     * @param {Object} val объект
     * @returns {Object} результат
     */
    serializeObjectInner(val) {
        let res = {};
        for (let key of Object.getOwnPropertyNames(val)) {
            if (!(isString(key) && key.startsWith('__'))) {
                // игнорируем поля, начинающиеся на два символа подчеркивания
                res[key] = this.serialize(val[key]);
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
    }

    /**
     * десериализовать объект json
     * @param {any} val объект json
     * @returns {any} объект
     */
    deserialize(val) {
        if (Array.isArray(val)) {
            // массив
            return this.deserializeArray(val);
        } else if (isObject(val)) {
            // объект
            return this.deserializeObject(val);
        } else {
            // прочие значения
            return val;
        }
    }

    /**
     * десериализовать объект
     * @param {Object} val объект
     * @returns {Object} результат
     */
    deserializeArray(val) {
        return val.map(item => this.deserialize(item));
    }

    /**
     * десериализовать массив
     * @param {Array} val массив
     * @returns {Array} результат
     */
    deserializeObject(val) {
        let res = {};
        for (let key of Object.getOwnPropertyNames(val)) {
            let data = val[key];
            if (isString(key) && key.startsWith('@')) {
                // указание типа
                if (isObject(data)) {
                    // описание объекта
                    let [name, id] = key.substr(1).split('|');
                    let ctor = this._nameToCtor[name];
                    if (ctor) {
                        // конструктор есть в описании
                        res = new ctor();

                        // сохраняем в кеше, если указан айдишник
                        if (id) this.cache[id] = res;

                        // десериализуем свойства объекта
                        for (let key of Object.getOwnPropertyNames(data)) {
                            res[key] = this.deserialize(data[key]);
                        }

                        return res;
                    } else {
                        // конструктор не найден
                        console.error(`Конструктор типа "${name}" не найден.`);
                        return val[key];
                    }
                } else {
                    // ссылка
                    res = this.cache[data];
                    if (res) {
                        return res;
                    } else {
                        console.error(`Не найден объект с идентификатором ${data}`);
                        return data;
                    }
                }
            } else {
                // простое поле
                res[key] = this.deserialize(val[key]);
            }
        }
        return res;
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
    }

    /**
     * зарегистрировать сопоставление
     * @param {string} alias псевдоним
     * @param {Function} ctor конструктор
     */
    register(alias, ctor) {
        this._nameToCtor[alias] = ctor;
        this._ctorToName[ctor] = alias;
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
