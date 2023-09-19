import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  langSelect: string = 'en';
  lang: string[] = ['any', 'pt', 'it', 'fr', 'es', 'en'];
  show: boolean = false;
  border: boolean = true;
  constructor(
    private readonly booksService: BooksService
  ) {}
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
  setLanguage(l: string): void {
    this.langSelect = l;
    this.booksService.setLang(l);
  }
}
