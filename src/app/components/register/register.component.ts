import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trimRequired } from 'src/app/helpers/helperValidator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  hide = true;
  constructor(
    private _fb:FormBuilder,
    private _authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.initRegisterForm()
  }

  initRegisterForm(){
    const email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    this.registerForm = this._fb.group({
      firstName: ['', [trimRequired,]],
      lastName: ['', [trimRequired,]],
      email: ['', [trimRequired, Validators.pattern(email)]],
      password: ['', [trimRequired, Validators.minLength(8)]]
    })

  }

  getFormControl(formControl:string){
    return this._authService.getFormControl(this.registerForm,formControl)
  }

  getEmailErrore(): string | null {
    return this._authService.getEmailErrore(this.registerForm)
  }

  getPasswordErrore(): string | null {
    return this._authService.getPasswordErrore(this.registerForm)
  }


  onRegister(){}
}
