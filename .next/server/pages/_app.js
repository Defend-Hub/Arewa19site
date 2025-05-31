(()=>{var e={};e.id=888,e.ids=[888],e.modules={1754:e=>{e.exports={preloader:"Preloader_preloader__yX3Tq",preloaderContent:"Preloader_preloaderContent__SXBPs",pulsingLogo:"Preloader_pulsingLogo___cIyo",pulse:"Preloader_pulse__0eJ1Z"}},205:(e,t,r)=>{"use strict";r.d(t,{F:()=>i,f:()=>a});var s=r(997),n=r(6689);let o=(0,n.createContext)(),a=({children:e})=>{let[t,r]=(0,n.useState)("light");return(0,n.useEffect)(()=>{let e=localStorage.getItem("theme");e?(r(e),document.documentElement.setAttribute("data-bs-theme",e)):window.matchMedia("(prefers-color-scheme: dark)").matches&&(r("dark"),document.documentElement.setAttribute("data-bs-theme","dark"))},[]),s.jsx(o.Provider,{value:{theme:t,toggleTheme:()=>{let e="light"===t?"dark":"light";r(e),document.documentElement.setAttribute("data-bs-theme",e),localStorage.setItem("theme",e)}},children:e})},i=()=>(0,n.useContext)(o)},6297:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m});var s=r(997),n=r(6689),o=r(968),a=r.n(o),i=r(4298),l=r.n(i);r(6764);var u=r(205),d=r(1754),c=r.n(d);let p=()=>{let[e,t]=(0,n.useState)(!0),{theme:r}=(0,u.F)();return((0,n.useEffect)(()=>{let e=setTimeout(()=>{t(!1)},1e3);return()=>clearTimeout(e)},[]),e)?s.jsx("div",{className:c().preloader,children:s.jsx("div",{className:c().preloaderContent,children:s.jsx("img",{src:"dark"===r?"/assets/img/logolight.png":"/assets/img/logodark.png",alt:"Arewa19 Logo",className:c().pulsingLogo})})}):null},m=function({Component:e,pageProps:t}){let[r,o]=(0,n.useState)(!0);return(0,s.jsxs)(u.f,{children:[r&&s.jsx(p,{}),(0,s.jsxs)(a(),{children:[s.jsx("meta",{charSet:"utf-8"}),s.jsx("meta",{content:"width=device-width, initial-scale=1.0",name:"viewport"}),s.jsx("meta",{name:"description",content:"Arewa19 Pyramid - Empowering Northern Nigeria"}),s.jsx("meta",{name:"keywords",content:"Arewa, Development, Northern Nigeria, Community"})]}),s.jsx(l(),{id:"bootstrap-cdn",strategy:"beforeInteractive",src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"}),s.jsx(l(),{id:"purecounter-script",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:`
            window.PureCounter = function() {
              var self = this;
              this.start = function() {
                const elements = document.querySelectorAll('.purecounter');
                elements.forEach(function(el) {
                  const start = parseInt(el.dataset.purecounterStart || 0);
                  const end = parseInt(el.dataset.purecounterEnd || 0);
                  const duration = parseInt(el.dataset.purecounterDuration || 2);
                  let count = start;
                  const step = (end - start) / (duration * 50);
                  
                  function updateCounter() {
                    count += step;
                    if ((step > 0 && count >= end) || (step < 0 && count <= end)) {
                      count = end;
                      el.textContent = end;
                      return;
                    }
                    el.textContent = Math.round(count);
                    requestAnimationFrame(updateCounter);
                  }
                  
                  requestAnimationFrame(updateCounter);
                });
              };
              this.start();
            };
          `}}),(0,s.jsxs)(a(),{children:[s.jsx("link",{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",rel:"stylesheet"}),s.jsx("link",{href:"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css",rel:"stylesheet"}),s.jsx("link",{href:"https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css",rel:"stylesheet"}),s.jsx("link",{href:"https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/css/glightbox.min.css",rel:"stylesheet"}),s.jsx("link",{href:"https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.css",rel:"stylesheet"})]}),s.jsx(e,{...t})]})}},6764:()=>{},7093:(e,t,r)=>{"use strict";e.exports=r(2785)},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{"use strict";e.exports=require("next/head")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},167:(e,t)=>{"use strict";t._=t._interop_require_default=function(e){return e&&e.__esModule?e:{default:e}}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[298],()=>r(6297));module.exports=s})();