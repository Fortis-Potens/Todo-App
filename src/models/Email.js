import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Please enter a valid email'],
			trim: true,
		},
		subject: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Email = mongoose.model('Email', EmailSchema);

export default Email;
