import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { ListCurrenciesComponent } from './components/list-currencies/list-currencies.component';

const routes: Routes = [
  { path: '', redirectTo: 'converter', pathMatch: 'full' },
  {
    path: 'converter',
    component: ConverterComponent,
  },
  {
    path: 'list-currencies',
    component: ListCurrenciesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
