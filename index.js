window.onload = init;

let yolo = null;
let cnvs = null;
let img = null;
let imgElem = null;
let detectedObjects = [];
let modelLoaded = false;

/*
Documentation:
-ML5: https://ml5js.org/docs/yolo-webcam
-P5: https://p5js.org/reference/
 */

//wire everything together.
function init() {
    updateStatus('Loading...');

    cnvs = createCanvas();

    const fileInput = document.getElementById('fileInput');
    const dropContainer = document.getElementById('dropContainer');

    fileInput.disabled = true;
    dropContainer.disabled = true;

    //TODO: Create a yolo instance and kickstart the application.
    //TODO: Use the commented code to take in an image file.
    /*
    fileInput.addEventListener('change', () => {
            if(fileInput.files.length === 1) {
                processSelectedImage(URL.createObjectURL(fileInput.files[0]));
            } else {
                updateStatus('Too many files selected, only select one file!');
            }
        });
        dropContainer.ondragover = dropContainer.ondragenter = (evt) => {
            evt.preventDefault();
        };
        dropContainer.ondrop = (evt) => {
            if(evt.dataTransfer.files.length === 1) {
                fileInput.files = evt.dataTransfer.files;
                evt.preventDefault();

                processSelectedImage(URL.createObjectURL(fileInput.files[0]));
            } else {
                updateStatus('Too many files dropped, only drag in one file!');
            }
        };
     */
}

//Load an image from the given url
function processSelectedImage(imageUrl) {
    updateStatus('Processing image...');
    img = loadImage(imageUrl, imageLoaded);

    imgElem = createImg(imageUrl);
    imgElem.hide();
}

//Fixes image sizes & aspect ratio after loading
//Starts classification of the image
function imageLoaded() {
    //TODO: Make sure the img instance is resized to 800 wide and maintains the correct aspect ratio

    updateStatus('Detecting...');
    //TODO: Implement the detection of the loaded image!
    //TODO: assign the result to the detectedObject array.
}

//This function is called by the yolo instance when the detection has completed!
function draw() {
    if (modelLoaded && img) {
        image(img, 0, 0);

        for (let i = 0; i < detectedObjects.length; i++) {
            noStroke();
            fill(0, 255, 0);
            //TODO: Add the correct text for the generated bounding boxes
            text("Detected class name" + nfc(detectedObjects[i].classProb * 100.0, 2) + "%", detectedObjects[i].x * width + 5, detectedObjects[i].y * height + 15);
            noFill();
            strokeWeight(4);
            stroke(0, 255, 0);
            rect(detectedObjects[i].x * width, detectedObjects[i].y * height, detectedObjects[i].w * width, detectedObjects[i].h * height);
        }
    }
}

//Used to log the message to the console and display it in the UI.
function updateStatus(message) {
    console.log(message);
    document.getElementById('status').innerHTML = message;
}