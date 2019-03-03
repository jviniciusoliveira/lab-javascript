class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

       this._listaNegociacoes = FactoryProxy.create(
            new ListaNegociacoes(), 
            ['adiciona', 'remove'],
            model => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('#negociacoes-view'));  
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = FactoryProxy.create(
            new Mensagem(), 
            ['texto'],
            model => this._mensagemView.update(model));

        this._mensagemView = new MensagemView($('#mensagem'));
    }

    adiciona(event) {
        event.preventDefault();
             
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação inserida com sucesso!';
    }

    remove() {
        this._listaNegociacoes.remove();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    _criaNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}