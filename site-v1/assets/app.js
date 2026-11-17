(function(){
  var burger = document.querySelector('.nav-burger');
  var menu = document.querySelector('.nav-menu');
  if (burger && menu) {
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }
  var h1 = document.querySelector('h1');
  var pageTopic = h1 ? h1.textContent.trim() : document.title.split('|')[0].trim();
  document.querySelectorAll('.cro-btn-wa').forEach(function(el){
    el.href = 'https://wa.me/8615206119266?text=' + encodeURIComponent('Hi Aurora Filtech, I am inquiring about: ' + pageTopic + ' (' + window.location.pathname + ')');
  });
  document.querySelectorAll('[data-prefill]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var intent = btn.getAttribute('data-prefill') || 'Quote Request';
      var prodSelect = document.getElementById('f-product');
      if (prodSelect) {
        for (var i = 0; i < prodSelect.options.length; i++) {
          if (prodSelect.options[i].value && pageTopic.toLowerCase().indexOf(prodSelect.options[i].text.toLowerCase()) !== -1) {
            prodSelect.selectedIndex = i;
            break;
          }
        }
      }
      var reqBox = document.getElementById('f-request');
      if (reqBox && !reqBox.value) {
        reqBox.value = '[' + intent + ' — ' + pageTopic + '] ';
      }
      setTimeout(function(){
        var typeSelect = document.getElementById('f-type');
        var firstInput = (typeSelect && !typeSelect.value) ? typeSelect : document.getElementById('f-company');
        if (firstInput) firstInput.focus();
      }, 350);
    });
  });
  var form = document.querySelector('.cro-rfq-form');
  if (form) {
    var btn = form.querySelector('button[type="submit"]');
    var defaultBtnText = btn ? btn.textContent : 'Get 24h Engineering Quote →';
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (form.checkValidity && !form.checkValidity()) {
        if (form.reportValidity) form.reportValidity();
        return;
      }
      var fd = new FormData(form);
      var data = {};
      fd.forEach(function(v, k){ data[k] = typeof v === 'string' ? v.trim() : v; });
      if (data._honey) return;
      data.page_url = window.location.href;
      data.page_topic = pageTopic;
      if (data.email && !data._replyto) data._replyto = data.email;
      if (btn) { btn.disabled = true; btn.textContent = 'Sending Request...'; }
      var summaryLines = [
        'Company: ' + (data.company || '-'),
        'Email: ' + (data.email || '-'),
        'Name: ' + (data.name || '-'),
        data.customer_type ? ('Role: ' + data.customer_type) : '',
        data.product ? ('Product: ' + data.product) : ('Page: ' + pageTopic),
        data.machine ? ('Machine: ' + data.machine) : '',
        data.size ? ('Dimensions: ' + data.size) : '',
        data.material ? ('Slurry/Media: ' + data.material) : '',
        data.temperature ? ('Temp: ' + data.temperature) : '',
        data.ph ? ('pH: ' + data.ph) : '',
        'Details: ' + (data.notes || data.request || '-')
      ].filter(Boolean).join('\n');
      var waUrl = 'https://wa.me/8615206119266?text=' + encodeURIComponent('New RFQ from ' + (data.company || 'Website') + ':\n' + summaryLines);
      var mailUrl = 'mailto:johnson@aurora-filtech.com?subject=' + encodeURIComponent('RFQ: ' + pageTopic + ' — ' + (data.company || '')) + '&body=' + encodeURIComponent(summaryLines);
      var statusBox = form.querySelector('.cro-form-status');
      function renderStatus(delivered, reason) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = delivered ? '✓ Inquiry Delivered' : defaultBtnText;
        }
        if (delivered) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'generate_lead',
            form_id: 'aurora_rfq_form',
            page_topic: pageTopic,
            customer_company: data.company || ''
          });
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', { event_category: 'B2B_RFQ', event_label: pageTopic });
          }
        } else if (typeof console !== 'undefined' && console.warn) {
          console.warn('[Aurora RFQ] Direct email relay did not confirm delivery:', reason);
        }
        if (!statusBox) return;
        statusBox.className = 'cro-form-status ' + (delivered ? 'cro-form-status--ok' : 'cro-form-status--warn');
        statusBox.style.display = 'block';
        statusBox.innerHTML = '';
        var strong = document.createElement('strong');
        strong.textContent = delivered
          ? '✓ Inquiry delivered! '
          : '⚠️ Direct email relay could not confirm delivery. ';
        statusBox.appendChild(strong);
        statusBox.appendChild(document.createTextNode(delivered
          ? 'Our engineers received your request and reply within 24 hours. Need faster response or to send drawings/photos?'
          : 'Your form data is saved below — click Email, WhatsApp, or Copy Summary so nothing is lost:'));
        var actions = document.createElement('div');
        actions.className = 'cro-status-actions';
        var aWa = document.createElement('a');
        aWa.className = 'cro-st-wa';
        aWa.href = waUrl;
        aWa.target = '_blank';
        aWa.rel = 'noopener';
        aWa.textContent = '💬 Send Instant WhatsApp (+86 152 0611 9266)';
        var aMail = document.createElement('a');
        aMail.className = 'cro-st-mail';
        aMail.href = mailUrl;
        aMail.textContent = '✉️ Open Pre-filled Email (johnson@aurora-filtech.com)';
        var bCopy = document.createElement('button');
        bCopy.type = 'button';
        bCopy.className = 'cro-st-copy';
        bCopy.textContent = '📋 Copy Inquiry Summary';
        bCopy.addEventListener('click', function(){
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summaryLines).then(function(){ bCopy.textContent = '✓ Copied Summary!'; }).catch(function(){ window.prompt('Copy inquiry summary:', summaryLines); });
          } else {
            window.prompt('Copy inquiry summary:', summaryLines);
          }
        });
        actions.appendChild(aWa);
        actions.appendChild(aMail);
        actions.appendChild(bCopy);
        statusBox.appendChild(actions);
        if (!delivered && reason) {
          var note = document.createElement('div');
          note.className = 'cro-status-note';
          note.textContent = 'Relay detail: ' + reason;
          statusBox.appendChild(note);
        }
      }
      if (window.location.protocol === 'file:') {
        renderStatus(false, 'Local file:// preview does not allow HTTP relay');
        return;
      }
      var endpoint = form.getAttribute('data-endpoint') || 'https://formsubmit.co/ajax/johnson@aurora-filtech.com';
      var ac = typeof AbortController === 'function' ? new AbortController() : null;
      var timer = ac ? setTimeout(function(){ ac.abort(); }, 10000) : null;
      fetch(endpoint, {
        method: 'POST',
        signal: ac ? ac.signal : undefined,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function(res){
        if (timer) clearTimeout(timer);
        return res.text().then(function(txt){
          var json = null;
          try { json = JSON.parse(txt); } catch (err) {}
          var ok = res.ok && json && (json.success === true || json.success === 'true' || json.ok === true);
          if (ok) {
            renderStatus(true, '');
          } else {
            var msg = (json && json.message) ? String(json.message) : ('HTTP ' + res.status);
            renderStatus(false, msg);
          }
        });
      }).catch(function(err){
        if (timer) clearTimeout(timer);
        var msg = (err && err.name === 'AbortError') ? 'Request timed out after 10s' : (err && err.message ? err.message : 'Network error');
        renderStatus(false, msg);
      });
    });
  }
})();