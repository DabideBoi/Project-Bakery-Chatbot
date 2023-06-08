const sendButton = document.querySelector('.chatbox-send');
const inputField = document.querySelector('.chatbox-input');
const messageContainer = document.querySelector('.chatbox-messages');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = inputField.value;
  if (message !== '') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbox-message', 'sent');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
    inputField.value = '';
    messageContainer.scrollTop = messageContainer.scrollHeight;

        // Send message to server for prediction
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/predict');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onload = function() {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const answer = response.answer;
            receiveMessage(answer)
          } else {
            console.error('Request failed. Returned status of', xhr.status);
          }
        };
        xhr.send(JSON.stringify({message: message}));
        
        // Clear message input field
        document.getElementById('message-input').value = '';
      }
    }

function receiveMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbox-message', 'received');
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

receiveMessage('Hi there! How can I assist you today?');

function receiveBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbox-message', 'received');
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

//setTimeout(() => receiveBotMessage('Awesome! I have added a box of each to your cart. You can review your order and checkout using the link in the chat.'), 2000);
//setTimeout(() => receiveBotMessage('Thanks for choosing Cutesy Bakery! Have a sweet day!'), 5000);