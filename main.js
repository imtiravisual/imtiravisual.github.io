(function () {
  var S = window.SITE, T = window.TEXT;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = 'en';

  function t(key) { return (T[lang] && T[lang][key]) || T.en[key] || ''; }
  function tr(obj) { return typeof obj === 'string' ? obj : (obj && (obj[lang] || obj.en)) || ''; }
  function reduced() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* ---------- links ---------- */
  function waUrl() { return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(t('wa.msg')); }
  function setLinks() {
    $$('.wa-link').forEach(function (a) { a.href = waUrl(); });
    $$('.ig-link').forEach(function (a) { a.href = S.instagram; });
    $$('.mail-link').forEach(function (a) { a.href = 'mailto:' + S.email; a.textContent = S.email; });
  }

  /* ---------- translations ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $('#playerClose').setAttribute('aria-label', t('close'));
    setLinks();
    renderDynamic();
  }

  /* ---------- helpers ---------- */
  function isWide(o) { return /^(16:9|wide|horizontal|landscape)$/i.test(o.ratio || ''); }
  function ratioCss(o) { var m = (o.ratio || '').match(/^(\d+):(\d+)$/); return m ? m[1] + '/' + m[2] : (isWide(o) ? '16/9' : '9/16'); }
  function isVideoFile(src) { return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(src); }

  /* ---------- hero phones ---------- */
  function renderPhones() {
    var box = $('#heroPhones'); box.innerHTML = '';
    (S.heroReels || (S.reels || []).filter(function (r) { return !isWide(r); })).slice(0, 3).forEach(function (r) {
      var p = document.createElement(r.src ? 'button' : 'div'); p.className = 'phone' + (r.src ? ' has-video' : '');
      if (r.src) { p.type = 'button'; p.setAttribute('aria-label', t('play') + ': ' + tr(r.title)); p.addEventListener('click', function () { openPlayer(r.src); }); }
      if ((r.preview || r.src) && isVideoFile(r.preview || r.src)) {
        var v = document.createElement('video');
        v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none'; v.poster = r.poster; v.dataset.src = r.preview || r.src; v.className = 'lazyvid';
        p.appendChild(v);
      } else {
        var i = document.createElement('img'); i.src = r.poster; i.alt = ''; p.appendChild(i);
      }
      box.appendChild(p);
    });
    observeVideos();
  }

  /* ---------- reels ---------- */
  function renderReels() {
    var box = $('#reels'), boxW = $('#reelsWide'); box.innerHTML = ''; boxW.innerHTML = '';
    (S.reels || []).forEach(function (r) {
      var b = document.createElement(r.src ? 'button' : 'div');
      if (isWide(r)) b.style.aspectRatio = ratioCss(r);
      b.className = 'reel reveal in' + (r.src ? ' has-video' : '');
      if (r.src) { b.type = 'button'; b.setAttribute('aria-label', t('play') + ': ' + tr(r.title)); b.addEventListener('click', function () { openPlayer(r.src); }); }
      var img = document.createElement('img'); img.src = r.poster; img.alt = tr(r.title); img.loading = 'lazy'; b.appendChild(img);
      if (r.src) { var pl = document.createElement('span'); pl.className = 'play'; b.appendChild(pl); }
      var c = document.createElement('span'); c.className = 'cap'; c.textContent = tr(r.title); b.appendChild(c);
      (isWide(r) ? boxW : box).appendChild(b);
    });
    boxW.hidden = !boxW.children.length; box.hidden = !box.children.length;
  }

  /* ---------- player dialog ---------- */
  var dlg = $('#player'), body = $('#playerBody');
  function embedUrl(src) {
    var m = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
    if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0';
    m = src.match(/vimeo\.com\/(\d+)/);
    if (m) return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1';
    return null;
  }
  function openPlayer(src) {
    if (/instagram\.com/i.test(src)) { window.open(src, '_blank', 'noopener'); return; }
    body.innerHTML = ''; body.className = '';
    var e = embedUrl(src);
    if (e) {
      var f = document.createElement('iframe'); f.src = e; f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true;
      if (/vimeo|youtube\.com\/watch|youtu\.be/.test(src)) body.className = 'wide';
      body.appendChild(f);
    } else {
      var v = document.createElement('video'); v.src = src; v.controls = true; v.muted = false; v.autoplay = true; v.playsInline = true; body.appendChild(v); var pp = v.play(); if (pp && pp.catch) pp.catch(function () {});
    }
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function closePlayer() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); body.innerHTML = ''; }
  $('#playerClose').addEventListener('click', closePlayer);
  dlg.addEventListener('click', function (ev) { if (ev.target === dlg) closePlayer(); });
  dlg.addEventListener('close', function () { body.innerHTML = ''; });

  /* ---------- lazy video play/pause ---------- */
  var vio;
  function observeVideos() {
    if (!('IntersectionObserver' in window)) return;
    if (!vio) {
      vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target;
          if (en.isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            if (!reduced()) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          } else { v.pause(); }
        });
      }, { threshold: 0.25 });
    }
    $$('video.lazyvid').forEach(function (v) { vio.observe(v); });
  }

  /* ---------- before / after sliders ---------- */
  function mkVideo(src, cls) {
    var v = document.createElement('video');
    v.className = cls + ' lazyvid'; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none'; v.dataset.src = src;
    return v;
  }
  function renderBA() {
    var grid = $('#baGrid'); grid.innerHTML = '';
    (S.beforeAfter || []).forEach(function (item) {
      var wrap = document.createElement('div'); wrap.className = 'ba reveal in' + (isWide(item) ? ' wide' : '');
      var fr = document.createElement('div'); fr.className = 'ba-frame'; fr.style.aspectRatio = ratioCss(item);
      var after = mkVideo(item.after, 'v-after'), before = mkVideo(item.before, 'v-before');
      if (item.poster) { after.poster = item.poster; before.poster = item.poster; }
      var empty = document.createElement('div'); empty.className = 'ba-empty'; empty.textContent = t('ba.soon');
      var tl = document.createElement('span'); tl.className = 'ba-tag l'; tl.textContent = t('ba.before');
      var tr_ = document.createElement('span'); tr_.className = 'ba-tag r'; tr_.textContent = t('ba.after');
      var h = document.createElement('button'); h.type = 'button'; h.className = 'ba-handle'; h.setAttribute('role', 'slider');
      h.setAttribute('aria-label', t('ba.handle')); h.setAttribute('aria-valuemin', 0); h.setAttribute('aria-valuemax', 100); h.setAttribute('aria-valuenow', 50);
      h.innerHTML = '<i aria-hidden="true">↔</i>';
      var snd = document.createElement('button'); snd.type = 'button'; snd.className = 'ba-sound'; snd.setAttribute('aria-pressed', 'false');
      snd.setAttribute('aria-label', t('ba.sndOn'));
      snd.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path class="on" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg>';
      fr.append(empty, after, before, tl, tr_, h, snd);
      var cap = document.createElement('p'); cap.className = 'ba-title'; cap.textContent = tr(item.title);
      wrap.append(fr, cap); grid.appendChild(wrap);

      function fail() { fr.classList.add('empty'); }
      after.addEventListener('error', fail); before.addEventListener('error', fail);

      var soundOn = false, curP = 50;
      function applySound() {
        var side = curP >= 50 ? 'before' : 'after';
        before.muted = !soundOn || side !== 'before';
        after.muted = !soundOn || side !== 'after';
        tl.classList.toggle('live', soundOn && side === 'before'); tr_.classList.toggle('live', soundOn && side === 'after');
      }
      function setSound(on) {
        soundOn = on; snd.setAttribute('aria-pressed', on); snd.setAttribute('aria-label', t(on ? 'ba.sndOff' : 'ba.sndOn'));
        if (on) { document.dispatchEvent(new CustomEvent('ba-sound', { detail: fr })); if (after.paused) { after.play().catch(function () {}); } }
        applySound();
      }
      snd.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
      snd.addEventListener('click', function () { setSound(!soundOn); });
      document.addEventListener('ba-sound', function (e) { if (e.detail !== fr && soundOn) setSound(false); });
      after.addEventListener('pause', function () { if (soundOn) setSound(false); });
      function setP(p) {
        p = Math.max(0, Math.min(100, p)); curP = p;
        fr.style.setProperty('--p', p + '%'); h.setAttribute('aria-valuenow', Math.round(p));
        if (soundOn) applySound();
      }
      var dragging = false;
      function fromEvent(e) { var r = fr.getBoundingClientRect(); setP((e.clientX - r.left) / r.width * 100); }
      fr.addEventListener('pointerdown', function (e) {
        if (fr.classList.contains('empty')) return;
        dragging = true; try { fr.setPointerCapture(e.pointerId); } catch (x) {} fromEvent(e);
      });
      fr.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
      ['pointerup', 'pointercancel'].forEach(function (n) { fr.addEventListener(n, function () { dragging = false; }); });
      h.addEventListener('keydown', function (e) {
        var cur = parseFloat(fr.style.getPropertyValue('--p')) || 50;
        if (e.key === 'ArrowLeft') { setP(cur - 5); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setP(cur + 5); e.preventDefault(); }
      });

      // keep the two videos in sync
      after.addEventListener('timeupdate', function () { if (Math.abs(before.currentTime - after.currentTime) > 0.25) before.currentTime = after.currentTime; });
      after.addEventListener('play', function () { var p = before.play(); if (p && p.catch) p.catch(function () {}); });
      after.addEventListener('pause', function () { before.pause(); });
      before.addEventListener('loadeddata', function () { if (!after.paused) { before.currentTime = after.currentTime; before.play().catch(function () {}); } });
      // before is driven by after; only observe the after video
      before.classList.remove('lazyvid');
      var bio = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { if (!before.src) before.src = before.dataset.src; }
      }, { threshold: 0.05 }); bio.observe(fr);

      // intro sweep hint
      var done = false, io2 = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting && !done && !reduced() && !fr.classList.contains('empty')) {
          done = true; var s = null;
          (function step(ts) {
            s = s || ts; var k = (ts - s) / 1600;
            if (k >= 1 || dragging) return;
            setP(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k)); requestAnimationFrame(step);
          })(performance.now());
        }
      }, { threshold: 0.6 }); io2.observe(fr);
    });
    observeVideos();
  }

  /* ---------- trusted by marquee ---------- */
  function renderMarquee() {
    var track = $('#track'); track.innerHTML = '';
    var list = S.clients || [];
    if (!list.length) { $('#trusted').hidden = true; return; }
    var reps = Math.max(3, Math.ceil(8 / list.length));
    function group(hidden) {
      var g = document.createElement('div'); g.className = 'grp'; if (hidden) g.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < reps; i++) list.forEach(function (c) {
        var im = document.createElement('img'); im.src = c.logo; im.alt = hidden ? '' : c.name; g.appendChild(im);
      });
      return g;
    }
    track.append(group(false), group(true));
  }

  /* ---------- testimonials ---------- */
  function renderQuotes() {
    var sec = $('#testimonials'), list = S.testimonials || [], shots = S.testimonialImages || [];
    sec.hidden = !(list.length || shots.length);
    var box = $('#quotes'); box.innerHTML = '';
    list.forEach(function (q) {
      var b = document.createElement('blockquote'); b.className = 'reveal in';
      var p = document.createElement('p'); p.textContent = '\u201C' + tr(q.quote) + '\u201D';
      var c = document.createElement('cite'); c.textContent = q.name + (q.role ? ' \u2014 ' + q.role : '');
      b.append(p, c); box.appendChild(b);
    });
    $('.ts-note').hidden = !shots.length;
    var wrap = $('#shots'); wrap.innerHTML = '';
    if (!shots.length) return;
    function row(items, rev) {
      var m = document.createElement('div'); m.className = 'shots-row' + (rev ? ' rev' : '');
      var tk = document.createElement('div'); tk.className = 'shots-track';
      [0, 1].forEach(function (k) {
        var g = document.createElement('div'); g.className = 'shots-grp'; if (k) g.setAttribute('aria-hidden', 'true');
        items.forEach(function (src) {
          var im = document.createElement('img'); im.src = src; im.alt = k ? '' : 'Client message'; im.loading = 'lazy';
          im.addEventListener('load', function () { im.style.width = Math.round(im.naturalWidth * 1.3) + 'px'; });
          g.appendChild(im);
        });
        tk.appendChild(g);
      });
      m.appendChild(tk); wrap.appendChild(m);
    }
    var half = Math.ceil(shots.length / 2);
    row(shots.slice(0, half), false); row(shots.slice(half), true);
  }

  function renderDynamic() { renderPhones(); renderReels(); renderBA(); renderMarquee(); renderQuotes(); }

  /* ---------- contact form ---------- */
  var form = $('#form'), status = $('#status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    if (d.get('botcheck')) return;
    var name = (d.get('name') || '').trim(), contact = (d.get('contact') || '').trim(), msg = (d.get('message') || '').trim();
    if (!name || !contact || !msg) { form.reportValidity && form.querySelectorAll('[required]').forEach(function (f) { f.reportValidity(); }); return; }
    status.className = 'status'; status.textContent = '…';
    if (!S.formKey) {
      var body = 'Name: ' + name + '\nContact: ' + contact + '\n\n' + msg;
      window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Imtira Visual — ' + name) + '&body=' + encodeURIComponent(body);
      status.textContent = ''; return;
    }
    fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: S.formKey, subject: 'New message — Imtira Visual', name: name, email: contact, message: msg })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j.success) { status.textContent = t('ct.ok'); form.reset(); } else throw 0;
    }).catch(function () { status.className = 'status err'; status.textContent = t('ct.err'); });
  });

  /* ---------- nav shadow + reveal ---------- */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }); }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el) { rio.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- custom cursor (mouse devices only) ---------- */
  (function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var root = document.documentElement;
    var dot = document.createElement('div'); dot.className = 'cur-dot';
    var ring = document.createElement('div'); ring.className = 'cur-ring';
    var lab = document.createElement('span'); ring.appendChild(lab);
    document.body.append(ring, dot);
    var mx = -100, my = -100, rx = -100, ry = -100, shown = false, slow = !reduced();
    function show() { if (!shown) { shown = true; root.classList.add('has-cursor'); ring.style.opacity = dot.style.opacity = 1; } }
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; show(); dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)'; }, { passive: true });
    document.addEventListener('mouseleave', function () { ring.style.opacity = dot.style.opacity = 0; shown = false; root.classList.remove('has-cursor'); });
    window.addEventListener('mousedown', function () { ring.classList.add('down'); });
    window.addEventListener('mouseup', function () { ring.classList.remove('down'); });
    window.addEventListener('mouseover', function (e) {
      var el = e.target; if (!el.closest) return;
      var text = el.closest('input,textarea');
      root.classList.toggle('cur-text', !!text);
      var media = el.closest('.has-video'), ba = el.closest('.ba-frame:not(.empty)');
      var hov = el.closest('a,button,label,[role=slider]');
      ring.classList.toggle('media', !!media); ring.classList.toggle('drag', !!ba && !media);
      ring.classList.toggle('hover', !!hov && !media && !ba);
      lab.textContent = media ? t('play') : (ba ? '\u2194' : '');
    });
    (function loop() {
      rx += (mx - rx) * (slow ? 0.18 : 1); ry += (my - ry) * (slow ? 0.18 : 1);
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    // native cursor comes back while the video popup is open (it sits above the page)
    var d = document.getElementById('player');
    new MutationObserver(function () { root.classList.toggle('cur-off', d.hasAttribute('open')); }).observe(d, { attributes: true, attributeFilter: ['open'] });
  })();

  applyLang();
})();
