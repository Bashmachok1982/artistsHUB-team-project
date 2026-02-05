import { domRefs } from './artistModal/modalElements.js';
import {
  closeArtistModal,
  initModalCloseHandlers,
  handleModalEscapeKey,
} from './artistModal/modalHandlers.js';
import { getArtistDetails } from './artistModal/artistApi.js';
import {
  renderArtistDetails,
  renderArtistAlbums,
  renderArtistGenres,
} from './artistModal/render.js';
import loader from './artistModal/loader.js';

let loaderTimerId = null;
// затримкa
const LOADER_DELAY_MS = 300;

export async function openArtistModal(artistId) {
  try {
    loader.showArtistLoader();

    const artistData = await getArtistDetails(artistId);
    const genres = artistData.genres || [];

    resetModalContent();
    renderArtistDetails(artistData);
    renderArtistAlbums(artistData.tracksList, artistData.strArtist);
    renderArtistGenres(domRefs.artist.genres, genres);

    loader.hideArtistLoader();

    domRefs.modal.classList.remove('modal--hidden');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    document.addEventListener('keydown', handleModalEscapeKey);
  } catch (error) {
    console.error('Error to load artist data:', error.message, error);
    loader.hideArtistLoader();
    alert('Artist data not found');
    closeArtistModal();
  }
}

// зачистка
function resetModalContent() {
  if (domRefs.albums.container) domRefs.albums.container.innerHTML = '';
  if (domRefs.artist.genres) domRefs.artist.genres.innerHTML = '';
}
initModalCloseHandlers();
