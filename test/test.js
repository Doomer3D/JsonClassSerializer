/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serializer_flat__ = __webpack_require__(6);
// рекурсивный сериализатор
//import Serializer from './serializer';

// плоский сериализатор


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__serializer_flat__["a" /* default */]);

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__color__ = __webpack_require__(8);




{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ С ПОМОЩЬЮ ИНТЕРФЕЙСА                            *');
    console.log('****************************************************************');

    // пример: firebrick (#b22222)
    var color = __WEBPACK_IMPORTED_MODULE_2__color__["a" /* default */].fromRGB(178, 34, 34);

    // создаем сериализатор
    var serializer = new __WEBPACK_IMPORTED_MODULE_0__src__["default"]();

    // регистрируем классы
    serializer.register(__WEBPACK_IMPORTED_MODULE_2__color__["a" /* default */]);

    // выводим в консоль
    console.log('Исходный цвет:');
    console.log(color);

    // сериализация
    var json = serializer.serialize(color, null, 2);
    console.log('JSON:');
    console.log(json);

    // десериализация
    var color2 = serializer.deserialize(json);
    console.log('Десериализованный цвет:');
    console.log(color2);
}

{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ ВСТРОЕННЫХ ТИПОВ С ПОМОЩЬЮ ИНТЕРФЕЙСА           *');
    console.log('****************************************************************');

    // пример: вчерашняя дата
    var source = new Date();
    source.setDate(source.getDate() - 1);

    Date.prototype.serialize = function () {
        return this.toISOString();
    };

    Date.prototype.deserialize = function (val) {
        var date = new Date(val);
        this.setDate(date.getDate());
        this.setTime(date.getTime());
    };

    // создаем сериализатор
    var _serializer = new __WEBPACK_IMPORTED_MODULE_0__src__["default"]();

    // регистрируем классы
    _serializer.register(Date);

    // выводим в консоль
    console.log('Исходная дата:');
    console.log(source);

    // сериализация
    var _json = _serializer.serialize(source, null, 2);
    console.log('JSON:');
    console.log(_json);

    // десериализация
    var back = _serializer.deserialize(_json);
    console.log('Десериализованная дата:');
    console.log(back);
}

{

    /**
     * простой класс через функцию
     * @param {stringany} name имя объекта
     * @param {MyClass} target целевой объект
     */
    var MyClass = function MyClass(name, target) {
        this.name = name;
        this.target = target;
    };

    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ ПРОСТЫХ ОБЪЕКТОВ СО ССЫЛКАМИ                    *');
    console.log('****************************************************************');

    var a = new MyClass('Объект A');
    var b = new MyClass('Объект B', a);
    a.target = b;

    var _source = [a, b];

    // создаем сериализатор
    var _serializer2 = new __WEBPACK_IMPORTED_MODULE_0__src__["default"]();

    // регистрируем классы
    _serializer2.register(MyClass);

    // выводим в консоль
    console.log('Исходные данные:');
    console.log(_source);

    // сериализация
    var _json2 = _serializer2.serialize(_source, null, 2);
    console.log('JSON:');
    console.log(_json2);

    // десериализация
    var _back = _serializer2.deserialize(_json2);
    console.log('Десериализованные данные:');
    console.log(_back);
}

