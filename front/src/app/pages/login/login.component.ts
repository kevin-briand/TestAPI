import {Component} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public userForm: FormGroup;
  public error = '';

  constructor(private router: Router, public userService: UsersService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [
        '',
          [Validators.required]
        ],
      password: [
        '',
        [Validators.required]
      ]
    });
    if(this.userService.user.token && this.userService.user.token !== '') {
      this.router.navigate(['/note']);
    }
  }


  onValid() {
    this.userService.login(this.userForm.value).subscribe({
      next :(user) => {
        this.userService.user.token = user.token;
        this.userService.clearPassword();
        this.router.navigate(['/note']); },
      error: (error) => {
        this.error = error.error.message; }
    });
  }
}
