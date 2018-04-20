const toogleSwitch = () => {
  const toggleButtons = document.querySelectorAll(
    "[type=button][aria-pressed]"
  );

  // IE-compatible way of iterating over the NodeList
  // (See: https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
  Array.prototype.forEach.call(toggleButtons, toggleButton => {
    toggleButton.addEventListener("click", e => {
      let pressed = toggleButton.getAttribute("aria-pressed") === "true";
      toggleButton.setAttribute("aria-pressed", String(!pressed));
    });
  });
};

export default toogleSwitch;
