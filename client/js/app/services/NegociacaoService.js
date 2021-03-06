class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {

        return this._http
                .get('/negociacoes/semana')
                .then(negociacoes => { return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) })
                .catch(erro => { 
                    console.log(erro);
                    throw new Error('Falha na importação.');
                });
    }

    obterNegociacoesSemanaAnterior() {

        return this._http.get('/negociacoes/anterior')
                .then(negociacoes => { return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Falha na importação.');
                });
    }

    obterNegociacoesSemanaRetrasada() {

        return this._http.get('/negociacoes/retrasada')
                .then(negociacoes => { return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Falha na importação.');
                });
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ])
        .then(arrayNegociacoes => {
            return arrayNegociacoes.reduce((negociacoes, arrayNegociacoes) => negociacoes.concat(arrayNegociacoes), []);
        })
        .catch(erro => { throw new Error(erro) });
    }

    cadastra(negociacao) {
    
        return ConnectionFactory
                    .getConnection()
                    .then((connection) => new NegociacaoDao(connection) )
                    .then(dao => dao.adiciona(negociacao))
                    .then(() => 'Negociação cadastrada com sucesso!')
                    .catch(() => {
                        throw new Erro('Erro ao cadastrar a negociação!');
                    });
    }

    listaTodos() {

        return ConnectionFactory
                    .getConnection()
                    .then((connection) => new NegociacaoDao(connection) )
                    .then(dao => dao.listaTodos())
                    .catch( erro => {
                        console.log(erro);
                        throw new Erro('Erro ao listar as negociação!');
                    });
    }

    remove() {

        return ConnectionFactory
                    .getConnection()
                    .then((connection) => new NegociacaoDao(connection) )
                    .then(dao => dao.apagaTodos())
                    .catch( erro => {
                        console.log(erro);
                        throw new Erro('Erro ao tentar apagar as negociação!');
                    });
    }

    importa(listaAtual) {

        return this.obterNegociacoes()
                    .then(negociacoes => 
                        negociacoes.filter(negociacao =>
                            !listaAtual.some(negociacaoExistente =>
                                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                    )
                    .catch(erro => {
                        console.log(erro);
                        throw new Erro('Não foi possível importar as negociações!');
                    })
    }
}