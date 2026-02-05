import{a as k}from"./assets/vendor-CLb_lYsF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();function L(){const e=document.createElement("div");e.classList.add("artist-loader"),e.innerHTML=`
    <div class="artist-loader-spinner"></div>
  `,e.setAttribute("data-loader",""),document.body.appendChild(e)}function u(){const e=document.querySelector("[data-loader]");e&&e.remove()}const _="https://sound-wave.b.goit.study/api",o={backdrop:document.querySelector("[data-artist-modal]"),closeBtn:null,content:null};let $=[];document.addEventListener("DOMContentLoaded",()=>{o.closeBtn=document.querySelector("[data-artist-modal-close]"),o.content=document.querySelector(".artist-modal-content"),o.closeBtn&&o.closeBtn.addEventListener("click",h),o.backdrop&&o.backdrop.addEventListener("click",B)});function T(e){L(),o.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",U(e),document.addEventListener("keydown",A)}function h(){o.backdrop.classList.add("is-hidden"),document.body.style.overflow="",H(),document.removeEventListener("keydown",A),o.content&&(o.content.innerHTML="")}function B(e){e.target===o.backdrop&&h()}function A(e){e.key==="Escape"&&h()}function H(){$.forEach(({element:e,event:t,handler:s})=>{e.removeEventListener(t,s)}),$=[]}async function U(e){try{const s=(await k.get(`${_}/artists/${e}/albums`)).data;D(s),u()}catch(t){console.error("Error fetching artist details:",t),u(),C()}}function Y(e){if(!e)return"Information missing";const t=e.begin,s=e.end;if(!t&&!s)return"Information missing";if(t&&!s)return`${typeof t=="number"?t:new Date(t).getFullYear()}-present`;if(t&&s){const i=typeof t=="number"?t:new Date(t).getFullYear(),n=typeof s=="number"?s:new Date(s).getFullYear();return`${i}-${n}`}return"Information missing"}function S(e){if(!e)return"--";if(typeof e=="string"&&e.includes(":"))return e;const t=typeof e=="string"?parseInt(e,10):e,s=t>1e4?Math.floor(t/1e3):t,i=Math.floor(s/60),n=s%60;return`${i}:${n.toString().padStart(2,"0")}`}function N(e){if(e.youtubeUrl)return e.youtubeUrl;const t=e.artistName||"",s=e.title||e.strTrack||"";return s?`https://www.youtube.com/results?search_query=${encodeURIComponent(`${t} ${s}`.trim())}`:null}function j(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function D(e){const t=e.strArtist||e.name||"Unknown Artist",s=e.strArtistThumb||e.image||"",i=e.strCountry||e.country||"Unknown",n=e.strBiographyEN||e.biography||e.bio||"No biography available.";e.strType||e.type;const r=e.strGender||e.gender,a=e.intMembers||e.members,E={begin:e.intBornYear||e.intFormedYear||e.bornYear||null,end:e.intDiedYear||e.endYear||null};let c=[];e.genres&&Array.isArray(e.genres)?c=e.genres:e.strGenre&&(c=[e.strGenre]);const p=e.albumsList||e.albums||[];let b="";a&&a!=="0"&&a>0&&(b=`<div class="artist-info-item">
         <span class="artist-info-label">Members</span>
         <span class="artist-info-value">${a}</span>
       </div>`);let v="";r&&(v=`<div class="artist-info-item">
         <span class="artist-info-label">Sex</span>
         <span class="artist-info-value">${r}</span>
       </div>`);let f="";s?f=`<img src="${s}" alt="${t}" class="artist-image" />`:f='<div class="artist-image-placeholder">No Image</div>';let l=`
    <div class="artist-header">
      <h2 class="artist-name">${t}</h2>
      ${f}
    </div>
    
    <div class="artist-info">
      <div class="artist-info-item">
        <span class="artist-info-label">Years active</span>
        <span class="artist-info-value">${Y(E)}</span>
      </div>
      
      ${v}
      ${b}
      
      <div class="artist-info-item">
        <span class="artist-info-label">Country</span>
        <span class="artist-info-value">${i}</span>
      </div>
    </div>
  `;n&&(l+=`
      <div class="artist-biography">
        <h3 class="artist-section-title__bio">Biography</h3>
        <p class="artist-biography-text">${n}</p>
      </div>
    `),c&&c.length>0&&(l+=`
      <div class="artist-genres">
        ${c.map(M=>`<span class="genre-tag__modal">${M}</span>`).join("")}
      </div>
    `),p&&p.length>0&&(l+=`
      <h3 class="artist-section-title__alb">Albums</h3>
      <div class="artist-albums">
        ${I(p)}
      </div>
    `),o.content.innerHTML=l}function I(e){return e.map(t=>{const s=t.title||t.strAlbum||"Unknown Album",i=t.tracks||[];let n="";return i&&i.length>0?n=q(i):n='<p class="no-tracks">No tracks available</p>',`
    <div class="album-item">
      <h4 class="album-title">${s}</h4>
      ${n}
    </div>
  `}).join("")}function q(e){return`
    <div class="tracks-table">
      <div class="tracks-header">
        <span class="track-header-name">Track</span>
        <span class="track-header-time">Time</span>
        <span class="track-header-action">Link</span>
      </div>
      <div class="tracks-list">
        ${e.map((t,s)=>{const i=t.title||t.strTrack||"Unknown Track",n=t.length||t.intDuration||t.strDuration,r=t.strMusicVid||t.youtubeUrl||N(t);let a="";return r?a=`
                <a href="${r}" target="_blank" rel="noopener noreferrer" class="track-youtube-link">
                  <svg width="20" height="20">
                    <use href="/artistsHUB-team-project/img/icons.svg#icon-youtube"></use>
                  </svg>
                </a>
              `:a='<span class="track-no-link"></span>',`
            <div class="track-item" data-track-index="${s}">
              <span class="track-name">${j(i)}</span>
              <span class="track-time">${S(n)}</span>
              ${a}
            </div>
          `}).join("")}
      </div>
    </div>
  `}function C(){o.content.innerHTML=`
    <div class="artist-error">
      <p>Failed to load artist details. Please try again later.</p>
    </div>
  `}const x={artistsList:document.querySelector("#artists-list"),loadMoreBtn:document.querySelector("#load-more")},{artistsList:y,loadMoreBtn:m}=x,O="https://sound-wave.b.goit.study/api/artists";let g=[],d=0;const P=8;async function F(){try{m.style.display="none",L();const t=(await k.get(O,{params:{limit:20}})).data;g=Array.isArray(t)?t:t.results||t.data||t.artists||[],w(),u()}catch(e){console.error(`Error fetching artists: ${e.message}`),u(),G()}}function G(){y.innerHTML='<p style="color: white; text-align: center;">Не вдалося завантажити артистів❗️</p>'}function w(){const e=g.slice(d,d+P);z(e),d+=e.length,d>=g.length?m.style.display="none":m.style.display="block"}function R(e){return e.genres&&e.genres.length>0?e.genres.map(t=>`<span class="genre-tag">${t}</span>`).join(""):`<span class="genre-tag">${e.strGenre||"Music"}</span>`}function K(e){return e.strBiographyEN||e.bio||"No biography available"}function Q(e){return e._id||e.idArtist}function z(e){const t=e.map(s=>`
      <li class="artist-card" data-id="${Q(s)}">
        <img src="${s.strArtistThumb}" alt="${s.strArtist}" class="artist-card__photo" loading="lazy">
        <div class="artist-card__genres">${R(s)}</div>
        <h3 class="artist-card__name">${s.strArtist}</h3>
        <p class="artist-card__bio">${K(s)}</p>
        <button type="button" class="artist-card__link js-learn-more">
          Learn More 
          <svg class="icon-learn-more" width="16" height="16">
            <use href="/artistsHUB-team-project/img/icons.svg#icon-caret-right"></use>
          </svg>
        </button>
      </li>
    `).join("");y.insertAdjacentHTML("beforeend",t)}m.addEventListener("click",w);y.addEventListener("click",e=>{if(e.target.closest(".js-learn-more")){const s=e.target.closest(".artist-card");T(s.dataset.id)}});F();
//# sourceMappingURL=index.js.map
