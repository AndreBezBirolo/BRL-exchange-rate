import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { ExchangeService } from "@app/pages/exchange/services/exchange.service";
import { ICurrentExchange, IDailyExchange } from "@app/pages/exchange/interfaces/exchange.interface";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent {
  public currencyOptions = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"];
  public filteredOptions: Observable<string[]> | undefined;
  public form: FormGroup;
  public openList: boolean = false;
  public currentData: ICurrentExchange | undefined;
  public dailyItems: IDailyExchange[] = [];
  private fromCurrency = 'BRL';

  constructor(private exchangeService: ExchangeService) {
    this.form = new FormGroup({
      currency: new FormControl('', []),
    });

    this.filteredOptions = this.form.get('currency')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  public async onChangeClick(): Promise<void> {
    if (!this.form.get('currency')?.value) return;

    await this.exchangeService.getCurrentExchange(this.fromCurrency, this.form.get('currency')?.value)
      .then(async (data) => {
        this.currentData = data;
        await this.exchangeService.getDailyExchange(this.fromCurrency, this.form.get('currency')?.value)
          .then((data) => {
            this.dailyItems = data;
          })
      })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currencyOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
