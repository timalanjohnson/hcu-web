const express = require('express');
const router = express.Router();
const db = require('../db.js');
var carers;



// Populate carers array
function populateCarers(){
	db.query("SELECT username, firstName, lastName FROM `tbl_user` WHERE UserType = 'carer'", function (err, result) {
		if (err) throw err;
		carers = result;
	});
}

populateCarers();

// Function to strip illegal characters from input strings
function cleanString(str){
	str = str.replace(/['\]['|&:;$%@*"<>()+,]/g, "");
	return str;
}

// Example
// var string = "Hello: [|&;$%@\"<>()+,] bru * ";
// var cleaned = cleanString(string);
// console.log(cleaned);



// TODO: refactor session.user



// This function checks if the user is logged in.
// If the user is logged in, it proceeds to render the page.
// If the user is not logged in, it redirects to the login page.
function isAuthenticated(req, res, next) {
	// Do checks
	if (req.session.loggedin){
		return next();
	}

	res.redirect('/login');
}



// Login Page
router.get('/login', (req, res) => {
	res.render('login', {title: 'Login'});
});



router.post('/login', (req, res) => {
	console.log(req.body);

	// Get user entered values for username and password
	var username = cleanString(req.body.username);
	var password = cleanString(req.body.password);
	
	var dbResult = 0;

	//connect to Db
	var db = require('../db.js');

	if (username && password) {
		db.query("SELECT * FROM tbl_user WHERE username = ? AND password = ?",[username, password], function (err, result, fields) {
			if (err) throw err;

			var test = result;

			console.log(result[0].Username);

			if (result.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.level = result[0].UserType;
				res.redirect('/')
			} else {
				res.redirect('login', {title: 'HCU Web'});
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});



// Index Page
router.get('/', isAuthenticated, (req, res) => {
	var db = require('../db.js');

	//Gets all the horses and orders them by the most recent horse which has been updated on
	db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history as his, tbl_horse ho where his.HorseID = ho.HorseID GROUP BY ho.HorseID) ORDER By his.UpdateTimeStamp DESC",function(err, result, fields) {

		if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result, level: req.session.level});
	});
	
});



//search Function
router.post('/search', isAuthenticated, (req, res) => {
	var db = require('../db.js');
	//get the input search text from the search bar
	var UserSearch = cleanString(req.body.search);
	
	if (UserSearch == '') {
		//Displays the horse details
		//The user can search by HorseID, HorseName, Note, Age and condition
		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history as his, tbl_horse ho where his.HorseID = ho.HorseID GROUP BY ho.HorseID )", function(err, result, fields) {

			if (err) throw err;
		res.render('index', {title: 'HCU Web', horses: result, level: req.session.level});
		});
	} else {

		db.query("SELECT ho.HorseID, ho.Name, ho.Age, his.Note, his.HorseCondition, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and his.HorseHistoryID IN (SELECT MAX(HorseHistoryID) FROM tbl_horse_history as his, tbl_horse ho where his.HorseID = ho.HorseID GROUP BY ho.HorseID ) and (ho.HorseID LIKE '%"+ UserSearch+"%' OR ho.Name LIKE '%"+ UserSearch+"%' OR ho.Age LIKE '%"+ UserSearch+"%' OR his.Note LIKE '%"+ UserSearch+"%' OR his.HorseCondition LIKE '%"+ UserSearch+"%')  ORDER BY his.HorseHistoryID DESC;", function(err, result, fields) {

			if (err) throw err;
			res.render('index', {title: 'HCU Web', horses: result, level: req.session.level});
		});
	}
});



