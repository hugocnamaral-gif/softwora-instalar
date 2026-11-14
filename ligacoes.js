/* Endereços das versões online: preenche quando cada produto estiver publicado.
   Os .exe vêm do GitHub Releases de «repo» (release «latest»): o nome fixo
   serve de fallback e a API do GitHub resolve sempre o ficheiro mais recente. */
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
var EXE=document.querySelectorAll('[data-exe]');
EXE.forEach(function(a){a.href='https://github.com/'+L.repo+'/releases/latest/download/'+a.dataset.exe;});
if(EXE.length)fetch('https://api.github.com/repos/'+L.repo+'/releases/latest',{headers:{Accept:'application/vnd.github+json'}}).then(function(r){return r.ok?r.json():null;}).then(function(rel){if(!rel||!rel.assets)return;EXE.forEach(function(a){var pref=a.dataset.exe.replace(/-\d[\d.]*\.exe$/i,'');var m=rel.assets.filter(function(x){return x.name.slice(0,pref.length)===pref&&/\.exe$/i.test(x.name);})[0];if(!m)return;a.href=m.browser_download_url;var n=a.parentNode.querySelector('.mini');if(n)n.textContent=m.name+' · '+(m.size?Math.round(m.size/1048576)+' MB':'Windows');});}).catch(function(){});})();
