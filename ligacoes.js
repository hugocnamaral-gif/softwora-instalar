/* Endereços das versões online de cada produto. Não editar aqui: definem-se em ONLINE,
   no gerar-site.py. O site não tem download público: o instalador é entregue a quem pede acesso. */
window.LIGACOES = {
 "online": {
  "vet": "",
  "reab": "",
  "endo": "",
  "clubora": "",
  "bizora": "",
  "bazora": "",
  "hinvoice": "",
  "transora": "https://app.transora.eu",
  "valora": ""
 }
};
(function(){var L=window.LIGACOES;document.querySelectorAll('[data-online]').forEach(function(a){var u=L.online[a.dataset.online];if(u){a.href=u;a.removeAttribute('aria-disabled');a.textContent='Abrir a versão online';var n=a.parentNode.querySelector('.mini');if(n)n.textContent=u.replace(/^https?:\/\//,'');}});})();
