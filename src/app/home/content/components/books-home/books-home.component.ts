import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';
import { TranslateService } from 'src/app/services/translate.service';
import { XScrollButtonDirective } from './x-scroll-button.directive';
import { XScrollDirective } from './x-scroll.directive';

@Component({
  selector: 'app-books-home',
  standalone: true,
  imports: [CommonModule, XScrollDirective, XScrollButtonDirective],
  templateUrl: './books-home.component.html',
  styleUrls: ['./books-home.component.scss']
})
export class BooksHomeComponent {
  book!: Book;
  showBtn!: boolean; 
  isLoadingMoreData = false;
  constructor(
    private readonly booksService: BooksService,
    private readonly translateService: TranslateService,
    private router: Router
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
  get index(): number {
    return this.booksService.index;
  }
  get maxResults(): number {
    return this.booksService.maxResuts;
  }
  viewBook(b: Book): void {
    this.router.navigate(['home/book']);
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
  translate(s: string): string {
    return this.translateService.translate(s);
  }
  handleScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (this.isNearBottom(element) && !this.isLoadingMoreData) {
      this.isLoadingMoreData = true;
      setTimeout(() => {
        this.loadMoreData();
      },300)
    }
    this.showBtn = this.isAway(element)?true:false;
  }
  isNearBottom(element: HTMLElement): boolean {
    const threshold = 50;
    const position = element.scrollLeft + element.clientWidth;
    const width = element.scrollWidth;
    return width - position <= threshold;
  }
  isAway(element: HTMLElement): boolean {
    const position = element.scrollLeft + element.clientWidth;
    const width = element.scrollWidth/3;
    return width < position;
  }
  loadMoreData() {
    this.booksService.loadMoreBooks();
    this.isLoadingMoreData = false;
  }
}
