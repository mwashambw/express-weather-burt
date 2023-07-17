const addressInput = document.querySelector('input');

const weatherForm = document.querySelector('form');
const msg1 = document.querySelector('.msg1');
const msg2 = document.querySelector('.msg2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = addressInput.value;
  msg1.textContent = 'Loading....';
  msg2.textContent = '';
  fetchData(location);
  addressInput.value = '';
});

const fetchData = (address) => {
  fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return (msg1.textContent = data.error);
      msg1.textContent = data.location;
      msg2.textContent = data.forcast;
    });
};