{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ СЛОЖНЫХ ОБЪЕКТОВ СО ССЫЛКАМИ                    *');
    console.log('****************************************************************');

    // создаем схему
    var start = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].Start();
    var input = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].Command('Ввод A, B');
    var check = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].If('A > B');
    var maxIsA = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].Let('Max', 'A');
    var maxIsB = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].Let('Max', 'B');
    var output = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].Command('Вывод Max');
    var finish = new __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */].Finish();

    // настраиваем связи
    start.addLink(input);
    input.addLink(check);
    check.addLink(maxIsA, { condition: 'true' });
    check.addLink(maxIsB, { condition: 'false' });
    maxIsA.addLink(output);
    maxIsB.addLink(output);
    output.addLink(finish);

    // собираем объект схемы (массив вершин)
    var schema = [start, input, check, maxIsA, maxIsB, output, finish];

    // выводим в консоль
    console.log('Исходная схема:');
    console.log(schema);

    // создаем сериализатор
    var _serializer3 = new __WEBPACK_IMPORTED_MODULE_0__src__["default"]();

    // регистрируем классы
    Object.keys(__WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */]).forEach(function (key) {
        return _serializer3.register('Schema.' + key, __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* default */][key]);
    });

    // сериализация
    var _json3 = _serializer3.serialize(schema, null, 2);
    console.log('JSON:');
    console.log(_json3);

    // десериализация
    var schema2 = _serializer3.deserialize(_json3);
    console.log('Десериализованная схема:');
    console.log(schema2);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * генерировать UUID
 * @returns {string} идентификатор
 */
function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
}

/**
 * базовый класс связи
 */

var Link = function Link(target) {
    _classCallCheck(this, Link);

    this.id = generateUUID();
    if (typeof target !== 'undefined') this.target = target;
};

/**
 * базовый класс вершины
 */


var Node = function () {
    function Node() {
        _classCallCheck(this, Node);

        this.id = generateUUID();
        this.name = 'Node';
        this.links = {};
    }

    /**
     * добавить связь
     * @param {Node} node вершина
     * @param {Object} args аргументы
     */


    _createClass(Node, [{
        key: 'addLink',
        value: function addLink(node, args) {
            var link = new Link(node);
            if (args !== null && (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object') {
                Object.keys(args).forEach(function (key) {
                    return link[key] = args[key];
                });
            }
            this.links[link.id] = link;
        }
    }]);

    return Node;
}();

/**
 * начальная вершина
 */


var Start = function (_Node) {
    _inherits(Start, _Node);

    function Start() {
        _classCallCheck(this, Start);

        var _this = _possibleConstructorReturn(this, (Start.__proto__ || Object.getPrototypeOf(Start)).call(this));

        _this.name = 'Start';
        return _this;
    }

    return Start;
}(Node);

/**
 * конечная вершина
 */


var Finish = function (_Node2) {
    _inherits(Finish, _Node2);

    function Finish() {
        _classCallCheck(this, Finish);

        var _this2 = _possibleConstructorReturn(this, (Finish.__proto__ || Object.getPrototypeOf(Finish)).call(this));

        _this2.name = 'Finish';
        return _this2;
    }

    return Finish;
}(Node);

/**
 * вершина команды
 */


var Command = function (_Node3) {
    _inherits(Command, _Node3);

    function Command(command) {
        _classCallCheck(this, Command);

        var _this3 = _possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).call(this));

        _this3.name = 'Command';
        _this3.command = command;
        return _this3;
    }

    return Command;
}(Node);

/**
 * вершина присваивания
 */


var Let = function (_Node4) {
    _inherits(Let, _Node4);

    function Let(variable, expression) {
        _classCallCheck(this, Let);

        var _this4 = _possibleConstructorReturn(this, (Let.__proto__ || Object.getPrototypeOf(Let)).call(this));

        _this4.name = 'Let';
        _this4.variable = variable;
        _this4.expression = expression;
        return _this4;
    }

    return Let;
}(Node);

/**
 * вершина проверки условия
 */


var If = function (_Node5) {
    _inherits(If, _Node5);

    function If(condition) {
        _classCallCheck(this, If);

        var _this5 = _possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).call(this));

        _this5.name = 'If';
        _this5.condition = condition;
        return _this5;
    }

    return If;
}(Node);

