let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(value) {
  calculation += value;
  output.innerHTML= calculation;

  localStorage.setItem('calculation', calculation);
}

const output=document.querySelector('.output-text');

// Optional: you can also create a function in order
// to reuse this code.
function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}