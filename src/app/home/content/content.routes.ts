import { Routes } from '@angular/router';
import { BooksHomeComponent } from './components/books-home/books-home.component';
export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksHomeComponent}
];
