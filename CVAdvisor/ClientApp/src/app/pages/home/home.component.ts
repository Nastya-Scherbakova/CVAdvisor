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

  constructor(private adviceService: AdviceService) {
  }

  ngOnInit() {
   
  }

  
}
