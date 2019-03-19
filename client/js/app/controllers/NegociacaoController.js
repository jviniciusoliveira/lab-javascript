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
            
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            })
            .catch(erro => this._mensagem = erro);
    }

    adiciona(event) {
        event.preventDefault();

        let connection = ConnectionFactory.getConnection();
        console.log(connection);
        let negociacao = this._criaNegociacao();

        connection.then((connection) => {

            new NegociacaoDao(connection)
                .adiciona(negociacao)
                .then(() => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._limpaFormulario();
                    this._mensagem.texto = 'Negociação inserida com sucesso!';   
                })
                .catch((erro) => {
                    this._mensagem.texto = erro;   
                });

        });
    }

    remove() {
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(msg => {
                this._listaNegociacoes.remove();
                this._mensagem.texto = msg;
            }).catch(msg => {
                this._mensagem.texto = msg;
            });

        
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