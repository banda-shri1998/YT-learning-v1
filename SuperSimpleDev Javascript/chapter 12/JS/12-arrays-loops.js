const todoarrray = [
  {
    name:'dinner',
    duedate:'12-3-2021'
  },
  {
    name:'work',
    duedate:'12-2-2022'
  }
]
const inDate=document.querySelector('.input-date');
const inName=document.querySelector('.input-name');
function addToList(){
  todoarrray.push({
    name:inName.value,
    duedate:inDate.value
  });
  inName.value='';
  inDate.value=''
  renderTodoList();
}

function renderTodoList(){
  let todohtml='';
  for(let i=0;i<todoarrray.length;i++){
    const todoObj=todoarrray[i]
    const { name,duedate }=todoObj;
    const html= `
      <div>${todoObj.name}</div>
      <div>${todoObj.duedate}</div>
      <button class="delete" onclick="
      todoarrray.splice(${i},1);
      renderTodoList();
      ">Delete</button>
    `;
    todohtml+=html;
  }

  document.querySelector('.output').innerHTML=todohtml;
}