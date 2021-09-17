const https = require('https');
const url = 'https://vello-nutcracker-2021.herokuapp.com/task';

module.exports = {
	GETValue: function(result){
		let data = '';
		let body = ""
		https.get(url, (response) => {
			response.on('data', (chunk) => {
				body += chunk;
			})
			response.on('end', () => {
				data = JSON.parse(body);
				result(data);
			})
		})
	},
	POSTValue: function(send, result){
		const data = JSON.stringify({answer: send})
		const options = {
		  hostname: 'vello-nutcracker-2021.herokuapp.com',
		  port: 443,
		  path: '/task',
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'Content-Length': data.length
		  }
		}
		const req = https.request(options, res => {
			console.log(`statusCode: ${res.statusCode}`);

			res.on('data', d => {
				process.stdout.write(d);
			})
		})
		req.on('error', error => {
			console.error(error);
		})
		req.write(data)
		req.end()
	}	
};