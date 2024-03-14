const CANVAS_SIZE = 280;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clear_button = document.getElementById("clear_button");
const predict_button = document.getElementById("predict_button");

let display = document.getElementById("prediction-display");

const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./onnx_model.onnx");

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('clear_canvas');
    clear_display();
}

var num = 0;
function predict_character() {
    console.log('predict_character');
    num += 1;
    display_result(num);

    const input = get_canvas_data();

    const ses = new onnx.InferenceSession();
}

function clear_display() {
    display_result('');
}

function display_result(pred) {
    display.innerText = pred;
}


function get_canvas_data() {
    return 1;
}