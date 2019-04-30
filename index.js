let inputImg;
let statusMsg;
let transferBtn;
let style1, style2, style3, style4, style5, style6, style7, style8, style9;

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

    inputImg = document.getElementById('sourceImg');

    fileInput.addEventListener('change', () => {
        if(fileInput.files.length === 1) {
            inputImg.src = URL.createObjectURL(fileInput.files[0]);
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

            inputImg.src = URL.createObjectURL(fileInput.files[0]);
        } else {
            statusMsg.html('Too many files dropped, only drag in one file!');
        }
    };

    style1 = ml5.styleTransfer('models/fuchun', modelLoaded);
    style2 = ml5.styleTransfer('models/la_muse', modelLoaded);
    style3 = ml5.styleTransfer('models/mathura', modelLoaded);
    style4 = ml5.styleTransfer('models/rain_princess', modelLoaded);
    style5 = ml5.styleTransfer('models/scream', modelLoaded);
    style6 = ml5.styleTransfer('models/udnie', modelLoaded);
    style7 = ml5.styleTransfer('models/wave', modelLoaded);
    style8 = ml5.styleTransfer('models/wreck', modelLoaded);
    style9 = ml5.styleTransfer('models/zhangdaqian', modelLoaded);
}

function modelLoaded() {
    if (style1.ready && style2.ready && style3.ready &&
        style4.ready && style5.ready && style6.ready &&
        style7.ready && style8.ready && style9.ready) {

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
    style3.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleC');
    });
    style4.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleD');
    });
    style5.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleE');
    });
    style6.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleF');
    });
    style7.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleG');
    });
    style8.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleH');
    });
    style9.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleI');
    });

    statusMsg.html('Done!');
}