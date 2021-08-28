import { Component, OnInit } from '@angular/core';
import { Money } from 'src/app/interfaces/money';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  countries: Array<string> = [];
  baseCurrency: Money = new Money();
  toCurrency: Money = new Money();
  rates: number;

  constructor(private converterS: ConverterService) {}

  ngOnInit(): void {
    //setting up initialy 'EUR' as base currency
    this.converterS.getRatesByBase('EUR').subscribe((data) => {
      this.countries = Object.keys(data.exchange_rates);
      this.rates = data.exchange_rates;
      this.baseCurrency.currency = data.base;
    });
  }

  // rates are depending on base currency
  changeBase(e) {
    this.converterS.getRatesByBase(e).subscribe((data) => {
      this.countries = Object.keys(data.exchange_rates);
      this.rates = data.exchange_rates;
      this.baseCurrency = data.base;
    });
  }

  // conversion of the amount based on selected currency
  convert() {
    //preventing errors in calculation
    if (
      this.baseCurrency.amount == null ||
      this.baseCurrency.currency == undefined ||
      this.toCurrency.currency == undefined
    )
      return;

    this.baseCurrency.inspect =
      this.baseCurrency.amount + ' ' + this.baseCurrency.currency;

    let result: Money = this.converterS.convert(
      this.baseCurrency.amount,
      this.rates[this.toCurrency.currency],
      this.toCurrency.currency
    );

    this.toCurrency.amount = result.amount;
    this.toCurrency.inspect = result.inspect;
  }
}
