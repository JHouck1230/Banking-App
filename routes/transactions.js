'use strict';

var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');

router.get('/', function(req, res) {
	Transaction.get(function(err, transactions) {
		if(err) return res.status(400).send(err);
		res.send(transactions);
	});
});

router.post('/', function(req, res) {
	var newTrans = req.body;
	Transaction.create(newTrans, function(err) {
		if(err) return res.status(400).send(err);
		res.send();
	});
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Transaction.delete(id, function(err) {
		if(err) return res.status(400).send(err);
		res.send();
	});
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	var transObj = req.body;
	Transaction.edit(id, transObj, function(err, updatedTrans) {
		if(err) return res.status(400).send(err);
		res.send(updatedTrans);
	});
});

module.exports = router;