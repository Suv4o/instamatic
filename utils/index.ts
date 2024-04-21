import * as fs from "fs/promises";
import * as path from "path";

export async function getRandomImage() {
    const imagesFolder = path.join(__dirname, "..", "images");

    try {
        const files = await fs.readdir(imagesFolder);
        const randomImage = files[Math.floor(Math.random() * files.length)];
        return randomImage;
    } catch (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
}
