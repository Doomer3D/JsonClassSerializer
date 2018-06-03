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
class Link {
    constructor(target) {
        this.id = generateUUID();
        if (typeof target !== 'undefined') this.target = target;
    }
}

/**
 * базовый класс вершины
 */
class Node {
    constructor() {
        this.id = generateUUID();
        this.name = 'Node';
        this.links = {};
    }

    /**
     * добавить связь
     * @param {Node} node вершина
     * @param {Object} args аргументы
     */
    addLink(node, args) {
        let link = new Link(node);
        if (args !== null && typeof args === 'object') {
            Object.keys(args).forEach(key => link[key] = args[key]);
        }
        this.links[link.id] = link;
    }
}

/**
 * начальная вершина
 */
class Start extends Node {
    constructor() {
        super();
        this.name = 'Start';
    }
}

/**
 * конечная вершина
 */
class Finish extends Node {
    constructor() {
        super();
        this.name = 'Finish';
    }
}

/**
 * вершина команды
 */
class Command extends Node {
    constructor(command) {
        super();
        this.name = 'Command';
        this.command = command;
    }
}

/**
 * вершина присваивания
 */
class Let extends Node {
    constructor(variable, expression) {
        super();
        this.name = 'Let';
        this.variable = variable;
        this.expression = expression;
    }
}

/**
 * вершина проверки условия
 */
class If extends Node {
    constructor(condition) {
        super();
        this.name = 'If';
        this.condition = condition;
    }
}

export default {
    Command,
    Finish,
    If,
    Let,
    Link,
    Node,
    Start
};
