import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange.component';
import { ExchangeRoutingModule } from '@app/pages/exchange/exchange-routing.module';



@NgModule({
  declarations: [
    ExchangeComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule
  ]
})
export class ExchangeModule { }
