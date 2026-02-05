import{a as $}from"./assets/vendor-CLb_lYsF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();function M(){const e=document.createElement("div");e.classList.add("artist-loader"),e.innerHTML=`
    <div class="artist-loader-spinner"></div>
  `,e.setAttribute("data-loader",""),document.body.appendChild(e)}function g(){const e=document.querySelector("[data-loader]");e&&e.remove()}const B="https://sound-wave.b.goit.study/api",i={backdrop:document.querySelector("[data-artist-modal]"),closeBtn:null,content:null};let A=[];document.addEventListener("DOMContentLoaded",()=>{i.closeBtn=document.querySelector("[data-artist-modal-close]"),i.content=document.querySelector(".artist-modal-content"),i.closeBtn&&i.closeBtn.addEventListener("click",E),i.backdrop&&i.backdrop.addEventListener("click",j)});function _(e){M(),i.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",x(e),document.addEventListener("keydown",S)}function E(){i.backdrop.classList.add("is-hidden"),document.body.style.overflow="",N(),document.removeEventListener("keydown",S),i.content&&(i.content.innerHTML="")}function j(e){e.target===i.backdrop&&E()}function S(e){e.key==="Escape"&&E()}function N(){A.forEach(({element:e,event:t,handler:n})=>{e.removeEventListener(t,n)}),A=[]}async function x(e){try{const n=(await $.get(`${B}/artists/${e}/albums`)).data;I(n),g()}catch(t){console.error("Error fetching artist details:",t),g(),F()}}function H(e){if(!e)return"Information missing";const t=e.begin,n=e.end;if(!t&&!n)return"Information missing";if(t&&!n)return`${typeof t=="number"?t:new Date(t).getFullYear()}-present`;if(t&&n){const s=typeof t=="number"?t:new Date(t).getFullYear(),r=typeof n=="number"?n:new Date(n).getFullYear();return`${s}-${r}`}return"Information missing"}function Y(e){if(!e)return"--";if(typeof e=="string"&&e.includes(":"))return e;const t=typeof e=="string"?parseInt(e,10):e,n=t>1e4?Math.floor(t/1e3):t,s=Math.floor(n/60),r=n%60;return`${s}:${r.toString().padStart(2,"0")}`}function U(e){if(e.youtubeUrl)return e.youtubeUrl;const t=e.artistName||"",n=e.title||e.strTrack||"";return n?`https://www.youtube.com/results?search_query=${encodeURIComponent(`${t} ${n}`.trim())}`:null}function D(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function I(e){const t=e.strArtist||e.name||"Unknown Artist",n=e.strArtistThumb||e.image||"",s=e.strCountry||e.country||"Unknown",r=e.strBiographyEN||e.biography||e.bio||"No biography available.",a=e.strGender||e.gender,o=e.intMembers||e.members,y={begin:e.intBornYear||e.intFormedYear||e.bornYear||null,end:e.intDiedYear||e.endYear||null};let c=[];e.genres&&Array.isArray(e.genres)?c=e.genres:e.strGenre&&(c=[e.strGenre]);const d=e.albumsList||e.albums||[];let u="";o&&o!=="0"&&o>0&&(u=`
      <div class="artist-info-item">
         <span class="artist-info-label">Members</span>
         <span class="artist-info-value">${o}</span>
      </div>`);let l="";a&&(l=`
      <div class="artist-info-item">
         <span class="artist-info-label">Sex</span>
         <span class="artist-info-value">${a}</span>
      </div>`);let h=n?`<img src="${n}" alt="${t}" class="artist-image" />`:'<div class="artist-image-placeholder">No Image</div>',f=`
  <h2 class="artist-name">${t}</h2>
  
  <div class="artist-header">
      ${h}
      
      <div class="artist-main-content">
        <div class="artist-info">
          <div class="artist-info-item">
            <span class="artist-info-label">Years active</span>
            <span class="artist-info-value">${H(y)}</span>
          </div>
          ${l}
          ${u}
          <div class="artist-info-item">
            <span class="artist-info-label">Country</span>
            <span class="artist-info-value">${s}</span>
          </div>
        </div>

        <div class="artist-biography">
          <h3 class="artist-section-title__bio">Biography</h3>
          <p class="artist-biography-text">${r}</p>
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
        ${C(d)}
      </div>
    `:""}
  `;i.content.innerHTML=f}function C(e){return e.map(t=>{const n=t.title||t.strAlbum||"Unknown Album",s=t.tracks||[];let r="";return s&&s.length>0?r=O(s):r='<p class="no-tracks">No tracks available</p>',`
    <div class="album-item">
      <h4 class="album-title">${n}</h4>
      ${r}
    </div>
  `}).join("")}function O(e){return`
    <div class="tracks-table">
      <div class="tracks-header">
        <span class="track-header-name">Track</span>
        <span class="track-header-time">Time</span>
        <span class="track-header-action">Link</span>
      </div>
      <div class="tracks-list">
        ${e.map((t,n)=>{const s=t.title||t.strTrack||"Unknown Track",r=t.length||t.intDuration||t.strDuration,a=t.strMusicVid||t.youtubeUrl||U(t);let o="";return a?o=`
                <a href="${a}" target="_blank" rel="noopener noreferrer" class="track-youtube-link">
                  <svg width="20" height="20">
                    <use href="/artistsHUB-team-project/img/icons.svg#icon-youtube"></use>
                  </svg>
                </a>
              `:o='<span class="track-no-link"></span>',`
            <div class="track-item" data-track-index="${n}">
              <span class="track-name">${D(s)}</span>
              <span class="track-time">${Y(r)}</span>
              ${o}
            </div>
          `}).join("")}
      </div>
    </div>
  `}function F(){i.content.innerHTML=`
    <div class="artist-error">
      <p>Failed to load artist details. Please try again later.</p>
    </div>
  `}const P={artistsList:document.querySelector("#artists-list"),loadMoreBtn:document.querySelector("#load-more")},{artistsList:w,loadMoreBtn:b}=P,G="https://sound-wave.b.goit.study/api/artists";let L=[],p=0;const R=8;async function z(){try{b.style.display="none",M();const t=(await $.get(G,{params:{limit:20}})).data;L=Array.isArray(t)?t:t.results||t.data||t.artists||[],q(),g()}catch(e){console.error(`Error fetching artists: ${e.message}`),g(),K()}}function K(){w.innerHTML='<p style="color: white; text-align: center;">Не вдалося завантажити артистів❗️</p>'}function q(){const e=L.slice(p,p+R);W(e),p+=e.length,p>=L.length?b.style.display="none":b.style.display="block"}function Q(e){return e.genres&&e.genres.length>0?e.genres.map(t=>`<span class="genre-tag">${t}</span>`).join(""):`<span class="genre-tag">${e.strGenre||"Music"}</span>`}function J(e){return e.strBiographyEN||e.bio||"No biography available"}function V(e){return e._id||e.idArtist}function W(e){const t=e.map(n=>`
      <li class="artist-card" data-id="${V(n)}">
        <img src="${n.strArtistThumb}" alt="${n.strArtist}" class="artist-card__photo" loading="lazy">
        <div class="artist-card__genres">${Q(n)}</div>
        <h3 class="artist-card__name">${n.strArtist}</h3>
        <p class="artist-card__bio">${J(n)}</p>
        <button type="button" class="artist-card__link js-learn-more">
          Learn More 
          <svg class="icon-learn-more" width="16" height="16">
            <use href="/artistsHUB-team-project/img/icons.svg#icon-caret-right"></use>
          </svg>
        </button>
      </li>
    `).join("");w.insertAdjacentHTML("beforeend",t)}b.addEventListener("click",q);w.addEventListener("click",e=>{if(e.target.closest(".js-learn-more")){const n=e.target.closest(".artist-card");_(n.dataset.id)}});z();const X="https://sound-wave.b.goit.study/api/feedbacks?limit=10&page=1";async function Z(e){try{return(await $.get(e)).data}catch(t){console.log(t)}}function ee(e){const t=e.map(s=>`<li class="swiper-slide item-feedback">
  <div class="stars-rating-feedback">${s.rating}</div>
<p class="text-feedback">${s.descr}</p>
<p class="text-name-feedback">${s.name}</p>
</li>`).join("");document.getElementById("card-list-feedback").insertAdjacentHTML("beforeend",t)}Z(X).then(e=>{const t=e.data;t&&t.length>0&&ee(t)}).catch(e=>console.log(e));function te(){const e=document.querySelector(".rating");if(!e)return;const t=e.querySelectorAll(".rating-star"),n=document.querySelector("#rating-input");!t.length||!n||e.dataset.initialized!=="true"&&(e.dataset.initialized="true",t.forEach(s=>{s.addEventListener("click",()=>{const r=Number(s.dataset.value);n.value=r,t.forEach(a=>{const o=Number(a.dataset.value);a.classList.toggle("active",o<=r)})})}))}function v(e,t){e.classList.add("feedback-error");let n=e.parentElement.querySelector(".feedback-error-text");n||(n=document.createElement("div"),n.className="feedback-error-text",e.parentElement.appendChild(n)),n.textContent=t}function k(e){e.classList.remove("feedback-error");const t=e.parentElement.querySelector(".feedback-error-text");t&&t.remove()}function ne(){const e=document.querySelector(".js-feedback-form");if(!e)return;const t=e.querySelector('input[name="name"]'),n=e.querySelector('textarea[name="message"]'),s=e.querySelector("#rating-input"),r=e.querySelector(".rating"),a=e.querySelector(".js-submit-text"),o=e.querySelector(".js-submit-loader");e.addEventListener("submit",async y=>{var f;y.preventDefault();const c=t.value.trim(),d=n.value.trim(),u=Number(s.value);k(t),k(n),k(r);let l=!1;if((c.length<2||c.length>16)&&(v(t,"Name must be 2–16 characters"),l=!0),(d.length<10||d.length>512)&&(v(n,"Message must be 10–512 characters"),l=!0),(u<1||u>5)&&(v(r,"Please select a rating"),l=!0),l)return;const h={name:c,rating:u,descr:d};a.hidden=!0,o.hidden=!1;try{const m=await fetch("https://sound-wave.b.goit.study/api/feedbacks",{method:"POST",headers:{"Content-Type":"application/json",accept:"application/json"},body:JSON.stringify(h)});if(!m.ok)return;const oe=await m.json();e.reset(),s.value=0,document.querySelectorAll(".rating-star").forEach(T=>T.classList.remove("active")),(f=window.feedbackModal)!=null&&f.close&&window.feedbackModal.close()}catch(m){console.log("❌ Network error:",m)}finally{a.hidden=!1,o.hidden=!0}})}function re(){document.body.classList.add("body-no-scroll")}function se(){document.body.classList.remove("body-no-scroll")}function ae(){const e=document.querySelector(".js-feedback-backdrop"),t=document.querySelector(".feedback-modal"),n=document.querySelector(".js-feedback-close");if(!e||!t||!n)return;function s(){e.hidden=!1,re()}function r(){e.hidden=!0,se()}n.addEventListener("click",r),e.addEventListener("click",a=>{a.target===e&&r()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&r()}),window.feedbackModal={open:s,close:r}}document.addEventListener("DOMContentLoaded",()=>{ae(),te(),ne()});
//# sourceMappingURL=index.js.map
