import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  constructor(
    private readonly booksService: BooksService
  ) {}
  get books(): Book[] {
    return this.booksService.response;
  }
}
