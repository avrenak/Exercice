import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Site, TimeStamp } from "../../interfaces/charts.interface";


const feature = "Charts Page";

export const getTimeStampRequest = createAction(
  `[${feature}] getTimeStampRequest`,
  props<{ site: string, interval: number }>()
);

export const getTimeStampResponse = createAction(
  `[${feature}] getTimeStampResponse`,
  props<{ site: string, payload: TimeStamp, interval: number}>()
);

export const getTimeStampError = createAction(
  `[${feature}] getTimeStampError`,
  props<{ site: string, error: HttpErrorResponse}>()
);

export const updateSiteRequest = createAction(
  `[${feature}] updateSiteRequest`,
  props<{ site: string, firstTimeStamp: number}>()
);

export const updateSiteResponse = createAction(
  `[${feature}] updateSiteResponse`,
  props<{ site: string, payload: Site}>()
);

export const updateSiteError = createAction(
  `[${feature}] updateSiteError`,
  props<{ site: string, error: HttpErrorResponse}>()
);
