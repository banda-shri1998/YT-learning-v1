const todoArr = JSON.parse(localStorage.getItem('todoArr')) || [
  {
    name:'dinner',
    duedate:'2022-12-22'
  },
  {
    name:'work',
    duedate:'2022-01-12'
  }
]

renderTodoList()
//const todoArr=['hello','world','com']
const input =document.querySelector('.input2');
const input1=document.querySelector('.input1');

function renderTodoList(){

  let todoHtml=''
  for(let i=0;i<todoArr.length;i++){
    const todo=todoArr[i];
    const html=`<p>${todo}</p>`
    todoHtml+=html;
  }
  document.querySelector('.container').innerHTML=todoHtml;
  console.log(todoArr);
  console.log(todoHtml);
}

function addPractice(){
  const out=document.querySelector('.container');
  out.innerHTML=input1.value;
  input1.value='';
}

const inDate=document.querySelector('.input-date');
const inName=document.querySelector('.input-name');
const warning=document.querySelector('.warning');

function addToList(){
  const dat2=new Date();
  let date=`${dat2.getUTCFullYear()}-${dat2.getUTCMonth()+1}-${dat2.getUTCDate()}`
  console.log(date);
  if((inName.value==='' || inDate.value==='' )|| inDate.value>date){
    warning.innerHTML='add valid Date and name';
  }else{
    todoArr.push({
      name:inName.value,
      duedate:inDate.value
    });
    warning.innerHTML=''
  }
  inName.value='';
  inDate.value=''
  renderTodoList();
  savedJson()
}

function renderTodoList(){
  let todohtml='';
  for(let i=0;i<todoArr.length;i++){
    const todoObj=todoArr[i]
    const { name,duedate }=todoObj;
    const html= `
      <div>${todoObj.name}</div>
      <div>${todoObj.duedate}</div>
      <button class="delete" onclick="
      todoArr.splice(${i},1);
      renderTodoList();
      savedJson();
      ">Delete</button>
    `;
    todohtml+=html;
  }
  document.querySelector('.output').innerHTML=todohtml;
}

function savedJson(){
  localStorage.setItem('todoArr',JSON.stringify(todoArr));
}