import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TextSender } from 'src/app/models/text-sender.model';
import { WordObject } from 'src/app/models/word-object.model';


@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.sass']
})
export class ChipsComponent implements OnInit {
  @Input()
  chipsObj: TextSender;
  @Output()
  chipsObjChange: EventEmitter<any> = new EventEmitter<any>();
  tempValue: string;
  edit = false;
  indxEdit: number;
  constructor() { }

  ngOnInit() {
  }

  addWord() {
    let item = new WordObject();
    this.chipsObj.kw_m.push(item);
    this.makeEditable(item);
  }

  makeEditable(item: WordObject) {
    this.edit = true;
    this.indxEdit = this.chipsObj.kw_m.indexOf(item);
    this.tempValue = item.word;
  }

  cancelEdit() {
    this.edit = false;
    this.chipsObj.kw_m[this.indxEdit].word = this.tempValue;
    this.indxEdit = -1;
    this.tempValue= null;
  }

  saveEdits(item: string) {
    if(this.tempValue && this.tempValue.length > 0 && this.tempValue != item){
      let newDel = new WordObject();
      newDel.count = this.chipsObj.kw_m[this.indxEdit].count;
      newDel.word = this.tempValue;
      this.chipsObj.kw_m[this.indxEdit].count = -1;
      this.chipsObj.kw_d.push(newDel);
    } 
    this.edit = false;
    this.indxEdit = -1;
    this.tempValue = null;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.container.id === 'cdk-drop-list-3') return;
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.chipsObjChange.emit(this.chipsObj);
  }

}
