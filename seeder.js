import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

import connectDB from './config/connectDB.js';
import Todo from './src/models/Todo.js';
import Email from './src/models/Email.js';
import todos from './src/data/todos.js';

connectDB();

const importData = async () => {
	try {
		await Todo.deleteMany();
		await Email.deleteMany();

		await Todo.insertMany(todos);

		console.log(`Data Imported!`);
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Todo.deleteMany();
		await Email.deleteMany();

		console.log(`Data Destroyed!`);
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
