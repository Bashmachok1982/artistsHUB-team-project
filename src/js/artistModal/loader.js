import { domRefs } from "./modalElements.js";

function showArtistLoader() {
  if (!domRefs.artistDataLoader || !domRefs.artistCardSection) {
    console.error("DOM references for loader are not found!");
    return;
  }
  document
    .querySelector("#globalLoader")
    .classList.remove("global-loader--hidden");
  domRefs.artistDataLoader.classList.remove("artist-loader--hidden");
  domRefs.artistDataLoader.classList.add("artist-loader--visible");
  domRefs.artistCardSection.classList.add("hidden");
}

function hideArtistLoader() {
  if (!domRefs.artistDataLoader || !domRefs.artistCardSection) {
    console.error("DOM references for loader are not found!");
    return;
  }
  document
    .querySelector("#globalLoader")
    .classList.add("global-loader--hidden");
  domRefs.artistDataLoader.classList.remove("artist-loader--visible");
  domRefs.artistDataLoader.classList.add("artist-loader--hidden");
  domRefs.artistCardSection.classList.remove("hidden");
}

export default {
  showArtistLoader,
  hideArtistLoader,
};
