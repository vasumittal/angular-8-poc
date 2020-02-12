import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    addUser(userObj: User) {
        return this.http.post<any>(`${environment.apiUrl}/users`, { userObj })
            .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            // this.currentUserSubject.next(user);
            return user;
        }));
    }
    deleteUser(userId: number) {
        return this.http.delete<User[]>(`${environment.apiUrl}/users/${userId}`)
            .pipe(map(userId => {
            return userId;
        }));
    }
}