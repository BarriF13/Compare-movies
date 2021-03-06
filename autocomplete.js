
//const createAutoComplete = (config) =>{
const createAutoComplete = ({
  root, // html element that we show autocomp in it
  renderOption, //fn for rendering each movie
  onOptionSelect, //fn when we click on any option
  inputValue, // after choosing throw the title in the input 
  fetchData // getting the data and look for it in api and data back 
}) => {

  root.innerHTML = `
  <label><b>Search</b></label>
  <input class='input'/>
  <div class="dropdown "> 
    <div class="dropdown-menu">
      <div class="dropdown-content results">
     </div>
    </div>
  </div>
  `
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async e => {
    const items = await fetchData(e.target.value);
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    resultsWrapper.innerHTML = ''
    dropdown.classList.add('is-active');

    //console.log(items);
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      //choosing part 
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
  }

  input.addEventListener('input', debounce(onInput, 500))

  document.addEventListener('click', event => {
    //  console.log(event.target);
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active')
    }

  });
};