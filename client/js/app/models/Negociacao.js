class Negociacao {

    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime()); // 'Programação Defensiva' - Conceito para evitar alteração da propriedade do Objeto.
        this._quantidade = quantidade; // A utilização do 'underline' é apenas uma convesão do mundo javascript, para identificar que o atributo é apenas "leitura".
        this._valor = valor;
        Object.freeze(this); // Congelamento do Objeto para que nenhuma propriedade seja alterada.
    }

    get data() {
        return new Date(this._data.getTime()); // 'Programação Defensiva' - Conceito para evitar alteração da propriedade do Objeto.
    }

    get quantidade() {
        return this._quantidade;
    }
    
    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }
}