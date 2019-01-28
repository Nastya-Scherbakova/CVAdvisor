import { Guid } from 'guid-typescript';

export class TextSender {
  r_key: string;
  text: string;
  position_name: string;
  kw: Array<any>;
  kw_d: Array<any>;
  constructor() {
    this.r_key = Guid.create().toString();
    this.kw = new Array();
    this.kw_d = new Array();
  }
}
