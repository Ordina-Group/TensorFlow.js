window.onload = init;

let classifier = null;
let yolo = null;
let cnvs = null;
let img = null;
let imgElem = null;
let detectedObjects = [];
let modelLoaded = false;

function init() {
    updateStatus('Loading...');

    cnvs = createCanvas();

    const fileInput = document.getElementById('fileInput');
    const dropContainer = document.getElementById('dropContainer');

    fileInput.disabled = true;
    dropContainer.disabled = true;

    classifier = ml5.imageClassifier('MobileNet', () => {
        yolo = ml5.YOLO(() => {
            modelLoaded = true;
            updateStatus('Model loaded, select an image file to classify!');

            fileInput.disabled = false;
            dropContainer.disabled = false;


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
        });
    });
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
    img.resize(800, 0);
    imgElem.size(img.width, img.height);
    cnvs.resize(img.width, img.height);

    updateStatus('Detecting...');
    classifier.predict(imgElem, (error, result) => {

        if(error) {
            updateStatus('Could not classify image: ' + error);
        } else {
            const ul = document.getElementById('classifiedResults');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            for (const detection of result) {
                const li = document.createElement('li');
                li.textContent = detection.className + ' (' + Math.round(detection.probability * 100) + ')';
                ul.appendChild(li);
            }
        }
    });

    yolo.detect(imgElem, (error, result) => {
        if(error) {
            updateStatus('Could not classify image: ' + error);
        } else {
            detectedObjects = result;
            document.getElementById('yoloResults').textContent = 'Detected ' + result.length + (result.length === 1 ? ' object.' : ' objects.') + ' (see image)';
        }
    });
}

//This function is called by the yolo instance when the detection has completed!
function draw() {
    if (modelLoaded && img) {
        image(img, 0, 0);

        for (let i = 0; i < detectedObjects.length; i++) {
            noStroke();
            fill(0, 255, 0);
            text(detectedObjects[i].className + " " + nfc(detectedObjects[i].classProb * 100.0, 2) + "%", detectedObjects[i].x * width + 5, detectedObjects[i].y * height + 15);
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
