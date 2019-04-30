let inputImg;
let statusMsg;
let transferBtn;
let style1;
let style2;

let fileInput;
let dropContainer;

function setup() {
    noCanvas();

    statusMsg = select('#statusMsg');

    transferBtn = select('#transferBtn');
    transferBtn.mousePressed(transferImages);

    fileInput = document.getElementById('fileInput');
    dropContainer = document.getElementById('dropContainer');

    fileInput.disabled = true;
    dropContainer.disabled = true;

    fileInput.addEventListener('change', () => {
        if(fileInput.files.length === 1) {
            inputImg = createImg(URL.createObjectURL(fileInput.files[0]));
        } else {
            statusMsg.html('Too many files selected, only select one file!');
        }
    });
    dropContainer.ondragover = dropContainer.ondragenter = (evt) => {
        evt.preventDefault();
    };
    dropContainer.ondrop = (evt) => {
        if(evt.dataTransfer.files.length === 1) {
            fileInput.files = evt.dataTransfer.files;
            evt.preventDefault();

            inputImg = createImg(URL.createObjectURL(fileInput.files[0]));
        } else {
            statusMsg.html('Too many files dropped, only drag in one file!');
        }
    };

    style1 = ml5.styleTransfer('models/wave', modelLoaded);
    style2 = ml5.styleTransfer('models/udnie', modelLoaded);
}

function modelLoaded() {
    if (style1.ready && style2.ready) {
        statusMsg.html('Ready!');

        fileInput.disabled = false;
        dropContainer.disabled = false;
    }
}

function transferImages() {
    statusMsg.html('Applying Style Transfer...!');

    style1.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleA');
    });
    style2.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleB');
    });

    statusMsg.html('Done!');
}