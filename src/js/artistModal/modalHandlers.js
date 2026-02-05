import { domRefs } from "./modalElements.js";

function closeArtistModal() {
  domRefs.modal.classList.add("modal--hidden");
  document.body.classList.remove("no-scroll");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.removeEventListener("keydown", handleModalEscapeKey);
}

function initModalCloseHandlers() {
  const closeButton = document.querySelector(".modal__close-btn");
  const overlay = document.querySelector(".modal");

  if (closeButton) {
    closeButton.addEventListener("click", closeArtistModal);
  }
  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeArtistModal();
      }
    });
  }
}

function handleModalEscapeKey(e) {
  if (
    e.key === "Escape" &&
    !domRefs.modal.classList.contains("modal--hidden")
  ) {
    closeArtistModal();
  }
}

export { closeArtistModal, initModalCloseHandlers, handleModalEscapeKey };
