import { Routes } from '@angular/router';
import { BookViewComponent } from './components/book-view/book-view.component';
import { BooksHomeComponent } from './components/books-home/books-home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksHomeComponent},
  { path: 'book', component: BookViewComponent },
  { path: 'search', component: SearchResultsComponent }
];
