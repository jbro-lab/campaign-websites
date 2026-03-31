/* ============================================================
   TEMPLATE 5: COMMUNITY FOCUS — Single Page JS
   Loads all content from content.json and handles UI interactions
   ============================================================ */

var PALETTES = {
  'navy-red': {
    '--color-primary': '#1B3A5C',
    '--color-primary-dark': '#122840',
    '--color-primary-light': '#E8EEF4',
    '--color-secondary': '#C42032',
    '--color-secondary-dark': '#9A1826',
    '--color-text': '#1a1a1a',
    '--color-text-light': '#555555',
    '--color-bg': '#ffffff',
    '--color-bg-alt': '#f5f7fa',
    '--color-white': '#ffffff'
  },
  'blue-gold': {
    '--color-primary': '#2563EB',
    '--color-primary-dark': '#1D4ED8',
    '--color-primary-light': '#EFF6FF',
    '--color-secondary': '#D97706',
    '--color-secondary-dark': '#B45309',
    '--color-text': '#1a1a1a',
    '--color-text-light': '#555555',
    '--color-bg': '#ffffff',
    '--color-bg-alt': '#f8fafc',
    '--color-white': '#ffffff'
  },
  'green-cream': {
    '--color-primary': '#1E6B45',
    '--color-primary-dark': '#155235',
    '--color-primary-light': '#ECFDF5',
    '--color-secondary': '#B45309',
    '--color-secondary-dark': '#92400E',
    '--color-text': '#1a1a1a',
    '--color-text-light': '#555555',
    '--color-bg': '#fffdf7',
    '--color-bg-alt': '#f5f0e8',
    '--color-white': '#ffffff'
  },
  'slate-teal': {
    '--color-primary': '#334155',
    '--color-primary-dark': '#1E293B',
    '--color-primary-light': '#F1F5F9',
    '--color-secondary': '#0D9488',
    '--color-secondary-dark': '#0F766E',
    '--color-text': '#1a1a1a',
    '--color-text-light': '#555555',
    '--color-bg': '#ffffff',
    '--color-bg-alt': '#f8fafc',
    '--color-white': '#ffffff'
  }
};

var SOCIAL_ICONS = {
  facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'
};

var SOCIAL_LABELS = {
  facebook: 'Facebook',
  twitter: 'Twitter / X',
  instagram: 'Instagram'
};

