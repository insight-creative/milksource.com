console.log('%c Crafted by Insight Creative, Inc. Designed and Developed by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

import { toggleMobileMenu, toggleMobileDropdowns, filterPosts } from "./partials";

const siteHeader = document.querySelector(".site-header")
const hasSubMenu = document.querySelectorAll(".has-sub-menu")
const content = document.querySelector('.hero-slider__wrapper');
const slides = document.querySelectorAll('.hero-slider__slide');
const sliderButtons = document.querySelector('.hero-slider__button-wrapper');
const positionsContainer = document.querySelector('.positions-list');
const heroSlider = document.querySelector('.hero-slider');

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

hasSubMenu.forEach((link) => {
  link.addEventListener("mouseover", () => {
      link.classList.add("active")
      const activeLink = document.querySelector(".active")
      const activeSubMenu = activeLink.querySelector(".header__sub-menu")
      const activeSubMenuContainer = activeSubMenu.querySelector(".header__sub-menu-inner").offsetHeight
      activeSubMenu.style.height = activeSubMenuContainer + "px"
  })
  link.addEventListener("mouseout", () => {
      link.classList.remove("active")
      const subMenuToHide = link.querySelector(".header__sub-menu")
      subMenuToHide.removeAttribute("style")
  })
})

if (document.body.contains(heroSlider)) {
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
    const positions = document.querySelectorAll('.position')

    positions.forEach(position => {
      const positionHeading = position.querySelector('.position__heading')

      position.addEventListener('click', function() {
        if(positionHeading.getAttribute("aria-expanded") === "true") {
          positionHeading.setAttribute('aria-expanded', 'false')
        } else {
          positionHeading.setAttribute('aria-expanded', 'true')
        }
      })
    })
}