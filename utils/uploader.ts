import puppeteer from "puppeteer";
import { delay } from ".";

export class Uploader {
    constructor(private readonly imageName: string = imageName, private readonly capture: string = capture) {}

    private async uploadImage() {
        const userName = process.env.INSTAGRAM_USERNAME as string;
        const password = process.env.INSTAGRAM_PASSWORD as string;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto("https://www.instagram.com/");
        await page.setViewport({ width: 1080, height: 1024 });

        // Login to Instagram
        await page.waitForSelector("#loginForm");
        await page.type("#loginForm > div > div:nth-child(1) > div > label > input", userName);
        await page.type("#loginForm > div > div:nth-child(2) > div > label > input", password);
        await page.click("#loginForm > div > div:nth-child(3) > button");

        // Click not now for notifications
        await page.waitForSelector("._a9--._ap36._a9_1");
        await page.click("._a9--._ap36._a9_1");

        // Click on new post
        await page.waitForSelector('svg[aria-label="New post"]');
        await page.click('svg[aria-label="New post"]');

        // Upload image
        await delay(10000);
        const inputSelector = 'form[role="presentation"] input[type="file"]';
        const input = await page.$(inputSelector);
        await input?.uploadFile(`./images/${this.imageName}.jpg`);

        await delay(3000);
        await page.click("._ac7b._ac7d");
        await delay(3000);
        await page.click("._ac7b._ac7d");
        await delay(3000);

        // Type the caption
        await page.waitForSelector('div[aria-label="Write a caption..."]');
        await page.type('div[aria-label="Write a caption..."]', this.capture);

        // Click on share
        await page.click("._ac7b._ac7d");

        await browser.close();
    }

    async uploader(): Promise<void> {
        await this.uploadImage();
    }
}