function esc(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function applyTheme(theme) {
  var root = document.documentElement;
  var colors;
  if (theme.palette === 'custom' && theme.colors) {
    colors = {};
    Object.keys(theme.colors).forEach(function (key) {
      colors['--color-' + key] = theme.colors[key];
    });
  } else {
    colors = PALETTES[theme.palette] || PALETTES['navy-red'];
  }
  Object.keys(colors).forEach(function (prop) {
    root.style.setProperty(prop, colors[prop]);
  });

  if (theme.headingFont) {
    root.style.setProperty('--font-heading', "'" + theme.headingFont + "', sans-serif");
  }
  if (theme.bodyFont) {
    root.style.setProperty('--font-body', "'" + theme.bodyFont + "', -apple-system, sans-serif");
  }
  if (theme.googleFontsUrl) {
    var link = document.getElementById('google-fonts');
    if (link) link.href = theme.googleFontsUrl;
  }
}

function buildSocialLinks(social) {
  var html = '';
  Object.keys(social).forEach(function (platform) {
    if (social[platform] && SOCIAL_ICONS[platform]) {
      html += '<a href="' + esc(social[platform]) + '" target="_blank" rel="noopener noreferrer" aria-label="' + SOCIAL_LABELS[platform] + '">' + SOCIAL_ICONS[platform] + '</a>';
    }
  });
  return html;
}

function renderContent(data) {
  // Site meta
  document.title = data.site.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.site.metaDescription);

  // Nav brand
  document.getElementById('nav-brand').textContent = data.candidate.navBrand;

  // Hero
  document.getElementById('hero-name').textContent = data.candidate.name;

  var subtitle = 'Running for ' + data.candidate.office;
  if (data.candidate.location) {
    subtitle += ' in ' + data.candidate.location;
  }
  document.getElementById('hero-subtitle').textContent = subtitle;

  // First name for hero button
  var firstName = data.candidate.name.split(' ')[0];
  document.getElementById('hero-first-name').textContent = firstName;

  // Hero image
  if (data.candidate.heroImage) {
    var heroPhoto = document.getElementById('hero-photo');
    heroPhoto.innerHTML = '<img src="' + esc(data.candidate.heroImage) + '" alt="' + esc(data.candidate.name) + '" style="width:100%;height:100%;object-fit:cover;">';
  }

  // Endorsements — masonry
  document.getElementById('endorsements-title').textContent = data.endorsements.title;
  var endorseGrid = document.getElementById('endorsements-grid');
  endorseGrid.innerHTML = data.endorsements.items.map(function (item) {
    return '<div class="endorsement-card fade-in">' +
      '<p class="endorsement-quote">"' + esc(item.quote) + '"</p>' +
      '<p class="endorsement-name">' + esc(item.name) + '</p>' +
      '<p class="endorsement-title">' + esc(item.title) + '</p>' +
      '</div>';
  }).join('');

  // Events
  document.getElementById('events-title').textContent = data.events.title;
  var eventsGrid = document.getElementById('events-grid');
  eventsGrid.innerHTML = data.events.items.map(function (item) {
    return '<div class="event-card fade-in">' +
      '<div class="event-date-callout">' +
      '<div class="month">' + esc(item.month) + '</div>' +
      '<div class="day">' + esc(item.day) + '</div>' +
      '</div>' +
      '<div class="event-info">' +
      '<h3>' + esc(item.title) + '</h3>' +
      '<p class="event-meta">' + esc(item.time) + ' — ' + esc(item.location) + '</p>' +
      '<p class="event-description">' + esc(item.description) + '</p>' +
      '</div>' +
      '</div>';
  }).join('');

  // About
  document.getElementById('about-title').textContent = data.about.title;
  var aboutContent = document.getElementById('about-content');
  aboutContent.innerHTML = data.about.paragraphs.map(function (p) {
    return '<p>' + esc(p) + '</p>';
  }).join('');

  if (data.about.whyRunning) {
    document.getElementById('about-why-title').textContent = data.about.whyRunning;
  }
  if (data.about.whyRunningText) {
    document.getElementById('about-why-text').textContent = data.about.whyRunningText;
  }

  // About image
  if (data.candidate.aboutImage) {
    var aboutPhoto = document.getElementById('about-photo');
    aboutPhoto.innerHTML = '<img src="' + esc(data.candidate.aboutImage) + '" alt="' + esc(data.candidate.name) + ' in the community" style="width:100%;aspect-ratio:5/4;object-fit:cover;border-radius:10px;">';
  }

  // Issues — accordion
  document.getElementById('issues-title').textContent = data.issues.title;
  var accordion = document.getElementById('accordion');
  accordion.innerHTML = data.issues.items.map(function (item, i) {
    return '<div class="accordion-item fade-in">' +
      '<button class="accordion-header" aria-expanded="false">' +
      '<span>' + esc(item.icon) + ' ' + esc(item.title) + '</span>' +
      '<span class="accordion-icon">+</span>' +
      '</button>' +
      '<div class="accordion-body">' +
      '<div class="accordion-body-inner">' +
      '<p>' + esc(item.description) + '</p>' +
      (item.detail ? '<p>' + esc(item.detail) + '</p>' : '') +
      '</div>' +
      '</div>' +
      '</div>';
  }).join('');

  // CTA
  document.getElementById('cta-title').textContent = data.volunteer.title;
  var ctaCards = document.getElementById('cta-cards');
  if (data.volunteer.actions) {
    ctaCards.innerHTML = data.volunteer.actions.map(function (action) {
      return '<a href="' + esc(action.url) + '" class="cta-card fade-in" target="_blank" rel="noopener noreferrer">' +
        '<div class="cta-card-icon">' + esc(action.icon) + '</div>' +
        '<h3>' + esc(action.title) + '</h3>' +
        '<p>' + esc(action.description) + '</p>' +
        '</a>';
    }).join('');
  }

  // Footer
  var footerContact = document.getElementById('footer-contact');
  footerContact.innerHTML = '<a href="mailto:' + esc(data.contact.email) + '">' + esc(data.contact.email) + '</a>';

  var footerSocial = document.getElementById('footer-social');
  footerSocial.innerHTML = '<div class="social-links">' + buildSocialLinks(data.social) + '</div>';

  document.getElementById('footer-disclaimer').textContent = data.disclaimer;
}

