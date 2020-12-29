import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter a todo'],
			unique: true,
			trim: true,
			maxlength: [20, 'Name cannot be more than 20 characters'],
			minlength: [3, 'Name cannot be less than 3 characters'],
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
