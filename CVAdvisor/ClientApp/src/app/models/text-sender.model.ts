import { Guid } from 'guid-typescript';
import { WordObject } from './word-object.model';

export class TextSender {
  r_key: string;
  text: string = '';
  position_name: string = '';
  kw_m: Array<WordObject>;
  kw_o: Array<WordObject>;
  kw_r: Array<WordObject>;
  kw_d: Array<WordObject>;
  constructor() {
    this.r_key = Guid.create().toString();
    this.kw_m = new Array();
    this.kw_o = new Array();
    this.kw_r = new Array();
    this.kw_d = new Array();
  }
}
