//first test
// it('Works!!', () => {

// });
//--setup env before each test 
beforeEach(() => {
  document.querySelector('#target').innerHTML = '';//deleting before any autocomplete 
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        { Title: 'Batmen' },
        { Title: 'Not Batmen' },
        { Title: 'Some like it hot ' },

      ];
    },
    renderOption(movie) {
      return movie.Title;
    }
  });

});

it('Shows an autocomplete!Dropdown Starts closed', () => {
  // createAutoComplete({
  //   root: document.querySelector('#target'),
  //   fetchData() {
  //     return [
  //       { Title: 'Batmen' },
  //       { Title: 'Not Batmen' },
  //       { Title: 'Some like it hot ' },

  //     ];
  //   },
  //   renderOption(movie) {
  //     return movie.Title;
  //     //we just showing title because it is test
  //   }
  // });
  const dropdown = document.querySelector('.dropdown');

  // if we were using node we could use assertion --FOR ASSERTION IN BROWSER WE USE CHAI
  //asset.strictEquals(dropdown.className , 'dropdown');
  expect(dropdown.className).not.to.include('is-active')
});

it('After searching , dropdown opens up', () => {
  //type something in 
  const input = document.querySelector('input');
  input.value = 'batman'
  input.dispatchEvent(new Event('input'));

  const dropdown = document.querySelector('.dropdown');

  expect(dropdown.className).to.include('is-active')
});