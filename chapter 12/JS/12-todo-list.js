//const todoarrray=['hello','world','com']
const input =document.querySelector('.input2');
const input1=document.querySelector('.input1');

function renderTodoList(){

  let todoHtml=''
  for(let i=0;i<todoarrray.length;i++){
    const todo=todoarrray[i];
    const html=`<p>${todo}</p>`
    todoHtml+=html;
  }
  document.querySelector('.container').innerHTML=todoHtml;
  console.log(todoarrray);
  console.log(todoHtml);
}

function addPractice(){
  const out=document.querySelector('.container');
  out.innerHTML=input1.value;
  input1.value='';
}

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

document.querySelector('.add')
  .addEventListener('click',() => {
    addToList();
  })

  
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
    todoarrray.forEach(function(todoObj,index){
      const { name,duedate }=todoObj;
      const html= `
      <div>${name}</div>
      <div>${duedate}</div>
      <button class="delete delete-btn">Delete</button>
      `;
      todohtml+=html;
      
    });
    // for(let i=0;i<todoarrray.length;i++){
      //   const todoObj=todoarrray[i]
      //   const { name,duedate }=todoObj;
      //   const html= `
      //     <div>${todoObj.name}</div>
      //     <div>${todoObj.duedate}</div>
      //     <button class="delete" onclick="
      //     todoarrray.splice(${i},1);
      //     renderTodoList();
  //     ">Delete</button>
  //   `;
  //   todohtml+=html;
  // }
  
  document.querySelector('.output').innerHTML=todohtml;
  document.querySelectorAll('.delete').forEach((deleteBtn,index)=> {
    deleteBtn.addEventListener('click',()=>{
      todoarrray.splice(index,1);
      renderTodoList();
    })
  })
    
}