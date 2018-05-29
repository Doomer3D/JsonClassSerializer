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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serializer__ = __webpack_require__(2);


/***/ }),
/* 2 */
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
        this.cache = []; // кеш сериализованных объектов
        this.index = 0; // идентификатор объекта для ссылки
    }

    /**
     * сериализовать объект
     * @param {any} val объект
     * @returns {string} строка
     */


    _createClass(SerializationContext, [{
        key: 'serialize',
        value: function serialize(val) {
            if ( /*val instanceof $ ||*/val instanceof Element) {
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

    }, {
        key: 'serializeArray',
        value: function serializeArray(val) {
            var res = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    res.push(this.serialize(item));
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

            return res;
        }

        /**
         * сериализовать объект
         * @param {Object} val объект
         * @returns {Object} результат
         */

    }, {
        key: 'serializeObject',
        value: function serializeObject(val) {
            var name = this._ctorToName[val.constructor];
            if (name) {
                // зарегистрированный для сериализации тип
                if (!val.__uuid) val.__uuid = ++uuid;
                var cached = this.cache[val.__uuid];
                if (cached) {
                    // объект есть в кеше
                    if (!cached.index) {
                        // индекс еще не назначен
                        cached.index = ++this.index;
                        var key = Object.keys(cached.ref)[0];
                        var old = cached.ref[key];
                        cached.ref['@' + name + '|' + cached.index] = old;
                        delete cached.ref[key];
                    }

                    // возвращаем ссылку на объект
                    return _defineProperty({}, '@' + name, cached.index);
                } else {
                    var _cached = { ref: _defineProperty({}, '@' + name, {}) };
                    this.cache[val.__uuid] = _cached;
                    var res = this.serializeObjectInner(val);
                    _cached.ref[Object.keys(_cached.ref)[0]] = res;
                    return _cached.ref;
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

    }, {
        key: 'serializeObjectInner',
        value: function serializeObjectInner(val) {
            var res = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.getOwnPropertyNames(val)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (!(isString(key) && key.startsWith('__'))) {
                        // игнорируем поля, начинающиеся на два символа подчеркивания
                        res[key] = this.serialize(val[key]);
                    }
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
        this.cache = []; // кеш сериализованных объектов
    }

    /**
     * десериализовать объект json
     * @param {any} val объект json
     * @returns {any} объект
     */


    _createClass(DeserializationContext, [{
        key: 'deserialize',
        value: function deserialize(val) {
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

    }, {
        key: 'deserializeArray',
        value: function deserializeArray(val) {
            var _this = this;

            return val.map(function (item) {
                return _this.deserialize(item);
            });
        }

        /**
         * десериализовать массив
         * @param {Array} val массив
         * @returns {Array} результат
         */

    }, {
        key: 'deserializeObject',
        value: function deserializeObject(val) {
            var res = {};
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.getOwnPropertyNames(val)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var key = _step3.value;

                    var data = val[key];
                    if (isString(key) && key.startsWith('@')) {
                        // указание типа
                        if (isObject(data)) {
                            // описание объекта
                            var _key$substr$split = key.substr(1).split('|'),
                                _key$substr$split2 = _slicedToArray(_key$substr$split, 2),
                                name = _key$substr$split2[0],
                                id = _key$substr$split2[1];

                            var ctor = this._nameToCtor[name];
                            if (ctor) {
                                // конструктор есть в описании
                                res = new ctor();

                                // сохраняем в кеше, если указан айдишник
                                if (id) this.cache[id] = res;

                                // десериализуем свойства объекта
                                var _iteratorNormalCompletion4 = true;
                                var _didIteratorError4 = false;
                                var _iteratorError4 = undefined;

                                try {
                                    for (var _iterator4 = Object.getOwnPropertyNames(data)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var _key = _step4.value;

                                        res[_key] = this.deserialize(data[_key]);
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

                                return res;
                            } else {
                                // конструктор не найден
                                console.error('\u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u0442\u0438\u043F\u0430 "' + name + '" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.');
                                return val[key];
                            }
                        } else {
                            // ссылка
                            res = this.cache[data];
                            if (res) {
                                return res;
                            } else {
                                console.error('\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043E\u0431\u044A\u0435\u043A\u0442 \u0441 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u043C ' + data);
                                return data;
                            }
                        }
                    } else {
                        // простое поле
                        res[key] = this.deserialize(val[key]);
                    }
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

            return res;
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
    }

    /**
     * зарегистрировать сопоставление
     * @param {string} alias псевдоним
     * @param {Function} ctor конструктор
     */


    _createClass(Serializer, [{
        key: 'register',
        value: function register(alias, ctor) {
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

/* unused harmony default export */ var _unused_webpack_default_export = (Serializer);

/***/ })
/******/ ]);