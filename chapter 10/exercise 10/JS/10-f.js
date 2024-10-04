function toggle(selector){
  const btn=document.querySelector(selector);
  if(!btn.classList.contains('is-toggled')){
    btn.classList.add('is-toggled');
  }
  else{
    btn.classList.remove('is-toggled');
  }
}