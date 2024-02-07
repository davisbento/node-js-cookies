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
	console.log('token gerado: ', token);
	res.cookie('token', token, {
		httpOnly: true
	});
	res.json({ token });
});

// Endpoint to read the token
app.get('/read-token', (req, res) => {
	const token = req.cookies.token;
	console.log('token lido: ', token);
	if (token) {
		res.json({ token });
	} else {
		res.json({ message: 'Token not found' });
	}
});

// Start the server
app.listen(4000, () => {
	console.log('Server started on port 4000');
});
