import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BooksResponse } from '../interfaces/books-response.interface';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _apiKey: string = 'AIzaSyAHyTITutAZFqmLCCCe8pCi603PAMnNBoM';
  private _apiUri: string = 'https://www.googleapis.com/books/v1/volumes?';
  private readonly _searchBy: { [key: number]: string } = {1:'intitle:',2:'inauthor:',3:'inpublisher:',4:'subject:',5:'isbn:'};
  private _response: Book[] = [];
  private _viewsHistory: Book[] = [];
  private _query: string = '';
  private _by: number = 0;
  private _index = 0;
  private _maxResults: number = 10;
  private _totalResults: number = 0;
  private _page: number = 0;
  private _configs: { [key: string]: string } = {'_lang' : 'en', '_lastSearch' : '','_totalResults': ''};
  private _lang: string;
  private _lastSearch: string;

  constructor(
    readonly http:HttpClient
  ) 
  {
    console.log('Books Service is running.')
    const storedDataLastRequest = localStorage.getItem('lastRequest');
    const storedDataViewHistory = localStorage.getItem('viewHistory');
    const storedBooksReviewsConfig = localStorage.getItem('booksReviewsConfig');
    if (storedDataLastRequest && storedDataLastRequest !== "undefined") {
      this._response = JSON.parse(storedDataLastRequest);
    } else {
      this._response = [];
    }
    if (storedDataViewHistory && storedDataViewHistory !== "undefined") {
      this._viewsHistory = JSON.parse(storedDataViewHistory);
    } else {
      this._viewsHistory = [];
    }
    if(storedBooksReviewsConfig && storedBooksReviewsConfig !== "undefined") {
      this._configs = JSON.parse(storedBooksReviewsConfig); 
    }
    this._lang = this._configs['_lang'];
    this._lastSearch = this._configs['_lastSearch'];
    this._totalResults = Number(this._configs['_totalResults']);
  }
  get response(): Book[] {
    return this._response;
  }
  get booksViewed(): Book[] {
    return this._viewsHistory;
  }
  get language(): string {
    return this._lang;
  }
  get lastSearch(): string {
    return this._lastSearch;
  }
  get totalResults(): number {
    return this._totalResults;
  }
  search(query: string, by: number): void {
    this._query = query.trim().toLowerCase();
    this._lastSearch = this._query;
    this._configs['_lastSearch'] = this._query;
    this._by = by;
    this._index = 0;
    this._page = 0;
    const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })
    .subscribe( (response) => {
      this._response = response.items;
      this._totalResults = response.totalItems;
      this._configs['_totalResults'] = String(response.totalItems);
      console.log(response);
      localStorage.setItem('lastRequest', JSON.stringify(this._response));
      localStorage.setItem('booksReviewsConfig', JSON.stringify(this._configs));
    });
  }
  nextPage(): void {
    this._index = this._page===Math.ceil(this._totalResults/this._maxResults) ? 0 : this._index+this._maxResults;
    this._page = this._page===Math.ceil(this._totalResults/this._maxResults) ? 0 : this._page+1;
    const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })
      .subscribe( (response) => {
      this._response = response.items;
    });
  }
  previusPage(): void {
    this._index=this._page===0?Math.ceil(this._totalResults/this._maxResults):this._index-this._maxResults;
    this._page = this._page===Math.ceil(this._totalResults/this._maxResults) ? 0 : this._page-1;
    const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })    
      .subscribe( (response) => {
      this._response = response.items;
    });
  }
  setMaxResults(n: number): void {
    this._maxResults = n;
  }
  setLang(l: string):void {
    this._lang = l;
    this._configs['_lang'] = l;
    localStorage.setItem('booksReviewsConfig', JSON.stringify(this._configs));
  }
  saveBookViewed(b: Book): void {
    this._viewsHistory = this._viewsHistory.filter(book => book.id !== b.id);
    this._viewsHistory.unshift(b);
    if (this._viewsHistory.length > 20) {
      this._viewsHistory.splice(20);
    }
    localStorage.setItem('viewHistory', JSON.stringify(this._viewsHistory));
  }
}
