"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const BASE_SEARCH = 'http://api.tvmaze.com/search/shows';
const PLACEHOLDER_IMAGE_LINK = 'https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300';

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // Note: Want to return earlier markup here.

  const response = await fetch(`${BASE_SEARCH}?q=${term}`);
  const jsonResponse = await response.json();
  const showsList = [];

  for (const show of jsonResponse) {
    // console.log(show.show.image.original, typeof show.show.image.original);
    const imgURL = (show.show.image.original) // Check if image exists as another test
    // ? show.show.image.original
    // : PLACEHOLDER_IMAGE_LINK;

    const curShow = `{
        id: "${show.show.id}",
        name: "${show.show.name}",
        summary: "${show.show.summary}",
        image: "${show.show.image.original}",
      }`

      $showsList.append(curShow);
  }

  return showsList;
}


/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.empty();

  for (const show in shows) {

    const $newIMG = `<img src=${show.image}></img>`;
    $showsList.append($newIMG);


    $showsList.append(show);
  }

  }


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  displayShows(shows);
}

$searchForm.on("submit", async function handleSearchForm (evt) {
  evt.preventDefault();
  await searchShowsAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function displayEpisodes(episodes) { }

// add other functions that will be useful / match our structure & design
