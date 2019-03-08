class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'remove');
        
        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($('#mensagem')),
            'texto');   
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

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesSemana(),
            service.obterNegociacoesSemanaAnterior(),
            service.obterNegociacoesSemanaRetrasada()
        ])
        .then(arrayNegociacoes => {
            arrayNegociacoes.reduce((negociacoes, arrayNegociacoes) => negociacoes.concat(arrayNegociacoes), [])
                            .map(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso.';
        })
        .catch(erro => this._mensagem.texto = erro);
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