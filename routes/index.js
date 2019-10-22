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

	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID ORDER BY his.HorseHistoryID DESC LIMIT 1",function(err, result, fields) {
		if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
	});
	
});



//search Function
router.post('/search', isAuthenticated, (req, res) => {
	var db = require('../db.js');
	var UserSearch = req.body.search;
	if (UserSearch == '') {
		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID GROUP BY ho.HorseID ORDER BY his.HorseHistoryID DESC LIMIT 1", function(err, result, fields) {
			if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
		});
	} else {
		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where  ho.HorseID = his.HorseID and ho.HorseID LIKE '%"+ UserSearch+"%' OR ho.Name LIKE '%"+ UserSearch+"%' OR ho.Age LIKE '%"+ UserSearch+"%' OR his.Note LIKE '%"+ UserSearch+"%' OR his.HorseCondition LIKE '%"+ UserSearch+"%' ORDER BY his.HorseHistoryID DESC LIMIT 1;", function(err, result, fields) {
			if (err) throw err;
			res.render('index', {title: 'HCU Web', horses: result});
		});
	}
});



// Horse Details Page
router.get('/horse/:horseID', isAuthenticated, function(req, res) {
	var db = require('../db.js');
	var horseID = req.params.horseID;

	//console.log("SELECT ho.HorseID, ho.Name, ho.Age,  ho.isDesceased, ho.mircochipCode, ho.Breed, ho.Colour, ho.FoundBy FROM tbl_horse ho where ho.HorseID = '"+ horseID +"';")
	db.query("SELECT ho.HorseID, ho.Name, ho.Age,  ho.isDesceased, ho.mircochipCode, ho.Breed, ho.Colour, ho.FoundBy FROM tbl_horse ho where ho.HorseID = '"+ horseID +"';", function(err, horseTable, fields) {
		if (err) throw err;
		//console.log("SELECT his.HorseID,his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"';")
		db.query("SELECT his.HorseID, his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment, his.Carer, DATE_FORMAT(his.UpdateTimeStamp,'%D-%M-%Y %H:%i') as UpdateTimeStamp FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"' ORDER BY his.HorseHistoryID DESC;", function(err, horseHistory, fields) {
		if (err) throw err;
			console.log(horseTable)
			console.log(horseHistory)
			res.render('horse', {
				title: "Horse "+horseID,
				horses: horseTable,
				horsesHis: horseHistory
			});
		
		});
		
	});
});



// Update horse details
router.post('/horse/:horseID/update-horse', (req, res) => {
	var db = require('../db.js');
	var horseID = req.params.horseID;
	var AdmissionDate = '';
	var UserID = "";
	//console.log(req);
	console.log("SELECT DATE_FORMAT(AdmissionDate,'%Y-%m-%d') as AdmissionDate from tbl_horse_history where HorseID= '"+ horseID +"' GROUP BY HorseID ORDER BY HorseHistoryID DESC");
	db.query("SELECT DATE_FORMAT(AdmissionDate,'%Y-%m-%d') as AdmissionDate from tbl_horse_history where HorseID= '"+ horseID +"' GROUP BY HorseID ORDER BY HorseHistoryID DESC", function(err, result, fields) {
		if (err) throw err;
			result.forEach(function(horse) {
			console.log(result);
			AdmissionDate = horse.AdmissionDate;
			db.query("SELECT UserID from tbl_user where Username= '"+ session.user +"';", function(err, result, fields) {
			if (err) throw err;
				//console.log(result);
				result.forEach(function(userDetail) { 
						UserID = userDetail.UserID;
						console.log(userDetail);
						console.log("Horse Updating...");
						if(req.body.DischargeDate == ""){
							console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');")
							db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');", function (err) {
											if (err) throw err
											
										})
						}else{
							console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `DischargeDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.DischargeDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');")
							db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `DischargeDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.DischargeDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');", function (err) {
											if (err) throw err
											
										})
						}
					console.log("Horse Updated.");
					
				});
			});
			
			
			
		});
	
	});
	
	
	
	
	
	//Takes you to the index page when you done updating
	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID", function(err, result, fields) {
		if (err) throw err;
	res.render('index', {title: 'HCU Web', horses: result});
	});
	
	/*
	db.query("SELECT ho.HorseID, ho.Name, ho.Age,  ho.isDesceased, ho.mircochipCode, ho.Breed, ho.Colour, ho.FoundBy FROM tbl_horse ho where ho.HorseID = '"+ horseID +"';", function(err, horseTable, fields) {
		if (err) throw err;
		console.log("SELECT his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"';")
		db.query("SELECT his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"' ORDER BY ho.HorseID DESC;", function(err, horseHistory, fields) {
		if (err) throw err;
			console.log(horseTable)
			console.log(horseHistory)
			res.render('horse', {
				title: "Horse " + horseID,
				horses: horseTable,
				horsesHis: horseHistory
			});
		
		});
		
	});
	*/
});



// Add Horse Page
router.get('/add-horse', isAuthenticated, (req, res) => {
	res.render('add-horse', {title: 'Add Horse'});
});



// Add Horse to the database
router.post('/add-horse', (req, res) => {
	var db = require('../db.js');
	var UserID = ""
	db.query("SELECT UserID from tbl_user where Username= '"+ session.user +"';", function(err, result, fields) {
		if (err) throw err;
			console.log(result);
			result.forEach(function(userDetail) { 
													UserID = userDetail.UserID;
													});
		//console.log("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + req.body.age + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.finder + "', '" + req.body.name  + "');");
		db.query("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + req.body.age + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.finder + "', '" + req.body.name  + "');", function (err, result) {
			if (err) throw err
				//console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`) VALUES ('" + result.insertId + "' ,'" + UserID + "' ,'" + req.body.notes + "', '" + req.body.date + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height +  "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.owner + "');");
				db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`) VALUES ('" + result.insertId + "' ,'" + UserID + "' ,'" + req.body.notes + "', '" + req.body.date + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height +  "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.owner + "');", function (err) {
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