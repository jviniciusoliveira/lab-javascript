class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template() {
        throw new Error('O método TEMPLATE não foi implementado!'); 
    }

    update(model) {
        return this._elemento.innerHTML = this.template(model);
    }
}