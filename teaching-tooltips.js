/* Course descriptions: load this script once, with the defer attribute. */
(() => {
  let activeCourse = null;
  let pinned = false;

  function closeDescription() {
    if (activeCourse) activeCourse.classList.remove("is-open");
    activeCourse = null;
    pinned = false;
  }

  function openDescription(course) {
    if (activeCourse !== course) closeDescription();
    activeCourse = course;
    course.classList.add("is-open");
  }

  document.querySelectorAll(".teaching-page .course-tooltip").forEach((course, index) => {
    const button = course.querySelector(".course-title");
    const description = course.querySelector(".course-popup");
    if (!button || !description) return;

    description.id = `teaching-course-description-${index + 1}`;
    description.setAttribute("role", "tooltip");
    button.setAttribute("aria-describedby", description.id);

    course.addEventListener("mouseenter", () => openDescription(course));
    course.addEventListener("mouseleave", () => {
      if (activeCourse === course && !pinned && document.activeElement !== button) {
        closeDescription();
      }
    });

    button.addEventListener("focus", () => openDescription(course));
    button.addEventListener("blur", () => {
      if (activeCourse === course) {
        pinned = false;
        if (!course.matches(":hover")) closeDescription();
      }
    });

    button.addEventListener("click", () => {
      if (activeCourse === course && pinned) {
        closeDescription();
      } else {
        openDescription(course);
        pinned = true;
      }
    });
  });

  document.addEventListener("click", event => {
    if (activeCourse && !activeCourse.contains(event.target)) closeDescription();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeDescription();
  });
})();
