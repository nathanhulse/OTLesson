/* Original illustration: the crowd bowing to the golden image on the plain of Dura (Daniel 3) */
function duraSVG() {
  let rnd = 7; const r = () => (rnd = (rnd * 9301 + 49297) % 233280) / 233280;
  const robes = ["#7a2e2e","#3c5a8a","#6b4e2a","#4f6b3a","#8a6a2f","#5a3a6b","#2f4f5f","#a0522d","#704214","#3d3d6b"];
  let crowd = "";
  // rows of bowing worshippers in perspective (back rows small, front rows larger)
  for (let row = 0; row < 11; row++) {
    const y = 330 + row * row * 2.1 + row * 8;
    const s = 0.45 + row * 0.11;
    const n = 26 - row;
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5 + (row % 2) * 0.5) * (1200 / n) + (r() - 0.5) * 14;
      if (row >= 6 && row <= 8 && x > 760 && x < 930) continue; // gap for the three
      const c = robes[Math.floor(r() * robes.length)];
      const dir = x < 600 ? 1 : -1; // everyone faces the statue
      crowd += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s*dir).toFixed(2)},${s.toFixed(2)})">
        <ellipse cx="0" cy="0" rx="17" ry="11" fill="${c}"/>
        <ellipse cx="0" cy="-4" rx="13" ry="6" fill="rgba(255,255,255,.12)"/>
        <circle cx="16" cy="6" r="6.5" fill="#c08a5a"/>
        <path d="M12 3 q6-6 11 1" fill="${c}"/>
        <ellipse cx="-14" cy="9" rx="7" ry="3.5" fill="rgba(0,0,0,.25)"/></g>`;
    }
  }
  // the three who stand
  const stand = (x, y, c, h) => `<g transform="translate(${x},${y}) scale(${h})">
      <ellipse cx="0" cy="62" rx="22" ry="5" fill="rgba(0,0,0,.35)"/>
      <path d="M-15 60 L-11 0 Q0 -9 11 0 L15 60 Z" fill="${c}"/>
      <path d="M-11 6 L-17 34 M11 6 L17 34" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="0" cy="-12" r="10" fill="#c08a5a"/>
      <path d="M-11 -14 Q0 -30 11 -14 L11 -9 L-11 -9Z" fill="#e9e1cc"/></g>`;
  const three = stand(800, 410, "#e9e1cc", 1.05) + stand(845, 404, "#c7d5ee", 1.1) + stand(890, 412, "#e7c9a0", 1.05);
  return `<svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2f6b"/><stop offset=".55" stop-color="#d0743a"/><stop offset="1" stop-color="#f3c27a"/></linearGradient>
    <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a866"/><stop offset="1" stop-color="#8a5a2b"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a12"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".6" stop-color="#e8b84a"/><stop offset="1" stop-color="#7a4d0e"/></linearGradient>
    <radialGradient id="halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity=".75"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
    <radialGradient id="glow3" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="640" fill="url(#sky)"/>
  <circle cx="980" cy="120" r="34" fill="#fff3c4" opacity=".85"/>
  <!-- distant Babylon: walls, gate, ziggurat -->
  <g fill="#5a3a2a" opacity=".75">
    <path d="M60 300 L60 250 L90 250 L90 238 L110 238 L110 250 L140 250 L140 300Z"/>
    <path d="M140 300 L140 262 L360 262 L360 300Z"/>
    <path d="M880 300 L905 300 L905 220 L935 220 L935 190 L975 190 L975 160 L1015 160 L1015 190 L1055 190 L1055 220 L1085 220 L1085 300Z"/>
    <path d="M1085 300 L1085 268 L1200 268 L1200 300Z"/>
  </g>
  <rect y="296" width="1200" height="344" fill="url(#sand)"/>
  <!-- the golden image: 60 cubits tall -->
  <ellipse cx="600" cy="150" rx="210" ry="210" fill="url(#halo)"/>
  <g>
    <rect x="555" y="268" width="90" height="48" fill="#6e4a22"/><rect x="545" y="262" width="110" height="10" fill="#8a6030"/>
    <path d="M574 262 L586 70 Q600 58 614 70 L626 262Z" fill="url(#gold)"/>
    <path d="M586 92 L560 170 L572 172 L592 110Z M614 92 L640 170 L628 172 L608 110Z" fill="url(#gold)"/>
    <circle cx="600" cy="54" r="16" fill="url(#gold)"/>
    <path d="M582 44 L586 22 L593 36 L600 16 L607 36 L614 22 L618 44Z" fill="#ffe08a"/>
    <path d="M594 70 L600 262" stroke="#7a4d0e" stroke-width="2" opacity=".5"/>
  </g>
  <!-- musicians on a platform -->
  <g transform="translate(330,300)" fill="#3a2414">
    <rect x="-40" y="0" width="120" height="10"/>
    <circle cx="-20" cy="-26" r="6"/><path d="M-28 0 L-25 -20 L-15 -20 L-12 0Z"/><path d="M-14 -22 L4 -40" stroke="#3a2414" stroke-width="3"/>
    <circle cx="20" cy="-26" r="6"/><path d="M12 0 L15 -20 L25 -20 L28 0Z"/><path d="M30 -30 q10 10 0 22" stroke="#3a2414" stroke-width="3" fill="none"/>
    <circle cx="58" cy="-26" r="6"/><path d="M50 0 L53 -20 L63 -20 L66 0Z"/>
  </g>
  ${crowd}
  <ellipse cx="845" cy="440" rx="120" ry="90" fill="url(#glow3)"/>
  ${three}
</svg>`;
}

if (typeof module !== "undefined") module.exports = duraSVG;
