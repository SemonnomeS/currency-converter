import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Money } from '../interfaces/money';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  apiUrl: string = 'https://exchange-rates.abstractapi.com/v1/live/';
  apiKey: string = '38511682d546460db881ba8cfb14b08c';

  constructor(private http: HttpClient) {}

  //getting the rates based on 'from' currency
  getRatesByBase(base: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '?api_key=' + this.apiKey + '&base=' + base
    );
  }

  //conversion calculation based on rate
  // not returning string
  convert(amount: number, rate: number, country: string): Money {
    // 20 * 1,17
    let calculation = Number((amount * rate).toFixed(2));
    // "50.00 EUR"
    let inspect = calculation + ' ' + country;
    let conversion: Money = {
      amount: calculation,
      currency: country,
      inspect: inspect,
    };

    return conversion;
  }

  //as in example -->  fifty_eur + twenty_dollars # => 68.02 EUR
  sum(from: Money, to: Money, rate: number): Money {
    let toConversion = to.amount * rate;
    let calculation = Number((from.amount + toConversion).toFixed(2));

    //fifty_eur.inspect  # => "50.00 EUR"
    let inspect = calculation + ' ' + from.currency;

    return { amount: calculation, inspect: inspect, currency: from.currency };
  }

  //as in example --> fifty_eur - twenty_dollars # => 31.98 EUR
  subtraction(from: Money, to: Money, rate: number): Money {
    let toConversion = to.amount * rate;
    let calculation = Number((from.amount - toConversion).toFixed(2));

    //fifty_eur.inspect  # => "50.00 EUR"
    let inspect = calculation + ' ' + from.currency;

    return { amount: calculation, inspect: inspect, currency: from.currency };
  }

  // as in example --> fifty_eur / 2 # => 25 EUR
  fraction(currency: Money, divider: number): Money {
    let calculation = Number((currency.amount / divider).toFixed(2));

    //fifty_eur.inspect  # => "50.00 EUR"
    let inspect = calculation + ' ' + currency.currency;

    return {
      amount: calculation,
      inspect: inspect,
      currency: currency.currency,
    };
  }

  //as in example --> twenty_dollars * 3 # => 60 USD
  multiplication(currency: Money, multiplier: number): Money {
    let calculation = Number((currency.amount * multiplier).toFixed(2));

    //fifty_eur.inspect  # => "50.00 EUR"
    let inspect = calculation + ' ' + currency.currency;

    return {
      amount: calculation,
      inspect: inspect,
      currency: currency.currency,
    };
  }
}
