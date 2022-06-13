'use strict';

exports.getData = (req, res) => {
  const siteId = req.params.siteId;
  var site = null;
  if (siteId == 'siteA') {
    site = req.app.locals.siteA;
  } else if (siteId == 'siteB') {
    site = req.app.locals.siteB;
  } 
    
  if (site) {
    console.log(`Front asked for ${site.getId()} timestamp ${req.params.timestamp} : Down (${site.getServerDown()}), Latency (${site.getLatency()})`);
    if (site.getServerDown()) {
    res.status(503).send('Site unavailable');
    } else {
      if (site.getLatency() > 1996) {
        setTimeout((() => {
          res.status(504).send('Site timeout (2 seconds)');
        }), 1996);
      } else {
        setTimeout((() => {
          res.json({
            "id": site.getId(),
            "name": site.getName(),
            "unit": site.getUnit(),
            "trafficOut": site.getFrom(req.params.timestamp)
          });
        }), site.getLatency());
      }
    }
  } else {
    res.status(403).send('Site forbidden');
  }

  
};

exports.getLastTimeStamp = (req, res) => {
  const siteId = req.params.siteId;
  var site = null;
  if (siteId == 'siteA') {
    site = req.app.locals.siteA;
  } else if (siteId == 'siteB') {
    site = req.app.locals.siteB;
  } 
    
  if (site) {
    res.json({
      "id": site.getId(),
      "lastTimeStamp": site.getLastTimeStamp()
    });
  } else {
    res.status(403).send('Site forbidden');
  }

  
};