import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { loginUser, loginUserSuccess, loginUserFailure, registerUser, registerUserSuccess, registerUserFailure } from './auth.actions';
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  // constructor(private actions$: Actions, private authService: AuthService) {}

  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);

  _registerUser = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap(action =>
        this.authService.register(action).pipe(
          map(response => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/login']);
            return registerUserSuccess({user: response.user });
        }),
          catchError(error => of(registerUserFailure({ error: error.message })))
        )
      )
    )
  );

  _loginUser = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(action =>
        this.authService.login(action).pipe(
          map(response => {
            this.router.navigate(['/todo']);
            return loginUserSuccess({ user: response.user });
        }),
          catchError(error => of(loginUserFailure({ error: error.message })))
        )
      )
    )
  );
}
