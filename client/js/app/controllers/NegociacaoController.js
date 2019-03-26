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
            
        this._negociacaoService = new NegociacaoService();
            
        this._init();
    }

    _init() {

        this._negociacaoService
            .listaTodos()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            })
            .catch(erro => this._mensagem = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        
        this._negociacaoService
            .cadastra(negociacao)
            .then((mensagem) => {
                this._listaNegociacoes.adiciona(negociacao);
                this._limpaFormulario();
                this._mensagem.texto = mensagem;   
            })
            .catch((erro) => {
                this._mensagem.texto = erro;   
            });
    }

    remove() {
        
        this._negociacaoService
            .remove()
            .then(msg => {
                this._listaNegociacoes.remove();
                this._mensagem.texto = msg;
            }).catch(msg => {
                this._mensagem.texto = msg;
            });        
    }

    importaNegociacoes() {

        this._negociacaoService
            .importa(this._listaNegociacoes.negociacoes)
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