/* ============================================================
   CAMPAIGN WEBSITE — SINGLE PAGE JS
   Loads all content from content.json and handles UI interactions
   ============================================================ */

// --- Theme palettes ---
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

// --- SVG icons for social links ---
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

// --- Helper: escape HTML ---
function esc(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Apply theme ---
function applyTheme(theme) {
  var root = document.documentElement;

  // Apply palette colors
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

  // Apply fonts
  if (theme.headingFont) {
    root.style.setProperty('--font-heading', "'" + theme.headingFont + "', Georgia, serif");
  }
  if (theme.bodyFont) {
    root.style.setProperty('--font-body', "'" + theme.bodyFont + "', -apple-system, sans-serif");
  }

  // Swap Google Fonts link
  if (theme.googleFontsUrl) {
    var link = document.getElementById('google-fonts');
    if (link) link.href = theme.googleFontsUrl;
  }
}

// --- Build social links HTML ---
function buildSocialLinks(social) {
  var html = '';
  Object.keys(social).forEach(function (platform) {
    if (social[platform] && SOCIAL_ICONS[platform]) {
      html += '<a href="' + esc(social[platform]) + '" target="_blank" rel="noopener noreferrer" aria-label="' + SOCIAL_LABELS[platform] + '">' + SOCIAL_ICONS[platform] + '</a>';
    }
  });
  return html;
}

// --- Render all content ---
function renderContent(data) {
  // Site meta
  document.title = data.site.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.site.metaDescription);

  // Nav brand
  document.getElementById('nav-brand').textContent = data.candidate.navBrand;

  // Hero
  document.getElementById('hero-office').textContent = data.candidate.office;
  document.getElementById('hero-name').textContent = data.candidate.name;
  document.getElementById('hero-tagline').textContent = data.candidate.tagline;
  var heroDonateBtn = document.getElementById('hero-donate-btn');
  heroDonateBtn.href = data.donate.url;
  heroDonateBtn.setAttribute('target', '_blank');
  heroDonateBtn.setAttribute('rel', 'noopener noreferrer');

  // Hero image
  if (data.candidate.heroImage) {
    var heroContainer = document.getElementById('hero-image-container');
    heroContainer.innerHTML = '<img src="' + esc(data.candidate.heroImage) + '" alt="' + esc(data.candidate.name) + '">';
  }

  // About
  document.getElementById('about-title').textContent = data.about.title;
  var aboutText = document.getElementById('about-text');
  aboutText.innerHTML = data.about.paragraphs.map(function (p) {
    return '<p>' + esc(p) + '</p>';
  }).join('');

  // About image
  if (data.candidate.aboutImage) {
    var aboutContainer = document.getElementById('about-image-container');
    aboutContainer.innerHTML = '<img src="' + esc(data.candidate.aboutImage) + '" alt="' + esc(data.candidate.name) + ' at a community event">';
  }

  // Issues
  document.getElementById('issues-title').textContent = data.issues.title;
  var issuesGrid = document.getElementById('issues-grid');
  issuesGrid.innerHTML = data.issues.items.map(function (item) {
    return '<div class="issue-card fade-in">' +
      '<div class="issue-icon">' + esc(item.icon) + '</div>' +
      '<h3>' + esc(item.title) + '</h3>' +
      '<p>' + esc(item.description) + '</p>' +
      '</div>';
  }).join('');

  // Endorsements
  document.getElementById('endorsements-title').textContent = data.endorsements.title;
  var endorseGrid = document.getElementById('endorsements-grid');
  endorseGrid.innerHTML = data.endorsements.items.map(function (item) {
    return '<div class="endorsement-card fade-in">' +
      '<p class="endorsement-quote">' + esc(item.quote) + '</p>' +
      '<p class="endorsement-name">' + esc(item.name) + '</p>' +
      '<p class="endorsement-title">' + esc(item.title) + '</p>' +
      '</div>';
  }).join('');

  // Volunteer
  document.getElementById('volunteer-title').textContent = data.volunteer.title;
  var volunteerContent = document.getElementById('volunteer-content');
  volunteerContent.innerHTML = '<p>' + esc(data.volunteer.description) + '</p>' +
    '<a href="' + esc(data.volunteer.signupUrl) + '" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Sign Up to Volunteer</a>';

  // Donate
  document.getElementById('donate-title').textContent = data.donate.title;
  var donateContent = document.getElementById('donate-content');
  donateContent.innerHTML = '<p>' + esc(data.donate.description) + '</p>' +
    '<a href="' + esc(data.donate.url) + '" class="btn btn-donate" target="_blank" rel="noopener noreferrer">Donate Now</a>';

  // Events
  document.getElementById('events-title').textContent = data.events.title;
  var eventsList = document.getElementById('events-list');
  eventsList.innerHTML = data.events.items.map(function (item) {
    return '<div class="event-card fade-in">' +
      '<div class="event-date-box">' +
      '<div class="month">' + esc(item.month) + '</div>' +
      '<div class="day">' + esc(item.day) + '</div>' +
      '</div>' +
      '<div class="event-details">' +
      '<h3>' + esc(item.title) + '</h3>' +
      '<div class="event-meta">' +
      '<span>' + esc(item.time) + '</span>' +
      '<span>' + esc(item.location) + '</span>' +
      '</div>' +
      '<p class="event-description">' + esc(item.description) + '</p>' +
      '</div>' +
      '</div>';
  }).join('');

  // Footer
  var footerGrid = document.getElementById('footer-grid');
  footerGrid.innerHTML = '<div>' +
    '<h3>' + esc(data.candidate.navBrand) + '</h3>' +
    '<p>Fighting for better schools, safer neighborhoods, and a stronger community in District 5.</p>' +
    '</div>' +
    '<div>' +
    '<h3>Contact</h3>' +
    '<p><a href="mailto:' + esc(data.contact.email) + '">' + esc(data.contact.email) + '</a></p>' +
    '<p><a href="tel:' + esc(data.contact.phone.replace(/[^+\d]/g, '')) + '">' + esc(data.contact.phone) + '</a></p>' +
    '</div>' +
    '<div>' +
    '<h3>Follow Us</h3>' +
    '<div class="social-links">' + buildSocialLinks(data.social) + '</div>' +
    '</div>';

  document.getElementById('footer-disclaimer').textContent = data.disclaimer;
}

// --- Initialize fade-in observer ---
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
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }
}

// --- Main ---
document.addEventListener('DOMContentLoaded', function () {

  // --- Hamburger Menu ---
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Active Nav Link on Scroll ---
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    var atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 10);

    // If at the very bottom of the page, activate the last section
    if (atBottom && sections.length) {
      var lastSection = sections[sections.length - 1];
      var lastId = lastSection.getAttribute('id');
      navItems.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + lastId) {
          link.classList.add('active');
        }
      });
      return;
    }

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

  // --- Load content from JSON ---
  fetch('content.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      applyTheme(data.theme);
      renderContent(data);
      // Re-init fade animations after dynamic content is added
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
