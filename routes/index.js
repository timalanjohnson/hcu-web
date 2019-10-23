const express = require('express');
const router = express.Router();

var session = [
		{active: 'false', user: 'Tom', userType: 'admin'}
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


	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history as his, tbl_horse ho where his.HorseID = ho.HorseID GROUP BY ho.HorseID )",function(err, result, fields) {

		if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
	});
	
});



//search Function
router.post('/search', isAuthenticated, (req, res) => {
	var db = require('../db.js');
	var UserSearch = req.body.search;
	if (UserSearch == '') {

		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history as his, tbl_horse ho where his.HorseID = ho.HorseID GROUP BY ho.HorseID )", function(err, result, fields) {

			if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result});
		});
	} else {

		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history as his, tbl_horse ho where his.HorseID = ho.HorseID GROUP BY ho.HorseID ) and (ho.HorseID LIKE '%"+ UserSearch+"%' OR ho.Name LIKE '%"+ UserSearch+"%' OR ho.Age LIKE '%"+ UserSearch+"%' OR his.Note LIKE '%"+ UserSearch+"%' OR his.HorseCondition LIKE '%"+ UserSearch+"%')  ORDER BY his.HorseHistoryID DESC;", function(err, result, fields) {

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
db.query("SELECT concat(us.firstName ,' ', us.lastName) as name , his.HorseID, his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%Y-%m-%d') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%Y-%m-%d') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment, his.Carer, DATE_FORMAT(his.UpdateTimeStamp,'%D-%M-%Y %H:%i') as UpdateTimeStamp FROM tbl_horse ho,tbl_user us, tbl_horse_history his where us.UserID = his.UserID and ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"' ORDER BY his.HorseHistoryID DESC;", function(err, horseHistory, fields) {
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
						
						if(req.body.DischargeDate == ""){
							db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');", function (err) {
											if (err) throw err
											
										})
						}else{
							if(req.body.DischargeDate == null){
								console.log("DischargeDate = null");
								console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + req.body.AdmissionDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');");
								db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + req.body.AdmissionDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');", function (err) {
											if (err) throw err
											
										})
							}else{
								console.log("DischargeDate = NOTTT null");
								console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `DischargeDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.DischargeDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');");
								db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `DischargeDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + horseID + "','" + UserID + "' ,'" + req.body.notes + "', '" + AdmissionDate + "', '" + req.body.DischargeDate + "', '" + req.body.Gender + "', '" + req.body.Weight + "', '" + req.body.Height +  "', '" + req.body.Condition + "', '" + req.body.Treatment  + "', '" + req.body.Owner + "', '" + req.body.Carer + "');", function (err) {
											if (err) throw err
											
										})	
							}
								//AdmissionDate		req.body.DischargeDate  
							
						}
					//console.log("Horse Updated.");
					
				});
			});
			
			
			
		});
	
	});
	
	
	
	
	res.redirect('/');
	/*Takes you to the index page when you done updating
	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID", function(err, result, fields) {
		if (err) throw err;
	res.render('index', {title: 'HCU Web', horses: result});
	});
	*/
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
	
	var UserID = ""
	db.query("SELECT UserID from tbl_user where Username= '"+ session.user +"';", function(err, result, fields) {
		if (err) throw err;
			console.log(result);
			result.forEach(function(userDetail) { 
				UserID = userDetail.UserID;
				console.log("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + req.body.age + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.finder + "', '" + req.body.name  + "');")
				db.query("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + req.body.age + "', '" + req.body.chipData + "', '" + req.body.breed + "', '" + req.body.colour + "', '" + req.body.finder + "', '" + req.body.name  + "');", function (err, result) {
				if (err) throw err
					//console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + result.insertId + "' ,'" + UserID + "' ,'" + req.body.notes + "', '" + req.body.date + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height +  "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.owner + "', '" +req.body.carer+ "');")
					db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + result.insertId + "' ,'" + UserID + "' ,'" + req.body.notes + "', '" + req.body.date + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height +  "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.owner + "', '" +req.body.carer+ "');", function (err) {
						if (err) throw err
					
					})
					
				})
			});
		res.redirect('/');
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
	
	data = [12,8,18,9,7,15];
	var db = require('../db.js');
	var items = [];
	var horseIdentify = '-999'
	var oldData = '-999'
	var population = 0
	var rowNumber = 0
	console.log("select UpdateTimeStamp, HorseID, HorseHistoryID, DischargeDate from tbl_horse_history Order by HorseID")
	db.query("select DATE_FORMAT(UpdateTimeStamp,'%d-%m-%y') as UpdateTimeStamp, HorseID, HorseHistoryID, DischargeDate from tbl_horse_history Order by HorseID", function(err, result, fields) {
		if (err) throw err
		
		result.forEach(function(userDetail) {
			
			//console.log(userDetail.DischargeDate);
			if(userDetail.DischargeDate != oldData || userDetail.HorseID != horseIdentify )
			{
				
				if(userDetail.DischargeDate == null){
					population =  1;
				}else{
					population = - 1;	
				}
				
				items.push([]);
				items[rowNumber][0] = userDetail.HorseID;
				items[rowNumber][1] = userDetail.UpdateTimeStamp;
				items[rowNumber][2] = population;
				rowNumber = rowNumber + 1;
				oldData = userDetail.DischargeDate;
				horseIdentify = userDetail.HorseID;
			}
			});
		
		console.log(items)
		
		items.sort(function(x, y){
			return x.timestamp - y.timestamp;
		})
		//items.sort(sortFunction);
		//console.log(items)
		
		horsePopulation = items
		var NumberOfHorses = [];
		var TimeForNumberOfHorses = [];
		var count = 0
		horsePopulation.forEach(function(population, index) {
			if(index >0){
				count = count + population[2]
				NumberOfHorses.push(count);
			}else{
				NumberOfHorses.push(population[2]);
				count = population[2];
			}
			TimeForNumberOfHorses.push(population[1]);	
		});
	
		//console.log(NumberOfHorses);
		//console.log(TimeForNumberOfHorses);
		res.render('reports', {title: 'Reports',
							horseDurationPoint: JSON.stringify(NumberOfHorses),
							horseTimePoint: JSON.stringify(TimeForNumberOfHorses)
							});	
	})
	
	
	
	
});



// Login Page
router.get('/login', (req, res) => {
	res.render('login', {title: 'Login'});
});



router.post('/login', (req, res) => {
	console.log(req.body);

	// Get user entered values for username and password
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


function functionName() {
   // function body
   // optional return; 
} 
module.exports = router;