// Horse Details Page
router.get('/horse/:horseID', isAuthenticated, function(req, res) {
	var db = require('../db.js');
	var horseID = cleanString(req.params.horseID);
	 

	//console.log("SELECT ho.HorseID, ho.Name, ho.Age,  ho.isDesceased, ho.mircochipCode, ho.Breed, ho.Colour, ho.FoundBy FROM tbl_horse ho where ho.HorseID = '"+ horseID +"';")
	
	//Displays all the horse details
	db.query("SELECT ho.HorseID, ho.Name, ho.Age,  ho.isDesceased, ho.mircochipCode, ho.Breed, ho.Colour, ho.FoundBy FROM tbl_horse ho where ho.HorseID = '"+ horseID +"';", function(err, horseTable, fields) {
		if (err) throw err;
		//console.log("SELECT his.HorseID,his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%D-%M-%Y') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%D-%M-%Y') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment FROM tbl_horse ho, tbl_horse_history his where ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"';")
		// get the history of the horse which 
	db.query("SELECT concat(us.firstName ,' ', us.lastName) as name , his.HorseID, his.Note,his.Owner, DATE_FORMAT(his.AdmissionDate,'%Y-%m-%d') as AdmissionDate, DATE_FORMAT(his.DischargeDate,'%Y-%m-%d') as DischargeDate, his.Gender, his.Weight, his.Height, his.HorseCondition, his.treatment, his.Carer, DATE_FORMAT(his.UpdateTimeStamp,'%D-%M-%Y %H:%i') as UpdateTimeStamp FROM tbl_horse ho,tbl_user us, tbl_horse_history his where us.UserID = his.UserID and ho.HorseID = his.HorseID and ho.HorseID = '"+ horseID +"' ORDER BY his.HorseHistoryID DESC;", function(err, horseHistory, fields) {
		if (err) throw err;
			console.log(horseTable)
			console.log(horseHistory)
			res.render('horse', {
				title: "Horse "+horseID,
				horses: horseTable,
				horsesHis: horseHistory,
				carers: carers,
				level: req.session.level
			});
		
		});
		
	});
});



