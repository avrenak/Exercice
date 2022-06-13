'use strict';

class SiteData {
  constructor(siteName, unit) {
    this.id = siteName;
    this.name = siteName;
    this.unit = unit;
    this.startTimeStamp = 1513317300;
    this.actualTimeStamp = 1513326600;
    this.timeStep = 300;
    this.serverDown = false;
    this.timerMax = 2;
    this.timer = 0;
    this.latency = Math.round(Math.random() * 2500);
    this.actualTime = Date.now();
    if (unit == "A") {
      this.trafficOut = [
        [1513317300, 1.580871e7],
        [1513317600, 1.8250857e7],
        [1513317900, 1.828695e7],
        [1513318200, 1.65333e7],
        [1513318500, 1.1644161e7],
        [1513318800, 1.5770108e7],
        [1513319100, 1.4723047e7],
        [1513319400, 1.8022973e7],
        [1513319700, 1.3029339e7],
        [1513320000, 1.2285157e7],
        [1513320300, 1.3361887e7],
        [1513320600, 1.4965938e7],
        [1513320900, 1.3414628e7],
        [1513321200, 7957002.0],
        [1513321500, 1.8709932e7],
        [1513321800, 1.1922771e7],
        [1513322100, 1.8668679e7],
        [1513322400, 1.0042006e7],
        [1513322700, 1.3052254e7],
        [1513323000, 1.331797e7],
        [1513323300, 1.6754996e7],
        [1513323600, 2.1649881e7],
        [1513323900, 1.2057137e7],
        [1513324200, 1.0091379e7],
        [1513324500, 1.3687574e7],
        [1513324800, 1.7810277e7],
        [1513325100, 1.3909706e7],
        [1513325400, 1.1239857e7],
        [1513325700, 8782854.0],
        [1513326000, 1.679404e7],
        [1513326300, 1.5461036e7],
        [1513326600, 1.2761615e7]
      ];
    } else {
      this.trafficOut = [
        [1513317300, 1.8556485e7],
        [1513317600, 1.4248009e7],
        [1513317900, 1.2257187e7],
        [1513318200, 1.483332e7],
        [1513318500, 1.464909e7],
        [1513318800, 1.0146488e7],
        [1513319100, 1.2832457e7],
        [1513319400, 1.1480795e7],
        [1513319700, 1.3817067e7],
        [1513320000, 1.4935482e7],
        [1513320300, 1.5888747e7],
        [1513320600, 1.318404e7],
        [1513320900, 1.3568399e7],
        [1513321200, 1.5899595e7],
        [1513321500, 1.5662291e7],
        [1513321800, 1.2093653e7],
        [1513322100, 1.356948e7],
        [1513322400, 1.8363615e7],
        [1513322700, 1.3748102e7],
        [1513323000, 3.1748609e7],
        [1513323300, 1.6637815e7],
        [1513323600, 1.4327862e7],
        [1513323900, 1.5209976e7],
        [1513324200, 1.9369333e7],
        [1513324500, 3.5995986e7],
        [1513324800, 4.4037128e7],
        [1513325100, 6.5199851e7],
        [1513325400, 6.3221009e7],
        [1513325700, 4.6071817e7],
        [1513326000, 8.7273395e7],
        [1513326300, 9.4439788e7],
        [1513326600, 7.9061637e7]
      ];
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getUnit() {
    return this.unit;
  }

  getServerDown() {
    return this.serverDown;
  }

  getLatency() {
    return this.latency;
  }

  getLastTimeStamp() {
    return this.actualTimeStamp;
  }

  findTimeStamp(timeStamp) {
    var tempStamp = this.actualTimeStamp;
    while(timeStamp <= tempStamp - this.timeStep) {
      tempStamp = tempStamp - this.timeStep;
    }
    return tempStamp;
  }

  simulateData(octets) {
    const oldData = octets;
    const newData = octets + (Math.round((Math.random() - 0.5)*Math.pow(10,7)));
    const change = newData - oldData;
    const middle = 60*1000*1000;
    if (newData > middle*1.5 && change > 0) {
      return oldData+change*(Math.round((Math.random() - 0.5)*2));
    } 
    if (newData < middle*0.5 && change < 0) {
      return oldData+change*(Math.round((Math.random() - 0.5)*2));
    } 
    return newData;
  }

  simulateOldData(timeStamp) {
    do {
      this.trafficOut = [[this.startTimeStamp - this.timeStep, this.simulateData(this.trafficOut[0][1])], ...this.trafficOut];
      this.startTimeStamp = this.startTimeStamp - this.timeStep;
    } while (timeStamp < this.startTimeStamp - this.timeStep);
  }

  simulateNewData() {
    if (Date.now() > this.actualTime + this.timeStep) {
      this.actualTimeStamp = this.actualTimeStamp + this.timeStep;
      this.trafficOut.push([this.actualTimeStamp, this.simulateData(this.trafficOut[this.trafficOut.length-1][1])]);
      this.actualTime = Date.now();

      if (this.serverDown == true) {
        if (this.timer < this.timerMax) {
          this.timer++;
        } else {
          this.serverDown = false;
          this.timer = 0;
        }
      } else {
        if (Math.random() > 0.93) {
          this.serverDown = true;
        } else {
          this.latency = Math.round(Math.random() * 2500);
        }
      }
    }
  }

  getFrom(timeStamp) {
    timeStamp = parseInt(timeStamp, 10);
    if (timeStamp <= this.startTimeStamp - this.timeStep) {
      this.simulateOldData(timeStamp);
      return this.trafficOut;
    } else {
      var timestampToFind = this.findTimeStamp(timeStamp);
      var index = this.trafficOut.findIndex(e => e[0] == timestampToFind );
      return this.trafficOut.slice(index);
    }
  }
}

module.exports = SiteData