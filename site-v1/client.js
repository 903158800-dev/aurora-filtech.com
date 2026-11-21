(function () {
  'use strict';
  var burger = document.querySelector('.nav-burger');
  var menu = document.querySelector('.nav-menu');
  var header = document.querySelector('.site-header');
  function closeMenu(focus) {
    if (!menu || !burger) return;
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    if (focus) burger.focus();
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      burger.setAttribute('aria-expanded', String(menu.classList.toggle('open')));
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });
    document.addEventListener('click', function (event) {
      if (header && !header.contains(event.target)) closeMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
    var mobile = matchMedia('(max-width: 1100px)');
    mobile.addEventListener('change', function () { closeMenu(false); });
    function measureHeader() {
      document.documentElement.style.setProperty('--nav-height', header.getBoundingClientRect().height + 'px');
    }
    measureHeader();
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measureHeader).observe(header);
  }
  var title = document.querySelector('h1');
  var topic = title ? title.textContent.trim() : document.title.split('|')[0].trim();
  document.querySelectorAll('.cro-btn-wa').forEach(function (link) {
    link.href = 'https://wa.me/8615206119266?text=' + encodeURIComponent('Hi Aurora Filtech, I am inquiring about: ' + topic + ' (' + location.pathname + ')');
  });
  var form = document.querySelector('.cro-rfq-form');
  if (!form) return;
  var button = form.querySelector('button[type="submit"]');
  var status = form.querySelector('.cro-form-status');
  var storageKey = 'aurora-rfq-draft:' + location.pathname;
  var pending = false;
  var acceptedFingerprint = '';
  var submission = null;
  var configPromise;
  var widgetId;
  function collect() {
    var data = {};
    new FormData(form).forEach(function (value, name) { if (typeof value === 'string') data[name] = value.trim(); });
    delete data['cf-turnstile-response'];
    data.page_url = location.href.split('#')[0];
    data.page_topic = topic;
    return data;
  }
  function persist() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({data: collect(), submission: submission})); } catch (_) {}
  }
  function uncertainSubmission() {
    return submission && submission.outcome === 'uncertain' && submission.fingerprint === JSON.stringify(collect());
  }
  try {
    var draft = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (draft && draft.data) {
      Object.keys(draft.data).forEach(function (name) {
        var field = form.elements.namedItem(name);
        if (field && name !== '_honey' && typeof draft.data[name] === 'string') field.value = draft.data[name];
      });
      submission = draft.submission;
      if (['size','material','temperature','ph'].some(function (name) { return draft.data[name]; })) form.querySelector('.rfq-details').open = true;
    }
  } catch (_) {}
  form.addEventListener('input', function () {
    if (!pending) { button.disabled = Boolean(uncertainSubmission()); button.textContent = uncertainSubmission() ? 'Check submission status' : 'Send inquiry'; }
    persist();
  });
  form.addEventListener('change', persist);
  document.querySelectorAll('[data-prefill]').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu(false);
      var product = form.elements.product;
      if (product && !product.value) {
        Array.from(product.options).some(function (option, index) {
          if (option.value && topic.toLowerCase().includes(option.text.toLowerCase())) { product.selectedIndex = index; return true; }
          return false;
        });
      }
      var notes = form.elements.notes;
      if (notes && !notes.value) notes.value = '[' + (link.dataset.prefill || 'Quote Request') + ' — ' + topic + '] ';
      persist();
    });
  });
  var labels = {company:'Company',email:'Work email',name:'Name / WhatsApp',customer_type:'Buyer role',product:'Product',machine:'Machine',size:'Dimensions',material:'Material / slurry',temperature:'Temperature',ph:'pH / chemistry',notes:'Technical notes',page_url:'Source page'};
  function show(ok, message, data, reference) {
    status.className = 'cro-form-status ' + (ok ? 'cro-form-status--ok' : 'cro-form-status--warn');
    status.replaceChildren();
    var heading = document.createElement('strong');
    heading.textContent = ok ? 'Inquiry submitted. ' : 'Inquiry not confirmed. ';
    status.append(heading, document.createTextNode(message));
    if (reference) {
      var note = document.createElement('p'); note.className = 'cro-status-note'; note.textContent = 'Reference: ' + reference; status.append(note);
    }
    var summary = Object.keys(labels).filter(function (key) { return data[key]; }).map(function (key) { return labels[key] + ': ' + data[key]; }).join('\n');
    var actions = document.createElement('div'); actions.className = 'cro-status-actions';
    var email = document.createElement('a'); email.className = 'cro-st-mail'; email.textContent = 'Send by email';
    email.href = 'mailto:johnson@aurora-filtech.com?subject=' + encodeURIComponent('RFQ: ' + (data.product || topic)) + '&body=' + encodeURIComponent(summary);
    var wa = document.createElement('a'); wa.className = 'cro-st-wa'; wa.textContent = 'WhatsApp'; wa.target = '_blank'; wa.rel = 'noopener';
    wa.href = 'https://wa.me/8615206119266?text=' + encodeURIComponent(summary);
    var copy = document.createElement('button'); copy.type = 'button'; copy.className = 'cro-st-copy'; copy.textContent = 'Copy inquiry';
    copy.addEventListener('click', async function () {
      try { await navigator.clipboard.writeText(summary); copy.textContent = 'Copied'; }
      catch (_) { window.prompt('Copy your inquiry:', summary); }
    });
    actions.append(email, wa, copy); status.append(actions);
    status.style.display = 'block'; status.focus({preventScroll:true});
    status.scrollIntoView({block:'nearest',behavior:'auto'});
  }
  var uncertainMessage = 'The mail server reply was interrupted, so this inquiry may already have been sent. Please contact us by Email or WhatsApp before submitting again.';
  if (uncertainSubmission()) {
    button.disabled = true; button.textContent = 'Check submission status';
    show(false, uncertainMessage, collect(), submission.reference);
  }
  async function prepare() {
    if (location.protocol === 'file:') return {configured:false};
    if (!configPromise) configPromise = (async function () {
      var response = await fetch('/api/rfq', {headers:{Accept:'application/json'},signal:AbortSignal.timeout(8000)});
      var info = await response.json();
      if (info.service !== 'aurora-rfq') throw new Error('Unavailable');
      if (info.turnstileSiteKey) {
        if (!window.turnstile) await new Promise(function (resolve, reject) {
          var script = document.createElement('script');
          script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
          var timeout = setTimeout(failed, 8000);
          function failed() {
            clearTimeout(timeout);
            script.remove();
            reject(new Error('Verification could not load'));
          }
          script.onload = function () { clearTimeout(timeout); resolve(); };
          script.onerror = failed;
          document.head.append(script);
        });
        widgetId = window.turnstile.render(form.querySelector('.rfq-verification'), {
          sitekey:info.turnstileSiteKey, action:'rfq', appearance:'interaction-only', theme:'light',
          size:matchMedia('(max-width: 420px)').matches ? 'compact' : 'normal',
          'response-field':false, 'refresh-expired':'auto'
        });
      }
      return info;
    })().catch(function (error) { configPromise = null; throw error; });
    return configPromise;
  }
  form.addEventListener('focusin', function () { prepare().catch(function () {}); }, {once:true});
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    var data = collect();
    var fingerprint = JSON.stringify(data);
    if (data._honey) return;
    if (uncertainSubmission()) { show(false, uncertainMessage, data, submission.reference); return; }
    if (fingerprint === acceptedFingerprint) return;
    if (!submission || submission.fingerprint !== fingerprint) submission = {fingerprint:fingerprint,id:crypto.randomUUID()};
    data.submission_id = submission.id;
    persist(); pending = true; button.disabled = true; button.textContent = 'Sending…'; form.setAttribute('aria-busy','true');
    var accepted = false;
    var blockRetry = false;
    try {
      var info = await prepare();
      if (!info.configured) {
        configPromise = null;
        show(false, 'Online sending is temporarily unavailable. Use Email or WhatsApp below. Your details are kept in this tab.', data);
        return;
      }
      if (info.turnstileSiteKey) {
        data['cf-turnstile-response'] = window.turnstile.getResponse(widgetId);
        if (!data['cf-turnstile-response']) { show(false,'Please wait for verification, then select Send inquiry again.',data); return; }
      }
      // Save the unknown outcome before POST: closing/reloading the tab must not invite a duplicate.
      submission.outcome = 'uncertain'; persist(); blockRetry = true;
      var response = await fetch('/api/rfq', {method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(30000)});
      var result = await response.json().catch(function () { return null; });
      if (response.ok && result && result.ok === true && result.id) {
        accepted = true; acceptedFingerprint = fingerprint; blockRetry = false;
        delete submission.outcome;
        try { sessionStorage.removeItem(storageKey); } catch (_) {}
        show(true,'Your request has been accepted for sending. Our team normally replies within one business day.',data,result.reference);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event:'generate_lead',form_id:'aurora_rfq_form',page_topic:topic});
      } else {
        if (result && result.ok === false && result.code && result.retryable !== false) {
          blockRetry = false; delete submission.outcome;
        }
        if (result && result.reference) submission.reference = result.reference;
        persist();
        show(false,result && result.message ? result.message : uncertainMessage,data,result && result.reference);
      }
    } catch (_) {
      show(false,blockRetry ? uncertainMessage : 'We could not reach the inquiry service. Please retry or use Email or WhatsApp below; your inquiry is kept in this tab.',data);
    } finally {
      pending = false; button.disabled = accepted || blockRetry; button.textContent = accepted ? 'Inquiry submitted' : (blockRetry ? 'Check submission status' : 'Send inquiry'); form.removeAttribute('aria-busy');
      if (data['cf-turnstile-response'] && widgetId !== undefined && window.turnstile) window.turnstile.reset(widgetId);
    }
  });
})();
