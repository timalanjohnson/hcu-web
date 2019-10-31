const app = require('./app');
const open = require('open');

const server = app.listen(3000, async() => {
	console.log(`Express is running on port ${server.address().port}`);
	await open('http://localhost:3000');
	console.log('Type Control+C to exit.');
});