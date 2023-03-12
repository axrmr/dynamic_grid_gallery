const dom = {
  gallery: document.querySelector("[data-gallery]"),
};
let lastImageId = parseInt(dom.gallery.lastElementChild.id);
let contaty = lastImageId;

window.addEventListener(
  "scroll",
  throttle(() => {
    checkPosition(() => {
      contaty += lastImageId;
      addImageToGallery(dom.gallery, lastImageId, contaty);
    });
  }, 250)
);

function addImageToGallery(el, id, contaty) {
  let imageMarkup = "";
  let i = contaty - id + 1;

  for (; i <= contaty; i++) {
    imageMarkup += `
    <div
      id=${i}
      class="image"
      lazyload
      style="--bg: url(https://api.lorem.space/image/game?w=1280&h720id=${i})"></div>`;
  }
  el.insertAdjacentHTML("beforeend", imageMarkup);
}

function checkPosition(callback) {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 3;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    callback();
  }
}

function throttle(callee, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
