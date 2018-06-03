# JSON Class Serializer
JSON Class Serializer - это библиотека для сериализации объектов JavaScript в формат JSON с сохранением информации о типах (классах) и связях между объектами.

## Использование

```javascript
// рекурсивный сериализатор
import Serializer from './serializer';

или

// плоский сериализатор
import Serializer from './serializer-flat';

// импорт описаний классов
import MyNamespace from './classses';

...

// создаем сериализатор
let serializer = new Serializer();

// регистрируем классы
Object.keys(MyNamespace).forEach(key => serializer.register(`MyNamespace.${key}`, MyNamespace[key]));

// получение данных
let data = {...};

// сериализация
let json = serializer.serialize(data, null, 2);
console.log('JSON:');
console.log(json);

// десериализация
let back = serializer.deserialize(json);
console.log('Десериализованные данные:');
console.log(back);
```

## Использование интерфейса сериализации на примере встроенных типов данных

```javascript
// пример: вчерашняя дата
let source = new Date();
source.setDate(source.getDate() - 1);

Date.prototype.serialize = function () {
    return this.toISOString();
};

Date.prototype.deserialize = function (val) {
    let date = new Date(val);
    this.setDate(date.getDate());
    this.setTime(date.getTime());
};

// создаем сериализатор
let serializer = new Serializer();

// регистрируем классы
serializer.register(Date);

// выводим в консоль
console.log('Исходная дата:');
console.log(source);

// сериализация
let json = serializer.serialize(source, null, 2);
console.log('JSON:');
console.log(json);

// десериализация
let back = serializer.deserialize(json);
console.log('Десериализованная дата:');
console.log(back);
```
