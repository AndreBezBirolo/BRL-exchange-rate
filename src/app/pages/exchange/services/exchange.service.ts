import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from "rxjs";
import {
  ICurrentExchange,
  ICurrentExchangeDto,
  IDailyExchange, IDailyExchangeDto
} from "@app/pages/exchange/interfaces/exchange.interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private httpClient: HttpClient) { }

  public async getCurrentExchange(): Promise<ICurrentExchange> {
    const url = '';
    const currentExchange$ = this.httpClient.get<ICurrentExchangeDto>(url);
    return await lastValueFrom(currentExchange$)
      .then((data) => {
        const currentExchange = this.mapperCurrentExchange(data);
        return currentExchange;
      })
      .catch((error) => {
        throw new HttpErrorResponse(error);
      })
  }

  private mapperCurrentExchange(data: ICurrentExchangeDto): ICurrentExchange {
    return {
      exchangeRate: data.exchangeRate,
      fromSymbol: data.fromSymbol,
      toSymbol: data.toSymbol,
      lastUpdatedAt: data.lastUpdatedAt,
    }
  }

  public async getDailyExchange(): Promise<IDailyExchange[]> {
    const url = '';
    const dailyExchange$ = this.httpClient.get<IDailyExchangeDto>(url);
    return await lastValueFrom(dailyExchange$)
      .then((data) => {
        const dailyExchange = this.mapperDailyExchange(data);
        return dailyExchange;
      })
      .catch((error) => {
        throw new HttpErrorResponse(error);
      })
  }

  private mapperDailyExchange(data: IDailyExchangeDto): IDailyExchange[] {
    return data.data.map(item => {
      return {
        close: item.close,
        date: new Date(item.date),
        high: item.high,
        low: item.low,
        open: item.open
      };
    });
  }
}
