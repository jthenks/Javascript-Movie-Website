const movieArray = JSON.parse(favouriteMovies);

/**
 * Used double JSON.stringify() because a double parse was required for the main function. A single one was not working for some
 * reason, maybe something to do with the json file?
 * Also, the movies are added to the sessionStorage because thats where the details view extracts the data from, or else
 * clicking on the poster or title will not display any info about the movie.
 * Finally, the movie poster on the default view is different from the movie poster in the details view for some of the 
 * favouruted movies here because this is using a json file whilst the details view is using the API to retrieve data, 
 * which have updated info.
 */
function populateFavourites() 
{
  localStorage.clear();
 
  movieArray.forEach((movie) => {
     localStorage.setItem(movie.id, JSON.stringify(JSON.stringify(movie))) 
     sessionStorage.setItem(movie.id, JSON.stringify(JSON.stringify(movie))) 
  });
}
