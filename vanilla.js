// Add the scroll button
scrollButton = document.getElementById("scroll_btn");

// When user scrolls down 20px from top of the document, display the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

// When user clicks on the button, scroll to top of document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Smooth scroll down feature for nav bar and other hyperlinks
document.addEventListener('click', function(e) {
    if (e.target.tagName !== 'A') return;
    if ((e.target.href && e.target.href.indexOf('#') != -1) && ((e.target.pathname == location.pathname) || 
    ('/' + e.target.pathname == location.pathname)) && (e.target.search == location.search)) {
          scrollAnchors(e, e.target);
    }
  });
  function scrollAnchors(e, respond = null) {    
      function distanceToTop(el) { 
          return Math.floor(el.getBoundingClientRect().top); 
      }     
      e.preventDefault();
      var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
      var targetAnchor = document.querySelector(targetID);
      if (!targetAnchor) return;
      var originalTop = distanceToTop(targetAnchor);
      window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
      var checkIfDone = setInterval(function() {
      var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
          targetAnchor.tabIndex = '-1';
          targetAnchor.focus();         
          if ('history' in window) {
              window.history.pushState('', '', targetID);  
              } else {
                  window.location = targetID;
              }
              clearInterval(checkIfDone);
          }
      }, 100);
  }