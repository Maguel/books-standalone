import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/books-response.interface';
import { BooksService } from 'src/app/services/books.service';
import { TranslateService } from 'src/app/services/translate.service';
import { YScrollButtonDirective } from './y-scroll-button.directive';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, YScrollButtonDirective],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  book!: Book; 
  pages: number[] = [];
  isLoadingMoreData = false;
  showBtn!: boolean;
  constructor(
    private readonly booksService: BooksService,
    private readonly translateService: TranslateService,
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
  get lastSearch(): string {
    return this.booksService.lastSearch;
  }
  get page(): number {
    return this.booksService.page;
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
  translate(s: string): string {
    return this.translateService.translate(s);
  }

  handleScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (this.isNearBottom(element) && !this.isLoadingMoreData) {
      this.isLoadingMoreData = true;
      setTimeout(() => {
        this.loadMoreData();
      },100)
    }
    this.showBtn = this.isAway(element)?true:false;
  }
  isNearBottom(element: HTMLElement): boolean {
    const threshold = 5;
    const position = element.scrollTop + element.clientHeight;
    const height = element.scrollHeight;
    return height - position <= threshold;
  }
  isAway(element: HTMLElement): boolean {
    const position = element.scrollTop + element.clientHeight;
    const width = element.scrollHeight/2.5;
    return width < position;
  }
  loadMoreData() {
    this.booksService.loadMoreBooks();
    this.isLoadingMoreData = false;
  }

}
