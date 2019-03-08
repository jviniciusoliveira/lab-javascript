class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {

        return new Promise((resolve, reject) => {

            this._http.get('/negociacoes/semana')
                .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject('Falha na importação'));
        });
    }

    obterNegociacoesSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get('/negociacoes/anterior')
                .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject('Falha na importação'));
        });
    }

    obterNegociacoesSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http.get('/negociacoes/retrasada')
                .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject('Falha na importação'));
        });
    }
}