export const domRefs = {
  modal: document.querySelector(".modal"),
  artistDataLoader: document.getElementById("artistDataLoader"),
  artistDataSpinner: document.querySelector(
    "#artistDataLoader .artist-loader__spinner",
  ),

  artist: {
    name: document.querySelector(".modal__artist-name"),
    thumb: document.querySelector(".modal__artist-thumb"),
    years: document.querySelector(".modal__artist-years"),
    gender: document.querySelector(".modal__artist-gender"),
    members: document.querySelector(".modal__artist-members"),
    country: document.querySelector(".modal__artist-country"),
    bio: document.querySelector(".modal__artist-bio"),
    genres: document.querySelector(".modal__artist-genres"),
  },
  albums: {
    container: document.querySelector(".modal__albums-container"),
  },
  artistCardSection: document.querySelector(".modal__artist"),
};
