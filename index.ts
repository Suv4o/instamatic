import fs from "fs";
import path from "path";

// Get the path to the images folder
const imagesFolder = path.join(__dirname, "images");

// Read the files in the images folder
fs.readdir(imagesFolder, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    // Pick a random file
    const randomFile = files[Math.floor(Math.random() * files.length)];

    console.log(randomFile);
});
