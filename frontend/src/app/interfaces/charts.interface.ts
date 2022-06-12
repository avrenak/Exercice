
export interface Site {
  id: String;
  name: String;
  unit: String;
  trafficOut: [number, number][];
}

export interface TimeStamp {
  id: String;
  lastTimeStamp: number;
}
