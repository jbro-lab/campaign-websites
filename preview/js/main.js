/* ============================================================
   PREVIEW PAGE — Dynamic campaign site preview
   Reads candidate info from URL params, builds placeholder content,
   reuses all rendering functions from the grassroots template.
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
  'red-gold': {
    '--color-primary': '#8B1A1A',
    '--color-primary-dark': '#6B1414',
    '--color-primary-light': '#F7E8E8',
    '--color-secondary': '#C9A84C',
    '--color-secondary-dark': '#A8893D',
    '--color-text': '#1a1a1a',
    '--color-text-light': '#555555',
    '--color-bg': '#ffffff',
    '--color-bg-alt': '#faf5f5',
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

function getFirstName(fullName) {
  var parts = fullName.trim().split(/\s+/);
  var first = parts[0] || fullName;
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

function getLastName(fullName) {
  var parts = fullName.trim().split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

function titleCase(str) {
  return str.replace(/\w\S*/g, function(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

function pickPalette(party) {
  var p = (party || '').toLowerCase();
  if (p.indexOf('democrat') !== -1) return 'navy-red';
  if (p.indexOf('republican') !== -1) return 'red-gold';
  return 'green-cream';
}

function buildPreviewData(name, office, party) {
  var firstName = getFirstName(name);
  var fullName = titleCase(name);
  var lastName = getLastName(name);
  var navBrand = lastName ? (fullName.toUpperCase()) : fullName.toUpperCase();

  return {
    site: {
      title: fullName + ' for ' + office,
      metaDescription: fullName + ' is running for ' + office + '. Learn more about the campaign, key issues, and how to get involved.'
    },
    candidate: {
      name: fullName,
      navBrand: navBrand,
      office: 'Candidate for ' + office,
      tagline: 'Building a stronger future for our community',
      heroImage: '',
      aboutImage: ''
    },
    stats: [
      { number: '500+', label: 'Supporters' },
      { number: '15', label: 'Community Events' },
      { number: '50+', label: 'Volunteers' },
      { number: '8', label: 'Endorsements' }
    ],
    about: {
      title: 'Meet ' + firstName,
      paragraphs: [
        firstName + ' is a dedicated community member running for ' + office + '. With deep roots in the district and a commitment to public service, ' + firstName + ' brings real-world experience and a collaborative approach to the issues that matter most.',
        'As a long-time resident and active community volunteer, ' + firstName + ' understands the challenges facing local families. This campaign is about listening to neighbors, finding common ground, and delivering results that make a real difference.'
      ]
    },
    issues: {
      title: 'Key Issues',
      items: [
        {
          icon: '\uD83C\uDF93',
          title: 'Education',
          description: 'Investing in quality schools and supporting educators.',
          detail: 'Every child deserves access to a world-class education. ' + firstName + ' is committed to increasing teacher pay, reducing class sizes, and ensuring every school has the resources to help students thrive.'
        },
        {
          icon: '\uD83D\uDCBC',
          title: 'Economy',
          description: 'Growing local businesses and creating good-paying jobs.',
          detail: 'A strong local economy means opportunity for everyone. ' + firstName + ' will work to cut red tape for small businesses, attract new industries, and ensure workforce training programs prepare residents for the jobs of tomorrow.'
        },
        {
          icon: '\u2764\uFE0F',
          title: 'Healthcare',
          description: 'Making healthcare accessible and affordable for all families.',
          detail: 'No family should have to choose between paying bills and getting the care they need. ' + firstName + ' supports expanding access to affordable healthcare, lowering prescription costs, and strengthening mental health services.'
        },
        {
          icon: '\uD83D\uDEE1\uFE0F',
          title: 'Public Safety',
          description: 'Keeping our neighborhoods safe and secure.',
          detail: firstName + ' believes in a balanced approach to public safety — supporting law enforcement with the training and resources they need while investing in community-based prevention programs that address root causes.'
        },
        {
          icon: '\uD83D\uDE8C',
          title: 'Infrastructure',
          description: 'Modernizing roads, transit, and utilities.',
          detail: 'From roads and bridges to broadband and water systems, our infrastructure needs investment. ' + firstName + ' will fight for funding to modernize aging systems and plan for sustainable growth.'
        },
        {
          icon: '\uD83C\uDF3F',
          title: 'Environment',
          description: 'Protecting clean air, water, and public lands.',
          detail: 'Utah\'s natural beauty is one of our greatest assets. ' + firstName + ' is committed to protecting clean air and water, preserving public lands, and supporting responsible stewardship of our environment for future generations.'
        }
      ]
    },
    endorsements: {
      title: 'Endorsements',
      items: [
        {
          quote: firstName + ' is exactly the kind of leader our community needs — someone who listens, works hard, and puts people first.',
          name: 'Community Leader',
          title: 'Local Business Owner'
        },
        {
          quote: 'I\'ve seen ' + firstName + '\'s dedication firsthand. This is a candidate who will show up and fight for every family in this district.',
          name: 'Neighbor & Supporter',
          title: 'District Resident'
        },
        {
          quote: firstName + ' brings a fresh perspective and real solutions. Our community will be better served with this kind of representation.',
          name: 'Local Advocate',
          title: 'Community Organizer'
        }
      ]
    },
    events: {
      title: 'Upcoming Events',
      items: [
        {
          month: 'JUN',
          day: '14',
          title: 'Community Town Hall',
          time: '6:00 PM - 8:00 PM',
          location: 'Community Recreation Center',
          description: 'Join ' + firstName + ' for an open discussion about the issues that matter to you.'
        },
        {
          month: 'JUN',
          day: '21',
          title: 'Neighborhood Canvass',
          time: '9:00 AM - 12:00 PM',
          location: 'Campaign Office',
          description: 'Help spread the word! Meet fellow volunteers and knock doors in the district.'
        },
        {
          month: 'JUL',
          day: '4',
          title: 'Independence Day Parade',
          time: '10:00 AM',
          location: 'Main Street',
          description: 'Celebrate with the community! Look for our float and grab some campaign swag.'
        },
        {
          month: 'JUL',
          day: '12',
          title: 'Fundraising BBQ',
          time: '4:00 PM - 7:00 PM',
          location: 'City Park Pavilion',
          description: 'Good food, great company, and a chance to support the campaign.'
        }
      ]
    },
    volunteer: {
      title: 'Join the Team',
      description: 'This campaign is powered by people like you. Whether you can knock doors, make calls, or spread the word on social media — every bit of help makes a difference.',
      signupUrl: '#'
    },
    donate: {
      title: 'Fuel the Campaign',
      description: 'Grassroots donations keep this campaign running. Every contribution — no matter the size — helps reach more voters and build a stronger community.',
      url: '#'
    },
    contact: {
      email: 'info@' + firstName.toLowerCase() + 'for' + office.replace(/\s+/g, '').toLowerCase().substring(0, 12) + '.com',
      phone: '(801) 555-0100',
      address: {
        street: 'Campaign HQ',
        city: 'Utah'
      }
    },
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#'
    },
    disclaimer: 'Paid for by ' + fullName + ' for ' + office + '. This is a preview site generated by Speedy Campaign Sites.'
  };
}

