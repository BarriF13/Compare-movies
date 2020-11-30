it('Works!!', () => {

});
it('Shows an autocomplete!', () => {
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData(){
      return [
        {Title: 'Batmen'},
        {Title: 'Not Batmen'},
        {Title: 'Some like it hot '},

      ];
    },
    renderOption(movie){
      return movie.Title;
      //we just showing title because it is test
    }
  });
  const dropdown = document.querySelector('.dropdown');

  // if we were using node we could use below 
  //asset.strictEquals(dropdown.className , 'dropdown');
});