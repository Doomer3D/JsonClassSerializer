/**
 * класс, описывающий цвет
 */
export default class Color {
    constructor() {
        this.r = 0;
        this.b = 0;
        this.g = 0;
    }

    /**
     * преобразовать в вид #rrggbb
     * @returns {string} результат
     */
    toHex() {
        return "#" +
            (this.r < 16 ? '0' : '') + Math.round(this.r).toString(16) +
            (this.g < 16 ? '0' : '') + Math.round(this.g).toString(16) +
            (this.b < 16 ? '0' : '') + Math.round(this.b).toString(16);
    }

    /**
     * сериализовать класс в строку
     * @returns {string} результат
     */
    serialize() {
        return this.toHex();
    }

    /**
     * десериализовать класс из строки
     * @param {string} value строковое представление
     */
    deserialize(value) {
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
    static fromRGB(r, g, b) {
        let res = new Color();
        res.r = r;
        res.g = g;
        res.b = b;
        return res;
    }
}
