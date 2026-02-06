const exploreBtn = document.querySelector("#exploreBtn");
const artistSection = document.querySelector("#artists");

exploreBtn.addEventListener('click', () => {
    artistSection.scrollIntoView({
        behavior: "smooth",
    });
});