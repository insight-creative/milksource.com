console.log('%c Crafted by Insight Creative, Inc. Designed and Developed by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

const mobileMenu = document.querySelector('.site-header__mobile-nav')
const hamburger = document.querySelector('.hamburger')
const siteHeader = document.querySelector('.site-header')
const siteHeaderHeight = siteHeader.getBoundingClientRect().height
const mobileMenuHeight = mobileMenu.getBoundingClientRect().height
const content = document.querySelector('.hero-slider__wrapper');
const slides = document.querySelectorAll('.hero-slider__slide');
const sliderButtons = document.querySelector('.hero-slider__button-wrapper');
const positionsContainer = document.querySelector('.positions-list');

mobileMenu.style.height = 0

hamburger.addEventListener('click', toggleMobileMenu)

function toggleMobileMenu() {
    const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
    const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height

    mobileMenu.style.height = 0

    if(mobileMenu.classList.contains('nav-open')) {
        this.setAttribute('aria-expanded', 'false')
        this.setAttribute('aria-label', 'open mobile menu')
        mobileMenu.classList.remove('nav-open')
        mobileMenu.style.height = 0
        hamburger.classList.remove('is-active')
    } else {
        mobileMenu.classList.add('nav-open')
        mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
        hamburger.classList.add('is-active')
        this.setAttribute('aria-expanded','true')
        this.setAttribute('aria-label', 'close mobile menu')
    }
}

let scrollState = 0

var scrollTop = function() {
  return window.scrollY
}

var scrollDetect = function(collapse, expand) {
  var currentScroll = scrollTop()
  if (currentScroll > scrollState) {
    collapse()
  } else {
    expand()
  }
  scrollState = scrollTop()
}

function collapseNav() {
  siteHeader.classList.remove("expand")
  siteHeader.classList.add("collapse")
}

function expandNav() {
  siteHeader.classList.remove("collapse")
  siteHeader.classList.add("expand")
}

window.addEventListener("scroll", function() {
  scrollDetect(collapseNav, expandNav)
})

let heroSliderCheck = document.querySelector('section');
let sliderIsTrue = heroSliderCheck.classList.contains('hero-slider');

if (sliderIsTrue) {
  const sliderButton = Array.from(sliderButtons.querySelectorAll('.slider-button'));
  const slideWidth = slides[0].getBoundingClientRect().width;

  sliderButton[0].classList.add('active-button');
  
  sliderButton.forEach(button => {
    button.addEventListener('click', e => {
      let clickedButtonIndex;
  
        for (let i = 0; i  < sliderButton.length; i++) {
          if (sliderButton[i] === button) {
            clickedButtonIndex = i;
          }
        }
  
      removeIsSelectedClass();
      removeActiveButtonClass();
  
      button.classList.add('active-button');
  
      const slideToShow = slides[clickedButtonIndex];
      const destination = getComputedStyle(slideToShow).left;
  
      slideToShow.classList.add('is-selected');
      content.style.transform = `translateX(-${destination})`;
    })
  })
  
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  })

  function removeIsSelectedClass() {
    slides.forEach(slide => {
      slide.classList.remove(['is-selected']);
    })
  }

  function removeActiveButtonClass() {
    sliderButton.forEach(button => {
      button.classList.remove(['active-button']);
    })
  }
}

if (document.body.contains(positionsContainer)) {
  positionsContainer.addEventListener('click', event => {
    const positionHeader = event.target.closest('.position__header');

    if (!positionHeader) return;

    const position = positionHeader.parentElement;
    const height = getContentHeight(position);

    updateOpenPositions(position, height);
  })
}

function updateOpenPositions (position, height) {
  const positionContent = position.querySelector('.position__content');

  position.classList.toggle('position-open');
  positionContent.style.height = height + 'px';
}

function openFirstPosition() {
  const openPosition = document.querySelector('.position');
  
  if (!openPosition) return;

  const positionContent = openPosition.querySelector('.position__content');
  const positionInner = openPosition.querySelector('.position__content-inner');
  const height = positionInner.getBoundingClientRect().height;

  openPosition.classList.add('position-open');

  positionContent.style.height = height + 'px';
}

openFirstPosition();

function getContentHeight (position) {
  const positionInner = position.querySelector('.position__content-inner');

  if (position.classList.contains('position-open')) return 0;
  return positionInner.getBoundingClientRect().height;
}

function filterPosts () {
  const filterBtn = document.querySelector('.btn-filter');
  const categoryList = document.querySelector('.category-list');

  if (!document.body.contains(categoryList)) return
  filterBtn.addEventListener('click', event => {
    categoryList.classList.toggle('list-open')
  })
}

filterPosts();

