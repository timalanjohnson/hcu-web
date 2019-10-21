const express = require('express');
const router = express.Router();

var session = [
		{active: 'true', user: 'Tom', userType: 'admin'}
	];



function isAuthenticated(req, res, next) {
	// Do checks

	if (session.active == "true"){
		return next();
	}

	res.redirect('/login');
}



// Index Page
router.get('/', isAuthenticated, (req, res) => {
	
	console.log(session);

	var db = require('../db.js');

	db.query("SELECT * FROM tbl_horse", function(err, result, fields) {
		if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
	});
	
});



//search Function
router.post('/search', isAuthenticated, (req, res) => {
	var db = require('../db.js');
	var UserSearch = req.body.search;
	if (UserSearch == '') {
		db.query("SELECT HorseID, Name, Age, Note, HorseCondition, DATE_FORMAT(AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse", function(err, result, fields) {
			if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
		});
	} else {
		db.query("SELECT HorseID, Name, Age, Note, HorseCondition, DATE_FORMAT(AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse where HorseID LIKE '%"+ UserSearch+"%' OR Name LIKE '%"+ UserSearch+"%' OR Age LIKE '%"+ UserSearch+"%' OR Note LIKE '%"+ UserSearch+"%' OR HorseCondition LIKE '%"+ UserSearch+"%';", function(err, result, fields) {
			if (err) throw err;
			res.render('index', {title: 'HCU Web', horses: result});
		});
	}
});



// Horse Details Page
router.get('/horse/:horseID', isAuthenticated, function(req, res) {
	var db = require('../db.js');
	var horseID = req.params.horseID;

	db.query("SELECT HorseID, Name, Age, Note,Owner, DATE_FORMAT(AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(DischargeDate,'%D-%M-%Y') as DischargeDate, isDesceased, mircochipCode, Breed, Colour, Gender, Weight, Height, FoundBy, HorseCondition, treatment FROM tbl_horse where HorseID = '"+ horseID +"';", function(err, result, fields) {
		if (err) throw err;
		res.render('horse', {
			title: "Horse "+horseID,
			horses: result
		});
	});
});



// Add Horse Page
router.get('/add-horse', isAuthenticated, (req, res) => {
	res.render('add-horse', {title: 'Add Horse'});
});



// Add Horse to the database
router.post('/add-horse', (req, res) => {
	var db = require('../db.js');
	db.query("INSERT INTO `tbl_horse` (`HorseID`, `Age`,`Note`, `AdmissionDate`, `mircochipCode` , `Breed`, `Colour`,  `Gender`, `Weight`,  `Height`, `FoundBy`, `HorseCondition`, `treatment`, `Name`, `Owner`) VALUES (NULL, '" + req.body.age + "', '" + req.body.notes + "', '" + req.body.date + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height + "', '" + req.body.finder + "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.name  + "', '" + req.body.owner + "');", function (err) {
		if (err) throw err
	})
	
	//Goes to Index page after adding a horse
	var db = require('../db.js');
	db.query("SELECT HorseID, Name, Age, Note, HorseCondition, DATE_FORMAT(AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse", function(err, result, fields) {
		if (err) throw err;
	res.render('index', {title: 'HCU Web', horses: result});
	});
});



// Edit Horse Page
router.get('/edit-horse', isAuthenticated, (req, res) => {
	res.render('edit-horse', {title: 'Edit Horse'});
});



// users Page
router.get('/users', isAuthenticated, (req, res) => {
	try {
		var db = require('../db.js');

		db.query("SELECT * FROM tbl_user", function(err, result, fields) {
			if (err) throw err;

			res.render('users', {title: 'Users', data: result});
		});
	} catch (error) {
		console.log(error);
		res.render('404', {title: 'Users'});
	}
});



router.post('/users', isAuthenticated, (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var status = ' ';
	var level = req.body.level;
	var address = ' ';

	var db = require('../db.js');
																																				// UserID, username, password, fname, lname, email, status, level, address	
	db.query("INSERT INTO `tbl_user` (`UserID`, `Username`, `Password`, `firstName`, `lastName`, `emailAddress`, `Status`, `UserType`, `Address`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);", [username, password, firstname, lastname, email, status, level, address], function(err){
		if (err) throw err
	})

	db.query("SELECT * FROM tbl_user", function(err, result, fields) {
		if (err) throw err;
		res.render('users', {title: 'Users', data: result});
	});
});



// Reports Page
router.get('/reports', isAuthenticated, (req, res) => {
	res.render('reports', {title: 'Reports'});
});



// Login Page
router.get('/login', (req, res) => {
	res.render('login', {title: 'Login'});
});



router.post('/login', (req, res) => {
	console.log(req.body);

	var username = req.body.username;
	var password = req.body.password;

	var dbResult = 0;

	//connect to Db
	var db = require('../db.js');

	//Query Db based on user and pass parameters
	db.query("SELECT COUNT(*) AS count FROM tbl_user where username = ? AND password = ?",[username, password], function (err, result, fields) {
		if (err) throw err;
			console.log(result);
			dbResult = result[0].count;
			console.log(dbResult);

		//check if result is 1
		if (dbResult == 1) {
			session.active = "true";
			session.user = req.body.username;
			res.redirect('/');
		} else {
			res.render('login', {title: 'HCU Web'});
		}
	});
});



// Logout
router.get('/logout', (req, res) => {
	session.active = "false"
	res.redirect('/login');
});

module.exports = router;