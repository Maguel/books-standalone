import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchBy: string = 'by title';
  query: string = '';
  by: { [key: string]: number } = {'by title': 1, 'by author':2, 'by ISBN': 3};
  list: string[] = ['by title', 'by author', 'by ISBN'];
  show: boolean = false;
  border: boolean = true;

  constructor(
    private readonly booksService: BooksService,
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
}
