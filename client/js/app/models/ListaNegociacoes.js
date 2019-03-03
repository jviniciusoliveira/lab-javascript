class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    remove() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [...this._negociacoes];
        /**
         * Retorna um Novo array ao invés do array original.
         * 'Programação Defensiva' - Conceito para evitar alteração da propriedade do Objeto.
         */  
    } 
}