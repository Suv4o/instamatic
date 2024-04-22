import { loadRandomImage } from "./utils";
import { ImageDescriber } from "./agents/imageDescriber";

async function main() {
    const imageDescriber = new ImageDescriber(await loadRandomImage());

    console.log(await imageDescriber.describe());
}

main();
