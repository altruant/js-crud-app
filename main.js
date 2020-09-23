const BASE_URL = 'http://tiny-lasagna-server.herokuapp.com/collections/cohort-covid';

const $container = document.querySelector('ul');
const $form = document.querySelector('form#chatForm')
let html = '';


$form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData();
  fetch(BASE_URL, {
    method: 'post',
    body: JSON.stringify(formData),
    header: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    response.json()
    console.log(response)
    });
});



function buildHTML(data) {
  data.forEach(function(item){
    html += `<li>${item.username}: ${item.message}</li>`
  });
  $container.innerHTML = html;

}

fetch(BASE_URL)
  .then(response => response.json())
  .then(res => {
    console.log(res);
    buildHTML(res);
  })
  .catch(error => console.log(error));
