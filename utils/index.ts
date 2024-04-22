import * as fs from "fs/promises";
import * as path from "path";

export async function getRandomImageName() {
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

export async function loadRandomImage() {
    return await fs.readFile(path.join(__dirname, "..", "images", await getRandomImageName()));
}

export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
