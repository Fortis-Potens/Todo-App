import axios from 'axios';
import qs from 'querystring';
import Email from '../models/Email.js';

export const sendEmail = async (request, response) => {
	try {
		const { email, subject, message } = request.body;

		const url = `https://nodemq.herokuapp.com/email`;

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		await axios.post(url, qs.stringify({ email, subject, message }), config);

		await Email.create({ email, subject, message });

		return response
			.status(202)
			.json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		return response.status(500).json({ success: false, error: error.message });
	}
};
