
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
  if(response.data.Error){
    return [];
  }
  return response.data.Search;
  
};

const input = document.querySelector('input');

const onInput = async e => {
 const movies = await fetchData(e.target.value);
 //console.log(movies);
 for(let mov of movies){
  const div = document.createElement('div');
  div.innerHTML =` 
    <img src="${mov.Poster}" />
    <h1>${mov.Title}<h1/>
  `;
  document.querySelector('#target').appendChild(div)
 }
}

input.addEventListener('input', debounce(onInput, 500))


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