// --- Accordion toggle ---
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.parentElement;
      var body = item.querySelector('.accordion-body');
      var inner = body.querySelector('.accordion-body-inner');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
}

// --- Fade animations ---
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

// --- Main ---
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav on scroll
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Load content
  fetch('content.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      applyTheme(data.theme);
      renderContent(data);
      initAccordion();
      initFadeAnimations();
      initPalettePicker(data.theme.palette || 'navy-red');
    })
    .catch(function (err) {
      console.error('Failed to load content.json:', err);
    });
});


// --- Palette Picker (demo) ---
var PALETTE_DISPLAY = {
  "navy-red":    { name: "Navy & Red",    colors: ["#1B3A5C","#C42032","#E8EEF4"] },
  "blue-gold":   { name: "Blue & Copper",   colors: ["#2563EB","#D97706","#EFF6FF"] },
  "green-cream": { name: "Green & Cream", colors: ["#1E6B45","#B45309","#ECFDF5"] },
  "slate-teal":  { name: "Slate & Teal",  colors: ["#334155","#0D9488","#F1F5F9"] }
};

function initPalettePicker(currentPalette) {
  var picker = document.createElement("div");
  picker.className = "palette-picker";

  // Paint-drop SVG icon
  var btnSvg = "<svg viewBox=\"0 0 24 24\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/></svg>";

  picker.innerHTML =
    "<button class=\"palette-picker-btn\" aria-label=\"Change color palette\">" +
      btnSvg +
      "<span class=\"palette-picker-label\">Palette</span>" +
    "</button>" +
    "<div class=\"palette-picker-panel\">" +
      "<h4>Choose a Palette</h4>" +
      "<div class=\"palette-options\"></div>" +
    "</div>";

  var btn = picker.querySelector(".palette-picker-btn");
  var panel = picker.querySelector(".palette-picker-panel");
  var optionsContainer = picker.querySelector(".palette-options");

  // Build options
  Object.keys(PALETTE_DISPLAY).forEach(function(key) {
    var info = PALETTE_DISPLAY[key];
    var opt = document.createElement("button");
    opt.className = "palette-option" + (key === currentPalette ? " active" : "");
    opt.setAttribute("data-palette", key);

    var swatches = info.colors.map(function(c) {
      return "<span class=\"palette-swatch\" style=\"background:" + c + "\"></span>";
    }).join("");

    opt.innerHTML =
      "<span class=\"palette-swatches\">" + swatches + "</span>" +
      "<span class=\"palette-option-name\">" + info.name + "</span>";

    opt.addEventListener("click", function() {
      var colors = PALETTES[key];
      Object.keys(colors).forEach(function(prop) {
        document.documentElement.style.setProperty(prop, colors[prop]);
      });
      optionsContainer.querySelectorAll(".palette-option").forEach(function(o) {
        o.classList.remove("active");
      });
      opt.classList.add("active");
    });

    optionsContainer.appendChild(opt);
  });

  // Toggle panel
  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    panel.classList.toggle("open");
  });

  // Close panel on outside click
  document.addEventListener("click", function(e) {
    if (!picker.contains(e.target)) {
      panel.classList.remove("open");
    }
  });

  document.body.appendChild(picker);
}
