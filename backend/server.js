const SiteData = require('./api/models/dataModel');  
var siteRouter = require('./api/routes/traficRoute');

const cors = require('cors'); 
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


app.locals.siteA = new SiteData('siteA','A');
app.locals.siteB = new SiteData('siteB','B');

function intervalFunc() {
  app.locals.siteA.simulateNewData()
  app.locals.siteB.simulateNewData()
  console.log('New Tick : '+ Date.now())
  console.log('Site A at TimeStamp : '+app.locals.siteA.actualTimeStamp);
  console.log('Site B at TimeStamp : '+app.locals.siteB.actualTimeStamp);
}

setInterval(intervalFunc, 5000);

app.use(cors());
app.use('/api', siteRouter);

app.listen(port);

console.log('site list RESTful API server started on: ' + port);