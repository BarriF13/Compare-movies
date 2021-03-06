//first test
// it('Works!!', () => {

// });
//--setup env before each test 
//-------- Function for waiting the code execute then run the test-- it will return a promise
const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(timeout);
        resolve();
      }
    }, 30);
    clearTimeout()

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
}
//---------
beforeEach(() => {
  document.querySelector('#target').innerHTML = '';//deleting before any autocomplete 
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        { Title: 'Batmen -' },
        { Title: 'Not Batmen -' },
        { Title: 'Some like it hot - ' },

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

it('After searching , dropdown opens up', async () => {
  //type something in 
  const input = document.querySelector('input');
  input.value = 'batman'
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item');

  const dropdown = document.querySelector('.dropdown');

  expect(dropdown.className).to.include('is-active')
});

it('After searching display some results', async () => {
  const input = document.querySelector('input');
  input.value = 'batman'
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item');

  const items = document.querySelectorAll('.dropdown-item');
  expect(items.length).to.equal(3)
});