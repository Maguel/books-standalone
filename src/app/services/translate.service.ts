import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Translator = {
  [key: string]: string;
};

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private _translator: Translator = {};
  private _lang: string = 'en';
  private _translateConfig = {'_tranlator': {}, '_lang': 'en'};
  
  constructor(
    private http: HttpClient
  ) {
    console.log('Translate Service is running.');
    const langConfig = localStorage.getItem('langConfig');
    if(langConfig && langConfig !== "undefined") {
      this._translateConfig = JSON.parse(langConfig);
      this._lang = this._translateConfig['_lang'];
    }
    this.http.get<Translator>(`/assets/i18n/${this._lang}.json`)
    .subscribe((response) => {
      this._translator = response;
      console.log(this._translator);
    });
  }
  get language(): string {
    return this._lang;
  }
  setTranslateLang(l: string) {
    this._lang = l;
    this._translateConfig['_lang'] = l;
    this.http.get<Translator>(`/assets/i18n/${this._lang}.json`)
    .subscribe((response) => {
      this._translator = response;
      console.log(this._translator);
    });
    localStorage.setItem('langConfig', JSON.stringify(this._translateConfig));
  }
  translate(s: string): string {
    return this._translator[s];
  }
} 
