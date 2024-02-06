const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// serve the html file
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// Endpoint to generate a random cookie token
app.get('/generate-token', (req, res) => {
	const token = Math.random().toString(36).substring(2);
	console.log('token: ', token);
	res.cookie('token', token);
	res.send('Token generated successfully!');
});

// Endpoint to read the token
app.get('/read-token', (req, res) => {
	const token = req.cookies.token;
	console.log('token: ', token);
	if (token) {
		res.send(`Token: ${token}`);
	} else {
		res.send('Token not found!');
	}
});

// Start the server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
