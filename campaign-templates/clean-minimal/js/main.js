/* ============================================================
   TEMPLATE 4: CLEAN & MINIMAL — Multi-Page JS
   Loads content from content.json, renders per page
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
    root.style.setProperty('--font-heading', "'" + theme.headingFont + "', Georgia, serif");
  }
  if (theme.bodyFont) {
    root.style.setProperty('--font-body', "'" + theme.bodyFont + "', -apple-system, sans-serif");
  }
  if (theme.googleFontsUrl) {
    var link = document.getElementById('google-fonts');
    if (link) link.href = theme.googleFontsUrl;
  }
}

// --- Shared renderers ---

function renderMeta(data, page) {
  var suffix = ' — ' + data.candidate.navBrand;
  if (page === 'home') {
    document.title = data.site.title;
  } else {
    var titles = {
      issues: 'Issues',
      endorsements: 'Endorsements',
      events: 'Events',
      donate: 'Donate',
      contact: 'Contact'
    };
    document.title = (titles[page] || '') + suffix;
  }
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.site.metaDescription);
}

function renderNav(data) {
  var navBrand = document.getElementById('nav-brand');
  if (navBrand) navBrand.textContent = data.candidate.navBrand;
}

function renderFooter(data) {
  var disclaimer = document.getElementById('footer-disclaimer');
  if (disclaimer) disclaimer.textContent = data.disclaimer;
}

// --- Page renderers ---

function renderHome(data) {
  document.getElementById('hero-name').textContent = data.candidate.name;
  document.getElementById('hero-office').textContent = data.candidate.office;
  document.getElementById('hero-tagline').textContent = data.candidate.tagline;

  // Hero image
  if (data.candidate.heroImage) {
    var heroPhoto = document.getElementById('hero-photo');
    heroPhoto.innerHTML = '<img src="' + esc(data.candidate.heroImage) + '" alt="' + esc(data.candidate.name) + '" style="width:320px;height:400px;object-fit:cover;">';
  }

  // About
  document.getElementById('about-title').textContent = data.about.title;
  var aboutContent = document.getElementById('about-content');
  aboutContent.innerHTML = data.about.paragraphs.map(function (p) {
    return '<p>' + esc(p) + '</p>';
  }).join('');

  // Quick issues preview (first 3)
  var previewCards = document.getElementById('issues-preview-cards');
  var previewItems = data.issues.items.slice(0, 3);
  previewCards.innerHTML = previewItems.map(function (item) {
    return '<div class="preview-card fade-in">' +
      '<h3>' + esc(item.title) + '</h3>' +
      '<p>' + esc(item.description) + '</p>' +
      '</div>';
  }).join('');
}

function renderIssues(data) {
  document.getElementById('page-title').textContent = data.issues.title;
  var issuesList = document.getElementById('issues-list');
  issuesList.innerHTML = data.issues.items.map(function (item) {
    return '<div class="issue-section fade-in">' +
      '<h3>' + esc(item.title) + '</h3>' +
      '<p>' + esc(item.description) + '</p>' +
      (item.detail ? '<p>' + esc(item.detail) + '</p>' : '') +
      '</div>';
  }).join('');
}

function renderEndorsements(data) {
  document.getElementById('page-title').textContent = data.endorsements.title;
  var endorsementsList = document.getElementById('endorsements-list');
  endorsementsList.innerHTML = data.endorsements.items.map(function (item) {
    return '<div class="endorsement-item fade-in">' +
      '<p class="endorsement-quote">"' + esc(item.quote) + '"</p>' +
      '<p class="endorsement-name">' + esc(item.name) + '</p>' +
      '<p class="endorsement-title">' + esc(item.title) + '</p>' +
      '</div>';
  }).join('');
}

function renderEvents(data) {
  document.getElementById('page-title').textContent = data.events.title;
  var eventsTable = document.getElementById('events-table');
  var html = '<div class="events-header"><span>Date</span><span>Event</span><span>Location</span></div>';
  html += data.events.items.map(function (item) {
    return '<div class="event-row fade-in">' +
      '<span class="event-row-date">' + esc(item.month) + ' ' + esc(item.day) + '</span>' +
      '<span class="event-row-name">' + esc(item.title) + '</span>' +
      '<span class="event-row-location">' + esc(item.location) + '</span>' +
      '</div>';
  }).join('');
  eventsTable.innerHTML = html;
}

function renderDonate(data) {
  var donateContent = document.getElementById('donate-content');
  donateContent.innerHTML = '<h1>' + esc(data.donate.title) + '</h1>' +
    '<p>' + esc(data.donate.description) + '</p>' +
    '<a href="' + esc(data.donate.url) + '" class="btn btn-donate" target="_blank" rel="noopener noreferrer">Donate Now</a>';
}

function renderContact(data) {
  var contactContent = document.getElementById('contact-content');
  var html = '<div class="contact-section">' +
    '<h3>Email</h3>' +
    '<p><a href="mailto:' + esc(data.contact.email) + '">' + esc(data.contact.email) + '</a></p>' +
    '</div>';

  // Social as text links
  html += '<div class="contact-section">' +
    '<h3>Social Media</h3>' +
    '<ul class="social-text-links">';
  if (data.social.facebook) {
    html += '<li><a href="' + esc(data.social.facebook) + '" target="_blank" rel="noopener noreferrer">Facebook &rarr;</a></li>';
  }
  if (data.social.twitter) {
    html += '<li><a href="' + esc(data.social.twitter) + '" target="_blank" rel="noopener noreferrer">Twitter &rarr;</a></li>';
  }
  if (data.social.instagram) {
    html += '<li><a href="' + esc(data.social.instagram) + '" target="_blank" rel="noopener noreferrer">Instagram &rarr;</a></li>';
  }
  html += '</ul></div>';

  // Volunteer
  html += '<div class="contact-section">' +
    '<h3>Volunteer</h3>' +
    '<p>' + esc(data.volunteer.description) + '</p>' +
    '<p><a href="' + esc(data.volunteer.signupUrl) + '" target="_blank" rel="noopener noreferrer">Sign up to volunteer &rarr;</a></p>' +
    '</div>';

  contactContent.innerHTML = html;
}

var PAGE_RENDERERS = {
  home: renderHome,
  issues: renderIssues,
  endorsements: renderEndorsements,
  events: renderEvents,
  donate: renderDonate,
  contact: renderContact
};

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

  // Detect page
  var page = document.documentElement.getAttribute('data-page') || 'home';

  // Load content
  fetch('content.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      applyTheme(data.theme);
      renderMeta(data, page);
      renderNav(data);
      renderFooter(data);
      if (PAGE_RENDERERS[page]) {
        PAGE_RENDERERS[page](data);
      }
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
