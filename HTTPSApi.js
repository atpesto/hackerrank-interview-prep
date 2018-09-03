const https = require('https');


const getMovies = function(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
  });
};


const extractTitles = (data) => (
  data.map((movie) => {
    return movie.Title;
  })
);

const fetchMovieTitles = async (substr) => {
  let isLastPage = false;
  let movieTitles = [];

  let currentPage = 1;
  while (isLastPage === false) {
      try {
        const apiResponse = await getMovies(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${currentPage}`);

        const {_, total_pages, data} = JSON.parse(apiResponse);
        if (currentPage === total_pages) {
          isLastPage = true;
        }

        const titles = extractTitles(data);
        movieTitles = movieTitles.concat(titles);
        currentPage += 1;
      } catch (e) {
        console.log('Error');
      }
  }

  const sortedMovieTitles = movieTitles.sort().join('\n');
  console.log(sortedMovieTitles);
}


const getMovieTitles = async (substr) => {
  await fetchMovieTitles(substr);
};