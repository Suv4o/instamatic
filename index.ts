import { loadRandomImage } from "./utils";
import { ImageDescriber } from "./agents/imageDescriber";

async function main() {
    const imageData = await loadRandomImage();
    const imageDescriber = new ImageDescriber(imageData);
    console.log(await imageDescriber.describe());
}

main();
