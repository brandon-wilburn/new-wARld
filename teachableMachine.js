// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
console.log("JSLINKED");

const URL = "https://teachablemachine.withgoogle.com/models/g1e0BEI3/";

let model, webcam, labelContainer, maxPredictions;
document.addEventListener("DOMContentLoaded", init, false);

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    console.log(model);
    maxPredictions = model.getTotalClasses();
    console.log("Number of classes= "+maxPredictions);

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(600, 600, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    
    // document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

document.getElementById("camera");
console.log(document.getElementById("camera"));
var theText = document.getElementById("text");
console.log(theText);

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
        // if (prediction[1].probability.toFixed(2);)
        if(prediction[0].probability.toFixed(2)>.6){
            // console.clear();
            console.log("Class 1");
            var theText = document.getElementById("text");
            theText.setAttribute('color', '#FF461E');
            // console.log(theText);
        }
        if(prediction[1].probability.toFixed(2)>.6){
            // console.clear();
            console.log("Class 2");
            var theText = document.getElementById("text");
            theText.setAttribute('color', '#15FF5C');
            // console.log(theText);
        }
        if(prediction[2].probability.toFixed(2)>.6){
            // console.clear();
            console.log("Class 3");
            var theText = document.getElementById("text");
            theText.setAttribute('color', '#1595FF');
            // console.log(theText);
        }
    }
}