function applyTheme(theme) {
  var root = document.documentElement;
  var colors = PALETTES[theme.palette] || PALETTES['navy-red'];
  Object.keys(colors).forEach(function (prop) {
    root.style.setProperty(prop, colors[prop]);
  });
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
  document.title = data.site.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.site.metaDescription);

  document.getElementById('nav-brand').textContent = data.candidate.navBrand;

  document.getElementById('hero-name').textContent = data.candidate.name;
  document.getElementById('hero-office').textContent = data.candidate.office;
  document.getElementById('hero-tagline').textContent = data.candidate.tagline;

  if (data.stats && data.stats.length) {
    var statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = data.stats.map(function (stat) {
      return '<div class="stat-item">' +
        '<div class="stat-number">' + esc(stat.number) + '</div>' +
        '<div class="stat-label">' + esc(stat.label) + '</div>' +
        '</div>';
    }).join('');
  }

  document.getElementById('about-title').textContent = data.about.title;
  var aboutContent = document.getElementById('about-content');
  aboutContent.innerHTML = data.about.paragraphs.map(function (p) {
    return '<p>' + esc(p) + '</p>';
  }).join('');

  document.getElementById('issues-title').textContent = data.issues.title;
  renderIssueTabs(data.issues.items);

  document.getElementById('endorsements-title').textContent = data.endorsements.title;
  renderCarousel(data.endorsements.items);

  document.getElementById('events-title').textContent = data.events.title;
  var eventsScroll = document.getElementById('events-scroll');
  eventsScroll.innerHTML = data.events.items.map(function (item) {
    return '<div class="event-card fade-in">' +
      '<div class="event-date">' +
      '<span class="event-month">' + esc(item.month) + '</span>' +
      '<span class="event-day">' + esc(item.day) + '</span>' +
      '</div>' +
      '<h3 class="event-title">' + esc(item.title) + '</h3>' +
      '<p class="event-time">' + esc(item.time) + '</p>' +
      '<p class="event-location">' + esc(item.location) + '</p>' +
      '<p class="event-description">' + esc(item.description) + '</p>' +
      '</div>';
  }).join('');

  document.getElementById('volunteer-title').textContent = data.volunteer.title;
  document.getElementById('volunteer-description').textContent = data.volunteer.description;
  document.getElementById('volunteer-btn').href = data.volunteer.signupUrl;

  document.getElementById('donate-title').textContent = data.donate.title;
  document.getElementById('donate-description').textContent = data.donate.description;
  document.getElementById('donate-btn').href = data.donate.url;

  document.getElementById('footer-brand').textContent = data.candidate.navBrand;
  document.getElementById('footer-tagline').textContent = data.candidate.tagline;

  var footerContact = document.getElementById('footer-contact');
  footerContact.innerHTML =
    '<p><a href="mailto:' + esc(data.contact.email) + '">' + esc(data.contact.email) + '</a></p>' +
    '<p>' + esc(data.contact.phone) + '</p>' +
    '<p>' + esc(data.contact.address.street) + '<br>' + esc(data.contact.address.city) + '</p>';

  var footerSocial = document.getElementById('footer-social');
  footerSocial.innerHTML = '<div class="social-links">' + buildSocialLinks(data.social) + '</div>';

  document.getElementById('footer-disclaimer').textContent = data.disclaimer;
}

