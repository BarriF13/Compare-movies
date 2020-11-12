
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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a movie</b></label>
<input class='input'/>
<div class="dropdown "> 
  <div class="dropdown-menu">
    <div class="dropdown-content results">
   </div>
  </div>
</div>
`
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async e => {
  const movies = await fetchData(e.target.value);
if(!movies.length){
  dropdown.classList.remove('is-active');
  return;
}

  resultsWrapper.innerHTML = ''
  dropdown.classList.add('is-active');

  //console.log(movies);
  for (let mov of movies) {
    const option = document.createElement('a');

    const imgSrc = mov.Poster === 'N/A' ? '' : mov.Poster;
    option.classList.add('dropdown-item');
    option.innerHTML = ` 
    <img src="${imgSrc}" />
    ${mov.Title}
  `;
    resultsWrapper.appendChild(option);
  }
}

input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', event => {
  //  console.log(event.target);
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active')
  }

})
//-------------------------------------------------

//** Before make it reusable in debounce  */
// const onInput = e =>{
//   if(timeoutId){
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(()=>{
//     fetchData (e.target.value);
//   }, 1000)

// }
//******* Make a reusable function for even ********* */
// const debounce = (callback, delay=1000) => {
//   let timeoutId;
//   return (...args) => {
//     if(timeoutId){
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(()=>{
//       callback.apply(null, args);
//     }, delay)
//   };
// };