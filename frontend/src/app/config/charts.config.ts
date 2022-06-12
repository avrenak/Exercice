export interface SiteAvailable {
  value: string;
  viewValue: string;
}

export interface ChartsConfig {
    id: number;
    title: string;
    color: string;
    interval: number;
}

export const SITES_AVAILABLES: SiteAvailable[] = [
  {
    value: 'siteA',
    viewValue: 'Site A'
  },
  {
    value: 'siteB',
    viewValue: 'Site B'
  }
];

export const CHARTS_INTERVALS = [
  {
    label: '1 hour',
    value: 300*12 -300
  },
  {
    label: '6 hour',
    value: 300*12*6 -300
  },
  {
    label: '12 hour',
    value: 300*12*12 -300
  },
  {
    label: '1 day',
    value: 300*12*24 -300
  },
  {
    label: '1 week',
    value: 300*12*24*7 -300
  },
  {
    label: '5 week',
    value: 300*12*24*7*5 -300
  },
];

export const CHARTS_CONFIG: ChartsConfig[] = [
  {
    id: 1,
    title: 'Blue chart',
    color: '#0000FF',
    interval: CHARTS_INTERVALS[1].value
  },
  {
    id: 2,
    title: 'Red chart',
    color: '#FF0000',
    interval: CHARTS_INTERVALS[1].value
  },
];
