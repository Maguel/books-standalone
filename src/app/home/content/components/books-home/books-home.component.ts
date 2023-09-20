import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-home',
  standalone: true,
  imports: [CommonModule],
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
  saveBook(b: Book): void {
    this.book = b;
    this.booksService.saveBookViewed(b);
  }
}
