import './reset.css';
import './style.css';

document.querySelectorAll('.date').forEach((el) => {
  el.innerHTML = new Date().toLocaleString();
});
