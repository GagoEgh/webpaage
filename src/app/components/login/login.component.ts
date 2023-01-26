import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { trimRequired } from 'src/app/helpers/helperValidator';
import { IHttpResponse } from 'src/app/models/httpResponse';
import { LoginDTO } from 'src/app/models/loginDTO';
import { ILoginResponse } from 'src/app/models/loginResponse';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loginForm!: FormGroup;
  httpErroeMessages: string[] = [];
  subject$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) { }
 

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    this.loginForm = this._fb.group({
      email: ['', [trimRequired, Validators.pattern(email)]],
      password: ['', [trimRequired, Validators.minLength(8)]]
    })
  }


  getFormControl(formControl:string){
    return this._authService.getFormControl(this.loginForm,formControl)
  }

  getEmailErrore(): string | null {
    return this._authService.getEmailErrore(this.loginForm)
  }

  getPasswordErrore(): string | null {
    return this._authService.getPasswordErrore(this.loginForm)
  }


  onLogin() {

    if (this.loginForm.invalid) {
      return
    }

    const data = new LoginDTO(this.loginForm);
    this._authService.loginUser(data)
      .pipe(takeUntil(this.subject$))
      .subscribe({
        next: (res: IHttpResponse<ILoginResponse>) => {
          localStorage.setItem('accessToken', res.data.accessToken)
          this.httpErroeMessages = []
        },
        error: (err: string[]) => {
          this.httpErroeMessages = err;
        }
      })



  }


  goToRegister() {
    this.router.navigate(['/register'])
  }

  goToCreate() {
    this.router.navigate(['/create-password'])
  }

  ngOnDestroy(): void {
   this.subject$.next();
   this.subject$.complete();
  }
}
