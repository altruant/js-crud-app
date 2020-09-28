const BASE_URL = 'http://tiny-lasagna-server.herokuapp.com/collections/cohort-covid';

const $container = document.querySelector('ul');
const $form = document.querySelector('form#chatForm')
const $deleteButton = document.querySelector('.iconify')

function buildHTML(data) {
  let html = '';

  data.forEach(function(item){
    html += `<li><span class="username">${item.username}</span>: <span class="message">${item.message}</span><span onclick=deleteMessage('${item._id}') class="iconify" data-icon="mdi:trash-can" data-inline="false"></span></li>`
  });
  $container.innerHTML = html;
}

function fetchChat() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      buildHTML(res);
    })
    .catch(error => console.log(error));
}

function sendMessage(data) {
  fetch(BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
}

function deleteMessage(id){
  fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json());
}



$form.addEventListener('submit', e => {
  e.preventDefault();

  let username = prompt("Username:");
  const message = document.querySelector('#message').value;

  const newMessage = {
    username,
    message
  }

  sendMessage(newMessage);
});

setInterval(fetchChat, 1000);
