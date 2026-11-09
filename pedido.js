/* Formulário «Pedir demonstração»: envia o pedido para a Hsocial, com a origem da visita (UTM). */
(function () {
  // 1) Origem da visita: guarda os UTM durante 30 dias (mesmo formato do lead.js da Hsocial)
  var CHAVE = 'hsocial_utm', CAMPOS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  function origem() {
    try { var v = JSON.parse(localStorage.getItem(CHAVE) || 'null'); return v && Date.now() - v.t < 30 * 864e5 ? v : null; } catch (e) { return null; }
  }
  try {
    var q = new URLSearchParams(location.search), utm = {}, tem = false;
    CAMPOS.forEach(function (k) { var v = q.get(k); if (v) { utm[k] = v; tem = true; } });
    var ref = document.referrer && new URL(document.referrer).hostname !== location.hostname ? document.referrer : '';
    if (tem) localStorage.setItem(CHAVE, JSON.stringify({ t: Date.now(), utm: utm, referrer: ref }));
    else if (ref && !origem()) localStorage.setItem(CHAVE, JSON.stringify({ t: Date.now(), utm: {}, referrer: ref }));
  } catch (e) { /* sem localStorage: segue sem origem */ }

  // 2) Formulário
  var form = document.querySelector('#pedir-demonstracao form');
  if (!form) return;
  var estado = form.querySelector('.estado'), botao = form.querySelector('button[type=submit]');
  function diz(texto, tipo) { estado.textContent = texto; estado.className = 'estado' + (tipo ? ' ' + tipo : ''); }
  var FALHA = 'Não foi possível enviar agora. Tenta de novo ou escreve-nos por email (abaixo).';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = {};
    ['nome', 'email', 'empresa', 'telefone', 'mensagem'].forEach(function (k) { var el = form.elements[k]; d[k] = el ? el.value.trim() : ''; });
    if (!d.nome) { diz('Indica o teu nome.', 'erro'); form.elements.nome.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) { diz('Indica um email válido.', 'erro'); form.elements.email.focus(); return; }
    var hp = form.querySelector('[name=hs_hp]'); if (hp && hp.value) d.hs_hp = hp.value;
    d.mensagem = 'Produto: ' + form.getAttribute('data-produto') + (d.mensagem ? '\n' + d.mensagem : '');
    var o = origem() || { utm: {}, referrer: '' };
    var corpo = Object.assign({ marca: form.getAttribute('data-marca'), pagina: location.href, referrer: o.referrer || '' }, o.utm, d);
    botao.disabled = true; botao.setAttribute('aria-busy', 'true'); diz('A enviar…');
    // Sem cortar cedo: um pedido lento que chega ao servidor fica registado, e cortá-lo levaria a enviar duas vezes
    var lento = setTimeout(function () { diz('Ainda a enviar… só mais um momento.'); }, 8000);
    var fim = function () { clearTimeout(lento); botao.disabled = false; botao.removeAttribute('aria-busy'); };
    var ctl = window.AbortController ? new AbortController() : null;
    if (ctl) setTimeout(function () { ctl.abort(); }, 45000);
    // text/plain: o browser não precisa de um pedido CORS prévio
    fetch(form.getAttribute('data-destino'), { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(corpo), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (r) {
        fim();
        if (r && r.ok) { form.reset(); diz('Obrigado! Recebemos o teu pedido e respondemos num dia útil.', 'ok'); }
        else diz((r && r.erro) || FALHA, 'erro');
      })
      .catch(function () { fim(); diz(FALHA, 'erro'); });
  });
  // campo-armadilha para robôs de spam (invisível para as pessoas)
  var hp = document.createElement('input');
  hp.type = 'text'; hp.name = 'hs_hp'; hp.tabIndex = -1; hp.autocomplete = 'off'; hp.setAttribute('aria-hidden', 'true');
  hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
  form.appendChild(hp);
})();
