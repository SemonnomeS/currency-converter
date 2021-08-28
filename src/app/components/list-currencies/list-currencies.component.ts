import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { Money } from 'src/app/interfaces/money';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-list-currencies',
  templateUrl: './list-currencies.component.html',
  styleUrls: ['./list-currencies.component.css'],
})
export class ListCurrenciesComponent implements OnInit {
  countries: Array<string> = [];
  rates: Array<Country> = [];
  baseCurrency: Money = new Money();

  constructor(private converterS: ConverterService) {}

  ngOnInit(): void {
    //setting up initialy 'EUR' as base currency
    this.converterS.getRatesByBase('EUR').subscribe((data) => {
      this.countries = Object.keys(data.exchange_rates);

      this.baseCurrency.currency = data.base;

      this.setCountries(data.exchange_rates);
    });
  }

  // rates are depending on base currency
  changeBase(e) {
    this.converterS.getRatesByBase(e).subscribe((data) => {
      this.countries = Object.keys(data.exchange_rates);

      this.baseCurrency.currency = data.base;

      this.setCountries(data.exchange_rates);
    });
  }

  setCountries(data) {
    this.rates = [];

    for (const key in data) {
      let item: Country = { country: key.slice(0, 2), rate: data[key] };

      this.rates.push(item);
    }
  }
}
