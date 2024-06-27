import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trip } from '../models/trips';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient,
              @Inject(BROWSER_STORAGE) private storage: Storage) {}

  private tripsUrl = 'http://localhost:3000/api/trips';
  private baseUrl = 'http://localhost:3000/api';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl).pipe(
      catchError(this.handleError)
    );
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripsUrl}/${tripCode}`).pipe(
      catchError(this.handleError)
    );
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${formData.code}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  public makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.baseUrl}/${urlPath}`;
    console.log(`Making auth API call to ${url} with user:`, user); // Debugging log
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  // public async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
  //   const url: string = `${this.baseUrl}/${urlPath}`;
  //   console.log(`Making auth API call to ${this.baseUrl} with user:`, user);
  //   try {
  //     const response = await firstValueFrom(this.http.post<AuthResponse>(url, user));
  //     console.log('AUTH API CALL', response);
  //     return response;
  //   } catch (error) {
  //     console.error('An error occurred', error);
  //     throw new Error('Error occurred while making auth API call');
  //   }
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
