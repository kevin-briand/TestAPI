import { Component } from '@angular/core';
import {Note} from "../../model/note";
import {NotesService} from "../../service/notes.service";
import {UsersService} from "../../service/users.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes!: Note[];
  error!: string;


  constructor(private noteService: NotesService, private userService: UsersService) {
    this.notes = [];
    this.noteService.getNotes().subscribe({
      next :(value) => {
        this.notes = value;
      },
      error: (error) => {
        this.error = this.userService.hasError(error.error.message); }
    });
  }
}
