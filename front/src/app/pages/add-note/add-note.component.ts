import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotesService} from "../../service/notes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  note: FormGroup;
  error: string ='';

  constructor(private router: Router, private fb: FormBuilder, private noteService: NotesService) {
    this.note = this.fb.group({
      title: [
        '',
        [Validators.required]
      ],
      content: [
        '',
        [Validators.required]
      ]
    });
  }

  saveNote() {
    this.noteService.addNote(this.note.value).subscribe({
      next: () => {
        this.router.navigate(['/note']);
      },
      error: (error) => {
        this.error = error.error.message;
      }
    })
  }
}
