const animatedScrollObserver = process.isClient
  ? new IntersectionObserver((entries, animatedScrollObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("enter");
          animatedScrollObserver.unobserve(entry.target);
        }
      });
    })
  : null;

export default {
  bind(el) {
    el.classList.add("before-enter");
    if (animatedScrollObserver !== null) {
      animatedScrollObserver.observe(el);
    }
  },
};
