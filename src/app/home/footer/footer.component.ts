import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  langSelect: string = '';
  lang: string[] = ['es', 'en'];
  show: boolean = false;
  border: boolean = true;
  constructor(
    private readonly translateService: TranslateService,
    private cd: ChangeDetectorRef
  ) {
    this.langSelect = translateService.language;
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
  setLanguage(l: string): void {
    this.langSelect = l;
    this.translateService.setTranslateLang(l);
    this.cd.detectChanges();
  }
  translate(s: string): string {
    return this.translateService.translate(s);
  }
}
