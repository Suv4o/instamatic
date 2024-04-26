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

export async function huggingFaceFetch(url: string, body: any) {
    return await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` },
        method: "POST",
        body,
    });
}

export async function loadRandomImage(): Promise<[Buffer, string]> {
    const randomImageName = await getRandomImageName();
    return [await fs.readFile(path.join(__dirname, "..", "images", randomImageName)), randomImageName.split(".")[0]];
}

export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
