//  about section tabs

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
