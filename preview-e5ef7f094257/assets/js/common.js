/* 잇올 기업·커리어 공통 스크립트 (페이지 요소가 있을 때만 각 기능 실행) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mqLg = window.matchMedia('(min-width: 1024px)');

  /* ---------- 메인 히어로 → 다음 섹션 스냅 (PC 휠, 운영 사이트 동작) ---------- */
  function initHeroSnap() {
    var hero = $('[data-hero-snap]'); if (!hero || reduced) return;
    var busy = false;
    window.addEventListener('wheel', function (e) {
      if (!mqLg.matches || Math.abs(e.deltaY) <= 2 || document.body.classList.contains('is-locked')) return;
      var nextTop = hero.nextElementSibling.offsetTop, y = window.scrollY, to = null;
      if (e.deltaY > 0 && y < nextTop - 8) to = nextTop;
      else if (e.deltaY < 0 && y > 8 && y <= nextTop + 160) to = 0;
      if (to === null) { if (busy) e.preventDefault(); return; }
      e.preventDefault();
      if (busy) return;
      busy = true; window.scrollTo({ top: to, behavior: 'smooth' });
      setTimeout(function () { busy = false; }, 700);
    }, { passive: false });
  }
  function scrollToY(y) {
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  }
  function lockScroll(on) {
    document.body.classList.toggle('is-locked', on);
    document.documentElement.style.overflow = on ? 'hidden' : '';
  }
  window.itall = { scrollToY: scrollToY, lockScroll: lockScroll };

  /* ---------- 헤더: 상단 투명 · 모바일 메뉴 ---------- */
  function initHeader() {
    var hd = $('[data-hd]'); if (!hd) return;
    var toggle = $('[data-menu-toggle]', hd), panel = $('#m-nav'), dim = $('[data-menu-dim]', hd), label = $('[data-menu-label]', hd);
    var career = hd.classList.contains('hd--career');
    var onScroll = function () { hd.classList.toggle('is-top', window.scrollY <= 0 && !hd.classList.contains('is-open')); };
    function setOpen(open) {
      hd.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open);
      label.textContent = open ? '메뉴 닫기' : '메뉴 열기';
      panel.hidden = !open; if (dim) dim.hidden = !open;
      if (career) { document.body.style.overflow = open ? 'hidden' : ''; }
      onScroll();
    }
    toggle.addEventListener('click', function () { setOpen(!hd.classList.contains('is-open')); });
    if (dim) dim.addEventListener('click', function () { setOpen(false); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && hd.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------- 패밀리 사이트 ---------- */
  function initFamily() {
    $$('[data-family]').forEach(function (box) {
      var btn = $('button', box), list = $('ul', box);
      var set = function (open) { btn.setAttribute('aria-expanded', open); list.hidden = !open; };
      btn.addEventListener('click', function () { set(list.hidden); });
      document.addEventListener('click', function (e) { if (!box.contains(e.target)) set(false); });
      box.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); btn.focus(); } });
    });
  }

  /* ---------- 맨 위로 ---------- */
  function initToTop() {
    var btn = $('[data-to-top]'); if (!btn) return;
    var on = function () { btn.classList.toggle('is-show', window.scrollY > 300); };
    window.addEventListener('scroll', on, { passive: true }); on();
    btn.addEventListener('click', function () { scrollToY(0); });
  }

  /* ---------- 등장 모션 · 카운트업 ---------- */
  function initReveal() {
    var els = $$('.reveal'); if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }
  function initCount() {
    var els = $$('[data-count]'); if (!els.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = +el.getAttribute('data-count'), t0 = performance.now();
        if (reduced) return;
        (function step(now) {
          var p = Math.min((now - t0) / 1500, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * end).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.3 });
    els.forEach(function (el) { el.textContent = '0'; io.observe(el); });
  }

  /* ---------- 모달 (dialog) ---------- */
  function openModal(id) {
    var d = document.getElementById(id); if (!d || d.open) return;
    d.showModal(); lockScroll(true);
    d.dispatchEvent(new CustomEvent('modal:open'));
  }
  function closeModal(d) {
    if (!d.open || d.classList.contains('is-closing')) return;
    d.classList.add('is-closing');
    setTimeout(function () { d.classList.remove('is-closing'); d.close(); }, reduced ? 0 : 200);
  }
  function initModals() {
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-modal-open]');
      if (o) { e.preventDefault(); openModal(o.getAttribute('data-modal-open')); return; }
      var c = e.target.closest('[data-modal-close]');
      if (c) { closeModal(c.closest('dialog')); return; }
      if (e.target.tagName === 'DIALOG') closeModal(e.target); // 바깥 영역
    });
    $$('dialog.modal').forEach(function (d) {
      d.addEventListener('cancel', function (e) { e.preventDefault(); closeModal(d); });
      d.addEventListener('close', function () { lockScroll(false); d.dispatchEvent(new CustomEvent('modal:close')); });
    });
  }
  window.itall.openModal = openModal;
  window.itall.closeModal = closeModal;

  /* ---------- 토스트 · URL 복사 ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('[data-toast]'); if (!t) return;
    clearTimeout(toastTimer); t.textContent = msg; t.classList.remove('is-hide'); t.classList.add('is-show');
    toastTimer = setTimeout(function () { t.classList.add('is-hide'); t.classList.remove('is-show'); }, 2000);
  }
  window.itall.toast = toast;
  function initCopy() {
    $$('[data-copy-url]').forEach(function (b) {
      b.addEventListener('click', function () {
        var done = function () { toast('URL이 복사되었습니다.'); };
        if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done);
        else { var i = document.createElement('input'); i.value = location.href; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); done(); }
      });
    });
  }

  /* ---------- 문의 폼 (전송 없이 화면 동작만) ---------- */
  function initInquiry() {
    var form = $('[data-inquiry]'); if (!form) return;
    var dlg = form.closest('dialog'), done = $('.iq__done', dlg), count = $('[data-char-count]', form);
    var groups = $$('[data-type]', form);
    function setType(type) {
      groups.forEach(function (g) {
        var on = g.getAttribute('data-type') === type;
        g.hidden = !on; $$('input, select', g).forEach(function (el) { el.disabled = !on; });
      });
      $$('.field', form).forEach(clearErr);
    }
    function clearErr(f) { f.classList.remove('is-invalid'); var e = $('.field__error', f); if (e) e.remove(); $$('[aria-invalid]', f).forEach(function (el) { el.removeAttribute('aria-invalid'); }); }
    function showErr(el) {
      var f = el.closest('.field'); clearErr(f); f.classList.add('is-invalid');
      var p = document.createElement('p'); p.className = 'field__error'; p.id = el.name + '-err'; p.textContent = el.getAttribute('data-msg');
      f.appendChild(p); el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', p.id);
    }
    form.addEventListener('change', function (e) {
      if (e.target.name === 'type') setType(e.target.value);
      else if (e.target.checkValidity && e.target.checkValidity()) clearErr(e.target.closest('.field'));
    });
    form.addEventListener('input', function (e) {
      if (e.target.name === 'content') count.textContent = e.target.value.length;
      if (e.target.checkValidity()) { var f = e.target.closest('.field'); if (f) clearErr(f); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = $$('input, select, textarea', form).filter(function (el) { return !el.disabled && el.name !== 'type' && !el.checkValidity(); });
      bad.forEach(showErr);
      if (bad.length) { bad[0].focus(); return; }
      form.hidden = true; done.hidden = false;
    });
    dlg.addEventListener('modal:close', function () { form.reset(); form.hidden = false; done.hidden = true; count.textContent = '0'; setType('partnership'); });
  }

  /* =========================================================
     기업 메인
     ========================================================= */
  function initHeroSlides() {
    var hero = $('[data-hero-slides]'); if (!hero || reduced) return;
    var slides = $$('.m-hero__slide', hero), cur = 0, timer = null, visible = false, first = true;
    function advance() {
      var next = (cur + 1) % slides.length, el = slides[next];
      el.classList.add('is-next', 'is-pre');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove('is-pre'); }); });
      setTimeout(function () { slides[cur].classList.remove('is-current'); el.classList.add('is-current'); el.classList.remove('is-next'); cur = next; }, 2000);
    }
    function schedule() {
      clearTimeout(timer);
      if (!visible || document.hidden) return;
      timer = setTimeout(function () { first = false; advance(); schedule(); }, first ? 1000 : 4000);
    }
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; schedule(); }, { threshold: 0.01 }).observe(hero);
    document.addEventListener('visibilitychange', schedule);
  }

  function initValues() {
    var sec = $('[data-values]'); if (!sec) return;
    var sticky = $('.m-values__sticky', sec), layers = $$('.m-values__layer', sec), labels = $$('.m-values__labels li', sec);
    var n = layers.length, top = 0, h = 1, vh = innerHeight, target = 0, cur = 0, raf = null, lit = 0, last = -1;
    function measure() { vh = innerHeight; sticky.style.height = vh + 'px'; var r = sec.getBoundingClientRect(); top = r.top + scrollY; h = Math.max(r.height - vh, 1); }
    function paint(v) {
      if (Math.abs(v - last) <= 0.001) return;
      var i = Math.min(Math.floor(v), n - 1), on = Math.min(Math.floor(v + 0.4), n - 1);
      layers.forEach(function (el, k) {
        var y = 100; if (k <= i) y = 0; else if (k === i + 1) y = 100 - 100 * Math.min(Math.max(v - i, 0), 1);
        el.style.transform = 'translate3d(0,' + y.toFixed(3) + '%,0)';
      });
      if (on !== lit) { labels[lit].classList.remove('is-on'); labels[on].classList.add('is-on'); lit = on; }
      last = v;
    }
    function tick() {
      raf = null;
      if (reduced) cur = target; else { var d = target - cur; cur += 0.06 * d; if (Math.abs(d) < 1e-4) cur = target; }
      paint(cur * n);
      if (Math.abs(target - cur) > 1e-4) raf = requestAnimationFrame(tick);
    }
    function onScroll() {
      target = Math.min(Math.max((scrollY - top) / h, 0), 1);
      var inView = scrollY + vh > top && scrollY < top + h + vh;
      if (!inView) { cur = target; paint(cur * n); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    measure(); onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); onScroll(); });
  }

  function initBrand() {
    var list = $('[data-brand]'); if (!list) return;
    var items = $$('.brand__item', list), timer;
    items[0].classList.add('is-shown');
    function sync(item, on) {
      $('.brand__btn', item).setAttribute('aria-expanded', on);
      var link = $('.brand__link', item); link.tabIndex = on ? 0 : -1;
      $('.brand__body', item).setAttribute('aria-hidden', !on);
    }
    items.forEach(function (it, k) { sync(it, k === 0); });
    function activate(item) {
      if (item.classList.contains('is-active')) return;
      clearTimeout(timer);
      items.forEach(function (it) { var on = it === item; it.classList.toggle('is-active', on); it.classList.remove('is-shown'); sync(it, on); });
      timer = setTimeout(function () { item.classList.add('is-shown'); }, reduced ? 0 : 750);
    }
    items.forEach(function (it) {
      var btn = $('.brand__btn', it);
      btn.addEventListener('click', function () { activate(it); });
      btn.addEventListener('focus', function () { if (mqMd.matches) activate(it); });
      it.addEventListener('mouseenter', function () { if (mqMd.matches) activate(it); });
    });
  }
  var mqMd = window.matchMedia('(min-width: 768px)');

  function initVision() {
    var sec = $('[data-vision]'); if (!sec) return;
    var v = $('video', sec), seen = false;
    var run = function () { if (seen && !document.hidden) { var p = v.play(); if (p) p.catch(function () {}); } else v.pause(); };
    new IntersectionObserver(function (en) { seen = en[0].isIntersecting; run(); }, { threshold: 0.15 }).observe(sec);
    document.addEventListener('visibilitychange', run);
  }

  /* =========================================================
     캐러셀 (Swiper + 진행바 c-nav)
     ========================================================= */
  var PRESETS = {
    news: { slidesPerView: 1, spaceBetween: 20, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } },
    fade: { slidesPerView: 1, effect: 'fade', fadeEffect: { crossFade: true } },
    interview: { slidesPerView: 1, spaceBetween: 20, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } },
    spaces: { slidesPerView: 1, spaceBetween: 20, grid: { rows: 1 }, breakpoints: { 768: { slidesPerView: 2, grid: { rows: 1 } }, 1024: { slidesPerView: 2, grid: { rows: 2, fill: 'row' } } } }
  };
  function carousel(root, opts) {
    var el = $('.swiper', root), nav = $('.c-nav', root);
    if (!el || !window.Swiper) return null;
    var thumb = nav && $('.c-nav__thumb', nav), prev = nav && $('[data-prev]', nav), next = nav && $('[data-next]', nav);
    var sync = function (s) {
      if (!nav) return;
      var rows = (s.params.grid && s.params.grid.rows) || 1;
      var t = rows > 1 ? Math.min(1, s.params.slidesPerView / Math.ceil(s.slides.length / rows))
        : Math.min(1, Math.max(1, s.slidesPerViewDynamic()) / Math.max(1, s.slides.length));
      var p = Math.min(1, Math.max(0, s.progress));
      nav.classList.toggle('is-static', t >= 1);
      thumb.style.setProperty('--p', (t + p * (1 - t)).toFixed(4));
      prev.disabled = s.isBeginning; next.disabled = s.isEnd;
    };
    var o = Object.assign({ grabCursor: true, a11y: { prevSlideMessage: '이전', nextSlideMessage: '다음' } }, opts || PRESETS[root.getAttribute('data-carousel')] || {});
    o.on = Object.assign({
      init: sync, progress: sync, resize: sync, slideChange: sync,
      touchStart: function () { nav && nav.classList.add('is-drag'); },
      touchEnd: function () { nav && nav.classList.remove('is-drag'); }
    }, o.on || {});
    var sw = new window.Swiper(el, o);
    if (prev) { prev.addEventListener('click', function () { sw.slidePrev(); }); next.addEventListener('click', function () { sw.slideNext(); }); }
    return sw;
  }
  window.itall.carousel = carousel;
  function initCarousels() { $$('[data-carousel="news"], [data-carousel="fade"], [data-carousel="spaces"], [data-carousel="interview"]').forEach(function (r) { carousel(r); }); }

  /* ---------- 공간 카드: 클릭(모바일) · 마우스 올림(PC) 시 설명 패널 ---------- */
  function initSpaces() {
    $$('[data-space]').forEach(function (card) {
      var open = $('.space__open', card), panel = $('.space__panel', card), clicked = false, hover = false;
      var sync = function () { var on = clicked || hover; card.classList.toggle('is-open', on); open.setAttribute('aria-expanded', on); panel.inert = !on; };
      open.addEventListener('click', function () { clicked = true; sync(); var c = $('[data-space-close]', card); setTimeout(function () { c.focus(); }, 50); });
      $('[data-space-close]', card).addEventListener('click', function () { clicked = false; hover = false; sync(); open.focus(); });
      card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hover = true; sync(); } });
      card.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hover = false; sync(); } });
      sync();
    });
  }

  /* ---------- 탭 (role=tablist · 방향키 이동) ---------- */
  function initTabs() {
    $$('[data-tabs]').forEach(function (box) {
      var tabs = $$('[role="tab"]', box);
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
          document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) tab.focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t); });
        t.addEventListener('keydown', function (e) {
          var k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
          if (e.key === 'Home') k = -i; if (e.key === 'End') k = tabs.length - 1 - i;
          if (k === undefined) return;
          e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true);
        });
      });
    });
  }

  /* ---------- 카드 묶음: 1024 미만 캐러셀 · 이상 그리드(+더보기) · 분류 필터 ---------- */
  PRESETS.cards = { slidesPerView: 1, spaceBetween: 20, breakpoints: { 768: { slidesPerView: 2 } } };
  function initCardGroups() {
    $$('[data-carousel="cards"]').forEach(function (root) {
      var until = +root.getAttribute('data-until') || 0, mq = until ? window.matchMedia('(max-width: ' + (until - 1) + 'px)') : null;
      var wrapper = $('.swiper-wrapper', root), all = $$('.swiper-slide', root), more = $('[data-more-btn]', root), sw = null;
      var filter = root.parentElement.querySelector('[data-filter]');
      function build() {
        if (sw) { sw.destroy(true, true); sw = null; }
        if (!mq || mq.matches) sw = carousel(root, PRESETS.cards);
      }
      function syncMore() { if (more) root.classList.toggle('is-collapsed', !root.classList.contains('is-expanded') && wrapper.children.length > 3); }
      if (more) more.addEventListener('click', function () { root.classList.add('is-expanded'); syncMore(); });
      if (filter) filter.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat]'); if (!b) return;
        var cat = b.getAttribute('data-cat');
        $$('[data-cat]', filter).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        wrapper.replaceChildren.apply(wrapper, all.filter(function (s) { return cat === 'all' || s.getAttribute('data-cat') === cat; }));
        root.classList.remove('is-expanded'); syncMore(); build();
      });
      if (mq) mq.addEventListener('change', build);
      syncMore(); build();
    });
  }

  /* =========================================================
     스토리 목록: 검색 · 페이지네이션 (운영: PC 10/12 · MO 5, 컬처 6/5)
     ========================================================= */
  var mqMo = window.matchMedia('(max-width: 767px)');
  var CHEV = { l: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18 9 12l6-6"/></svg>', r: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>' };
  function pageList(cur, total, max) {
    if (total <= max + 2) return Array.from({ length: total }, function (_, i) { return i + 1; });
    var half = Math.floor(max / 2), s = Math.max(2, cur - half), e = Math.min(total - 1, cur + half), out = [1];
    if (cur <= half + 1) e = Math.min(max, total - 1);
    if (cur >= total - half) s = Math.max(2, total - max + 1);
    if (s > 2) out.push('…');
    for (var i = s; i <= e; i++) out.push(i);
    if (e < total - 1) out.push('…');
    out.push(total); return out;
  }
  function escHtml(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initStoryLists() {
    $$('[data-story-search]').forEach(function (box) {
      var form = $('[data-search]', box), input = $('input', form);
      var lists = box.hasAttribute('data-list') ? [box] : $$('[data-list]', box);
      var single = lists.length === 1, query = '';
      var states = lists.map(function (list) {
        var items = $$('[data-item]', list);
        items.forEach(function (it) { var t = $('[data-title]', it); t.setAttribute('data-text', t.textContent); });
        return { list: list, items: items, page: 1, grid: $('[data-items]', list), status: $('[data-status]', list), empty: $('[data-empty]', list), pager: $('[data-pager]', list) };
      });
      function per(st) { return +st.list.getAttribute(mqMo.matches ? 'data-per-mo' : 'data-per'); }
      function render(st) {
        var q = query.toLowerCase(), hits = st.items.filter(function (it) { return !q || $('[data-title]', it).getAttribute('data-text').toLowerCase().indexOf(q) > -1; });
        var n = per(st), pages = Math.max(1, Math.ceil(hits.length / n));
        st.page = Math.min(st.page, pages);
        var from = (st.page - 1) * n, shown = hits.slice(from, from + n);
        st.items.forEach(function (it) {
          var on = shown.indexOf(it) > -1, t = $('[data-title]', it), raw = t.getAttribute('data-text');
          it.classList.toggle('is-off', !on);
          if (on) t.innerHTML = q ? escHtml(raw).replace(new RegExp(escHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), function (m) { return '<span class="hl">' + m + '</span>'; }) : escHtml(raw);
        });
        st.grid.hidden = !hits.length;
        st.status.hidden = !q;
        st.status.innerHTML = hits.length ? '<p>총 <span class="c-accent">' + hits.length + '</span>건의 결과를 찾았습니다.</p>' : '<p class="is-none">검색 결과가 없습니다.</p>';
        if (st.empty) st.empty.hidden = !!(hits.length || q);
        // 페이지 버튼
        st.pager.innerHTML = '';
        if (pages > 1) {
          var nav = document.createElement('nav'); nav.className = 'pager'; nav.setAttribute('aria-label', st.pager.getAttribute('data-label'));
          var html = '<button type="button" data-go="' + (st.page - 1) + '" aria-label="이전 페이지"' + (st.page <= 1 ? ' disabled' : '') + '>' + CHEV.l + '</button>';
          pageList(st.page, pages, 3).forEach(function (p) {
            html += p === '…' ? '<span class="pager__gap" aria-hidden="true"></span>' : '<button type="button" data-go="' + p + '"' + (p === st.page ? ' aria-current="page"' : '') + '>' + p + '</button>';
          });
          html += '<button type="button" data-go="' + (st.page + 1) + '" aria-label="다음 페이지"' + (st.page >= pages ? ' disabled' : '') + '>' + CHEV.r + '</button>';
          nav.innerHTML = html; st.pager.appendChild(nav);
        }
      }
      function renderAll() { box.classList.toggle('is-searched', !!query); states.forEach(render); }
      function syncUrl(push) {
        var p = new URLSearchParams(location.search);
        if (single && states[0].page > 1) p.set('page', states[0].page); else p.delete('page');
        if (query) p.set('q', query); else p.delete('q');
        var url = location.pathname + (p.toString() ? '?' + p : '');
        if (url !== location.pathname + location.search) history[push ? 'pushState' : 'replaceState'](null, '', url);
      }
      function jump(el) { var off = mqMo.matches ? 148 : 140; scrollToY(el.getBoundingClientRect().top + scrollY - off); }
      function readUrl() {
        var p = new URLSearchParams(location.search);
        query = (p.get('q') || '').trim(); input.value = query;
        var pg = parseInt(p.get('page'), 10); states.forEach(function (st) { st.page = single && pg > 0 ? pg : 1; });
        renderAll();
      }
      form.addEventListener('submit', function (e) {
        e.preventDefault(); query = input.value.trim();
        states.forEach(function (st) { st.page = 1; }); renderAll(); syncUrl(true); jump(box);
      });
      states.forEach(function (st) {
        st.pager.addEventListener('click', function (e) {
          var b = e.target.closest('[data-go]'); if (!b || b.disabled) return;
          st.page = +b.getAttribute('data-go'); render(st); syncUrl(true);
          jump(single ? box : $('h2', st.list));
        });
      });
      window.addEventListener('popstate', readUrl);
      mqMo.addEventListener('change', renderAll);
      readUrl();
    });
  }

  /* ---------- 미디어 영상 모달 ---------- */
  function initVideo() {
    var dlg = document.getElementById('video-modal'); if (!dlg) return;
    var frame = $('[data-video-frame]', dlg), title = $('[data-video-title]', dlg), date = $('[data-video-date]', dlg);
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-video]'); if (!b) return;
      var t = b.getAttribute('aria-label').replace(/ 영상 보기$/, '');
      title.textContent = t; date.textContent = b.getAttribute('data-date'); date.setAttribute('datetime', b.getAttribute('data-date').replace(/\./g, '-'));
      frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-video') + '?autoplay=0&rel=0&modestbranding=1" title="' + escHtml(t) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
      openModal('video-modal');
    });
    dlg.addEventListener('modal:close', function () { frame.innerHTML = ''; });
  }

  /* =========================================================
     커리어 메인 히어로: 휠·스와이프 한 번에 이미지 확장 (운영: 진행 0.1 이상 펼침 · 0.04 미만 접힘)
     ========================================================= */
  function initCareerHero() {
    var sec = $('[data-c-hero]'); if (!sec) return;
    var open = false, armed = false, lock = false, ty = 0;
    var KEYS = [' ', 'Spacebar', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    function progress() { var r = sec.getBoundingClientRect(), range = r.height - innerHeight; return range > 0 ? Math.min(Math.max(-r.top / range, 0), 1) : 0; }
    function set(v) { open = v; sec.classList.toggle('is-open', v); }
    function pinned() { var r = sec.getBoundingClientRect(); return r.top <= 0 && r.bottom > innerHeight && progress() < 0.1; }
    function expand() { if (lock || open) return; lock = true; set(true); setTimeout(function () { lock = false; }, reduced ? 0 : 1300); }
    window.addEventListener('scroll', function () {
      var p = progress();
      if (p > 0.12) armed = true;
      if (!open && p > 0.1) set(true);
      else if (open && armed && p < 0.04) { armed = false; set(false); }
    }, { passive: true });
    window.addEventListener('wheel', function (e) {
      if (lock) { e.preventDefault(); return; }
      if (!open && e.deltaY > 0 && pinned()) { e.preventDefault(); expand(); }
    }, { passive: false });
    window.addEventListener('touchstart', function (e) { ty = e.touches[0] ? e.touches[0].clientY : 0; }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (lock) { e.preventDefault(); return; }
      var d = ty - (e.touches[0] ? e.touches[0].clientY : 0);
      if (!open && d > 4 && pinned()) { e.preventDefault(); expand(); }
    }, { passive: false });
    window.addEventListener('keydown', function (e) { if (lock && KEYS.indexOf(e.key) > -1) e.preventDefault(); });
  }

  /* ---------- 실행 ---------- */
  function init() {
    initHeroSnap(); initHeader(); initFamily(); initToTop(); initModals(); initCopy(); initInquiry();
    initReveal(); initCount();
    initHeroSlides(); initValues(); initBrand(); initVision();
    initCarousels(); initCardGroups(); initStoryLists(); initVideo();
    initCareerHero(); initSpaces(); initTabs();
    if (window.itallPage) window.itallPage({ $: $, $$: $$, reduced: reduced });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
