function toggle(selector){
  const btn=document.querySelector(selector);
  if(!btn.classList.contains('is-toggled')){
    const b=document.querySelector('.is-toggled')
    if(b){
      b.classList.remove('is-toggled');
    }
    btn.classList.add('is-toggled');
  }
  else{
    btn.classList.remove('is-toggled');
  }
}