import galleryItems from "./gallery-items.js";

const galleryContainerRef = document.querySelector("ul.js-gallery");
const lightboxContainerRef = document.querySelector("div.js-lightbox");
const lightboxImageRef = document.querySelector("img.lightbox__image");
const closeModalBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const overlayRef = document.querySelector("div.lightbox__overlay");

const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainerRef.insertAdjacentHTML("afterbegin", galleryCardsMarkup);

galleryContainerRef.addEventListener("click", onGalleryCardsClick);
closeModalBtnRef.addEventListener("click", onCloseModalBtnClick);
overlayRef.addEventListener("click", onOverlayClick);
window.addEventListener("keydown", onEscapeBtnPress);
window.addEventListener("keydown", choosePreviousImage);
window.addEventListener("keydown", chooseNextImage);

// render HTML element based on images list database
function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}

// delegation on gallery container
function onGalleryCardsClick(event) {
  event.preventDefault();

  const isGalleryImageRef = event.target.classList.contains("gallery__image");

  if (!isGalleryImageRef) {
    return;
  }

  // get url for big image
  const bigImageUrl = event.target.dataset.source;

  // make modal window visible
  lightboxContainerRef.classList.add("is-open");

  // set current big image src on modal window image element
  lightboxImageRef.setAttribute("src", bigImageUrl);
}

// modal window close on "close" button click
function onCloseModalBtnClick() {
  changeModalPropsOnClose();
}

// modal window close on overlay click
function onOverlayClick() {
  changeModalPropsOnClose();
}

// modal window close on ESC button press
function onEscapeBtnPress(event) {
  if (event.code !== "Escape") {
    return;
  }

  changeModalPropsOnClose();
}

function changeModalPropsOnClose() {
  // make modal window invisible
  lightboxContainerRef.classList.remove("is-open");

  // clear src atribute in modal window image element
  lightboxImageRef.setAttribute("src", "");
}

// scroll to previous image on "arrow left" button press
function choosePreviousImage(event) {
  if (event.code !== "ArrowLeft") {
    return;
  }

  // get index of current image in images list
  let currentImageIndex = galleryItems.findIndex((element) => element.original === lightboxImageRef.getAttribute('src'));
  
  // check if current image is the first in the list
  if (currentImageIndex === 0) { currentImageIndex = galleryItems.length;}

  // generate index for next image to show
  const prevImageUrl = galleryItems[currentImageIndex - 1].original;

  // show the new image
  lightboxImageRef.setAttribute("src", prevImageUrl);  
 }

 // scroll to previous image on "arrow right" button press
function chooseNextImage(event) {
  if (event.code !== "ArrowRight") {
    return;
  }

  // get index of current image in images list
  let currentImageIndex = galleryItems.findIndex((element) => element.original === lightboxImageRef.getAttribute('src'));
  
  // check if current image is the last in the list
  if (currentImageIndex === galleryItems.length - 1) { currentImageIndex = -1;}
  
  // generate index for next image to show
  const nextImageUrl = galleryItems[currentImageIndex + 1].original;

  // show the new image
  lightboxImageRef.setAttribute("src", nextImageUrl);
 }