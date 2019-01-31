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
  private advicesObservable: Observable<TextSender>;
  public advicesObj: TextSender;
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

  
}
