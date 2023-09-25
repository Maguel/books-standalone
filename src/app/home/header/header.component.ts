import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchBy: string = 'by_title';
  query: string = '';
  by: { [key: string]: number } = {'by_title': 1, 'by_author':2, 'by_ISBN': 3};
  list: string[] = ['by_title', 'by_author', 'by_ISBN'];
  show: boolean = false;
  border: boolean = true;

  constructor(
    private readonly booksService: BooksService,
    private readonly translateService: TranslateService,
    private router: Router
  ) {}

  setSearchBy(s: string): void {
    this.searchBy = s;
  }
  showOptions(): void {
    if(!this.show) {
      this.border = !this.border;
      setTimeout(() => {
        this.show = !this.show;
      },200);
    } else {
      this.show = !this.show;
      setTimeout(() => {
        this.border = !this.border;
      },300);
    }
  } 
  search(): void {
    this.router.navigate(['/home/search'])
    setTimeout(() => {
      this.booksService.search(this.query, this.by[this.searchBy]);
    },300);
  }
  goHome(): void {
    this.router.navigate(['/home']);
  }
  translate(s: string): string {
    return this.translateService.translate(s);
  }
}
