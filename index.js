let inputImg;
let statusMsg;
let transferBtn;
let style1;

let fileInput;
let dropContainer;

//Executed automatically by ml5/p5
function setup() {
    noCanvas();

    statusMsg = select('#statusMsg');

    transferBtn = select('#transferBtn');
    ///TODO: Wire up the button to the transferImages function!

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

    //TODO: Load the model fuchun and create a styleTransfer instance.
    //TODO: Add all the other models and have them be executed when the transfer button is clicked!
}

//When the model has been loaden and is ready!
function modelLoaded() {
    statusMsg.html('Ready!');

    fileInput.disabled = false;
    dropContainer.disabled = false;
}

//Tranfer the styles
function transferImages() {
    statusMsg.html('Applying Style Transfer...!');

    style1.transfer(inputImg, function (err, result) {
        createImg(result.src).parent('styleA');
    });
    //TODO: Add all the other styles

    statusMsg.html('Done!');
}

//TODO: Not in the solution - for those that are feeling enticed to take it a step further!
//TODO: Remove the manual image file input and use the feed from your laptop's webcam!