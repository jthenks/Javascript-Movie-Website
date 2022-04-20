document.addEventListener('DOMContentLoaded', () => {
  let filterButton =  document.querySelector("#toggle");


  filterButton.addEventListener('click', () => {

    let aside = document.querySelector("#aside");
    
    if(aside.classList.contains("visibility"))
    {
      aside.style.display = 'block';
      setTimeout(() => {
        aside.classList.toggle("visibility");
      }, 100);  
    }
    else
    {
      aside.classList.toggle("visibility");
      setTimeout(() => {
        aside.style.display = 'none';
      }, 555);
    }
  });

});
