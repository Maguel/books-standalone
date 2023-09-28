import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent {
  constructor(
    private readonly booksService: BooksService,
    private readonly translateService: TranslateService
  ) {}
  get bookSelected(): Book {
    return this.booksService.bookSelected;
  }
  translate(s: string): string {
    return this.translateService.translate(s);
  }
}
