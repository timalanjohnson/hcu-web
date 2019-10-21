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

	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID", function(err, result, fields) {
		if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
	});
	
});



//search Function
router.post('/search', isAuthenticated, (req, res) => {
	var db = require('../db.js');
	var UserSearch = req.body.search;
	if (UserSearch == '') {
		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID", function(err, result, fields) {
			if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
		});
	} else {
		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where  ho.HorseID = his.HorseID and ho.HorseID LIKE '%"+ UserSearch+"%' OR ho.Name LIKE '%"+ UserSearch+"%' OR ho.Age LIKE '%"+ UserSearch+"%' OR his.Note LIKE '%"+ UserSearch+"%' OR his.HorseCondition LIKE '%"+ UserSearch+"%';", function(err, result, fields) {
			if (err) throw err;
			res.render('index', {title: 'HCU Web', horses: result});
		});
	}
});



// Horse Details Page
router.get('/horse/:horseID', isAuthenticated, function(req, res) {
	var db = require('../db.js');
	var horseID = req.params.horseID;

	db.query("SELECT ho.HorseID, ho.Name, ho.Age,his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate, ho.isDesceased, ho.mircochipCode, ho.Breed, ho.Colour, his.Gender, his.Weight, his.Height, ho.FoundBy, his.HorseCondition, his.treatment FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"';", function(err, result, fields) {
		if (err) throw err;
		res.render('horse', {
			title: "Horse "+horseID,
			horses: result
		});
	});
});



// Add Horse Page
router.get('/add-horse', isAuthenticated, (req, res) => {

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd; 
	console.log(today);

	res.render('add-horse', {title: 'Add Horse', today: today});
});



// Add Horse to the database
router.post('/add-horse', (req, res) => {
	var db = require('../db.js');
	var UserID = ''
db.query("SELECT UserID from tbl_user where Username= '"+ session.user +"';", function(err, result, fields) {
		if (err) throw err;
		each user in result
			UserID = user.UserID
		db.query("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + req.body.age + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.finder + "', '" + req.body.name  + "');", function (err) {
		if (err) throw err
			db.query("INSERT INTO `tbl_horse` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`) VALUES ('" + result.insertId + "' ,'" + UserID + "' ,'" + req.body.notes + "', '" + req.body.date + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height +  "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.owner + "');", function (err) {
			if (err) throw err
			
			
			})
	})
	
	});
	


	
	//Goes to Index page after adding a horse
	var db = require('../db.js');
	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID", function(err, result, fields) {
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