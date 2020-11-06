
//96326c24
//http://www.omdbapi.com/?apikey=[yourkey]&

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '96326c24',
      s: searchTerm
      // i: 'tt08488'
      //t: 'Batman'
    }
  });
  console.log(response.data);
};

const input = document.querySelector('input');

//******* Make a reusable function for even ********* */
const debounce = (callback, delay=1000) => {
  let timeoutId;
  return (...args) => {
    if(timeoutId){
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{
      callback.apply(null, args);
    }, delay)
  };
};
const onInput = e => {
 fetchData(e.target.value);
}

input.addEventListener('input', debounce(onInput, 500))
//-------------------------------------------------
//** Before make it reusable in debounce above */
// const onInput = e =>{
//   if(timeoutId){
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(()=>{
//     fetchData (e.target.value);
//   }, 1000)

// }