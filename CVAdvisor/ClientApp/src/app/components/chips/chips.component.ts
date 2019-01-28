import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.sass']
})
export class ChipsComponent implements OnInit, OnChanges {
  @Input()
  chipsObj: any;
  @Output()
  chipsObjChange: EventEmitter<any> = new EventEmitter<any>();
  tempValue: string;
  edit = false;
  goodAdvice: Array<any>;
  indxEdit: number;
  badAdvice: Array<any>;
  constructor() { }

  ngOnInit() {
    this.changeArrays();
  }

  changeArrays() {
    if (this.chipsObj && this.chipsObj.kw) {
      this.goodAdvice = this.chipsObj.kw;
      this.badAdvice = this.chipsObj.kw_d;
    }
  }

  makeEditable(item: any) {
    this.edit = true;
    this.indxEdit = this.goodAdvice.indexOf(item);
    this.tempValue = item;
  }

  cancelEdit() {
    this.edit = false;
    this.goodAdvice[this.indxEdit] = this.tempValue;
    this.indxEdit = -1;
    this.tempValue = '';
  }

  saveEdits() {
    this.edit = false;
    this.indxEdit = -1;
    this.badAdvice.push(this.tempValue);
    this.tempValue = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.chipsObjChange.emit(this.chipsObj);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chipsObj) {
      this.changeArrays();
    }
  }

}
