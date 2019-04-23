function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { HttpService } from '../../util/HttpService.js';
import { Negociacao } from './Negociacao.js';

export let NegociacaoService = class NegociacaoService {

  constructor() {

    this._http = new HttpService();
  }

  obtemNegociacoesDaSemana() {

    return this._http.get('http://localhost:3000/negociacoes/semana').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {

      throw new ApplicationException('Importação da Semana impedida por erro');
    });
  }

  obtemNegociacaoDaSemanaAnterior() {

    return this._http.get('http://localhost:3000/negociacoes/anterior').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {

      throw new ApplicationException('Importação da Semana Anterior impedida por erro');
    });
  }

  obtemNegociacoesDaSemanaRetrasada() {

    return this._http.get('http://localhost:3000/negociacoes/retrasada').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {

      throw new ApplicationException('Importação da semana retrasada impedida por erro');
    });
  }

  obtemNegociacoesDoPeriodo() {
    var _this = this;

    return _asyncToGenerator(function* () {

      try {
        let periodo = yield Promise.all([_this.obtemNegociacoesDaSemana(), _this.obtemNegociacaoDaSemanaAnterior(), _this.obtemNegociacoesDaSemanaRetrasada()]);

        return periodo.reduce(function (novoArray, item) {
          return novoArray.concat(item);
        }, []).sort(function (a, b) {
          return b.data.getTime() - a.data.getTime();
        });
      } catch (e) {
        console.log(err);
        throw new ApplicationException('Negociações não importadas nesse periodo devido a erro');
      };
    })();
  }

};
//# sourceMappingURL=NegociacaoService.js.map