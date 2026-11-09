/* Endereços das versões online: preenche quando cada produto estiver publicado.
   Os .exe vêm do GitHub Releases de «repo» (release «latest»). */
window.LIGACOES = {
 "repo": "hugocnamaral-gif/softwora-instalar",
 "online": {
  "vet": "",
  "reab": "",
  "endo": "",
  "clubora": "",
  "bizora": "",
  "bazora": "",
  "hinvoice": ""
 }
};
(function(){var L=window.LIGACOES;document.querySelectorAll('[data-online]').forEach(function(a){var u=L.online[a.dataset.online];if(u){a.href=u;a.removeAttribute('aria-disabled');a.textContent='Abrir a versão online';var n=a.parentNode.querySelector('.mini');if(n)n.textContent=u.replace(/^https?:\/\//,'');}});
document.querySelectorAll('[data-exe]').forEach(function(a){a.href='https://github.com/'+L.repo+'/releases/latest/download/'+a.dataset.exe;});})();
