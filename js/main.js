/* ============================================
   Speedy Campaign Websites — Main JS
   ============================================ */

(function () {
  'use strict';

  /* ---- XSS helper ---- */
  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---- Theme ---- */
  function applyTheme(theme) {
    if (!theme) return;
    var root = document.documentElement;
    var c = theme.colors;
    if (c) {
      if (c.primary) root.style.setProperty('--color-primary', c.primary);
      if (c.primaryDark) root.style.setProperty('--color-primary-dark', c.primaryDark);
      if (c.primaryLight) root.style.setProperty('--color-primary-light', c.primaryLight);
      if (c.secondary) root.style.setProperty('--color-secondary', c.secondary);
      if (c.secondaryDark) root.style.setProperty('--color-secondary-dark', c.secondaryDark);
      if (c.text) root.style.setProperty('--color-text', c.text);
      if (c.textLight) root.style.setProperty('--color-text-light', c.textLight);
      if (c.bg) root.style.setProperty('--color-bg', c.bg);
      if (c.bgAlt) root.style.setProperty('--color-bg-alt', c.bgAlt);
      if (c.white) root.style.setProperty('--color-white', c.white);
    }
    if (theme.headingFont) root.style.setProperty('--font-heading', "'" + theme.headingFont + "', sans-serif");
    if (theme.bodyFont) root.style.setProperty('--font-body', "'" + theme.bodyFont + "', sans-serif");
    if (theme.googleFontsUrl) {
      var link = document.getElementById('google-fonts');
      if (link) link.href = theme.googleFontsUrl;
    }
  }

  /* ---- Logo SVG (inline lightning bolt brand mark) ---- */
  var LOGO_SVG = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="36" height="36" rx="6" fill="#C42032"/>' +
    '<path d="M20.5 6L10 20h6.5L14.5 30 26 16h-7l1.5-10z" fill="#fff" stroke="#fff" stroke-width="0.5" stroke-linejoin="round"/>' +
    '</svg>';

  /* ---- Render Nav ---- */
  function renderNav(data) {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    var page = document.documentElement.getAttribute('data-page') || 'home';
    var contactHref = data.contact && data.contact.ctaHref ? data.contact.ctaHref : '#';
    var links = [
      { text: 'Home', href: 'index.html', page: 'home', section: '' },
      { text: 'Templates', href: 'index.html#templates', page: '', section: 'templates' },
      { text: 'Portfolio', href: 'index.html#portfolio', page: '', section: 'portfolio' },
      { text: 'Pricing', href: 'pricing.html', page: 'pricing', section: '' }
    ];

    var navLinksHtml = links.map(function (link) {
      var activeClass = link.page && link.page === page ? ' active' : '';
      var sectionAttr = link.section ? ' data-section="' + link.section + '"' : '';
      return '<li><a href="' + esc(link.href) + '" class="' + activeClass + '"' + sectionAttr + '>' + esc(link.text) + '</a></li>';
    }).join('');

    navLinksHtml += '<li><a href="' + esc(contactHref) + '" class="nav-cta">Get Started</a></li>';

    nav.innerHTML =
      '<div class="container">' +
        '<a href="index.html" class="nav-brand">' +
          LOGO_SVG +
          '<span class="nav-brand-text">' + esc(data.site ? data.site.title : 'Speedy Campaign Websites') + '</span>' +
        '</a>' +
        '<button class="hamburger" id="hamburger" aria-label="Toggle menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<ul class="nav-links" id="nav-links">' + navLinksHtml + '</ul>' +
      '</div>';

    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
      });
      navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        }
      });
    }
  }

  /* ---- Render Footer ---- */
  function renderFooter(data) {
    var footer = document.getElementById('footer');
    if (!footer || !data.footer) return;
    var f = data.footer;

    var navHtml = '';
    if (f.nav) {
      navHtml = f.nav.map(function (item) {
        return '<li><a href="' + esc(item.href) + '">' + esc(item.text) + '</a></li>';
      }).join('');
    }

    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-inner">' +
          '<div>' +
            '<div class="footer-brand">' +
              LOGO_SVG +
              '<span class="footer-brand-text">' + esc(f.copyright || '') + '</span>' +
            '</div>' +
            '<p class="footer-tagline">' + esc(f.tagline || '') + '</p>' +
          '</div>' +
          '<ul class="footer-nav">' + navHtml + '</ul>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>&copy; ' + new Date().getFullYear() + ' ' + esc(f.copyright || '') + '</span>' +
          '<p class="footer-legal">' + esc(f.legal || '') + '</p>' +
        '</div>' +
      '</div>';
  }

  /* ---- Render Home ---- */
  function renderHome(data) {
    var main = document.getElementById('main-content');
    if (!main) return;
    var html = '';

    // Hero
    var hero = data.hero || {};
    html += '<section class="hero">' +
      '<div class="container">' +
        '<p class="hero-eyebrow fade-in">' + esc(hero.eyebrow || '') + '</p>' +
        '<h1 class="fade-in">' + esc(hero.headline || '') + '</h1>' +
        '<p class="hero-sub fade-in">' + esc(hero.subheadline || '') + '</p>' +
        '<div class="hero-ctas fade-in">';
    if (hero.primaryCta) {
      html += '<a href="' + esc(hero.primaryCta.href || '#') + '" class="btn btn-primary">' + esc(hero.primaryCta.text) + '</a>';
    }
    if (hero.secondaryCta) {
      html += '<a href="' + esc(hero.secondaryCta.href || '#') + '" class="btn btn-outline">' + esc(hero.secondaryCta.text) + '</a>';
    }
    html += '</div></div></section>';

    // Value Prop / Features
    var vp = data.valueProp || {};
    html += '<section class="section" id="features">' +
      '<div class="container">' +
        '<h2 class="section-title fade-in">' + esc(vp.title || '') + '</h2>' +
        '<p class="section-subtitle fade-in">' + esc(vp.subtitle || '') + '</p>' +
        '<div class="features-grid">';
    if (vp.features) {
      vp.features.forEach(function (feat) {
        html += '<div class="feature-card fade-in">' +
          '<div class="feature-icon">' + esc(feat.icon) + '</div>' +
          '<h3>' + esc(feat.title) + '</h3>' +
          '<p>' + esc(feat.description) + '</p>' +
        '</div>';
      });
    }
    html += '</div></div></section>';

    // Templates
    html += '<section class="section section-alt" id="templates">' +
      '<div class="container">' +
        '<h2 class="section-title fade-in">Our Templates</h2>' +
        '<p class="section-subtitle fade-in">Choose a design, provide your content, and we\'ll do the rest.</p>' +
        '<div class="templates-grid">';
    if (data.templates) {
      data.templates.forEach(function (t) {
        html += '<div class="template-card fade-in">';
        if (t.screenshotSrc) {
          html += '<div class="template-screenshot">' +
            '<img src="' + esc(t.screenshotSrc) + '" alt="' + esc(t.name) + ' template screenshot">' +
          '</div>';
        } else {
          html += '<div class="template-placeholder">' +
            '<span class="template-placeholder-text">Preview</span>' +
            '<span class="template-placeholder-name">' + esc(t.name) + '</span>' +
          '</div>';
        }
        html += '<div class="template-card-body">' +
          '<h3>' + esc(t.name) + '</h3>' +
          '<p>' + esc(t.description) + '</p>' +
          '<div class="template-chips">';
        if (t.features) {
          t.features.forEach(function (chip) {
            html += '<span class="template-chip">' + esc(chip) + '</span>';
          });
        }
        html += '</div>' +
          '<a href="' + esc(t.demoHref || '#') + '" class="btn btn-outline-dark" target="_blank">View Demo</a>' +
        '</div></div>';
      });
    }
    html += '</div></div></section>';

    // Portfolio
    var port = data.portfolio || {};
    html += '<section class="section" id="portfolio">' +
      '<div class="container">' +
        '<h2 class="section-title fade-in">' + esc(port.title || 'Our Work') + '</h2>' +
        '<p class="section-subtitle fade-in">' + esc(port.subtitle || '') + '</p>';
    if (port.items && port.items.length > 0) {
      html += '<div class="portfolio-grid">';
      port.items.forEach(function (item) {
        html += '<div class="template-card fade-in">' +
          '<div class="template-card-body">' +
            '<h3>' + esc(item.name || '') + '</h3>' +
            '<p>' + esc(item.description || '') + '</p>' +
            (item.href ? '<a href="' + esc(item.href) + '" class="btn btn-outline-dark" target="_blank">Visit Site</a>' : '') +
          '</div></div>';
      });
      html += '</div>';
    } else {
      html += '<div class="portfolio-empty fade-in">' + esc(port.emptyMessage || '') + '</div>';
    }
    html += '</div></section>';

    // Contact CTA
    var contact = data.contact || {};
    html += '<section class="section section-navy contact-section" id="contact">' +
      '<div class="container">' +
        '<h2 class="section-title fade-in">' + esc(contact.title || '') + '</h2>' +
        '<p class="fade-in">' + esc(contact.subtitle || '') + '</p>' +
        '<a href="' + esc(contact.ctaHref || '#') + '" class="btn btn-primary fade-in">' + esc(contact.ctaText || 'Get Started') + '</a>' +
      '</div></section>';

    main.innerHTML = html;
  }

  /* ---- Render Pricing ---- */
  function renderPricing(data) {
    var main = document.getElementById('main-content');
    if (!main) return;
    var p = data.pricing || {};
    var html = '';

    // Page Hero
    html += '<section class="page-hero">' +
      '<div class="container">' +
        '<h1 class="fade-in">' + esc(p.title || 'Pricing') + '</h1>' +
        '<p class="fade-in">' + esc(p.subtitle || '') + '</p>' +
      '</div></section>';

    // Pricing Cards
    html += '<section class="section">' +
      '<div class="container">' +
        '<div class="pricing-grid">';
    if (p.tiers) {
      p.tiers.forEach(function (tier) {
        var hlClass = tier.highlighted ? ' highlighted' : '';
        html += '<div class="pricing-card' + hlClass + ' fade-in">';
        if (tier.badge) {
          html += '<div class="pricing-badge">' + esc(tier.badge) + '</div>';
        }
        html += '<h3>' + esc(tier.name) + '</h3>' +
          '<div class="pricing-price">' + esc(tier.price);
        if (tier.priceSuffix) {
          html += '<span class="suffix">' + esc(tier.priceSuffix) + '</span>';
        }
        html += '</div>' +
          '<p class="pricing-billing">' + esc(tier.billing || '') + '</p>' +
          '<p class="pricing-description">' + esc(tier.description || '') + '</p>';

        // Includes
        if (tier.includes && tier.includes.length > 0) {
          html += '<ul class="pricing-list">';
          tier.includes.forEach(function (item) {
            html += '<li><span class="check">✓</span><span>' + esc(item) + '</span></li>';
          });
          html += '</ul>';
        }

        // Excludes
        if (tier.excludes && tier.excludes.length > 0) {
          html += '<hr class="pricing-divider">';
          html += '<ul class="pricing-list">';
          tier.excludes.forEach(function (item) {
            html += '<li><span class="x-mark">✕</span><span>' + esc(item) + '</span></li>';
          });
          html += '</ul>';
        }

        html += '<a href="' + esc(tier.ctaHref || '#') + '" class="btn ' + (tier.highlighted ? 'btn-primary' : 'btn-outline-dark') + '">' + esc(tier.ctaText || 'Get Started') + '</a>';
        html += '</div>';
      });
    }
    html += '</div>';

    // Disclaimer
    if (p.disclaimer) {
      html += '<div class="disclaimer-box fade-in">' +
        '<h3>Content Disclaimer</h3>' +
        '<p>' + esc(p.disclaimer) + '</p>' +
      '</div>';
    }

    // FAQ
    if (p.faq && p.faq.length > 0) {
      html += '<div class="faq-section">' +
        '<h2 class="fade-in">Frequently Asked Questions</h2>';
      p.faq.forEach(function (item, i) {
        html += '<div class="faq-item fade-in">' +
          '<button class="faq-question" data-faq="' + i + '">' +
            '<span>' + esc(item.question) + '</span>' +
            '<span class="faq-icon">+</span>' +
          '</button>' +
          '<div class="faq-answer">' +
            '<div class="faq-answer-inner">' + esc(item.answer) + '</div>' +
          '</div>' +
        '</div>';
      });
      html += '</div>';
    }

    html += '</div></section>';

    main.innerHTML = html;

    // FAQ accordion behavior
    var faqButtons = main.querySelectorAll('.faq-question');
    faqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var answer = item.querySelector('.faq-answer');
        var isActive = item.classList.contains('active');

        // Close all
        main.querySelectorAll('.faq-item.active').forEach(function (openItem) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---- Page Renderers ---- */
  var PAGE_RENDERERS = {
    home: renderHome,
    pricing: renderPricing
  };

  /* ---- Scroll Spy ---- */
  function initScrollSpy() {
    var page = document.documentElement.getAttribute('data-page') || 'home';
    if (page !== 'home') return;

    var navEl = document.getElementById('nav-links');
    if (!navEl) return;

    var sectionLinks = navEl.querySelectorAll('a[data-section]');
    var homeLink = navEl.querySelector('a:not([data-section]):not(.nav-cta)');
    var sections = [];

    sectionLinks.forEach(function (link) {
      var id = link.getAttribute('data-section');
      var el = document.getElementById(id);
      if (el) sections.push({ el: el, link: link });
    });

    if (sections.length === 0) return;

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

        // Clear all active states
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

  /* ---- Fade-in Animations ---- */
  function initFadeAnimations() {
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
  }

  /* ---- Meta ---- */
  function renderMeta(data, page) {
    if (data.site) {
      if (page === 'home') {
        document.title = data.site.title || '';
      } else {
        document.title = (page.charAt(0).toUpperCase() + page.slice(1)) + ' — ' + (data.site.title || '');
      }
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && data.site.metaDescription) {
        metaDesc.setAttribute('content', data.site.metaDescription);
      }
    }
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var page = document.documentElement.getAttribute('data-page') || 'home';

    fetch('content.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        applyTheme(data.theme);
        renderMeta(data, page);
        renderNav(data);
        renderFooter(data);

        var renderer = PAGE_RENDERERS[page];
        if (renderer) renderer(data);

        initFadeAnimations();
        initScrollSpy();
      })
      .catch(function (err) {
        console.error('Failed to load content.json:', err);
      });
  });

})();
