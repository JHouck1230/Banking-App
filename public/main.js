'use strict';

var app = angular.module('bankApp', []);

app.controller('mainCtrl', function($scope, $http) {
	$scope.transactions = [];

	loadTrans();
	function loadTrans() {
		$http({
			url: '/transactions'
		})
		.then(function(res) {
			$scope.transactions = res.data;
		}, function(err) {
			console.error(err);
		});
	};

	$scope.addTrans = function() {
		var transaction = angular.copy($scope.newTrans);
		$http({
			url: '/transactions',
			method: 'POST',
			data: 
			{
				date: $scope.newTrans.date,
				desc: $scope.newTrans.desc,
				credit: $scope.newTrans.credit,
				debit: $scope.newTrans.debit,
				editing: false
			}
		})
		.then(function(res) {
			$scope.transactions.unshift(transaction);
		}, function(err) {
			console.error(err);
		});
	};

	$scope.removeTrans = function(transaction) {
		$http({
			url: `/transactions/${transaction.id}`,
			method: 'DELETE'
		})
		.then(function(res) {
			$scope.transactions.splice($scope.transactions.indexOf(transaction), 1);
		});
	};

	$scope.editTrans = function(transaction) {
		transaction.editing = true;
	}

	$scope.submitEdit = function(transaction) {
		transaction.editing = false;
		var index = $scope.transactions.indexOf(transaction);
		$scope.transactions[index].date = transaction.date;
		$scope.transactions[index].desc = transaction.desc;
		$scope.transactions[index].credit = transaction.credit;
		$scope.transactions[index].debit = transaction.debit;
		$http({
			url: `/transactions/${transaction.id}`,
			method: 'PUT',
			data:
			{
				date: transaction.date,
				desc: transaction.desc,
				credit: transaction.credit,
				debit: transaction.debit
			}
		})
		.then(function(res) {
		}, function(err) {
			console.error(err);
		});
	};

	$scope.getBalance = function() {
		var trans = $scope.transactions;
		var balance = 0;
		for(var i = trans.length; i > 0; i--) {
			if(trans[i].credit)	balance += trans[i].credit;
			if(trans[i].debit) balance += trans[i].debit;
			return balance;
			balances.push(balance);
		};
	};

});













