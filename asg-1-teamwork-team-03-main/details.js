document.addEventListener('DOMContentLoaded', () => {

  let castContent = document.querySelector("#castContent"); 
  let crewContent = document.querySelector("#crewContent");
  let castButton = document.querySelector("#castButton");
  let crewButton = document.querySelector("#crewButton");
  let defaultDiv = document.querySelector("#default");
  let detailsDiv = document.querySelector("#details");
  let posterModal = document.querySelector("#posterModal");
  let crewSection = document.querySelector("#crewDetails");
  let castSection = document.querySelector("#castDetails");
  let body = document.querySelector("body");
  let utterance;

  function toggleDetailsFromDefault (){
    defaultDiv.classList.toggle('displayNone');
    detailsDiv.classList.toggle('displayNone');
    body.classList.toggle('bodyDetails');
  }

  function removeAllChild (parentElement) {
      
    parentElement.replaceChildren();
  }

  function getMovieFromStorage(movieId)
  {
    getMovieKeywords(movieId);
    getMovieCredit(movieId);
    getMovieDetails(movieId);
  }

  function getMovieDetails(movieId)
  {
    let detailEndpoint = getEndPoint(movieId, "detail");
    fetch(detailEndpoint)
    .then((response) => response.json())
    .then((movieDetails) =>{
    listMovieDetails(movieDetails)});
  }

  function getMovieCredit(movieId)
  {
    let creditEndpoint = getEndPoint(movieId, "credit");
    fetch(creditEndpoint)
    .then((response) => response.json())
    .then((movieCredit) =>{
    listMovieCredits(movieCredit)});
  }

  function listMovieCredits(movieCredit) 
  {
    let crewCredit = movieCredit.crew;
    let castCredit = movieCredit.cast;
    listCrew(crewCredit);
    listCast(castCredit);
  }

  function listCrew(crewCredit)
  {
    removeAllChild(crewSection);
    let sortedCrew = sortCrew(crewCredit);
    sortedCrew.forEach((crew) => {
      let jobTitle = document.createElement("div");
      let crewDepartment = document.createElement("div");
      let crewName = document.createElement("div");
      
      jobTitle.classList.add("crewJob");
      crewDepartment.classList.add("crewDepartment");
      crewName.classList.add("crewName");

      jobTitle.textContent = crew.job;
      crewDepartment.textContent = crew.department;
      crewName.textContent = crew.name;
      
      crewSection.appendChild(crewDepartment);
      crewSection.appendChild(jobTitle);
      crewSection.appendChild(crewName);
    });
  }

  function listCast(castCredit)
  {
    removeAllChild(castSection);
    let sortedCast = sortCast(castCredit);
    sortedCast.forEach((cast) => {
      let castActor = document.createElement("div");
      let castCharacter = document.createElement("div");
      
      castActor.classList.add("castName");
      castCharacter.classList.add("castCharacter");

      castActor.textContent = cast.name;
      castCharacter.textContent = cast.character;
      
      castSection.appendChild(castCharacter);
      castSection.appendChild(castActor);
    });
  }

  function sortCast(cast)
  {
    return cast.sort((castA, castB) => castA.order - castB.order);
  }

  function sortCrew(crew)
  {
    return crew.sort((crewA, crewB) => {
      let departmentComparsion = crewA.department.localeCompare(crewB.department)
      if (departmentComparsion)
      {
        return departmentComparsion;
      }
      else
      {
        return crewA.name.localeCompare(crewB.name);
      }
    });
  }

  function getMovieKeywords(movieId)
  {
    let keywordEndpoint = getEndPoint(movieId, "keyword");
    fetch(keywordEndpoint)
    .then((response) => response.json())
    .then((movieKeyword) =>{
    let keywords = movieKeyword.keywords.map((keyword) => " " + keyword.name);
    listKeywordDetails(keywords); 
    });
    
  }

  function getEndPoint(movieId, apiType)
  {
    if(apiType == "keyword")
    {
      return `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=c85833b2769308c4bf5f0c7b82795262`;
    }
    else if(apiType == "credit")
    {
      return `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c85833b2769308c4bf5f0c7b82795262&language=en-US`;
    }
    else if(apiType == "detail")
    {
      return `https://api.themoviedb.org/3/movie/${movieId}?api_key=c85833b2769308c4bf5f0c7b82795262&language=en-US&append_to_response=c85833b2769308c4bf5f0c7b82795262`;
    }
  }

  function listMovieDetails(movie)
  {
    listTitleCredit(movie);
    listMovieDescriptions(movie);
    listCompanyDetails(movie);
    listCountryDetails(movie);
    listGenres(movie);
    listPoster(movie);
  }

  function listMovieDescriptions(movieDetails)
  {
    let releaseDate = movieDetails.release_date;
    let revenue = movieDetails.revenue;
    let runtime = movieDetails.runtime;
    let tagline = movieDetails.tagline;
    let imdbLink = movieDetails.imdb_id;
    let tmdbLink = movieDetails.id;
    let overview = movieDetails.overview;
    let popularity = movieDetails.popularity;
    let voteAverage = movieDetails.vote_average;
    let voteCount = movieDetails.vote_count;

    listReleaseDate(releaseDate);
    listRevenue(revenue);
    listRuntime(runtime);
    listTagline(tagline);
    listIMDB(imdbLink);
    listTMDB(tmdbLink);
    listOverview(overview);
    listVotes(popularity, voteAverage, voteCount);
  }

  function listReleaseDate(releaseDate)
  {
    let releaseDateSection = document.querySelector("#releaseDate");
    releaseDateSection.textContent = releaseDate;
  }

  function listRevenue(revenue)
  {
    let revenueSection = document.querySelector("#revenue");
    revenueSection.textContent = "$ " + numberWithCommas(revenue);
  }
  
  // this numbersWithCommas function was taken from: https://www.codegrepper.com/code-examples/javascript/javascript+convert+number+to+dollar+with+comma
  function numberWithCommas(revenue) {
    return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function listRuntime(runtime)
  {
    let runtimeSection = document.querySelector("#runtime");
    runtimeSection.textContent = runtime + " mins";
  }

  function listTagline(tagline)
  {
    let taglineSection = document.querySelector("#tagline");
    taglineSection.textContent = tagline;
  }

  function listIMDB(imdbLink)
  {
    let imdbSection = document.querySelector("#imdb");
    imdbSection.href = `https://www.imdb.com/title/${imdbLink}`;
  }

  function listTMDB(tmdbLink)
  {
    let tmdbSection = document.querySelector("#tmdb");
    tmdbSection.href = `https://www.themoviedb.org/movie/${tmdbLink}`;
  }

  function listOverview(overview)
  {
    let overSection = document.querySelector("#overview");
    overSection.textContent = overview;
  }

  function listVotes(popularity, average, count)
  {
    let popularitySection = document.querySelector("#popularity");
    let averageSection = document.querySelector("#average");
    let countSection = document.querySelector("#count");
    popularitySection.textContent = popularity;
    averageSection.textContent = average;
    countSection.textContent = count;
  }

  function listCompanyDetails(movie)
  {
    let companySection = document.querySelector("#companyNames");
    let companyDetail = movie.production_companies;
    clearTextContent(companySection);
    let joinCompany = companyDetail.map((company) => " " + company.name);
    companySection.textContent = joinCompany.join();
  }

  function listCountryDetails(movie)
  {
    let countrySection = document.querySelector("#countryNames");
    let countryDetail = movie.production_countries;
    clearTextContent(countrySection);
    let joinCountry = countryDetail.map((country) => " " + country.name);
    countrySection.textContent = joinCountry.join();
  }

  function listGenres(movie)
  {
    let genreSection = document.querySelector("#genres");
    let genreDetail = movie.genres;
    clearTextContent(genreSection);
    let joinGenre = genreDetail.map((genre) => " " + genre.name);
    genreSection.textContent = joinGenre.join();
  }

  function listTitleCredit(movie)
  {
    let movieTitle = movie.title;
    let titleSection = document.querySelector("#movieTitleDiv h2");
    titleSection.textContent = movieTitle;
    setSpeakTitle(movieTitle);
  }

  function listPoster(movie)
  {
    let posterSection = document.querySelector("#poster");
    let mobileSection = document.querySelector("#sourceMediaPoster");
    checkIfPosterSrcIsNull(posterSection, mobileSection, movie);
    posterSection.alt = movie.title;
    setPopupPoster(movie.poster_path);
  }

  function checkIfPosterSrcIsNull(posterSection, mobileSection, movie)
  {
    if(movie.poster_path)
    {
      posterSection.src = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
      mobileSection.srcset = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
    }
    else
    {
      posterSection.src = "noImages.jpg"; 
      mobileSection.srcset = "noImages.jpg"; 
      posterSection.style.width = "342px";
      mobileSection.style.width = "185px";
    }   
  }

  function setPopupPoster(poster) 
  {
    let popupPoster = document.querySelector("#popupPoster");
    let sourceMediaPopupPoster = document.querySelector("#sourceMediaPopupPoster");
    checkIfPopupPosterSrcIsNull(popupPoster, sourceMediaPopupPoster, poster);
  }

  function checkIfPopupPosterSrcIsNull(popupPoster, sourceMediaPopupPoster, poster)
  {
    if(poster)
    {
      popupPoster.src = `https://image.tmdb.org/t/p/w780/${poster}`;
      sourceMediaPopupPoster.srcset = `https://image.tmdb.org/t/p/w300/${poster}`;
    }
    else
    {
      popupPoster.src = "noImages.jpg"; 
      sourceMediaPopupPoster.srcset = "noImages.jpg"; 
      popupPoster.style.width = "780px";
      sourceMediaPopupPoster.style.width = "300px";
    }   
  }
  function popupLaptopPoster()
  {
    posterModal.style.display = "block";
  }

  function closePopup()
  {
    posterModal.style.display = "none";
  }

  function listKeywordDetails(keywords)
  {
    let keywordSection = document.querySelector("#keywords");
    clearTextContent(keywordSection);
    keywordSection.textContent = keywords.join();
  }

  function setSpeakTitle(title)
  {
    utterance = new SpeechSynthesisUtterance(title); 
  }

  function speakTitle()
  {
    speechSynthesis.speak(utterance);
  }

  function clearTextContent(element)
  {
    element.textContent = "";
  }

  function setDisplayNone(element)
  {
    element.style.display = "none";
  }

  function setDisplayGrid(element)
  {
    element.style.display = "grid";
  }

  function toggleTab(button)
  {
    button.classList.toggle("activeTab");
  }

  castButton.addEventListener('click', () => {
    setDisplayGrid(castContent);
    setDisplayNone(crewContent);
    if (!castButton.classList.contains("activeTab"))
    {
      toggleTab(castButton);
      toggleTab(crewButton);
    }
  
  });

  crewButton.addEventListener('click', () => {
    setDisplayGrid(crewContent);
    setDisplayNone(castContent);
    
    if (!crewButton.classList.contains("activeTab"))
    {
      toggleTab(castButton);
      toggleTab(crewButton);
    }
  });


  document.addEventListener('click', (e) => {
    if(e.target && e.target.classList == "clickPoster" || e.target && e.target.classList == "clickTitle")
    {
        toggleDetailsFromDefault();
        getMovieFromStorage(e.target.dataset.id);    
    }
    else if(e.target && e.target.id == "poster")
    {
      popupLaptopPoster();
    }
    else if(e.target && e.target.classList == "close")
    {
      closePopup();
    } 
  });

  document.querySelector("#speakButton").addEventListener('click', () => {
    speakTitle();
  });

});
