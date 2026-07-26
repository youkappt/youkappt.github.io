(function(){
  var BASE = (document.currentScript && document.currentScript.dataset.base) || '../';
  var data = {
    'wechat-gzh':      { src: BASE + 'assets/contact/wechat-gzh-qr.jpg',     n: '微信公众号', id: '优卡说PPT', use: '微信扫一扫识别公众号' },
    'wechat-personal': { src: BASE + 'assets/contact/wechat-qr-youkappt.jpg', n: '个人微信号', id: 'YOUKAPPT', use: '微信扫一扫添加好友' }
  };
  function init() {
    var scope = (document.currentScript && document.currentScript.parentNode) || document.body;
    var modal = scope.querySelector('.f-qr-modal-shared');
    var card = modal ? modal.querySelector('.f-qr-card') : null;
    if (!modal || !card) return;
    var img = card.querySelector('img'),
        name = card.querySelector('.f-qr-name'),
        idEl = card.querySelector('.f-qr-id'),
        hint = card.querySelector('.f-qr-hint'),
        closeBtn = card.querySelector('.f-qr-close');
    function open(key) {
      var d = data[key]; if (!d) return;
      img.src = d.src; name.textContent = d.n; idEl.textContent = d.id; hint.textContent = d.use;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
    function hide() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
    scope.querySelectorAll('.f-chip[data-qr]').forEach(function(b){
      b.addEventListener('click', function(){ open(b.getAttribute('data-qr')); });
    });
    closeBtn.addEventListener('click', hide);
    modal.addEventListener('click', function(e){ if (e.target === modal) hide(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
  }
  init();
})();