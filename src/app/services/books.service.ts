import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BooksResponse } from '../interfaces/books-response.interface';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _apiKey: string = 'AIzaSyAHyTITutAZFqmLCCCe8pCi603PAMnNBoM';
  private _apiUri: string = 'https://www.googleapis.com/books/v1/volumes?';
  private readonly _searchBy: { [key: number]: string } = {1:'intitle:',2:'inauthor:',3:'isbn:'};
  private _response: Book[] = [];
  private _viewsHistory: Book[] = [];
  private _query: string = '';
  private _by: number = 0;
  private _index = 0;
  private _maxResults: number = 20;
  private _totalResults: number = -1;
  private _page: number = 1;
  private _configs: { [key: string]: string } = {'_lang' : 'en', '_lastSearch' : '','_totalResults': '-1', '_by': '1'};
  private _lang: string;
  private _lastSearch: string;
  private _bookSelected?: Book;

  constructor(
    readonly http:HttpClient
  ) 
  {
    console.log('Books Service is running.');
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
    this._by = Number(this._configs['_by']);
    this._query = this._lastSearch;
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
  get index(): number {
    return this._index;
  }
  get bookSelected(): Book {
    return this._bookSelected!;
  } 
  get page(): number {
    return this._page;
  }
  search(query: string, by: number): void {
    this._query = query.trim().toLowerCase();
    this._configs['_lastSearch'] = this._query;
    this._by = by;
    this._configs['_by'] = String(this._by);
    this._index = 0;
    this._page = 1;
    const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks')
      .set('printType', 'books');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })
    .subscribe( (response) => {
      this._response = response.items;
      this._totalResults = response.totalItems;
      this._configs['_totalResults'] = String(response.totalItems);
      this._lastSearch = this._query;
      console.log(response);
      localStorage.setItem('lastRequest', JSON.stringify(this._response));
      localStorage.setItem('booksReviewsConfig', JSON.stringify(this._configs));
    });
    //console.log('last serach'+this._query+' '+'Search by'+this._searchBy[this._by]);
  }
  nextPage(): void {
    console.log('Index antes:'+this._index + 'total de pages: '+Math.ceil(this._totalResults/this._maxResults));
    console.log('Pague antes: '+this._page);
    this._index = this._page===Math.ceil(this._totalResults/this._maxResults) ? 0 : this._index+this._maxResults;
    this._page = this._page===Math.ceil(this._totalResults/this._maxResults) ? 1 : this._page+1;
    console.log('Index despues:'+this._index);
    console.log('Pague despues: '+this._page);
    const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks')
      .set('printType', 'books');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })
      .subscribe( (response) => {
      this._response = response.items;
      console.log(response);
    });
    //console.log('last serach'+this._query+' '+'Search by'+this._searchBy[this._by]);
  }
  loadMoreBooks(): void {
    this._index += this._maxResults;
    if(this._page!== 0) {
      this._page = this._page===Math.ceil(this._totalResults/this._maxResults) ? 0 : this._page+1;
      const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks')
      .set('printType', 'books');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })
      .subscribe( (response) => {
      if(response && Array.isArray(response.items)) {
        this._response.push(...response.items);
        console.log(response);
      }
    });
    }
  }
  previusPage(): void {
    this._index=this._page===1?Math.ceil(this._totalResults/this._maxResults):this._index-this._maxResults;
    this._page = this._page===Math.ceil(this._totalResults/this._maxResults) ? 1 : this._page-1;
    const params = new HttpParams()
      .set('startIndex', this._index.toString())
      .set('maxResults', this._maxResults.toString())
      .set('langRestrict', this._lang)
      .set('projection', 'full')
      .set('orderBy', 'relevance')
      .set('key', this._apiKey)
      .set('filter', 'ebooks')
      .set('printType', 'books');
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._searchBy[this._by]}${this._query}`, { params })    
      .subscribe( (response) => {
      this._response = response.items;
      console.log(response);
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
    this._bookSelected = b;
    this._viewsHistory = this._viewsHistory.filter(book => book.id !== b.id);
    this._viewsHistory.unshift(b);
    if (this._viewsHistory.length > 15) {
      this._viewsHistory.splice(15);
    }
    localStorage.setItem('viewHistory', JSON.stringify(this._viewsHistory));
  }
}
