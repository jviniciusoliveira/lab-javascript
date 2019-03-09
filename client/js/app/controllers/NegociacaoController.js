class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'remove', 'ordena', 'inverteOrdena');
        
        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($('#mensagem')),
            'texto');   
    }

    adiciona(event) {
        event.preventDefault();
        
        try {
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._limpaFormulario();
            this._mensagem.texto = 'Negociação inserida com sucesso!';   
        } catch (error) {
            this._mensagem.texto = error;   
        }
    }

    remove() {
        this._listaNegociacoes.remove();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => {
                negociacoes.map(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            })
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = 'Falha na importação'
            });  
    }

    ordena(coluna) {
        
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdena();    
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
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