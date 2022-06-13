import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromCharts from '../reducers/charts-reducer';

export interface State {
  users: fromCharts.State;
}

export const reducers: ActionReducerMap<State> = {
  users: fromCharts.chartsReducer,
};

export const selectChartState = createFeatureSelector<fromCharts.State>('charts');

//#region Charts Entity Selectors
export const selectChartIds = createSelector(
  selectChartState,
  fromCharts.selectSiteIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);

export const selectChartEntities = createSelector(
  selectChartState,
  fromCharts.selectSiteEntities
);

export const selectAllUsers = createSelector(
  selectChartState,
  fromCharts.selectAllSites
);

export const selectUserTotal = createSelector(
  selectChartState,
  fromCharts.selectSiteTotal
);
//#endregion

//#region Charts Additional Selectors
export const selectCurrentSiteId = createSelector(
  selectChartState,
  fromCharts.getSelectedSiteId
);

export const selectCurrentTimeStamp = createSelector(
  selectChartState,
  fromCharts.getActualTimeStamp
);

export const selectTimeStampError = createSelector(
  selectChartState,
  fromCharts.getError
);

export const selectCurrentSite = createSelector(
  selectChartEntities,
  selectCurrentSiteId,
  (siteEntities, siteId) => siteId && siteEntities[siteId]
);
//#endregion
