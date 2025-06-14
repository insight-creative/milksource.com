console.log('%c Crafted by Insight Creative, Inc. Designed and Developed by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

import { toggleMobileMenu, toggleMobileDropdowns, filterPosts } from "./partials";

const siteHeader = document.querySelector(".header")
const hasSubMenu = document.querySelectorAll(".has-sub-menu")
const content = document.querySelector('.hero-slider__wrapper');
const slides = document.querySelectorAll('.hero-slider__slide');
const sliderButtons = document.querySelector('.hero-slider__button-wrapper');
const heroSlider = document.querySelector('.hero-slider');

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

// Load the YouTube IFrame Player API
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function createPlayer(video, index) {
  var videoURL = new URL(video.src);
  // Extracts video ID from the URL path
  var videoId = videoURL.pathname.split('/').pop(); 
  
  // Append parameters for YouTube player
  videoURL.searchParams.set('enablejsapi', '1');
  videoURL.searchParams.set('autoplay', '1');
  videoURL.searchParams.set('mute', '1');
  videoURL.searchParams.set('rel', '0');
  videoURL.searchParams.set('loop', '1');
  videoURL.searchParams.set('origin', window.location.origin);
  videoURL.searchParams.set('playlist', videoId);
  
  // Set the modified source URL back to the iframe
  video.src = videoURL.href;

  return new YT.Player(video, {
    events: {
      'onReady': function(event) {
        bindControlButton(event.target, index);
      }
    }
  });
}

function removeIframes() {
  var iframes = document.querySelectorAll('.hero-slider__slide iframe');
  iframes.forEach(function(iframe) {
    iframe.parentNode.removeChild(iframe);
  });
}

function initializeVideos() {
  var videos = document.querySelectorAll('.hero-slider__slide iframe');
  videos.forEach(createPlayer);
}

function checkScreenSize() {
  if (window.matchMedia('(min-width: 62em)').matches) {
    initializeVideos();
  } else {
    removeIframes();
  }
}

window.onYouTubeIframeAPIReady = checkScreenSize;
window.addEventListener('resize', checkScreenSize);