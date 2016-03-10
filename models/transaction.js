'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var transFilePath = path.join(__dirname, '../data/transactions.json');

exports.get = function(cb) {
	fs.readFile(transFilePath, function(err, data) {
		if(err) return cb(err);
		var transactions = JSON.parse(data);
		cb(null, transactions);
	});
};

exports.write = function(transactions, cb) {
	fs.writeFile(transFilePath, JSON.stringify(transactions), cb);
};

exports.create = function(newTrans, cb) {
	this.get((err, transactions) => {
		if(err) return cb(err);
		newTrans.id = uuid();
		transactions.unshift(newTrans);
		this.write(transactions, cb);
	});
};

exports.delete = function(id, cb) {
	this.get((err, transactions) => {
		if(err) return cb(err);
		var length = transactions.length;
		var transaction = transactions.find((transaction) => transaction.id === id);
		transactions.splice(transactions.indexOf(transaction), 1);
		if(length === transactions.length) return cb({err: "Transaction not found."});
		this.write(transactions, cb);
	});
};

exports.edit = function(id, transObj, cb) {
	this.get((err, transactions) => {
		if(err) return cb(err);
		var updatedTrans;
		transactions = transactions.map((transaction) => {
			if(transaction.id === id) {
				for(var key in transObj) {
					transaction[key] = transObj[key];
				}
				updatedTrans = transaction;
			}
			return transaction;
		});
		if(!updatedTrans) return cb({err: "Transaction not found."});
		this.write(transactions, function(err, updatedTrans) {
			cb(err, updatedTrans);
		});
	});
};
