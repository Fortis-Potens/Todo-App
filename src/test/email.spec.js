import chai from 'chai';
import chaiHttp from 'chai-http';
import qs from 'querystring';

import app from '../app.js';
import Email from '../models/Email.js';

chai.use(chaiHttp);
const { expect } = chai;

const appURL = '/api/v1';

describe('Email Message Queue with RabbitMQ', () => {
	beforeEach(async () => {
		await Email.deleteMany();
	});

	it('should not send email if email address is not defined', async () => {
		const emailWithoutEmailAddress = {
			email: '',
			subject: 'xxxxxxx',
			message: 'xxxxxxxx',
		};
		const response = await chai
			.request(app)
			.post(`${appURL}/email`)
			.send(emailWithoutEmailAddress);

		expect(response.status).to.eq(400);
		expect(response.body.success).to.equals(false);
		expect(response.body.error).to.equals('Please enter a valid email');
	});

	it('should not send email if subject is not defined', async () => {
		const emailWithoutSubject = {
			email: 'mail@mail.com',
			subject: '',
			message: 'xxxxxxxx',
		};
		const response = await chai
			.request(app)
			.post(`${appURL}/email`)
			.send(emailWithoutSubject);

		expect(response.status).to.eq(400);
		expect(response.body.success).to.equals(false);
		expect(response.body.error).to.equals(
			'Please enter your intended valid subject'
		);
	});

	it('should not send email if message is not defined', async () => {
		const emailWithoutMessage = {
			email: 'mail@mail.com',
			subject: 'xxxxxxxxx',
			message: '',
		};
		const response = await chai
			.request(app)
			.post(`${appURL}/email`)
			.send(emailWithoutMessage);

		expect(response.status).to.eq(400);
		expect(response.body.success).to.equals(false);
		expect(response.body.error).to.equals(
			'Please enter your intended valid message'
		);
	});

	it('should send email to receiver through RabbitMQ Message Queue', async () => {
		const newEmail = qs.stringify({
			email: 'mail@mail.com',
			subject: 'xxxxxxxxx',
			message: 'xxxxxxxx',
		});

		const response = await chai
			.request(app)
			.post(`${appURL}/email`)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(newEmail);
		// .send(
		// 	qs.stringify({
		// 		email: 'mail@mail.com',
		// 		subject: 'xxxxxxxxx',
		// 		message: 'xxxxxxxx',
		// 	})
		// );
		expect(response.status).to.eq(202);
		expect(response.body.success).to.equals(true);
		expect(response.body.message).to.equals('Email sent successfully');
	});
});
