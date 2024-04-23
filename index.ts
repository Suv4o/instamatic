import { loadRandomImage } from "./utils";
import { ImageDescriber } from "./agents/imageDescriber";
import { ImageClassifier } from "./agents/imageClassifier";

async function main() {
    const imageData = await loadRandomImage();
    // Run Image Describer Agent
    // const imageDescriber = new ImageDescriber(imageData);
    // console.log(await imageDescriber.describe());

    // Run Image Classifier Agent
    const imageClassifier = new ImageClassifier(imageData);
    console.log(await imageClassifier.classify());
}

main();
