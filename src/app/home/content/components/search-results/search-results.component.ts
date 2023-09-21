import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  book!: Book;
  constructor(
    private readonly booksService: BooksService,
    private router: Router
  ) {}
  get books(): Book[] {
    return this.booksService.response;
  }
  get totalResults(): number {
    return this.booksService.totalResults;
  }
  get index(): number {
    return this.booksService.index;
  }
  httpsForm(s?: string): string {
    if(s){
      return 'https'+s.slice(4,s.length);
    } else {
      return ''
    }
  }
  next():void {
    this.booksService.nextPage();
  }
  previus():void {
    this.booksService.previusPage();
  }
  viewBook(b: Book): void {
    this.router.navigate(['home/book']);
    this.book = b;
    this.booksService.saveBookViewed(b);
  }
}
