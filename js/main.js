// CREATE CONCEPTS — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Gallery filter (Portfolio page)
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Lightbox
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var fullSrc = item.getAttribute('data-full') || item.querySelector('img').src;
        lightboxImg.src = fullSrc;
        lightbox.classList.add('open');
      });
    });
    function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  // Simple enquiry form -> mailto fallback (no backend yet)
  var form = document.querySelector('.enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value;
      var phone = form.querySelector('[name="phone"]').value;
      var email = form.querySelector('[name="email"]').value;
      var type = form.querySelector('[name="project_type"]').value;
      var message = form.querySelector('[name="message"]').value;
      var body = 'Name: ' + name + '%0D%0APhone: ' + phone + '%0D%0AEmail: ' + email +
        '%0D%0AProject Type: ' + type + '%0D%0A%0D%0A' + encodeURIComponent(message);
      window.location.href = 'mailto:createconceptsclt@gmail.com?subject=Website%20Enquiry%20-%20' +
        encodeURIComponent(type) + '&body=' + body;
    });
  }
});
