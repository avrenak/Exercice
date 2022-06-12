'use strict';
const express = require('express')
const router = express.Router()
const trafic = require('../controllers/traficController');  

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('New request at : ', Date.now())
  next()
})
// define the route
router.get('/:siteId/traffic/:timestamp', trafic.getData);
router.get('/:siteId/timestamp', trafic.getLastTimeStamp);

module.exports = router;
