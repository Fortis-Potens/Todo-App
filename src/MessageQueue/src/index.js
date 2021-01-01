const express = require('express');
const dotenv = require('dotenv');
const { json, urlencoded } = express;
const { publishMessage } = require('./emailWorker');

dotenv.config();

console.log(process.env.AWSAccessKeyId);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.status(200).send({ message: 'Welcome to our API' });
});

/**
 * @post sensend email
 */

app.post('/email', (req, res) => {
	const {
		body: { email },
	} = req;
	const emailOptions = {
		mail: [email],
		subject: 'Email confirmed',
		template: `<body>	     
								<p>Hi,</p>
								<p>Thanks for your submission, your email address has been recorder successfully</p>
							</body>`,
	};

	// call rabbitmq service to app mail to queue
	publishMessage(emailOptions);
	return res.status(202).send({ message: 'Email sent successfully' });
});

app.listen(5000, () => {
	console.log(`app running on port: 5000`);
});
