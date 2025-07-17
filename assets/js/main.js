console.log('%c Crafted by Insight Creative, Inc. Designed and Developed by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

import { toggleMobileMenu, toggleMobileDropdowns, filterPosts } from "./partials";

const siteHeader = document.querySelector(".header")
const hasSubMenu = document.querySelectorAll(".has-sub-menu")
const content = document.querySelector('.hero-slider__wrapper');
const slides = document.querySelectorAll('.hero-slider__slide');
const sliderButtons = document.querySelector('.hero-slider__button-wrapper');
const heroSlider = document.querySelector('.hero-slider');

const heroVideo = document.querySelector('.hero__video')

let scrollState = 0;

const scrollTop = () => window.scrollY;

const scrollDetect = (collapse, expand) => {
  const currentScroll = scrollTop();
  if (currentScroll > scrollState) {
    collapse();
  } else {
    expand();
  }
  scrollState = scrollTop();
};

function collapseNav() {
  siteHeader.classList.remove("expand");
  siteHeader.classList.add("collapse");
}

function expandNav() {
  siteHeader.classList.remove("collapse");
  siteHeader.classList.add("expand");
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollDetect(collapseNav, expandNav);
      ticking = false;
    });

    ticking = true;
  }
});

hasSubMenu.forEach((link) => {
  // Helper function to set ARIA-expanded attribute
  function setAriaExpandedAttribute(element, value) {
    element.setAttribute("aria-expanded", value);
  };

  const subMenuToggle = document.querySelector(".sub-menu-toggle");
  const subMenuLinks = link.querySelectorAll(".header__sub-menu-link");

  function openSubMenu() {
    link.classList.add("has-sub-menu-open");
    subMenuToggle.classList.add("sub-menu-is-toggled");
    setAriaExpandedAttribute(subMenuToggle, "true");
  };

  function closeSubMenu() {
    link.classList.remove("has-sub-menu-open");
    subMenuToggle.classList.remove("sub-menu-is-toggled");
    setAriaExpandedAttribute(subMenuToggle, "false");
  };

  link.addEventListener("mouseover", openSubMenu);
  link.addEventListener("mouseout", closeSubMenu);

  // ensure that we open our sub menu when sub menu links are tabbed and focused rather than these remaining visually hidden
  subMenuLinks.forEach((subMenuLink) => {
    subMenuLink.addEventListener("focus", openSubMenu);
    subMenuLink.addEventListener("blur", closeSubMenu);
  });
});

if(document.body.contains(heroVideo)) {
  const videoControls = document.querySelector('.hero__controls')

  videoControls.addEventListener('click', () => {
    if(videoControls.classList.contains('video-playing')) {
      videoControls.classList.remove('video-playing')
      videoControls.classList.add('video-paused')
      videoControls.setAttribute('aria-label', 'play the video')
      videoControls.setAttribute('title', 'play the video')
      heroVideo.pause()
    } else {
      videoControls.classList.remove('video-paused')
      videoControls.classList.add('video-playing')
      videoControls.setAttribute('aria-label', 'pause the video')
      videoControls.setAttribute('title', 'pause the video')
      heroVideo.play()
    }
  })
}