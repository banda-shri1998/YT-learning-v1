const todoarrray=[]
const input =document.querySelector('.input2')

function addToList(){
  todoarrray.push(input.innerHTML);
  console.log(todoarrray);
}
console.log(todoarrray)