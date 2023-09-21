import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';
import { XScrollDirective } from './x-scroll.directive';

@Component({
  selector: 'app-books-home',
  standalone: true,
  imports: [CommonModule, XScrollDirective],
  templateUrl: './books-home.component.html',
  styleUrls: ['./books-home.component.scss']
})
export class BooksHomeComponent {
  book!: Book;
  constructor(
    private readonly booksService: BooksService
  ) {}
  get books(): Book[] {
    return this.booksService.response;
  }
  get booksViewed(): Book[] {
    return this.booksService.booksViewed;
  }
  get lastSearch(): string {
    return this.booksService.lastSearch;
  }
  get totalResults(): number {
    return this.booksService.totalResults;
  }
  viewBook(b: Book): void {
    this.book = b;
    this.booksService.saveBookViewed(b);
  }
  httpsForm(s?: string): string {
    if(s){
      return 'https'+s.slice(4,s.length);
    } else {
      return ''
    }
  }
}
