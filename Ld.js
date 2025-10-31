(function(){
  'use strict';
  var overlayMessage = '';
  function createOverlay(){
    var ov = document.createElement('div');
    ov.id = 'devtools-block-overlay';
    ov.style.position = 'fixed';
    ov.style.left = 0;
    ov.style.top = 0;
    ov.style.width = '100%';
    ov.style.height = '100%';
    ov.style.zIndex = 999999;
    ov.style.backgroundColor = 'rgba(255,255,255,0.98)';
    ov.style.display = 'none';
    ov.style.alignItems = 'center';
    ov.style.justifyContent = 'center';
    ov.style.textAlign = 'center';
    ov.innerHTML = overlayMessage;
    document.documentElement.appendChild(ov);
    return ov;
  }
  var overlay = createOverlay();
  function showOverlay(){ try{ overlay.style.display = 'flex'; window.scrollTo(0,0); }catch(e){} }
  function hideOverlay(){ try{ overlay.style.display = 'none'; }catch(e){} }
  window.addEventListener('contextmenu', function(e){ e.preventDefault(); return false; }, { passive: false });
  window.addEventListener('keydown', function(e){
    if (e.keyCode === 123){ e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'i' || e.key === 'j')){ e.preventDefault(); return false; }
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')){ e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')){ e.preventDefault(); return false; }
  }, { passive: false });
  var devtoolsOpen = false;
  var threshold = 160;
  function checkDevTools(){
    try{
      var widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      var heightDiff = Math.abs(window.outerHeight - window.innerHeight);
      var opened = (widthDiff > threshold) || (heightDiff > threshold);
      if (opened && !devtoolsOpen){ devtoolsOpen = true; showOverlay(); }
      else if (!opened && devtoolsOpen){ devtoolsOpen = false; hideOverlay(); }
    }catch(e){}
  }
  var checkInterval = setInterval(checkDevTools, 500);
  window.addEventListener('beforeunload', function(){ try{ clearInterval(checkInterval); }catch(e){} });
})();
