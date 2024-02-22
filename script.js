const CANVAS_SIZE = 280;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clear_button = document.getElementById("clear_button");
const predict_button = document.getElementById("predict_button");

const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./onnx_model.onnx");

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function predict_character() {
    clear_canvas();

    // const input = 

    const ses = new onnx.InferenceSession();
}

// function 