/* harmony default export */ __webpack_exports__["a"] = ({
    Command: Command,
    Finish: Finish,
    If: If,
    Let: Let,
    Link: Link,
    Node: Node,
    Start: Start
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuid = 0; // уникальный идентификтор объекта

/**
 * проверить, что переменная является объектом
 * @param {any} value переменная
 * @returns {boolean} результат проверки
 */
function isObject(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
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

var Queue = function () {
    /**
     * конструктор
     */
    function Queue() {
        _classCallCheck(this, Queue);

        this._oldIndex = 1;
        this._newIndex = 1;
        this._data = {};
    }

    /**
     * добавить элемент в очередь
     * @param {any} item элемент
     */


    _createClass(Queue, [{
        key: 'enqueue',
        value: function enqueue(item) {
            this._data[this._newIndex] = item;
            this._newIndex++;
        }

        /**
         * получить элемент из очереди
         * @returns {any} элемент
         */

    }, {
        key: 'dequeue',
        value: function dequeue() {
            var oldIndex = this._oldIndex;
            var newIndex = this._newIndex;

            if (oldIndex !== newIndex) {
                var item = this._data[oldIndex];
                delete this._data[oldIndex];
                this._oldIndex++;
                return item;
            } else {
                return undefined;
            }
        }
    }]);

    return Queue;
}();

/**
 * контекст сериализации
 */


var SerializationContext = function () {
    /**
     * конструктор
     * @param {Serializer} ser сериализатор
     */
    function SerializationContext(ser) {
        _classCallCheck(this, SerializationContext);

        this.__proto__.__proto__ = ser;
        this.cache = []; // кэш сериализованных объектов
        this.index = 0; // идентификатор объекта для ссылки
        this.queue = new Queue(); // очередь
    }

    /**
     * сериализовать объект
     * @param {any} val объект
     * @returns {string} строка
     */


    _createClass(SerializationContext, [{
        key: 'serialize',
        value: function serialize(val) {
            var res = void 0;

            // добавляем в очередь исходный объект
            this.addQueue(val, function (e) {
                return res = e;
            });

            // главный цикл
            for (var item = this.queue.dequeue(); item; item = this.queue.dequeue()) {
                this.processItem(item);
            }

            return res;
        }

        /**
         * добавить в очередь значение для обработки
         * @param {any} val значение
         * @param {Function} callback функция обработки
         */

    }, {
        key: 'addQueue',
        value: function addQueue(val, callback) {
            this.queue.enqueue({ val: val, callback: callback });
        }

        /**
         * обработать элемент очереди
         * @param {{val:any, callback:Function}} item элемент очереди
         */

    }, {
        key: 'processItem',
        value: function processItem(item) {
            var _this = this;

            var _ref = [item.val, item.callback],
                val = _ref[0],
                callback = _ref[1];


            if (Array.isArray(val)) {
                (function () {
                    // массив
                    var res = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _item = _step.value;

                            _this.addQueue(_item, function (e) {
                                if (typeof e !== 'undefined') res.push(e);
                            });
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    callback(res);
                })();
            } else if (isObject(val)) {
                // объект
                if (this._ignore.some(function (e) {
                    return val instanceof e;
                })) {
                    // игнорируемый тип
                    callback(undefined);
                } else {
                    var name = this._ctorToName[val.constructor];
                    if (name) {
                        // зарегистрированный для сериализации тип
                        if (!val.__uuid) val.__uuid = ++uuid;
                        var cached = this.cache[val.__uuid];
                        if (cached) {
                            // объект есть в кэше
                            if (!cached.index) {
                                // индекс еще не назначен
                                cached.index = ++this.index;
                                var key = Object.keys(cached.ref)[0];
                                var old = cached.ref[key];
                                cached.ref['@' + name + '|' + cached.index] = old;
                                delete cached.ref[key];
                            }

                            // возвращаем ссылку на объект
                            callback(_defineProperty({}, '@' + name, cached.index));
                        } else {
                            var res = void 0;
                            if (typeof val.serialize === 'function') {
                                // класс реализует интерфейс сериализации
                                res = val.serialize();
                            } else {
                                // обычная сериализация
                                res = this.serializeObjectInner(val);
                            }

                            var _cached = { ref: _defineProperty({}, '@' + name, res) };
                            this.cache[val.__uuid] = _cached;

                            callback(_cached.ref);
                        }
                    } else {
                        var _res = this.serializeObjectInner(val);
                        callback(_res);
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

    }, {
        key: 'serializeObjectInner',
        value: function serializeObjectInner(val) {
            var _this2 = this;

            var res = {};

            var _loop = function _loop(key) {
                if (!(isString(key) && key.startsWith('__'))) {
                    // игнорируем поля, начинающиеся на два символа подчеркивания
                    _this2.addQueue(val[key], function (e) {
                        if (typeof e !== 'undefined') res[key] = e;
                    });
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.getOwnPropertyNames(val)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    _loop(key);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return res;
        }
    }]);

    return SerializationContext;
}();

/**
 * контекст десериализации
 */


var DeserializationContext = function () {
    /**
     * конструктор
     * @param {Serializer} ser сериализатор
     */
    function DeserializationContext(ser) {
        _classCallCheck(this, DeserializationContext);

        this.__proto__.__proto__ = ser;
        this.cache = []; // кэш сериализованных объектов
        this.queue = new Queue(); // очередь
    }

    /**
     * десериализовать объект json
     * @param {any} val объект json
     * @returns {any} объект
     */


    _createClass(DeserializationContext, [{
        key: 'deserialize',
        value: function deserialize(val) {
            var res = void 0;

            // добавляем в очередь исходный объект
            this.addQueue(val, function (e) {
                return res = e;
            });

            // главный цикл
            for (var item = this.queue.dequeue(); item; item = this.queue.dequeue()) {
                this.processItem(item);
            }

            return res;
        }

        /**
         * обработать элемент очереди
         * @param {{val:any, callback:Function}} item элемент очереди
         */

    }, {
        key: 'processItem',
        value: function processItem(item) {
            var _this3 = this;

            var _ref3 = [item.val, item.callback],
                val = _ref3[0],
                callback = _ref3[1];


            if (Array.isArray(val)) {
                (function () {
                    // массив
                    var res = [];
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = val[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _item2 = _step3.value;

                            _this3.addQueue(_item2, function (e) {
                                return res.push(e);
                            });
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    callback(res);
                })();
            } else if (isObject(val)) {
                (function () {
                    // объект
                    var res = {};

                    var _loop2 = function _loop2(key) {
                        var data = val[key];
                        if (isString(key) && key.startsWith('@')) {
                            // указание типа
                            if (isInteger(data)) {
                                // ссылка
                                res = _this3.cache[data];
                                if (!res) {
                                    console.error('\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043E\u0431\u044A\u0435\u043A\u0442 \u0441 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u043C ' + data);
                                    res = data;
                                }
                                return 'break';
                            } else {
                                // описание объекта
                                var _key$substr$split = key.substr(1).split('|'),
                                    _key$substr$split2 = _slicedToArray(_key$substr$split, 2),
                                    name = _key$substr$split2[0],
                                    id = _key$substr$split2[1];

                                var ctor = _this3._nameToCtor[name];
                                if (ctor) {
                                    // конструктор есть в описании
                                    res = new ctor();

                                    // сохраняем в кэше, если указан айдишник
                                    if (id) _this3.cache[id] = res;

                                    if (typeof res.deserialize === 'function') {
                                        // класс реализует интерфейс сериализации
                                        res.deserialize(data);
                                    } else {
                                        var _loop3 = function _loop3(_key) {
                                            _this3.addQueue(data[_key], function (e) {
                                                return res[_key] = e;
                                            });
                                        };

                                        // десериализуем свойства объекта
                                        var _iteratorNormalCompletion5 = true;
                                        var _didIteratorError5 = false;
                                        var _iteratorError5 = undefined;

                                        try {
                                            for (var _iterator5 = Object.getOwnPropertyNames(data)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                var _key = _step5.value;

                                                _loop3(_key);
                                            }
                                        } catch (err) {
                                            _didIteratorError5 = true;
                                            _iteratorError5 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                                    _iterator5.return();
                                                }
                                            } finally {
                                                if (_didIteratorError5) {
                                                    throw _iteratorError5;
                                                }
                                            }
                                        }
                                    }

                                    return 'break';
                                }
                            }
                        } else {
                            // простое поле
                            _this3.addQueue(val[key], function (e) {
                                return res[key] = e;
                            });
                        }
                    };

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = Object.getOwnPropertyNames(val)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var key = _step4.value;

                            var _ret5 = _loop2(key);

                            if (_ret5 === 'break') break;
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    callback(res);
                })();
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

    }, {
        key: 'addQueue',
        value: function addQueue(val, callback) {
            this.queue.enqueue({ val: val, callback: callback });
        }
    }]);

    return DeserializationContext;
}();

/**
 * сериализатор
 */


var Serializer = function () {
    /**
     * конструктор
     */
    function Serializer() {
        _classCallCheck(this, Serializer);

        this._nameToCtor = []; // словарь сопоставлений типов
        this._ctorToName = []; // словарь сопоставлений типов
        this._ignore = [Element]; // список игнорируемых типов
    }

    /**
     * зарегистрировать сопоставление
     * @param {string} alias псевдоним
     * @param {Function} ctor конструктор
     */


    _createClass(Serializer, [{
        key: 'register',
        value: function register(alias, ctor) {
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

    }, {
        key: 'ignore',
        value: function ignore(ctor) {
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

    }, {
        key: 'serialize',
        value: function serialize(val, replacer, space) {
            return JSON.stringify(new SerializationContext(this).serialize(val), replacer, space);
        }

        /**
         * десериализовать строку или объект json
         * @param {any} val строка или объект json
         * @returns {any} объект
         */

    }, {
        key: 'deserialize',
        value: function deserialize(val) {
            // преобразуем строку в объект
            if (isString(val)) val = JSON.parse(val);
            return new DeserializationContext(this).deserialize(val);
        }
    }]);

    return Serializer;
}();

/* harmony default export */ __webpack_exports__["a"] = (Serializer);

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * класс, описывающий цвет
 */
var Color = function () {
    function Color() {
        _classCallCheck(this, Color);

        this.r = 0;
        this.b = 0;
        this.g = 0;
    }

    /**
     * преобразовать в вид #rrggbb
     * @returns {string} результат
     */


    _createClass(Color, [{
        key: 'toHex',
        value: function toHex() {
            return "#" + (this.r < 16 ? '0' : '') + Math.round(this.r).toString(16) + (this.g < 16 ? '0' : '') + Math.round(this.g).toString(16) + (this.b < 16 ? '0' : '') + Math.round(this.b).toString(16);
        }

        /**
         * сериализовать класс в строку
         * @returns {string} результат
         */

    }, {
        key: 'serialize',
        value: function serialize() {
            return this.toHex();
        }

        /**
         * десериализовать класс из строки
         * @param {string} value строковое представление
         */

    }, {
        key: 'deserialize',
        value: function deserialize(value) {
            this.r = parseInt(value.substr(1, 2), 16);
            this.g = parseInt(value.substr(3, 2), 16);
            this.b = parseInt(value.substr(5, 2), 16);
        }

        /**
         * создать цвет
         * @param {number} r красный
         * @param {number} g синий
         * @param {number} b зеленый
         * @returns {Color} результат
         */

    }], [{
        key: 'fromRGB',
        value: function fromRGB(r, g, b) {
            var res = new Color();
            res.r = r;
            res.g = g;
            res.b = b;
            return res;
        }
    }]);

    return Color;
}();

/* harmony default export */ __webpack_exports__["a"] = (Color);

/***/ })
/******/ ]);