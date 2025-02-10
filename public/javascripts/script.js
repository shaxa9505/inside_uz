document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".number").forEach(el => {
    let target = +el.getAttribute("data-target");
    let count = 0; let speed = target / 100;
    let updateNumber = () => {
      count += speed; el.innerText = Math.ceil(count);
      if (count < target) requestAnimationFrame(updateNumber);
      else el.innerText = target;
    }; updateNumber();
  });

  
})