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

    ordena(criterio) {
        this._negociacoes.sort(criterio);
    }

    inverteOrdena() {
        this._negociacoes.reverse();
    }

    get negociacoes() {
        return [...this._negociacoes];
        /**
         * Retorna um Novo array ao invés do array original.
         * 'Programação Defensiva' - Conceito para evitar alteração da propriedade do Objeto.
         */  
    }
    
    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}