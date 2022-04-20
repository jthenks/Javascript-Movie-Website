document.addEventListener('DOMContentLoaded', () => {
  let homeDiv = document.querySelector("#index");
  let defaultDiv = document.querySelector("#default");
  let detailsDiv = document.querySelector("#details");
  let body = document.querySelector("body");
  let searchBox = document.querySelector("#searchBox");
  let movieDiv = document.querySelector("#movieListingMovies");
  let messageLocation = document.querySelector("#message");
  let searchFilterBox = document.querySelector("#searchBar");
  let beforeYear = document.querySelector("#beforeYear");
  let afterYear = document.querySelector("#afterYear");
  let betweenFrom = document.querySelector("#betweenFrom");
  let betweenTill = document.querySelector("#betweenTill");
  let belowRate = document.querySelector("#belowRate");
  let aboveRate = document.querySelector("#aboveRate");
  let betweenFromRate = document.querySelector("#betweenFromRate");
  let betweenTillRate = document.querySelector("#betweenTillRate");
  let belowOutput = document.querySelector("#belowOutput");
  let aboveOutput = document.querySelector("#aboveOutput");
  let betweenFromOutput = document.querySelector("#betweenFromOutput");
  let betweenTillOutput = document.querySelector("#betweenTillOutput");
  let searchButton = document.querySelector("#matchMovies");
  let favouriteButton = document.querySelector("#favouriteMovies");
  let filterButton = document.querySelector("#filterMovies");
  let sortButtons = document.querySelectorAll(".sortButtons");
  let filteredMovies;
  let movieFilteredArray;
  let suggestionBox = document.querySelector("#suggestionBox");
  let suggestionSection = document.querySelector("#suggestions");
  let noFavourites = "You Do Not Have Any Favourite Movies";
  let invalidMovies = "The Movie You are Searching For Cannot Be Found";
  let noResultMessage = "No Result";

  function noBody()
  {
    body.classList = "";
  }

  function toggleDisplayNone(element)
  {
    element.classList.toggle('displayNone');
  }

  function toggleIndexBody()
  {
    body.classList.toggle('bodyIndex');
  }

  function toggleDefaultFromIndex (){
    clearSortButtons();
    toggleDisplayNone(homeDiv);
    toggleDisplayNone(defaultDiv);
    noBody();
    beforeYear.placeholder = "Ex. 2021";
    afterYear.placeholder = "Ex. 1950";
    betweenFrom.placeholder  = "Ex. 1951";
    betweenTill.placeholder  = "Ex. 2020";
    clearRatingInput();
  }

  function clearFilteredMovieArray () {
    movieFilteredArray = [];
    filteredMovies = [];
  }

  function toggleDefaultFromDetails (){
    toggleDisplayNone(detailsDiv);
    toggleDisplayNone(defaultDiv);
    noBody();
  }

  function toggleIndexFromDefault (){
    toggleDisplayNone(defaultDiv);
    toggleDisplayNone(homeDiv);
    toggleIndexBody();
    clearFilterSearchBar();
    clearNumberInput();
    clearRatingInput();
    clearFilteredMovieArray();
    unCheckRadio();
  }

  function containsSuggestion()
  {
    if(!suggestionSection.classList.contains("hideSuggestions"))
    {
      toggleSuggestionBox();
    }
  }

  function unCheckRadio()
  {
    document.getElementsByName("year").forEach((radio) => radio.checked = false);
    document.getElementsByName("rating").forEach((radio) => radio.checked = false);
  }
  
  function toggleIndexFromDetails (){
    toggleDisplayNone(detailsDiv);
    toggleDisplayNone(homeDiv);
    toggleIndexBody();
  }

  function removeAllChild (parentElement) {
      
    parentElement.replaceChildren();
  }

  function isFavourite (id) {

      if (!localStorage.getItem(id))
      {
          return false;
      }
      
      return true;
  }

  function clearSearchBox() {
    searchBox.value = "";
  }

  function clearFilterSearchBar() {
    searchFilterBox.value = "";
  }

  function changeSearchButton() {
    searchButton.style.backgroundColor = "grey";
  }

  function restoreSearchButton() {
    searchButton.style.backgroundColor = "";
  }

  function changeFavouriteButton() {
    favouriteButton.style.backgroundColor = "grey";
  }

  function restoreFavouriteButton() {
    favouriteButton.style.backgroundColor = "";
  }

  function toggleSuggestionBox(){
    suggestionSection.classList.toggle("hideSuggestions");
  }

  function clearNumberInput (){
    let numTextBox = document.querySelectorAll(".textbox");
    numTextBox.forEach((textBox) => textBox.value = "");
  }
  function clearRadioCheck (){
    let radioInput = document.querySelectorAll('input[type="radio"]');
    radioInput.forEach((radio) => radio.checked = false);
  }

  function clearRatingInput (){
    let rangeBox = document.querySelectorAll('input[type="range"]');
    rangeBox.forEach((range) => range.value = "0");

    let rangeOutput = document.querySelectorAll('output');
    rangeOutput.forEach((range) => range.value = "0");

  }

  function alphabeticalOrder (movies) {
    return movies.sort((a,b) => a.title.localeCompare(b.title));
  }

  function revAlphabeticalOrder (movies) {
    return movies.sort((a,b) => b.title.localeCompare(a.title));
  }

  function yearOrderAsc (movies) {
    return movies.sort((a,b) => a.release_date.substring(0, 4) - b.release_date.substring(0, 4));
  }

  function yearOrderDsc (movies) {
    return movies.sort((a,b) => b.release_date.substring(0, 4) - a.release_date.substring(0, 4));
  }

  function rateOrderAsc (movies) {
    return movies.sort((a,b) => a.vote_average - b.vote_average);
  }

  function rateOrderDsc (movies) {
    return movies.sort((a,b) => b.vote_average - a.vote_average);
  }

  function noMovies(message) 
  {
    removeAllChild(messageLocation);
    let messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageLocation.appendChild(messageDiv);
  }

  function listMovies (movies) {
      
      movies.forEach((movie) => {

          let posterDiv = document.createElement("div");
          let poster = document.createElement("img");
          let movieTitle = document.createElement("div");
          let year = document.createElement("div");
          let rating = document.createElement("div");
          let rateStar = document.createElement("img");
          let favourite = document.createElement("div");
          posterDiv.appendChild(poster);

          addDataToMovieElements(movie, poster, posterDiv, movieTitle, year, rating, rateStar, favourite);    
      });     
  }

  function addDataToMovieElements(movie, poster, posterDiv, movieTitle, year, rating, rateStar, favourite)
  {
    checkIfPosterSrcIsNull(poster, movie);     
    movieTitle.textContent = movie.title;
    year.textContent = new Date(movie.release_date).getFullYear();
    rating.textContent = movie.vote_average;
    rateStar.src = "star.png";
    rateStar.width = "15";
    rateStar.height = "15";
    rateStar.alt = "star";
  
    
    if (isFavourite(movie.id))
    {
      favouritedHeart(favourite);
    }
    else
    {
      unfavouritedHeart(favourite);
    } 

    favourite.style.cursor = "pointer";
    movieTitle.style.cursor = "pointer";
    favourite.dataset.id = movie.id;
    movieTitle.dataset.id = movie.id;
    poster.dataset.id = movie.id;

    setAttributeToMovieElements(poster, posterDiv, movieTitle, year, rating, rateStar, favourite);
  }

  function checkIfPosterSrcIsNull(poster, movie)
  {
    if(movie.poster_path)
    {
      poster.src = `https://image.tmdb.org/t/p/w92/${movie.poster_path}`; 
    }
    else
    {
      poster.src = "noImages.jpg"; 
      poster.style.width = "92px";
    }   
  }

  function setAttributeToMovieElements(poster, posterDiv, movieTitle, year, rating, rateStar, favourite)
  {
    poster.setAttribute("class", "clickPoster");
    movieTitle.setAttribute("class", "clickTitle");
    year.setAttribute("class", "yearDiv");
    rating.setAttribute("class", "rateDiv");
    favourite.setAttribute("class", "favouriteButton");

    appendMovieElementsToDefaultView(posterDiv, movieTitle, year, rating, rateStar, favourite);
  }

  function appendMovieElementsToDefaultView(posterDiv, movieTitle, year, rating, rateStar, favourite)
  {
    movieDiv.appendChild(posterDiv);
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(year);
    movieDiv.appendChild(rating);
    rating.appendChild(rateStar);
    movieDiv.appendChild(favourite)
  }

  function loadingAnimation() {

    let loadingGif = document.createElement("img");
    loadingGif.src = "loadingGif.gif"
    messageLocation.appendChild(loadingGif);
  }

  function noResult (filteredMovies){
    if(filteredMovies == "")
    {
      return noMovies(noResultMessage);
    }
  }

  function rangeOutput(){
    belowRate.addEventListener("input", function() {belowOutput.value = belowRate.value});
    aboveRate.addEventListener("input", function() {aboveOutput.value = aboveRate.value});
    betweenFromRate.addEventListener("input", function() {betweenFromOutput.value = betweenFromRate.value});
    betweenTillRate.addEventListener("input", function() {betweenTillOutput.value = betweenTillRate.value});
  }

  function getMovies(title, search){

    let getTitle = title.replace(/\s/g, '+');
    let movieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=c85833b2769308c4bf5f0c7b82795262&query=${getTitle}`;
    fetch(movieEndpoint)
    .then((response) => response.json())
    .then((movie) =>{
    searchMovieOrAutocomplete(movie.results, search)});
  }
  
  function searchMovieOrAutocomplete(movies, search)
  {
    if(search)
    {
      searchMovie(movies);
    }
    else
    {
      checkAutocomplete(movies);
    } 
  }

  function checkAutocomplete(movies)
  {
    removeAllChild(suggestionBox);
    movies.forEach((movie) => {
      let suggestion = document.createElement("li");
      suggestion.textContent = movie.title;
      suggestion.classList.toggle("suggestionList");
      suggestionBox.appendChild(suggestion);
    });
  }

  function changeFilterButton(){
    filterButton.style.backgroundColor = "grey";
  }

  function restoreFilterButton(){
    filterButton.style.backgroundColor = "#2da09c";
  }



  function searchMovie(movies)
  {
    removeAllChild(suggestionBox);
    removeAllChild(messageLocation);
    movieFilteredArray = movies;
    filteredMovies = movies;
    if (!movies.length == 0)
    {
        movies.forEach((movie) => sessionStorage.setItem(movie.id, JSON.stringify(movie)));
        listMovies(alphabeticalOrder(movies));  
    }
    else
    {
        noMovies(invalidMovies);
    }
  }

  function clearUnchecked(radioValue){
    let textboxes = document.querySelectorAll('.textbox');
    let rangeSliders = document.querySelectorAll('.slider');

    if(radioValue == "betweenFrom" || radioValue == "betweenTill")
    {
      clearYearBetweenFilter(textboxes);
   }
   else if (radioValue == "beforeYear" || radioValue == "afterYear")
   {
      clearBeforeAfterYearFilter(textboxes, radioValue);
   }

    else if (radioValue == "betweenFromRate" || radioValue == "BetweenTillRate")
    {
      clearBetweenRateFilter(rangeSliders);
    }
    else if (radioValue == "belowRate" || radioValue == "aboveRate")
    {
      clearBelowAboveRateFilter(rangeSliders, radioValue);
    }
  }

  function clearYearBetweenFilter(textboxes)
  {
    for (let i = 0; i < textboxes.length; i++) 
    {
      if(textboxes[i].id == "beforeYear" ||  textboxes[i].id == "afterYear")
      {
      textboxes[i].checked = false;
      textboxes[i].value = "";
     }
    }
  }

  function clearBeforeAfterYearFilter(textboxes, radioValue)
  {
    for (let i = 0; i < textboxes.length; i++) 
    {
      if(textboxes[i].id != radioValue)
      {
      textboxes[i].checked = false;
      textboxes[i].value = "";
      }
   }
  }

  function clearBetweenRateFilter(rangeSliders)
  {
    for (let i = 0; i < rangeSliders.length; i++) 
    {
        if(rangeSliders[i].id == "belowRate" ||  rangeSliders[i].id == "aboveRate")
        {
          rangeSliders[i].checked = false;
          rangeSliders[i].value = "0";
        }
        belowOutput.value = "0";
        aboveOutput.value = "0";
    }
  }

  function clearBelowAboveRateFilter(rangeSliders, radioValue)
  {
    for (let i = 0; i < rangeSliders.length; i++) 
    {
        if(rangeSliders[i].id != radioValue)
        {
          rangeSliders[i].checked = false;
          rangeSliders[i].value = "0";
        }
        if(radioValue == "belowRate")
        {
          aboveOutput.value = "0";
          betweenTillOutput.value = "0";
          betweenFromOutput.value = "0";
        }
        else if(radioValue == "aboveRate")
        {
          belowOutput.value = "0";
          betweenTillOutput.value = "0";
          betweenFromOutput.value = "0";
        }
      }
  }

  function showFavourites()
  {
    toggleDefaultFromIndex();
     clearSearchBox();
    removeAllChild(movieDiv);
    removeAllChild(messageLocation);
    let movies = [];
    if(!localStorage.length == 0)
    {
      for (let i = 0; i < localStorage.length; i++)
      {
        movies.push(JSON.parse(JSON.parse(localStorage.getItem(localStorage.key(i)))));
      }
      listMovies(alphabeticalOrder(movies)); 
      movieFilteredArray = movies;
      filteredMovies = movieFilteredArray;
    }
    else
    {
      noMovies(noFavourites);
    }
  }

  function addMovieToFavourites(e)
  {
    localStorage.setItem(e.target.dataset.id, JSON.stringify(sessionStorage.getItem(e.target.dataset.id)));
    favouritedHeart(e.target);
  }

  function removeMovieFromFavourites(e)
  {
    localStorage.removeItem(e.target.dataset.id);
    unfavouritedHeart(e.target);
  }

  function favouritedHeart(element)
  {
    element.textContent = "\uD83D\uDC96";
  }

  function unfavouritedHeart(element)
  {
    element.textContent = "\uD83E\uDD0D";
  }

  function clearSortButtons(){
    sortButtons.forEach((button) => button.classList = "sortButtons");
 }

function findMatchingMovies() {

  let getTitle = searchBox.value.trim();
  restoreSearchButton();
  restoreFavouriteButton();
  removeAllChild(movieDiv);
  removeAllChild(messageLocation);

  if (!getTitle)
  {
      searchBox.placeholder = "Please Enter a Movie";
      changeSearchButton();
  }
  else
  {
      toggleDefaultFromIndex();
      clearSearchBox();
      loadingAnimation();
      getMovies(getTitle, true);
  }  
}

  searchBox.addEventListener('keyup', () => {

    if(searchBox.value.length >= 3)
    {
      suggestionSection.classList.remove("hideSuggestions");
      getMovies(searchBox.value ,false);
    }
    else
    {
      suggestionSection.classList.add("hideSuggestions");
      removeAllChild(suggestionBox);
    }
  });

  document.querySelector("#favouriteMovies").addEventListener('click', () => {

    restoreSearchButton();
    restoreFavouriteButton();
    if(!searchBox.value.trim())
    {
      showFavourites();
    }
    else
    {
     changeFavouriteButton(); 
    }  
    
  });

  document.addEventListener('change', (e) => {
    if(e.target && e.target.classList == "slider")
        {
          rangeOutput();
        }

  });

  document.addEventListener('click', (e) => {    
      if(e.target && e.target.classList == "favouriteButton")
      {
          let movie = JSON.parse(localStorage.getItem(e.target.dataset.id));

          if (!movie)
          {
            addMovieToFavourites(e)
          }
          else
          {
            removeMovieFromFavourites(e);
          }
      }
      if(e.target && e.target.tagName == "LI")
      {
        searchBox.value = e.target.textContent;
        removeAllChild(suggestionBox);
        toggleSuggestionBox();
      }  

      if(e.target && e.target.classList == "sortButtons")
      {
        clearSortButtons();
        let typeSort = e.target.id;
        if(typeSort == "titleAsc"){
          removeAllChild(movieDiv);
          listMovies(alphabeticalOrder(filteredMovies));
        }

        else if(typeSort == "titleDsc"){
          removeAllChild(movieDiv);
          listMovies(revAlphabeticalOrder(filteredMovies));
        }

        else if(typeSort == "yearAsc"){
          removeAllChild(movieDiv);
          listMovies(yearOrderAsc(filteredMovies));
        }

        else if(typeSort == "yearDsc"){
          removeAllChild(movieDiv);
          listMovies(yearOrderDsc(filteredMovies));
        }

        else if(typeSort == "rateAsc"){
          removeAllChild(movieDiv);
          listMovies(rateOrderAsc(filteredMovies));
        }

        else if(typeSort == "rateDsc"){
          removeAllChild(movieDiv);
          listMovies(rateOrderDsc(filteredMovies));
        }
      
        e.target.classList.add("sortSelected");
      }

    });

    document.addEventListener("input", (e) => {
      restoreFilterButton();
        //Listens for changes in any slider and matchs id with the radio value inorder to clear
        //other sliders that are unchecked
        if(e.target && e.target.classList == "slider")
        {
           let radioValue = e.target.id;
           let radio = document.querySelector(`input[value=${radioValue}]`);
  
           if(radioValue == "betweenFromRate" || radioValue == "betweenTillRate"){
              let radioBetween = document.querySelector('input[value="betweenRate"]');
              radioBetween.checked = true;
              clearUnchecked(radioValue);
           }
           else{
              radio.checked = true;
              clearUnchecked(radioValue);
           }
        }
        //Listens for changes in any text box and matchs id with the radio value inorder to clear
        //other boxes that are unchecked
        if(e.target && e.target.classList == "textbox")
           {
              let radioValue = e.target.id;
              let radio = document.querySelector(`input[value=${radioValue}]`);
     
              if(radioValue == "betweenFrom" || radioValue == "betweenTill"){
                 let radioBetween = document.querySelector('input[value="betweenYear"]');
                 radioBetween.checked = true;
                 clearUnchecked(radioValue);
              }
              else{
                 radio.checked = true;
                 clearUnchecked(radioValue);
              }
          } 
    });

    filterButton.addEventListener('click', () => {
      
      filter();

    });

  // This function serves as a way for non mutual filtering of movies based on three feilds (title, year, rating)
  // If there is no input or changes in all feilds the display will show no changes, and filter button will grey out.
  // One list of movies (filteredMovies) is used in junction with mutliple "if" statemnet for condition checks of each field input.
  function filter() {
    restoreFilterButton();
    removeAllChild(messageLocation);
    let checkedYearRadio = document.querySelector('input[name="year"]:checked');
    let checkedRatingRadio = document.querySelector('input[name="rating"]:checked');
    filteredMovies = movieFilteredArray;
    if(searchFilterBox.value !== ""){
      let getTitle = searchFilterBox.value.trim();
      filteredMovies = filteredMovies.filter((movie) => movie.title.match(getTitle.charAt(0).toUpperCase() + getTitle.slice(1)));
      removeAllChild(movieDiv);
      noResult(filteredMovies);
      listMovies(alphabeticalOrder(filteredMovies));
    }

    if(checkedYearRadio != null){
      let id = checkedYearRadio.value;

      if(id == "betweenYear"){
        let yearNumFrom = document.querySelector("#betweenFrom").value;
        let yearNumTill = document.querySelector("#betweenTill").value;
        filteredMovies = filteredMovies.filter((movie) =>  movie.release_date.substring(0, 4) >= yearNumFrom
        && movie.release_date.substring(0, 4) <= yearNumTill);
        noResult(filteredMovies);
        
      }
      else if (id == "afterYear"){
        let yearNumAfter = document.querySelector("#afterYear").value;
        filteredMovies = filteredMovies.filter((movie) => movie.release_date.substring(0, 4) > yearNumAfter);
        noResult(filteredMovies);
      }

      else if (id == "beforeYear"){
        let yearNumBefore = document.querySelector("#beforeYear").value;
        filteredMovies = filteredMovies.filter((movie) => movie.release_date.substring(0, 4) < yearNumBefore);
        noResult(filteredMovies);
      }
      removeAllChild(movieDiv);
      listMovies(alphabeticalOrder(filteredMovies));
    }

    if(checkedRatingRadio != null){
      let id = checkedRatingRadio.value;

      if(id == "betweenRate"){
        let rateFrom = document.querySelector("#betweenFromRate").value;
        let rateTill = document.querySelector("#betweenTillRate").value;
        filteredMovies = filteredMovies.filter((movie) =>  movie.vote_average >= rateFrom
        && movie.vote_average <= rateTill);
        noResult(filteredMovies);
        
      }
      else if (id == "aboveRate"){
        let rateAbove = document.querySelector("#aboveRate").value;
        filteredMovies = filteredMovies.filter((movie) => movie.vote_average > rateAbove);
        noResult(filteredMovies);
      }

      else if (id == "belowRate"){
        let rateBelow = document.querySelector("#belowRate").value;
        filteredMovies = filteredMovies.filter((movie) => movie.vote_average < rateBelow);
        noResult(filteredMovies);
      }

      removeAllChild(movieDiv);
      listMovies(alphabeticalOrder(filteredMovies));
    }

    
    if(searchFilterBox.value == "" && checkedYearRadio == null && checkedRatingRadio == null){
      changeFilterButton();
    }
  }

  document.querySelector("#detailsHeader").addEventListener('click', () => {
    containsSuggestion();
    toggleIndexFromDetails();
    clearFilterSearchBar();
    clearNumberInput();
    clearRatingInput();
    clearFilteredMovieArray();
    unCheckRadio();
  });

  document.querySelector("#clearFilters").addEventListener('click', () => {
    clearFilterSearchBar();
    clearNumberInput();
    clearRatingInput();
    clearRadioCheck();
  });

  document.querySelector("#defaultHeader").addEventListener('click', () => {
    containsSuggestion();
    toggleIndexFromDefault();
  });

  document.querySelector("#closeButton").addEventListener('click', (e) => {
    
    e.stopPropagation();
    toggleDefaultFromDetails();
  });

  document.querySelector("#matchMovies").addEventListener('click', () => {
    
    findMatchingMovies();
 
  });

  document.addEventListener('keypress', function(e) {


    if (!homeDiv.classList.contains("displayNone") && e.key === 'Enter')
     {
      findMatchingMovies(); 
     }
     else if (!defaultDiv.classList.contains("displayNone") && e.key === 'Enter') 
     {
        filter();
     }
});

});
