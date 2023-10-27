// !--------------------nav menu -----------------------------!

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.toggle("open");
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

})();

// !  about section tabs

(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      //   console.log(
      //     "event.target contains 'tab-item' class and not contains 'active' class "
      //   );
      //   console.log(event.target);

      const target = event.target.getAttribute("data-target");
      //   console.log(target);
      // deactivate existing active tab-item

      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activate new   active tab-item

      event.target.classList.add("active", "outer-shadow");

      // deactivate existing active tab-content
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");

      // activate new   active tab-content

      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

// ! .................. portfolio filter and popup..............................

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-prroject-details-btn");
  // ///////////////
  let itemIndex, slideIndex, screenshots;

  // ! filter portfolio item

  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // ! Deactivating existing active "filter-item"
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // ? activating existing active "filter-item"
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((element) => {
        // console.log(element.getAttribute("data-category"));
        if (
          target === element.getAttribute("data-category") ||
          target === "all"
        ) {
          element.classList.remove("hide");
          element.classList.add("show");
        } else {
          element.classList.remove("show");
          element.classList.add("hide");
        }
      });
    }
  });
  portfolioItemsContainer.addEventListener("click", (event) => {
    // console.log(event.target.closest(".portfolio-item-inner"));

    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      //  get the portfolioitem index

      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      // console.log(itemIndex);
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // converting ss into array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", () => {
    // body
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");

    // activate loader untill the popup img loded
    popup.querySelector(".pp-loader").classList.add("load");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // deactivate the loader after image loads up
      popup.querySelector(".pp-loader").classList.remove("load");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // next slide

  nextBtn.addEventListener("click", () => {
    // body

    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });
  // prev slide

  prevBtn.addEventListener("click", () => {
    // body

    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    // if  portfolio-item-details not exists
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";

    // get the project details
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;

    // set the project details

    popup.querySelector(".pp-project-details").innerHTML = details;
    // get the project title

    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    // set the project title

    popup.querySelector(".pp-title h2").innerHTML = title;

    // get the project category

    const category = portfolioItems[itemIndex].getAttribute("data-category");
    // set the project category

    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }
  projectDetailsBtn.addEventListener("click", () => {
    // body
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");

      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

// ! -----------------Testimonial sections slider ---------------------//

(() => {
  const sliderContainer = document.querySelector(
    ".testimonial-slider-container"
  ),
    slides = sliderContainer.querySelectorAll(".testimonial-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testimonial-slider-nav .prev"),
    nextBtn = document.querySelector(".testimonial-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testimonial-item.active");

  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // set width of all slide

  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });

  // set width of slider container

  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    // body

    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });
  prevBtn.addEventListener("click", () => {
    // body

    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
      slider();
    }
  });
  function slider() {
    // deactivate existing activated slide
    sliderContainer
      .querySelector(".testimonial-item.active")
      .classList.remove("active");
    // activate new
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }

  slider();
})();

document.querySelectorAll('nav li').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('nav.nav-menu').classList.remove('open')
  })
})
window.addEventListener("load", () => {
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
let scrollToTop = document.querySelector(".scroll-to-top");

window.onscroll = function () {
  scroll();
};

function scroll() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTop.style.display = "flex";
  } else {
    scrollToTop.style.display = "none";
  }
}
