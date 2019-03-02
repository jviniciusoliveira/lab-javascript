class ListaNegociacoes {

    constructor(funcaoUpdate) {
        this._negociacoes = [];
        this._funcaoUpdate = funcaoUpdate;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._funcaoUpdate();
    }

    removeLista() {
        this._negociacoes = [];
        this._funcaoUpdate();
    }

    get negociacoes() {
        return [...this._negociacoes];
        /**
         * Retorna um Novo array ao invés do array original.
         * 'Programação Defensiva' - Conceito para evitar alteração da propriedade do Objeto.
         */  
    } 
}