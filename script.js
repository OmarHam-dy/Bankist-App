'use strict';

///////////////////////////////////////////////////////////////////////////
// Modal Window

const btnsOpenModal = document.querySelectorAll('.open-modal');
const btnsCloseModal = document.querySelectorAll('.close-modal');
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal-window');

const openModal = function (e) {
  e.preventDefault();
  overlay.classList.remove('hidden');
  modalWindow.classList.remove('hidden');
};

const closeModal = function () {
  overlay.classList.add('hidden');
  modalWindow.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnsCloseModal.forEach(btn => btn.addEventListener('click', closeModal));
document.addEventListener('keyup', e => {
  if (e.key === 'Escape') closeModal();
});
/////////////////////////////////////////////////////////////////////////////
// Navbar List (mobile)

const listIcon = document.querySelector('nav .list-icon');
listIcon.addEventListener('click', () => {
  listIcon.classList.toggle('active');
});

document.addEventListener('click', e => {
  const opened = listIcon.classList.contains('active');
  const clickingInside = listIcon.contains(e.target);

  if (opened && !clickingInside) listIcon.classList.remove('active');
});

/////////////////////////////////////////////////////////////////////////////
// Smooth Scrolling

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// // easier and newer method
// navLinks.forEach((link, i) => {
//   link.addEventListener('click', () => {
//     sections[i].scrollIntoView({ behavior: 'smooth' });
//   });
// });

// old method
// navLinks.forEach((link, i) => {
//   link.addEventListener('click', e => {
//     e.preventDefault(); // must be added
//     const secCoord = sections[i].getBoundingClientRect();
//     window.scrollTo({
//       left: secCoord.left + window.pageXOffset,
//       top: secCoord.top + window.pageYOffset,
//       behavior: 'smooth',
//     }); // (horizontally x, vertically y)
//   });
// });
//
//
//

// using Event Delegation Technique
const linksList = document.querySelector('nav ul');
// console.log(linksList);

linksList.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target !== this && !e.target.classList.contains('open-modal')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////////////////
// Tapped Component

const taps = document.querySelectorAll('.operations .button');
const tapsContainer = document.querySelector('.operations .buttons');
const operationsContents = document.querySelectorAll(
  '.operations .description'
);
const operationsIcons = document.querySelectorAll('.operations .icon span');
const operationsTitle = document.querySelector('.operations .icon .title');
const titles = ['Instant Transfers', 'Instant Loans', 'Instant Closing'];

const activeTap = function (tap) {
  const tapNumber = tap.dataset.tap;

  // Taps
  taps.forEach(tap => tap.classList.remove('active-tap'));
  tap.classList.add('active-tap');

  // Contents
  operationsContents.forEach(content => content.classList.add('hidden'));
  operationsContents[tapNumber - 1].classList.remove('hidden');

  //Icons
  operationsIcons.forEach(icon => icon.classList.add('hidden'));
  operationsIcons[tapNumber - 1].classList.remove('hidden');

  // Title (in small media)
  operationsTitle.textContent = titles[tapNumber - 1];
};

tapsContainer.addEventListener('click', e => {
  const clickedElement = e.target.closest('.operations .button');

  if (!clickedElement) return;

  activeTap(clickedElement);
});

///////////////////////////////////////////////////////////////////////////////
// Fade Animation

const nav = document.querySelector('nav');

const setOpacity = function (e) {
  if (!e.target.classList.contains('nav-link')) return;

  nav.querySelectorAll('.nav-link').forEach(link => {
    if (link !== e.target) link.style.opacity = this;
  });
  nav.querySelector('.logo').style.opacity = this;
};

nav.addEventListener('mouseover', setOpacity.bind(0.5));
nav.addEventListener('mouseout', setOpacity.bind(1));

///////////////////////////////////////////////////////////////////
// Sticky Navigation

const landing = document.querySelector('.landing');

const stickyNav = function (entries, _) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const landingObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.clientHeight + 4}px`,
});

landingObserver.observe(landing);

/////////////////////////////////////////////////////////////////////////
// Revealing Sections on Scroll

const revealingSection = function (entries, sectionObserver) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('revealing');
  sectionObserver.unobserve(entry.target);
};
sections.forEach(section => {
  section.classList.add('revealing');

  const sectionObserver = new IntersectionObserver(revealingSection, {
    root: null,
    threshold: 0.15,
  });

  sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////////////////////
// Lazy-loading for iamges

const images = document.querySelectorAll('img[data-src]');

const lazyLoading = function (entries, imageObserver) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('blur');
  });

  imageObserver.unobserve(entry.target);
};
images.forEach(img => {
  const imageObserver = new IntersectionObserver(lazyLoading, {
    root: null,
    threshlod: 0,
  });

  imageObserver.observe(img);
});

////////////////////////////////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnNext = document.querySelector('.arrow.next');
  const btnPrev = document.querySelector('.arrow.prev');
  const dotsContainer = document.querySelector('.dots');

  let currentSlide = 0;

  // funtions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<span class="" data-id="${i}"></span>`
      );
    });
  };

  const activateDot = function (id) {
    document
      .querySelectorAll('.dots span')
      .forEach(dot => dot.classList.remove('active-dot'));
    document
      .querySelector(`.dots span[data-id="${id}"]`)
      .classList.add('active-dot');
  };

  const goToSlide = function (slideNumber) {
    slideNumber =
      ((slideNumber % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - slideNumber) * 100}%)`;
    });

    activateDot(slideNumber);
  };

  const init = function () {
    createDots();

    goToSlide(0);

    activateDot(0);
  };
  init();

  // Events
  btnNext.addEventListener('click', function (e) {
    currentSlide++;
    goToSlide(currentSlide);
  });

  btnPrev.addEventListener('click', function (e) {
    currentSlide--;
    goToSlide(currentSlide);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') currentSlide++;
    else if (e.key === 'ArrowLeft') currentSlide--;

    goToSlide(currentSlide);
  });

  dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots')) return;

    const id = e.target.dataset.id;

    activateDot(id);
    goToSlide(id);
  });
};
slider();
