import { HttpErrorResponse } from '@angular/common/http';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Site } from '../../interfaces/charts.interface';
import { ApiActions } from '../actions';

export interface SiteState {
  id: string;
  status: String;
  data: Site;
  error: HttpErrorResponse;
}

export interface State extends EntityState<SiteState> {
  selectedSiteId: string | null;
  lastTimeStamp: number | null;
  error: HttpErrorResponse | null;
}

export function selectSiteId(a: SiteState): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export const adapter: EntityAdapter<SiteState> = createEntityAdapter<SiteState>({
  selectId: selectSiteId,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedSiteId: 'siteA',
  lastTimeStamp: null,
  error: null
});

export const chartsReducer = createReducer(
  initialState,
  on(ApiActions.getTimeStampResponse,
    (state, { site, payload, interval }) => {
      return {
        ...state,
        selectedSiteId: site,
        lastTimeStamp: payload.lastTimeStamp,
        error: null
      };
  }),
  on(ApiActions.getTimeStampError,
    (state, { site, error }) => {
      return {
        ...state,
        selectedSiteId: site,
        error
      };
  }),
  // That reducer action is here to transfer the error at the good emplacement (With real data it should not be necessary since another store would handle server connexions)
  on(ApiActions.getTimeStampError,
    (state, { site, error }) => {
      return adapter.upsertOne(buildSiteState(site, state.entities[site] ? state.entities[site].data : null, error), state);
  }),
  on(ApiActions.updateSiteResponse,
    (state, { site, payload }) => {
      return adapter.upsertOne(buildSiteState(site, payload, null), state);
  }),
  on(ApiActions.updateSiteError,
    (state, { site, error }) => {
      return adapter.upsertOne(buildSiteState(site, state.entities[site] ? state.entities[site].data : null, error), state);
  })
);

function buildSiteState(site: string, data?: Site | null, error?: HttpErrorResponse | null) {
  return <SiteState>{
    id: site,
    status: error ? 'error': 'ready',
    data,
    error
  }
}

export const getSelectedSiteId = (state: State) => state.selectedSiteId;
export const getActualTimeStamp = (state: State) => state.lastTimeStamp;
export const getError = (state: State) => state.error;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of site ids
export const selectSiteIds = selectIds;

// select the dictionary of site entities
export const selectSiteEntities = selectEntities;

// select the array of sites
export const selectAllSites = selectAll;

// select the total site count
export const selectSiteTotal = selectTotal;
