import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { NASA } from './nasa';
import { nasas } from './mock-nasa';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  getNasa(date = null): Observable<NASA> {
    if (!date) {
      date = this.randomDate(new Date(1995,5,16), new Date());
    }
    var key = 'c6S6BLrhl1HmY7nxqtFgorHBQwXCXviMSQNY4m7L';
    var nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
    return this.http.get<NASA>(nasaURL)
    .pipe(
      tap(_ => console.log(`fetched nasa object date=${date}`)),
      catchError(this.handleError<NASA>(`getNasa Date=${date}`))
    );
  }

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  randomDate(start: Date, end: Date): string {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    //let date = new Date(2015,4,27);

    return new Date(date).toISOString().slice(0,10);
  }
}
