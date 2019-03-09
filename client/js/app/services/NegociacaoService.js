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
}