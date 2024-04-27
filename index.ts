import { loadRandomImage } from "./utils";
import { ImageDescriber } from "./agents/imageDescriber";
import { ImageClassifier } from "./agents/imageClassifier";
import { ZeroShotClassifier } from "./utils/zeroShotClassifier";
import { ImageResearcher } from "./agents/imageResearcher";
import { ImageImagineer } from "./agents/imageImagineer";

async function main() {
    const [imageData, imageName] = await loadRandomImage();
    // Run Image Describer Agent
    const imageDescriber = new ImageDescriber(imageData);
    const imageContent = await imageDescriber.describe();

    // Run Image Classifier Agent
    const imageClassifier = new ImageClassifier(imageData);
    const labels = await imageClassifier.classify();

    // Run Through Zero Shot Classifier
    const imageZeroShotClassifier = new ZeroShotClassifier(imageData, labels);
    const imageLabels = await imageZeroShotClassifier.analyser();

    // Run Image Name Researcher Agent
    const imageResearcher = new ImageResearcher(imageName);
    const imageResearch = await imageResearcher.research();

    // Run Image Imagineer Agent
    const imageImagineer = new ImageImagineer(imageContent, imageLabels, imageResearch);
    const captures = await imageImagineer.imagine();

    // Run Through Zero Shot Classifier
    const imageZeroShotClassifierDescriptor = new ZeroShotClassifier(imageData, captures, 0.1);
    const mostRelevantInstagramCapture = await imageZeroShotClassifierDescriptor.analyser();
    const instagramCapture = mostRelevantInstagramCapture.slice(2, mostRelevantInstagramCapture.length - 1);
    console.log(instagramCapture);
}

main();
