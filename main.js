/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

console.log('ghost toast');

let container = document.querySelector('.container')
let searchform = document.querySelector('.search-form')
let player = document.querySelector('.music-player')
let button = document.querySelector('.submitbutton')
let form =
document.querySelector('.search-form')
let results =
document.querySelector('.results')


form.addEventListener('submit', function(event) {
  event.preventDefault();
  //* prevent form from thinking info should be sent to server
  let input = document.querySelector('.searchvalue')
  console.log(input.value);
  goFetch(input.value);
})

function goFetch(search) {
  fetch('https://itunes.apple.com/search?term=' + search)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Oops! Looks like there was a problem, Status Code: ' + response.status);
          return;
        }
        response.json().then(function(data) {
          // console.log(data);
          // container.innerHTML = ''
          for (var i = 0; i < data.results.length; i++) {
            let image = data.results[i].artworkUrl100;
            let div = document.createElement('div')
            results.appendChild(div)
            div.classList.add('return')
            let audioSrc = data.results[i].previewUrl
            div.addEventListener('click', function(){
              player.src = audioSrc;
            })
            let template = `
            <img src="${image}" alt="">
            <h3>${data.results[i].trackName}</h3>
            `
            div.innerHTML += template;


            //once results come back, get song to play in same tab

          }

        });

      }

    )
}
