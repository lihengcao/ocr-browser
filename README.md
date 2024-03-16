# About
Simple proof of concept project to train a model and run inference on it completely in the browser.
Used: PyTorch to train my own EMNIST CNN, ONNX to run in the browser, and a canvas DOM element to get the inference input.
There are definitely more accurate models out there, but for a proof of concept, this is good enough. 

# Todo/future/nice-to-have
- Git submodules to get the training and exporting to `.onnx`

# Challenges I faced
- Getting the model to import correctly. Some features/layers aren't supported in certain ONNX versions?
- runtime library inference output is empty
- I initialled wanted to have a large and high-res canvas. The challenge there was that I'd have to "coerce" it in the correct size of the output. But it was easier to just have a low-res canvas get "magnified."