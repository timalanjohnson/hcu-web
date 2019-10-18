const express = require('express');

const router = express.Router();

var blankUser = [
		{uid: '', name: '', email: '', phone: ''}
	];	



// Index Page
router.get('/', (req, res) => {
	
	var db = require('../db.js');

	db.query("SELECT * FROM tbl_horse", function(err, result, fields) {
		if (err) throw err;

		console.log(result);
	
	res.render('index', {title: 'HCU Web', horses: result});
	});
});



// Horse Details Page
router.get('/horse/:horseID', function(req, res) {
	
	var horseID = req.params.horseID;

	// Select * where horseID = the value
	var horseInfo = {
		id: horseID,
		description: 'Brown male',
		date: '17-June-2019',
		condition: 'Recovering from a broken ankle.',
		treatment: '2 shots of HorsePanado at 9am every other day.',
		carer: 'Tim Johnson',
		notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	};

	res.render('horse', {
		title: "Horse "+horseID,
		horse: horseInfo
	});
});








// Add Horse Page
router.get('/add-horse', (req, res) => {
	res.render('add-horse', {title: 'Add Horse'});
});


router.post('/add-horse', (req, res) => {
			var db = require('../db.js');																																													//`HorseID`, `Age`,`Note`, 											`AdmissionDate`, 		`mircochipCode` ,					 `Breed`, 				`Colour`,					  `Gender`, 					`Weight`,  					`Height`, 					`FoundBy`,			`HorseCondition`, 			`treatment`
	db.query("INSERT INTO `tbl_horse` (`HorseID`, `Age`,`Note`, `AdmissionDate`, `mircochipCode` , `Breed`, `Colour`,  `Gender`, `Weight`,  `Height`, `FoundBy`, `HorseCondition`, `treatment`) VALUES (NULL, '" + req.body.age + "', '" + req.body.notes + "', '" + req.body.date + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height + "', '" + req.body.finder + "', '" + req.body.condition + "', '" + req.body.treatment + "');", function (err) {
		if (err) throw err
	})
	
	
	res.render('add-horse', {title: 'HCU Web'});

	console.log(req.body);

});





// Edit Horse Page
router.get('/edit-horse', (req, res) => {
	res.render('edit-horse', {title: 'Edit Horse'});
});







// users Page
router.get('/users', (req, res) => {

	try {
		var db = require('../db.js');

		db.query("SELECT * FROM tbl_user", function(err, result, fields) {
			if (err) throw err;

			console.log(result);

			res.render('users', {title: 'Users', data: result});
		});
	} catch (error) {
		console.log(error);
		res.render('404', {title: 'Users'});
	}

});



router.post('/users', (req, res) => {
	//res.render('users', {title: 'HCU Web'});

	console.log(req.body);

	var db = require('../db.js');

	db.query("INSERT INTO `tbl_users` (`uid`, `name`, `email`, `pass`, `phone`) VALUES (NULL, '" + req.body.name + "', '" + req.body.email + "', '" + req.body.password + "', '" + req.body.phone + "');", function (err) {
		if (err) throw err
	})

	db.query("SELECT * FROM tbl_users", function(err, result, fields) {
		if (err) throw err;

		res.render('users', {title: 'Users', data: result});
	});

});








// Reports Page
router.get('/reports', (req, res) => {
	res.render('reports', {title: 'Reports'});
});








// Login Page
router.get('/login', (req, res) => {
	res.render('login', {title: 'Login'});
});

module.exports = router;