// Update horse details
router.post('/horse/:horseID/update-horse', (req, res) => {

	var db = require('../db.js');
	var horseID = cleanString(req.params.horseID);
	var AdmissionDate = '';
	var UserID = "";
	UserID = cleanString(UserID);
	var username = cleanString(req.session.username);
	var mircochip = cleanString(req.body.mircochipCode);
	
	//Displays the horse
	db.query("SELECT DATE_FORMAT(AdmissionDate,'%Y-%m-%d') as AdmissionDate from tbl_horse_history where HorseID= '"+ horseID +"' ORDER BY HorseHistoryID DESC Limit 1", function(err, result, fields) {
		if (err) throw err;
			result.forEach(function(horse) {
			console.log(result);
			AdmissionDate = horse.AdmissionDate;

			//checks which user is logged in
			console.log("SELECT UserID from tbl_user where Username= '"+ username +"';");
			db.query("SELECT UserID from tbl_user where Username= '"+ username +"';", function(err, result, fields) {
			if (err) throw err;
				//console.log(result);
				result.forEach(function(userDetail) { 
						UserID = userDetail.UserID;

						//display the horse which have note been dicharged
						console.log("UPDATE  `tbl_horse` SET `isDesceased`  = '1' where HorseID = '" +horseID+"';")					
						if(req.body.desceased != null){
							db.query("UPDATE  `tbl_horse` SET `isDesceased`  = '1' where HorseID = '" +horseID+"';", function (err) {
								if (err) throw err
								
							})
						}

						// Check if microchip exists.
						if(req.body.mircochipCode != null){
							db.query("UPDATE  `tbl_horse` SET `mircochipCode` = '" + mircochip +  "' where HorseID = '" +horseID+"';", function (err) {
								if (err) throw err
								
							})
						}

						// Check if horse is deceased.
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
});



// Add Horse Page
router.get('/add-horse', isAuthenticated, (req, res) => {
	//setting up the date 
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd; 

	// Render the page with date and carer variables
	res.render('add-horse', {title: 'Add Horse', today: today, carers: carers, level: req.session.level});
});



// Add Horse to the database
router.post('/add-horse', (req, res) => {
	var db = require('../db.js');
	var username = cleanString(req.session.username);
	var age = cleanString(req.body.age);
	var chipData = cleanString(req.body.chipData);
	var breed = cleanString(req.body.breed);
	var colour = cleanString(req.body.colour);
	var finder = cleanString(req.body.finder);
	var name = cleanString(req.body.name);
	
	var insertId = cleanString(result.insertId);
	var notes = cleanString(req.body.notes);
	var date = cleanString(req.body.date);
	var gender = cleanString(req.body.gender);
	var weight = cleanString(req.body.weight);
	var height  = cleanString(req.body.height);
	var condition = cleanString(req.body.condition);
	var treatment = cleanString(req.body.treatment);
	var carer = cleanString(req.body.carer);
	var owner = cleanString(req.body.owner);
	var UserID = ""
	//records user that manipulates the horse 
	db.query("SELECT UserID from tbl_user where Username= '"+ username +"';", function(err, result, fields) {
		if (err) throw err;
		console.log(result);
		result.forEach(function(userDetail) { 
			UserID = userDetail.UserID;
			console.log("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + age + "', '" + chipData + "', '" + breed + "', '" + colour + "', '" + finder + "', '" + name  + "');")
			db.query("INSERT INTO `tbl_horse` (`HorseID`, `Age`, `mircochipCode` , `Breed`, `Colour`,`FoundBy`, `Name`) VALUES (NULL, '" + age + "', '" + chipData + "', '" + breed + "', '" + colour + "', '" + finder + "', '" + name  + "');", function (err, result) {
			if (err) throw err
				//console.log("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + result.insertId + "' ,'" + UserID + "' ,'" + req.body.notes + "', '" + req.body.date + "', '" + req.body.gender + "', '" + req.body.weight + "', '" + req.body.height +  "', '" + req.body.condition + "', '" + req.body.treatment  + "', '" + req.body.owner + "', '" +req.body.carer+ "');")
				db.query("INSERT INTO `tbl_horse_history` (`HorseID`, `UserID`, `Note`, `AdmissionDate`, `Gender`, `Weight`,  `Height`, `HorseCondition`, `treatment`,`Owner`, `Carer`) VALUES ('" + insertId + "' ,'" + UserID + "' ,'" + notes + "', '" + date + "', '" + gender + "', '" + weight + "', '" + height +  "', '" + condition + "', '" + treatment  + "', '" + owner + "', '" +carer+ "');", function (err) {
					if (err) throw err
					res.redirect('/');
				})
				
			})
		});
	});
});



// users Page
router.get('/users', isAuthenticated, (req, res) => {
	try {
		var db = require('../db.js');

		db.query("SELECT * FROM tbl_user", function(err, result, fields) {
			if (err) throw err;

			res.render('users', {title: 'Users', data: result, level: req.session.level});
		});
	} catch (error) {
		console.log(error);
		res.render('404', {title: 'Users', level: req.session.level});
	}
});



//add a user to the database
router.post('/users', isAuthenticated, (req, res) => {

	// Get the user entered values
	var username = cleanString(req.body.username);
	var password = cleanString(req.body.password);
	var firstname = cleanString(req.body.firstname);
	var lastname = cleanString(req.body.lastname);
	var email = cleanString(req.body.email);
	var status = ' ';
	var status =cleanString(status);
	var level = cleanString(req.body.level);
	var address = ' '; 
	var address = cleanString(address);

	var db = require('../db.js');

	// Insert new user into the database
	db.query("INSERT INTO `tbl_user` (`UserID`, `Username`, `Password`, `firstName`, `lastName`, `emailAddress`, `Status`, `UserType`, `Address`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);", [username, password, firstname, lastname, email, status, level, address], function(err){
		if (err) throw err

		// Redirect to the users page.
		res.redirect('/users');
	})
});



// Reports Page
// Reports will show when horse when horse have arrived and have been discharged
// Report will show the average amount of days a horse stays 
router.get('/reports', isAuthenticated, (req, res) => {
	var db = require('../db.js');
	var items = [];
	var horseIdentify = '-999'
	var oldData = '-999'
	var population = 0
	var rowNumber = 0
	console.log("select DATE_FORMAT(UpdateTimeStamp,'%d-%m-%y') as UpdateTimeStamp, HorseID, HorseHistoryID, DATE_FORMAT(DischargeDate,'%d-%m-%y') as DischargeDate, DATE_FORMAT(AdmissionDate,'%d-%m-%y') as AdmissionDate from tbl_horse_history Order by HorseID")
	db.query("select DATE_FORMAT(UpdateTimeStamp,'%d-%M-%Y') as UpdateTimeStamp, HorseID, HorseHistoryID, DATE_FORMAT(DischargeDate,'%d-%M-%Y') as DischargeDate, DATE_FORMAT(AdmissionDate,'%d-%M-%Y') as AdmissionDate from tbl_horse_history Order by HorseID", function(err, result, fields) {
		if (err) throw err
		
		result.forEach(function(userDetail) {
			
			//console.log(userDetail.DischargeDate);
			//checks to see if the horse has been discharged or not 
			if(userDetail.DischargeDate != oldData	 || userDetail.HorseID != horseIdentify )
			{
				items.push([]);
				if(userDetail.DischargeDate == null){
					population =  1;

					items[rowNumber][0] = userDetail.HorseID;
					items[rowNumber][1] = userDetail.AdmissionDate;
					items[rowNumber][2] = population;
					//items[rowNumber][3] = userDetail.DischargeDate;
					//items[rowNumber][4] = userDetail.AdmissionDate;
				}else{
					population = - 1;
					
					items[rowNumber][0] = userDetail.HorseID;
					items[rowNumber][1] = userDetail.DischargeDate;
					items[rowNumber][2] = population;
					//items[rowNumber][3] = userDetail.DischargeDate;
					//items[rowNumber][4] = userDetail.AdmissionDate;
				}
				
				
				
				rowNumber = rowNumber + 1;
				oldData = userDetail.DischargeDate;
				horseIdentify = userDetail.HorseID;
			}
			});
		
		//console.log(items)
		var averageDays = GetAverageDuration(items)

		//https://stackoverflow.com/questions/52125611/sort-array-by-a-date-string-in-multidimensional-array
		compare_dates = function(date1,date2){

			d1= new Date(date1[1]);
			d2= new Date(date2[1]);			
			if (d1>d2) return 1;
			 else if (d1<d2)  return -1;
			 else return 0;
		  }

		items.sort(compare_dates)

		horsePopulation = items

		//Slice or Splice does not work correctly, Make a new array to solve the problem
		var OldNumberOfHorses = [];
		var OldTimeForNumberOfHorses = [];
		var NumberOfHorses = [];
		var TimeForNumberOfHorses = [];
		var count = 0
		horsePopulation.forEach(function(population, index) {
			if(index >0){
				count = count + population[2]
				OldNumberOfHorses.push(count);
			}else{
				OldNumberOfHorses.push(population[2]);
				count = population[2];
			}
			OldTimeForNumberOfHorses.push(population[1]);	
		});

		var i;
		for (i = 0; i < OldTimeForNumberOfHorses.length; i++) {

			if(i < OldTimeForNumberOfHorses.length+1){

				if(OldTimeForNumberOfHorses[i] != OldTimeForNumberOfHorses[i+1]){
					NumberOfHorses.push(OldNumberOfHorses[i]);
					TimeForNumberOfHorses.push(OldTimeForNumberOfHorses[i]);
				}
			}
			
		}

		console.log(NumberOfHorses);
		console.log(TimeForNumberOfHorses);
		res.render('reports', {
			title: 'Reports',
			horseDurationPoint: JSON.stringify(NumberOfHorses),
			horseTimePoint: JSON.stringify(TimeForNumberOfHorses),
			HorseAverageStay: JSON.stringify(averageDays), 
			level: req.session.level
		});	
	})
});



// Help Page
router.get('/help', isAuthenticated, (req, res) => {
	res.render('help', {title: 'Help', level: req.session.level});
});



// Logout
router.get('/logout', (req, res) => {
	res.redirect('/login');
});



// Get the average amount of time that a horse spends in the system. 
function GetAverageDuration(DurationArray) { 

	var timeDifference = [];
	
	var i;
	//get the date differnece (admission and discharge) with the same HorseID
	for (i = 0; i < DurationArray.length; i++) {
		if(DurationArray[i][2] == 1){
			if(i < DurationArray.length-1){
				//checks if the ID is the same & checks that the dates are from admission to dischare
					if(DurationArray[i][0] == DurationArray[i+1][0] && DurationArray[i][2] != DurationArray[i+1][2]){
						var firstDate = new Date(DurationArray[i][1])
						var secondDate = new Date(DurationArray[i+1][1])
						
						//adds the time diff to the array
						timeDifference.push(Math.abs(secondDate.getTime() - firstDate.getTime()));
					}else{
						var firstDate = new Date(DurationArray[i][1])
						
						timeDifference.push(Math.abs(new Date(Date.now()).getTime() - firstDate.getTime()));
					}
			} else {
				var firstDate = new Date(DurationArray[i][1]);	
				timeDifference.push(Math.abs(new Date(Date.now()).getTime() - firstDate.getTime()));
			}	
		}	
	};
	
	var i;
	
	//Records In miliseconds?
	var AverageDays = 0
	
	for (i = 0; i < timeDifference.length; i++) {
		AverageDays = AverageDays + timeDifference[i]
	};

	AverageDays = AverageDays / timeDifference.length
	
	//Converts the miliseconds to days with no decimal place
	return parseFloat(AverageDays/ (60*60*24*1000)).toFixed(0); 
} 
module.exports = router;