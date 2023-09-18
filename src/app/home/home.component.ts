import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ContentComponent, FooterComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BooksService]
})
export class HomeComponent {
  constructor(
    readonly booksService: BooksService
  ){
    booksService.search('Java',0);
    console.log(booksService.response);
  }
}
