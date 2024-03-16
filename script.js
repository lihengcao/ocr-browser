// canvas
// a little bit of decoupling in these vars, but should be ok!
const CANVAS_DISPLAY_MULTIPLIER = 10;
const CANVAS_SIZE = 280;
const INPUT_SIZE = 28;
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d", { willReadFrequently: true });
ctx.lineWidth = 1;
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

let isDrawing = false;
let prevX, prevY;

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    prevX = (e.clientX - rect.left) / CANVAS_DISPLAY_MULTIPLIER;
    prevY = (e.clientY - rect.top) / CANVAS_DISPLAY_MULTIPLIER;
    isDrawing = true;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = (e.clientX - rect.left) / CANVAS_DISPLAY_MULTIPLIER;
  const mouseY = (e.clientY - rect.top) / CANVAS_DISPLAY_MULTIPLIER;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();

  prevX = mouseX;
  prevY = mouseY;
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);
// ---

// html elements
const clear_button = document.getElementById("clear_button");
const predict_button = document.getElementById("predict_button");
const prediction_display = document.getElementById("prediction-display");
// ---

// onnx runtime
// gets rid of an annoying error about crossOriginIsolated mode. Probably don't need that many threads anyways!
ort.env.wasm.numThreads = 1;
const session = ort.InferenceSession.create('./onnx_model.onnx');
// ---

async function predict_character() {
    const input = {'input.1': get_input_data()};

    session.then((session) => {
        const results = session.run(input);
        
        results.then((results) => {
            console.log(results)
            const all_preds = results['13'].cpuData;
            display_result(convert_results_to_prediction(all_preds));
        });
    })
}

const ind_to_char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't'];

function convert_results_to_prediction(arr) {
    return ind_to_char[arg_max(arr)];
}

// assuming arr.length > 0 :smile:
function arg_max(arr) {
    let max = arr[0];
    let ind_max = 0;

    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] > max) {
            ind_max = i;
        }
    }

    return ind_max;
}

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    display_result();
}

function display_result(text='') {
    prediction_display.innerText = text;
}

function get_input_data() {
    const data = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE).data;
    let arr = new Float32Array(INPUT_SIZE * INPUT_SIZE);

    for (let i = 0; i < arr.length; ++i) {
        arr[i] = data[i * 4 + 3]; // layouts is rgba. rgb vals are zero, so grab the alpha value. 
    }

    return new ort.Tensor("float32", arr, [1, 1, 28, 28]);
}
