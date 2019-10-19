const express = require('express');

const router = express.Router();

var blankUser = [
		{uid: '', name: '', email: '', phone: ''}
	];	



// Index Page
router.get('/', (req, res) => {
	
	var db = require('../db.js');
	db.query("SELECT HorseID, Name, Age, Note, HorseCondition, DATE_FORMAT(AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse", function(err, result, fields) {
		if (err) throw err;
	res.render('index', {title: 'HCU Web', horses: result});
	});
});


//search Function
router.post('/search', (req, res) => {
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
router.get('/horse/:horseID', function(req, res) {
	var db = require('../db.js');
	var horseID = req.params.horseID;

	db.query("SELECT HorseID, Name, Age, Note,Owner, DATE_FORMAT(AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(DischargeDate,'%D-%M-%Y') as DischargeDate, isDesceased, mircochipCode, Breed, Colour, Gender, Weight, Height, FoundBy, HorseCondition, treatment FROM tbl_horse where HorseID = '"+ horseID +"';", function(err, result, fields) {
		if (err) throw err;

	res.render('horse', {
		title: "Horse "+horseID,
		horse: result
	});
	//res.render('index', {title: 'HCU Web', horses: result});
	});
	
	
	
});

// Add Horse Page
router.get('/add-horse', (req, res) => {
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
	
	//res.render('add-horse', {title: 'HCU Web'});

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

			res.render('users', {title: 'Users', data: result});
		});
	} catch (error) {
		console.log(error);
		res.render('404', {title: 'Users'});
	}

});



router.post('/users', (req, res) => {
-
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