import {ApplicationException} from '../../util/ApplicationException.js';

export class DataInvalidaException extends ApplicationException {
  constructor() {

    super('A data deve estar no seguinte formato: dd/mm/aaa');

    this.name = this.constructor.name;
  }
}
