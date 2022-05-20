const socket = io();

socket.on('message', (msg) => {
  // display message
  console.log(msg);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  const to = e.target.elements.to.value;
  // send message to specific user
  socket.emit('sendMessage', { message, to });
});

document.querySelector('#email-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value;
  // send email to register to the server
  socket.emit('sendEmail', email);
});
