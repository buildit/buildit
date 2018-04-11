class ToogleSwitch {
  constructor(attribute) {
    this.target = attribute;
  }

  init() {
    document.querySelectorAll(this.target).forEach(toggleButton => {
      toggleButton.addEventListener("click", e => {
        let pressed = toggleButton.getAttribute("aria-pressed") === "true";
        toggleButton.setAttribute("aria-pressed", String(!pressed));
      });
    });
  }
}

export default ToogleSwitch;
