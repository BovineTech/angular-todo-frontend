import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { loginUser, loginUserSuccess, loginUserFailure, registerUser, registerUserSuccess, registerUserFailure, emptyAction, getUser } from './Auth.Action';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  // constructor(private actions$: Actions, private authService: AuthService) {}

  actions$ = inject(Actions);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  _registerUser = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap(action =>
        this.authService.register(action).pipe(
          switchMap(response => {
            return of(
              localStorage.setItem('token', response.token),
              this.Showalert("Register Successfully.", "pass"),
              this.router.navigate(['/login']),
              registerUserSuccess({ user: response.user })
            );
        }),
          catchError(error => of(
            this.Showalert("Register Failed.", "fail"),
            registerUserFailure({ error: error.message })
          ))
        )
      )
    )
  );

  _loginUser = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(action =>
        this.authService.login(action).pipe(
          switchMap(response => {
            return of(
              localStorage.setItem('token', response.token),
              this.Showalert("Login Successfully.", "pass"),
              this.router.navigate(['/dashboard']),
              loginUserSuccess({ user: response.user }),
          );
        }),
          catchError(error => of(
            this.Showalert("Login Failed.", "fail"),
            loginUserFailure({ error: error.message })
          ))
        )
      )
    )
  );

  // _getUser = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getUser),
  //     switchMap(action =>
  //       this.authService.login(action).pipe(
  //         switchMap(response => {
  //           return of(
  //             localStorage.setItem('token', response.token),
  //             this.Showalert("Login Successfully.", "pass"),
  //             this.router.navigate(['/dashboard']),
  //             loginUserSuccess({ user: response.user }),
  //         );
  //       }),
  //         catchError(error => of(
  //           this.Showalert("Login Failed.", "fail"),
  //           loginUserFailure({ error: error.message })
  //         ))
  //       )
  //     )
  //   )
  // );

  Showalert(message: string, response: string) {
      if (response == "pass") {
        this.toastr.success(message);
      } else {
        this.toastr.error(message);
      }
      return emptyAction();
    }
}
