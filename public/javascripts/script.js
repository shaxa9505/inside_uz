window.addEventListener("load", () => {
  function animateCounter(id, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 50);
    const counter = document.getElementById(id);

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      counter.textContent = Math.floor(current);
    }, 100);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const endValue = parseInt(entry.target.dataset.end); // Берем число из data-end
        if (id === "stat1") {
          animateCounter("counter1", 0, endValue, 2000);
        } else if (id === "stat2") {
          animateCounter("counter2", 0, endValue, 2000);
        }
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById('stat1'));
  observer.observe(document.getElementById('stat2'));
});
