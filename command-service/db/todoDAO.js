/**
 * Created by maiquel on 20/09/17.
 */
"use strict";
const executeQuery = require('./connectionFactory');

let todoDAO = () => {

	let addTodo = (todo) => {
		const query = 'INSERT INTO todos ("text") VALUES(\''+ todo.text +'\');';
		return executeQuery(query);
	};

	return {
        addTodo: addTodo
	}
};

module.exports = todoDAO();
