import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Site, TimeStamp } from '../../interfaces/charts.interface';
import { ApiActions } from '../actions';

@Injectable()
export class ChartsEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
  ) {}

  getTimestamp$ = createEffect(
    () => this.actions$
    .pipe(
      ofType(ApiActions.getTimeStampRequest),
      switchMap(
        (action) => this.http.get<TimeStamp>(`http://localhost:3000/api/${action.site}/timestamp`)
        .pipe(
          map(payload => ApiActions.getTimeStampResponse({site: action.site, payload, interval: action.interval})),
          catchError(error => of(ApiActions.getTimeStampError({site: action.site, error})))
        )
      )
    )
  );

  getTraffic$ = createEffect(
    () => this.actions$
    .pipe(
      ofType(ApiActions.getTimeStampResponse),
      mergeMap(
        (action) => {
          const firstTimeStamp = action.payload.lastTimeStamp - action.interval;
          return this.http.get<Site>(`http://localhost:3000/api/${action.site}/traffic/${firstTimeStamp}`)
          .pipe(
            map(payload => ApiActions.updateSiteResponse({site: action.site, payload})),
            catchError(error => of(ApiActions.updateSiteError({site: action.site, error})))
          )
        }
      )
    )
  );

}

