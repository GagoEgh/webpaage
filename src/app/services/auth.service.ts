import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';


import { IHttpResponse } from '../models/httpResponse';
import { LoginDTO } from '../models/loginDTO';
import { ILoginResponse } from '../models/loginResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiURL;
  constructor(
    private _http: HttpClient
  ) { }

  loginUser(data: LoginDTO) {
    return this._http.post<IHttpResponse<ILoginResponse>>( `${this.apiURL}/auth/login`, data)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw err.error.error.message
        }),
      )
  }

  getFormControl(form:FormGroup,formControl: string) {
    return form.get(formControl)
  }


  getEmailErrore(form: FormGroup) {
    const email = form.get('email');
    if (email?.hasError('trimRequired')) {
      return 'You must enter a value';
    } else if (email!.errors!["pattern"]) {
      return 'Not a valid email'
    }
    return null
  }

  getPasswordErrore(form: FormGroup) {
    const password = form.get('password');
    if (password?.hasError('trimRequired')) {
      return 'You must enter a value';
    } else if (password?.hasError('minlength')) {
      return 'password must be longer than or equal to 8 characters'

    }
    return null
  }

}
