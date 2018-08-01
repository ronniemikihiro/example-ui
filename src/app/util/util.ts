import * as moment from 'moment';

/**
 * Classe util para manipulações de dados.
 * 
 * @author ronnie-msl
 */
export class Util {

  /**
   * Retorna uma data em formato string.
   * @param data
   */
  public static dateToString(data: Date): string {
    return moment(data).format('YYYY-MM-DD');
  }

  /**
   * Retorna uma data(string) em formato Date.
   * @param data
   */
  public static stringToDate(data: Date): Date {
    return moment(data, 'YYYY-MM-DD').toDate();
  }

}