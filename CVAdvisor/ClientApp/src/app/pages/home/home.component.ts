import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice.service';
import { Observable } from 'rxjs';
import { TextSender } from 'src/app/models/text-sender.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private advicesObservable: Observable<any>;
  public advicesObj: any;
  public text = '';
  public position = '';
  constructor(private adviceService: AdviceService) {
  }

  ngOnInit() {
    this.advicesObservable = this.adviceService.subscribeOnAdvices();
    this.advicesObservable.subscribe(advices => {
      if (advices) {
        this.advicesObj = advices;
      }

    });
  }

  sendText() {
    const newSend = new TextSender();
    newSend.kw = this.advicesObj.kw ? this.advicesObj.kw : [];
    newSend.kw_d = this.advicesObj.kw_d ? this.advicesObj.kw_d : [];
    newSend.position_name = this.position;
    newSend.text = this.text;
    this.adviceService.sendText(newSend);
  }
}
