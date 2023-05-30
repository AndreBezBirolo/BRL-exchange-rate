import { Component, Input, OnInit } from '@angular/core';
import { IDailyExchange } from "@app/pages/exchange/exchange.interface";

@Component({
  selector: 'app-days-card',
  templateUrl: './days-card.component.html',
  styleUrls: ['./days-card.component.scss']
})
export class DaysCardComponent implements OnInit {
  @Input() items: IDailyExchange[] = [{
    close: 1,
    date: new Date(),
    low: 1,
    high: 1,
    open: 1
  }, {
    close: 1,
    date: new Date(),
    low: 1,
    high: 1,
    open: 1
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
