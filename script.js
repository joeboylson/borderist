const imageUploadForm = document.querySelector("#image-upload-form");
const imagePreview = document.querySelector("#image-preview");
const fileInput = document.querySelector('#image-input');

const hideElement = (ele) => ele.style.display = "none";
const showElement = (ele) => ele.style.display = "block";

const handlePageLoad = () => {

    const imagePreview = document.querySelector("#image-preview");
    const fileInput = document.querySelector('#image-input');

    fileInput.addEventListener('change', handleFileInputChange);
    hideElement(imagePreview)
};

const setDownloadLink = (href, name) => {
    const downloadLink = document.querySelector("#download-link");
    downloadLink.setAttribute('href', href);

    const _downloadName = `borderly-${name}`
    downloadLink.setAttribute('download', _downloadName);
}

const handleImageLoad = (image, filename) => {

    const imageUploadForm = document.querySelector("#image-upload-form");
    const imagePreview = document.querySelector("#image-preview");

    hideElement(imageUploadForm);
    showElement(imagePreview);

    const canvas = document.querySelector('#canvas-image-preview');
    const ctx = canvas.getContext('2d');

    const borderWidth = image.width * 0.05;

    canvas.width = image.width + (borderWidth * 2);
    canvas.height = image.height + (borderWidth * 2);

    // Add background rectangle which will become border
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, borderWidth, borderWidth);

    const dataURL = canvas.toDataURL();
    setDownloadLink(dataURL, filename);
}

const handleFileInputChange = (event) => {

    console.log("handleFileInputChange")

    const file = event.target.files[0];
    const filename = file.name

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const dataUrl = event.target.result;
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => handleImageLoad(image, filename)
    };
}

window.addEventListener("DOMContentLoaded", handlePageLoad)