function renderIssueTabs(items) {
  var tabs = document.getElementById('issues-tabs');
  var panel = document.getElementById('issues-panel');

  tabs.innerHTML = items.map(function (item, i) {
    return '<button class="issue-tab' + (i === 0 ? ' active' : '') + '" data-index="' + i + '">' +
      '<span class="issue-tab-icon">' + esc(item.icon) + '</span>' +
      '<span class="issue-tab-label">' + esc(item.title) + '</span>' +
      '</button>';
  }).join('');

  function showPanel(index) {
    var item = items[index];
    panel.innerHTML =
      '<div class="issue-panel-content">' +
      '<h3>' + esc(item.icon) + ' ' + esc(item.title) + '</h3>' +
      '<p class="issue-short">' + esc(item.description) + '</p>' +
      (item.detail ? '<p class="issue-detail">' + esc(item.detail) + '</p>' : '') +
      '</div>';
  }

  showPanel(0);

  tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.issue-tab');
    if (!btn) return;
    tabs.querySelectorAll('.issue-tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    showPanel(parseInt(btn.getAttribute('data-index'), 10));
  });
}

var carouselIndex = 0;
var carouselInterval = null;

function renderCarousel(items) {
  var track = document.getElementById('carousel-track');
  var dots = document.getElementById('carousel-dots');

  track.innerHTML = items.map(function (item) {
    return '<div class="carousel-slide">' +
      '<blockquote>' +
      '<p class="carousel-quote">&ldquo;' + esc(item.quote) + '&rdquo;</p>' +
      '<footer>' +
      '<cite class="carousel-name">' + esc(item.name) + '</cite>' +
      '<span class="carousel-title">' + esc(item.title) + '</span>' +
      '</footer>' +
      '</blockquote>' +
      '</div>';
  }).join('');

  dots.innerHTML = items.map(function (_, i) {
    return '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
  }).join('');

  function goToSlide(index) {
    carouselIndex = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
  }

  dots.addEventListener('click', function (e) {
    var dot = e.target.closest('.carousel-dot');
    if (!dot) return;
    goToSlide(parseInt(dot.getAttribute('data-index'), 10));
    resetAutoplay(items.length);
  });

  document.querySelector('.carousel-prev').addEventListener('click', function () {
    goToSlide((carouselIndex - 1 + items.length) % items.length);
    resetAutoplay(items.length);
  });

  document.querySelector('.carousel-next').addEventListener('click', function () {
    goToSlide((carouselIndex + 1) % items.length);
    resetAutoplay(items.length);
  });

  function startAutoplay(total) {
    carouselInterval = setInterval(function () {
      goToSlide((carouselIndex + 1) % total);
    }, 5000);
  }

  function resetAutoplay(total) {
    clearInterval(carouselInterval);
    startAutoplay(total);
  }

  startAutoplay(items.length);
}

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

// --- Palette Picker ---
var PALETTE_DISPLAY = {
  "navy-red":    { name: "Navy & Red",    colors: ["#1B3A5C","#C42032","#E8EEF4"] },
  "red-gold":    { name: "Red & Gold",     colors: ["#8B1A1A","#C9A84C","#F7E8E8"] },
  "blue-gold":   { name: "Blue & Copper", colors: ["#2563EB","#D97706","#EFF6FF"] },
  "green-cream": { name: "Green & Cream", colors: ["#1E6B45","#B45309","#ECFDF5"] },
  "slate-teal":  { name: "Slate & Teal",  colors: ["#334155","#0D9488","#F1F5F9"] }
};

function initPalettePicker(currentPalette) {
  var picker = document.createElement("div");
  picker.className = "palette-picker";

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

  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    panel.classList.toggle("open");
  });

  document.addEventListener("click", function(e) {
    if (!picker.contains(e.target)) {
      panel.classList.remove("open");
    }
  });

  document.body.appendChild(picker);
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

  // Read URL params and build preview data
  var params = new URLSearchParams(window.location.search);
  var name = params.get('name') || 'Jane Smith';
  var office = params.get('office') || 'State Representative';
  var party = params.get('party') || '';

  var palette = pickPalette(party);
  var data = buildPreviewData(name, office, party);

  applyTheme({ palette: palette });
  renderContent(data);
  initFadeAnimations();
  initPalettePicker(palette);
});
