const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTrips, createTrip, joinTrip } = require('../controllers/tripController');

router.get('/', getTrips);             
router.post('/', auth, createTrip);    
router.post('/:id/join', auth, joinTrip); 

module.exports = router;
