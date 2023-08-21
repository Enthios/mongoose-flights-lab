var express = require('express');
var router = express.Router();

const flightsCtrl = require('../controllers/flights')


router.post('/', flightsCtrl.create);

router.get('/', flightsCtrl.index);

router.get('/new', flightsCtrl.new);

router.get('/:id', flightsCtrl.show);

router.delete('/:id', flightsCtrl.delete);

module.exports = router;
