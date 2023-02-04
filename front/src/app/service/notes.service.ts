import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Note} from "../model/note";
import {Header} from "../model/header";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _urlNotes = 'http://localhost:8000/api/notes';

  constructor(private http: HttpClient, public usersService: UsersService) { }

  getNotes(): Observable<any> {
    return this.http.get<any>(this._urlNotes, new Header());
  }

  addNote(note: Note): Observable<any> {
    let header = new Header();
    console.log(note);
    return this.http.post<any>(this._urlNotes, note, header);
  }
}
