
const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '96326c24',
      s: searchTerm
      // i: 'tt08488'
      //t: 'Batman'
    }
  });
  //console.log(response.data);
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;

};

createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return` 
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  }
});


const onMovieSelect = async (movie) => {
  //console.log(movie);
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '96326c24',
      i: movie.imdbID
      //t: 'Batman' 
    }
  });
  //console.log(response.data);
  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}"/>
      </p>
    </figure>

    <div class="media-content">
      <div class="content">
      <h1>${movieDetail.Title}</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
    </div>
    </div>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.imbdRating}</p>
  <p class="subtitle">IMDB Rating</p>
  </article>

  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
  </article>


`;
};
