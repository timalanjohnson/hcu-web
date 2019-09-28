const express = require('express');

const router = express.Router();

var horses = [
		{id: '12341', description: 'Brown male', date: '17-June-2019'},
		{id: '12342', description: 'Brown male', date: '6-August-2019'},
		{id: '12343', description: 'Brown female', date: '5-September-2019'},
		{id: '12344', description: 'Brown male', date: '12-September-2019'}
	];

// Index Page
router.get('/', (req, res) => {
	res.render('index', {title: 'HCU Web', horses: horses});
});

router.post('/', (req, res) => {
	res.render('index', {title: 'HCU Web', horses: horses});
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

	//res.send(req.params)

	res.render('horse', {
		title: "Horse "+horseID,
		horse: horseInfo
	});
});

// Add Horse Page
router.get('/add-horse', (req, res) => {
	res.render('add-horse', {title: 'Add Horse'});
});

// Settings Page
router.get('/settings', (req, res) => {
	res.render('settings', {title: 'Settings'});
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