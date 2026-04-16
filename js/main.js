/* ═══════════════════════════════════
   Portfolio Darari Ayoub — scripts
   ═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Scroll reveal ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  /* ─── Active nav link on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const onScroll = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── Lightbox simple pour les images ─── */
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div id="lb-backdrop"></div>
    <div id="lb-content">
      <img id="lb-img" src="" alt="">
      <button id="lb-close">✕</button>
    </div>`;
  lightbox.style.cssText = `
    display:none; position:fixed; inset:0; z-index:9999;
    align-items:center; justify-content:center;`;
  document.body.appendChild(lightbox);

  const lbBackdrop = document.getElementById('lb-backdrop');
  const lbImg      = document.getElementById('lb-img');
  const lbClose    = document.getElementById('lb-close');

  lbBackdrop.style.cssText =
    'position:absolute;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);';
  document.getElementById('lb-content').style.cssText =
    'position:relative;z-index:1;max-width:90vw;max-height:90vh;';
  lbImg.style.cssText =
    'max-width:100%;max-height:90vh;border-radius:4px;display:block;';
  lbClose.style.cssText = `
    position:absolute; top:-14px; right:-14px;
    width:32px; height:32px; border-radius:50%;
    background:#fff; border:none; cursor:pointer;
    font-size:14px; font-weight:700; color:#333;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);`;

  document.querySelectorAll('.gallery-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });
  [lbBackdrop, lbClose].forEach(el =>
    el.addEventListener('click', () => { lightbox.style.display = 'none'; })
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.style.display = 'none';
  });

});
