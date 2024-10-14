const display = document.querySelector("input");
let c = "";
const btn = document.querySelectorAll(".btn").forEach((item) => {
  display.value = "";
  item.addEventListener("click", () => {
    if (item.innerHTML === "AC") {
      display.value = "";
    }
    else if (item.innerHTML === '=') {
      display.value = (eval(display.value)).toString();
    }
    else {
      display.value += item.innerHTML
      console.log(c);
    }
  });
});