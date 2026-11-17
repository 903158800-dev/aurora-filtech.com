(function(){
  var burger = document.querySelector('.burger3');
  var menu = document.querySelector('.pillnav .menu');
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
          if (pageTopic.toLowerCase().indexOf(prodSelect.options[i].text.toLowerCase()) !== -1) {
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
        var firstInput = document.getElementById('f-company');
        if (firstInput) firstInput.focus();
      }, 350);
    });
  });
  var form = document.querySelector('.cro-rfq-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(form);
      var data = {};
      fd.forEach(function(v, k){ data[k] = v; });
      data.page_url = window.location.href;
      data.page_topic = pageTopic;
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
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending Request...'; }
      var summaryLines = [
        'Company: ' + (data.company || '-'),
        'Email: ' + (data.email || '-'),
        'Name: ' + (data.name || '-'),
        data.product ? ('Product: ' + data.product) : ('Page: ' + pageTopic),
        data.size ? ('Dimensions: ' + data.size) : '',
        'Details: ' + (data.request || data.notes || '-')
      ].filter(Boolean).join('\n');
      var waUrl = 'https://wa.me/8615206119266?text=' + encodeURIComponent('New RFQ from ' + (data.company || 'Website') + ':\n' + summaryLines);
      var mailUrl = 'mailto:johnson@aurora-filtech.com?subject=' + encodeURIComponent('RFQ: ' + pageTopic + ' — ' + (data.company || '')) + '&body=' + encodeURIComponent(summaryLines);
      var statusBox = form.querySelector('.cro-form-status');
      function showSuccess() {
        if (btn) { btn.disabled = false; btn.textContent = '✓ Quote Request Logged'; }
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = '<strong>✓ Your engineering inquiry is ready!</strong> Our team replies within 24 hours. For priority dispatch or to attach drawings/photos immediately, click below:' +
            '<div class="cro-status-actions">' +
            '<a class="cro-st-wa" href="' + waUrl + '" target="_blank" rel="noopener">💬 Send Instant WhatsApp (+86 152 0611 9266)</a>' +
            '<a class="cro-st-mail" href="' + mailUrl + '">✉️ Open Pre-filled Email (johnson@aurora-filtech.com)</a>' +
            '</div>';
        }
      }
      fetch('https://formsubmit.co/ajax/johnson@aurora-filtech.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(showSuccess).catch(showSuccess);
    });
  }
})();