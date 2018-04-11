const toogleSwitch = () => {
  document
    .querySelectorAll("[type=button][aria-pressed]")
    .forEach(toggleButton => {
      toggleButton.addEventListener("click", e => {
        let pressed = toggleButton.getAttribute("aria-pressed") === "true";
        toggleButton.setAttribute("aria-pressed", String(!pressed));
      });
    });
};

export default toogleSwitch;
