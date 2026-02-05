import{a as w}from"./assets/vendor-CLb_lYsF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const g=document.querySelector("[data-menu-open]"),M=document.querySelector("[data-menu-close]"),$=document.querySelector("[data-menu]"),x=document.querySelectorAll(".mobile-menu__link");g&&$&&g.addEventListener("click",()=>{$.classList.add("is-open"),g.classList.add("is-active"),document.body.style.overflow="hidden"});M&&M.addEventListener("click",B);x.forEach(e=>{e.addEventListener("click",B)});function B(){$.classList.remove("is-open"),g.classList.remove("is-active"),document.body.style.overflow=""}function T(){const e=document.createElement("div");e.classList.add("artist-loader"),e.innerHTML=`
    <div class="artist-loader-spinner"></div>
  `,e.setAttribute("data-loader",""),document.body.appendChild(e)}function b(){const e=document.querySelector("[data-loader]");e&&e.remove()}const H="https://sound-wave.b.goit.study/api",i={backdrop:document.querySelector("[data-artist-modal]"),closeBtn:null,content:null};let q=[];document.addEventListener("DOMContentLoaded",()=>{i.closeBtn=document.querySelector("[data-artist-modal-close]"),i.content=document.querySelector(".artist-modal-content"),i.closeBtn&&i.closeBtn.addEventListener("click",S),i.backdrop&&i.backdrop.addEventListener("click",U)});function Y(e){T(),i.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",I(e),document.addEventListener("keydown",_)}function S(){i.backdrop.classList.add("is-hidden"),document.body.style.overflow="",D(),document.removeEventListener("keydown",_),i.content&&(i.content.innerHTML="")}function U(e){e.target===i.backdrop&&S()}function _(e){e.key==="Escape"&&S()}function D(){q.forEach(({element:e,event:t,handler:n})=>{e.removeEventListener(t,n)}),q=[]}async function I(e){try{const n=(await w.get(`${H}/artists/${e}/albums`)).data;G(n),b()}catch(t){console.error("Error fetching artist details:",t),b(),K()}}function C(e){if(!e)return"Information missing";const t=e.begin,n=e.end;if(!t&&!n)return"Information missing";if(t&&!n)return`${typeof t=="number"?t:new Date(t).getFullYear()}-present`;if(t&&n){const r=typeof t=="number"?t:new Date(t).getFullYear(),s=typeof n=="number"?n:new Date(n).getFullYear();return`${r}-${s}`}return"Information missing"}function O(e){if(!e)return"--";if(typeof e=="string"&&e.includes(":"))return e;const t=typeof e=="string"?parseInt(e,10):e,n=t>1e4?Math.floor(t/1e3):t,r=Math.floor(n/60),s=n%60;return`${r}:${s.toString().padStart(2,"0")}`}function F(e){if(e.youtubeUrl)return e.youtubeUrl;const t=e.artistName||"",n=e.title||e.strTrack||"";return n?`https://www.youtube.com/results?search_query=${encodeURIComponent(`${t} ${n}`.trim())}`:null}function P(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function G(e){const t=e.strArtist||e.name||"Unknown Artist",n=e.strArtistThumb||e.image||"",r=e.strCountry||e.country||"Unknown",s=e.strBiographyEN||e.biography||e.bio||"No biography available.",o=e.strGender||e.gender,a=e.intMembers||e.members,v={begin:e.intBornYear||e.intFormedYear||e.bornYear||null,end:e.intDiedYear||e.endYear||null};let c=[];e.genres&&Array.isArray(e.genres)?c=e.genres:e.strGenre&&(c=[e.strGenre]);const d=e.albumsList||e.albums||[];let u="";a&&a!=="0"&&a>0&&(u=`
      <div class="artist-info-item">
         <span class="artist-info-label">Members</span>
         <span class="artist-info-value">${a}</span>
      </div>`);let l="";o&&(l=`
      <div class="artist-info-item">
         <span class="artist-info-label">Sex</span>
         <span class="artist-info-value">${o}</span>
      </div>`);let h=n?`<img src="${n}" alt="${t}" class="artist-image" />`:'<div class="artist-image-placeholder">No Image</div>',f=`
  <h2 class="artist-name">${t}</h2>
  
  <div class="artist-header">
      ${h}
      
      <div class="artist-main-content">
        <div class="artist-info">
          <div class="artist-info-item">
            <span class="artist-info-label">Years active</span>
            <span class="artist-info-value">${C(v)}</span>
          </div>
          ${l}
          ${u}
          <div class="artist-info-item">
            <span class="artist-info-label">Country</span>
            <span class="artist-info-value">${r}</span>
          </div>
        </div>

        <div class="artist-biography">
          <h3 class="artist-section-title__bio">Biography</h3>
          <p class="artist-biography-text">${s}</p>
        </div>

        ${c.length>0?`
          <div class="artist-genres">
            ${c.map(m=>`<span class="genre-tag__modal">${m}</span>`).join("")}
          </div>
        `:""}
      </div>
    </div>

    ${d.length>0?`
      <h3 class="artist-section-title__alb">Albums</h3>
      <div class="artist-albums">
        ${R(d)}
      </div>
    `:""}
  `;i.content.innerHTML=f}function R(e){return e.map(t=>{const n=t.title||t.strAlbum||"Unknown Album",r=t.tracks||[];let s="";return r&&r.length>0?s=z(r):s='<p class="no-tracks">No tracks available</p>',`
    <div class="album-item">
      <h4 class="album-title">${n}</h4>
      ${s}
    </div>
  `}).join("")}function z(e){return`
    <div class="tracks-table">
      <div class="tracks-header">
        <span class="track-header-name">Track</span>
        <span class="track-header-time">Time</span>
        <span class="track-header-action">Link</span>
      </div>
      <div class="tracks-list">
        ${e.map((t,n)=>{const r=t.title||t.strTrack||"Unknown Track",s=t.length||t.intDuration||t.strDuration,o=t.strMusicVid||t.youtubeUrl||F(t);let a="";return o?a=`
                <a href="${o}" target="_blank" rel="noopener noreferrer" class="track-youtube-link">
                  <svg width="20" height="20">
                    <use href="/artistsHUB-team-project/img/icons.svg#icon-youtube"></use>
                  </svg>
                </a>
              `:a='<span class="track-no-link"></span>',`
            <div class="track-item" data-track-index="${n}">
              <span class="track-name">${P(r)}</span>
              <span class="track-time">${O(s)}</span>
              ${a}
            </div>
          `}).join("")}
      </div>
    </div>
  `}function K(){i.content.innerHTML=`
    <div class="artist-error">
      <p>Failed to load artist details. Please try again later.</p>
    </div>
  `}const Q={artistsList:document.querySelector("#artists-list"),loadMoreBtn:document.querySelector("#load-more")},{artistsList:A,loadMoreBtn:y}=Q,J="https://sound-wave.b.goit.study/api/artists";let E=[],p=0;const V=8;async function W(){try{y.style.display="none",T();const t=(await w.get(J,{params:{limit:20}})).data;E=Array.isArray(t)?t:t.results||t.data||t.artists||[],j(),b()}catch(e){console.error(`Error fetching artists: ${e.message}`),b(),X()}}function X(){A.innerHTML='<p style="color: white; text-align: center;">Не вдалося завантажити артистів❗️</p>'}function j(){const e=E.slice(p,p+V);ne(e),p+=e.length,p>=E.length?y.style.display="none":y.style.display="block"}function Z(e){return e.genres&&e.genres.length>0?e.genres.map(t=>`<span class="genre-tag">${t}</span>`).join(""):`<span class="genre-tag">${e.strGenre||"Music"}</span>`}function ee(e){return e.strBiographyEN||e.bio||"No biography available"}function te(e){return e._id||e.idArtist}function ne(e){const t=e.map(n=>`
      <li class="artist-card" data-id="${te(n)}">
        <img src="${n.strArtistThumb}" alt="${n.strArtist}" class="artist-card__photo" loading="lazy">
        <div class="artist-card__genres">${Z(n)}</div>
        <h3 class="artist-card__name">${n.strArtist}</h3>
        <p class="artist-card__bio">${ee(n)}</p>
        <button type="button" class="artist-card__link js-learn-more">
          Learn More 
          <svg class="icon-learn-more" width="16" height="16">
            <use href="/artistsHUB-team-project/img/icons.svg#icon-caret-right"></use>
          </svg>
        </button>
      </li>
    `).join("");A.insertAdjacentHTML("beforeend",t)}y.addEventListener("click",j);A.addEventListener("click",e=>{if(e.target.closest(".js-learn-more")){const n=e.target.closest(".artist-card");Y(n.dataset.id)}});W();const se="https://sound-wave.b.goit.study/api/feedbacks?limit=10&page=1";async function re(e){try{return(await w.get(e)).data}catch(t){console.log(t)}}function oe(e){const t=e.map(r=>`<li class="swiper-slide item-feedback">
  <div class="stars-rating-feedback">${r.rating}</div>
