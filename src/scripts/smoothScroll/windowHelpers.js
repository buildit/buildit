// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
export function getScrollPosition() {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

  // prettier-ignore
  let x;
  if (supportPageOffset) {
    x = window.pageXOffset;
  } else {
    x = isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
  }

  // prettier-ignore
  let y;
  if (supportPageOffset) {
    y = window.pageYOffset;
  } else {
    y = isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  }

  return { x, y };
}

export default getScrollPosition;
