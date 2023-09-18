import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BooksResponse } from '../interfaces/books-response.interface';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _apiKey: string = 'AIzaSyAHyTITutAZFqmLCCCe8pCi603PAMnNBoM';
  private _apiUri: string = 'https://www.googleapis.com/books/v1/volumes?';
  private readonly _searchBy: { [key: number]: string } = {0:'',1:'+intitle',2:'+inauthor',3:'+inpublisher',4:'+subject',5:'+isbn'};
  private _response: Book[] = [];
  private _query: string = '';
  private _by: number = 0;
  private _index = 0;
  private _maxResults: number = 10;
  private _totalResults: number = 0;

  constructor(
    readonly http:HttpClient
  ) 
  {
    console.log('Books Service is running.')
    const storedData = localStorage.getItem('lastRequest');
    if (storedData && storedData !== "undefined") {
        this._response = JSON.parse(storedData);
    } else {
        this._response = [];
    }
  }
  get response(): Book[] {
    return [...this._response];
  }
  search(query: string, by: number): void {
    this._query = query.trim().toLowerCase();
    this._by = by;
    this._index=0;
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._query}${this._searchBy[this._by]}&startIndex=${this._index}&maxResults=${this._maxResults}&projection=full&orderBy=relevance&key=${this._apiKey}`)
    .subscribe( (response) => {
      this._response = response.items;
      this._totalResults = response.totalItems;
      localStorage.setItem('lastRequest', JSON.stringify(this._response));
    });
  }
  nextPage(): void {
    this._index=this._index===Math.ceil(this._totalResults/this._maxResults)?0:this._index+this._maxResults;
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._query}${this._searchBy[this._by]}&startIndex=${this._index}&maxResults=${this._maxResults}&projection=full&orderBy=relevance&key=${this._apiKey}`)
    .subscribe( (response) => {
      this._response = response.items;
      localStorage.setItem('lastRequest', JSON.stringify(this._response));
    });
  }
  previusPage(): void {
    this._index=this._index===0?Math.ceil(this._totalResults/this._maxResults):this._index-this._maxResults;
    this.http.get<BooksResponse>(`${this._apiUri}q=${this._query}${this._searchBy[this._by]}&startIndex=${this._index}&maxResults=${this._maxResults}&projection=full&orderBy=relevance&key=${this._apiKey}`)
    .subscribe( (response) => {
      this._response = response.items;
      localStorage.setItem('lastRequest', JSON.stringify(this._response));
    });
  }
  setMaxResults(n: number): void {
    this._maxResults = n;
  }
}
