import Serializer from '../src';
import Schema from './schema';
import Color from './color';

{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ С ПОМОЩЬЮ ИНТЕРФЕЙСА                            *');
    console.log('****************************************************************');

    // пример: firebrick (#b22222)
    let color = Color.fromRGB(178, 34, 34);

    // создаем сериализатор
    let serializer = new Serializer();

    // регистрируем классы
    serializer.register(Color);

    // выводим в консоль
    console.log('Исходный цвет:');
    console.log(color);

    // сериализация
    let json = serializer.serialize(color, null, 2);
    console.log('JSON:');
    console.log(json);

    // десериализация
    let color2 = serializer.deserialize(json);
    console.log('Десериализованный цвет:');
    console.log(color2);
}

{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ ВСТРОЕННЫХ ТИПОВ С ПОМОЩЬЮ ИНТЕРФЕЙСА           *');
    console.log('****************************************************************');

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
}

{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ ПРОСТЫХ ОБЪЕКТОВ СО ССЫЛКАМИ                    *');
    console.log('****************************************************************');

    /**
     * простой класс через функцию
     * @param {stringany} name имя объекта
     * @param {MyClass} target целевой объект
     */
    function MyClass(name, target) {
        this.name = name;
        this.target = target;
    }

    let a = new MyClass('Объект A');
    let b = new MyClass('Объект B', a);
    a.target = b;

    let source = [a, b];

    // создаем сериализатор
    let serializer = new Serializer();

    // регистрируем классы
    serializer.register(MyClass);

    // выводим в консоль
    console.log('Исходные данные:');
    console.log(source);

    // сериализация
    let json = serializer.serialize(source, null, 2);
    console.log('JSON:');
    console.log(json);

    // десериализация
    let back = serializer.deserialize(json);
    console.log('Десериализованные данные:');
    console.log(back);
}

{
    console.log('****************************************************************');
    console.log('* СЕРИАЛИЗАЦИЯ СЛОЖНЫХ ОБЪЕКТОВ СО ССЫЛКАМИ                    *');
    console.log('****************************************************************');

    // создаем схему
    let start = new Schema.Start();
    let input = new Schema.Command('Ввод A, B');
    let check = new Schema.If('A > B');
    let maxIsA = new Schema.Let('Max', 'A');
    let maxIsB = new Schema.Let('Max', 'B');
    let output = new Schema.Command('Вывод Max');
    let finish = new Schema.Finish();

    // настраиваем связи
    start.addLink(input);
    input.addLink(check);
    check.addLink(maxIsA, { condition: 'true' });
    check.addLink(maxIsB, { condition: 'false' });
    maxIsA.addLink(output);
    maxIsB.addLink(output);
    output.addLink(finish);

    // собираем объект схемы (массив вершин)
    let schema = [
        start,
        input,
        check,
        maxIsA,
        maxIsB,
        output,
        finish
    ];

    // выводим в консоль
    console.log('Исходная схема:');
    console.log(schema);

    // создаем сериализатор
    let serializer = new Serializer();

    // регистрируем классы
    Object.keys(Schema).forEach(key => serializer.register(`Schema.${key}`, Schema[key]));

    // сериализация
    let json = serializer.serialize(schema, null, 2);
    console.log('JSON:');
    console.log(json);

    // десериализация
    let schema2 = serializer.deserialize(json);
    console.log('Десериализованная схема:');
    console.log(schema2);
}
