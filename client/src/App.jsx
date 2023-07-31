import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SERVER_URL);

export default function App() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('chat message', (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			nom: event.target.nom.value,
			message: event.target.message.value,
			created_at: new Date().toLocaleString(),
		};

		if (data.message.trim() !== '') {
			socket.emit('chat message', data);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name='nom' placeholder='Nom' />
				<input type="text" name='message' placeholder='Message' />
				<button type='submit'>Envoyer</button>
			</form>
			<ul>
				{messages.map((row, index) => (
					<li key={index}><b>{row.nom}: </b>{row.message}</li>
				))}
			</ul>
		</div>
	);
}
