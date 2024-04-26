import { loadRandomImage } from "./utils";
import { ImageDescriber } from "./agents/imageDescriber";
import { ImageClassifier } from "./agents/imageClassifier";
import { ImageZeroShotClassifier } from "./agents/imageZeroShotClassifier";
import { ImageResearcher } from "./agents/imageResearcher";

async function main() {
    const [imageData, imageName] = await loadRandomImage();
    // Run Image Describer Agent
    // const imageDescriber = new ImageDescriber(imageData);
    // console.log(await imageDescriber.describe());

    // Run Image Classifier Agent
    // const imageClassifier = new ImageClassifier(imageData);
    // const labels = await imageClassifier.classify();

    // Run Image Zero Shot Classifier Agent
    // const imageZeroShotClassifier = new ImageZeroShotClassifier(imageData, labels);
    // console.log(await imageZeroShotClassifier.analyser());

    // Run Image Name Researcher Agent
    const imageResearcher = new ImageResearcher(imageName);
    console.log(await imageResearcher.research());
}

main();
