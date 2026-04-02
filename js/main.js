/* ============================================
   Speedy Campaign Websites — Interactivity
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile hamburger menu ---
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
      });

      navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // --- Scroll spy (home page section highlighting) ---
    var sectionLinks = document.querySelectorAll('#nav-links a[data-section]');
    var homeLink = document.querySelector('#nav-links a[href="index.html"]:not(.nav-cta)');
    var sections = [];

    sectionLinks.forEach(function (link) {
      var id = link.getAttribute('data-section');
      var el = document.getElementById(id);
      if (el) sections.push({ el: el, link: link });
    });

    if (sections.length > 0) {
      var ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var scrollY = window.scrollY + 120;
          var activeLink = null;

          for (var i = sections.length - 1; i >= 0; i--) {
            if (sections[i].el.offsetTop <= scrollY) {
              activeLink = sections[i].link;
              break;
            }
          }

          if (homeLink) homeLink.classList.remove('active');
          sectionLinks.forEach(function (l) { l.classList.remove('active'); });

          if (activeLink) {
            activeLink.classList.add('active');
          } else if (homeLink) {
            homeLink.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // --- Fade-in animations on scroll ---
    var fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      fadeElements.forEach(function (el) { observer.observe(el); });
    } else {
      fadeElements.forEach(function (el) { el.classList.add('visible'); });
    }

    // --- FAQ accordion ---
    var faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var answer = item.querySelector('.faq-answer');
        var isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item.active').forEach(function (openItem) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

  });
})();
