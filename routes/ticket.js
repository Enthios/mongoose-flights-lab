const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/ticket");

router.get("/flights/:id/ticket/new", ticketCtrl.new);

router.post("/flights/:id/ticket/new", ticketCtrl.create);

router.delete('/flights/:flightId/ticket/:ticketId', ticketCtrl.delete)


module.exports = router;
