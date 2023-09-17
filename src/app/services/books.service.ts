import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BooksResponse } from '../interfaces/books-response.interface';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _apiKey: string = 'AIzaSyAHyTITutAZFqmLCCCe8pCi603PAMnNBoM';
  private _apiUri: string = 'https://www.googleapis.com/books/v1/volumes?';
  private readonly _searchBy: { [key: number]: string } = {1:'intitle',2:'inauthor',3:'inpublisher',4:'subject',5:'isbn'} 
  private _response: Book[] = []

  constructor(
    readonly http:HttpClient
  ) 
  {
    this._response= JSON.parse(localStorage.getItem('lastRequest')!) || []; 
  }
  get response(): Book[] {
    return [...this._response];
  }
  search(query: string, by: number): void {
    query = query.trim().toLowerCase();
    this.http.get<BooksResponse>(`${this._apiUri}q=${query}+${this._searchBy[by]}:keyes&key=${this._apiKey}`)
    .subscribe( (response) => {
      console.log(response.books);
      this._response = response.books;
      localStorage.setItem('lastRequest', JSON.stringify(this._response));
    });
  }
  
}