<p class="text-feedback">${r.descr}</p>
<p class="text-name-feedback">${r.name}</p>
</li>`).join("");document.getElementById("card-list-feedback").insertAdjacentHTML("beforeend",t)}re(se).then(e=>{const t=e.data;t&&t.length>0&&oe(t)}).catch(e=>console.log(e));function ae(){const e=document.querySelector(".rating");if(!e)return;const t=e.querySelectorAll(".rating-star"),n=document.querySelector("#rating-input");!t.length||!n||e.dataset.initialized!=="true"&&(e.dataset.initialized="true",t.forEach(r=>{r.addEventListener("click",()=>{const s=Number(r.dataset.value);n.value=s,t.forEach(o=>{const a=Number(o.dataset.value);o.classList.toggle("active",a<=s)})})}))}function k(e,t){e.classList.add("feedback-error");let n=e.parentElement.querySelector(".feedback-error-text");n||(n=document.createElement("div"),n.className="feedback-error-text",e.parentElement.appendChild(n)),n.textContent=t}function L(e){e.classList.remove("feedback-error");const t=e.parentElement.querySelector(".feedback-error-text");t&&t.remove()}function ie(){const e=document.querySelector(".js-feedback-form");if(!e)return;const t=e.querySelector('input[name="name"]'),n=e.querySelector('textarea[name="message"]'),r=e.querySelector("#rating-input"),s=e.querySelector(".rating"),o=e.querySelector(".js-submit-text"),a=e.querySelector(".js-submit-loader");e.addEventListener("submit",async v=>{var f;v.preventDefault();const c=t.value.trim(),d=n.value.trim(),u=Number(r.value);L(t),L(n),L(s);let l=!1;if((c.length<2||c.length>16)&&(k(t,"Name must be 2–16 characters"),l=!0),(d.length<10||d.length>512)&&(k(n,"Message must be 10–512 characters"),l=!0),(u<1||u>5)&&(k(s,"Please select a rating"),l=!0),l)return;const h={name:c,rating:u,descr:d};o.hidden=!0,a.hidden=!1;try{const m=await fetch("https://sound-wave.b.goit.study/api/feedbacks",{method:"POST",headers:{"Content-Type":"application/json",accept:"application/json"},body:JSON.stringify(h)});if(!m.ok)return;const ue=await m.json();e.reset(),r.value=0,document.querySelectorAll(".rating-star").forEach(N=>N.classList.remove("active")),(f=window.feedbackModal)!=null&&f.close&&window.feedbackModal.close()}catch(m){console.log("❌ Network error:",m)}finally{o.hidden=!1,a.hidden=!0}})}function ce(){document.body.classList.add("body-no-scroll")}function le(){document.body.classList.remove("body-no-scroll")}function de(){const e=document.querySelector(".js-feedback-backdrop"),t=document.querySelector(".feedback-modal"),n=document.querySelector(".js-feedback-close");if(!e||!t||!n)return;function r(){e.hidden=!1,ce()}function s(){e.hidden=!0,le()}n.addEventListener("click",s),e.addEventListener("click",o=>{o.target===e&&s()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&s()}),window.feedbackModal={open:r,close:s}}document.addEventListener("DOMContentLoaded",()=>{de(),ae(),ie()});
//# sourceMappingURL=index.js.map
