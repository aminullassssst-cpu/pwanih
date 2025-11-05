(function(){
  function isInPWA(){
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }
  if(isInPWA()){
    function hideLoader(){
      var possibleLoaders = ['#loading','#loader','.loading','.loader','.preloader'];
      possibleLoaders.forEach(function(sel){
        document.querySelectorAll(sel).forEach(function(el){
          el.style.display='none';
        });
      });
      document.body.classList.remove('loading','preloading');
    }
    hideLoader();
    window.addEventListener('load', hideLoader);
  }
})();
