import { ImageToTextResponse } from "../types";
import { delay } from "../utils";

export class ImageDescriber {
    constructor(private readonly imageData: Buffer = imageData) {}

    private async huggingFaceFetch(url: string) {
        return await fetch(url, {
            headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` },
            method: "POST",
            body: this.imageData,
        });
    }

    private async salesforceBlipImageCaptioningLarge() {
        try {
            let response: Response;
            response = await this.huggingFaceFetch(
                "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
            );

            if (!response.ok) {
                // Try again after 10 seconds because the model might be initializing
                delay(10000);
                response = await this.huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
                );
                if (!response.ok) {
                    const resError = await response.json();
                    throw new Error(resError.error);
                }
            }

            const [result] = (await response.json()) as ImageToTextResponse[];
            return result.generated_text;
        } catch (error) {
            console.error(error);
            // Return empty string if an error occurs
            return "";
        }
    }

    private async nlpconnectVitGpt2ImageCaptioningModel() {
        try {
            let response: Response;
            response = await this.huggingFaceFetch(
                "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning"
            );

            if (!response.ok) {
                // Try again after 10 seconds because the model might be initializing
                delay(10000);
                response = await this.huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning"
                );
                if (!response.ok) {
                    const resError = await response.json();
                    throw new Error(resError.error);
                }
            }

            const [result] = (await response.json()) as ImageToTextResponse[];
            return result.generated_text;
        } catch (error) {
            console.error(error);
            // Return empty string if an error occurs
            return "";
        }
    }

    private async microsoftGitLargeCoco() {
        try {
            let response: Response;
            response = await this.huggingFaceFetch(
                "https://api-inference.huggingface.co/models/microsoft/git-large-coco"
            );

            if (!response.ok) {
                // Try again after 10 seconds because the model might be initializing
                delay(10000);
                response = await this.huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/microsoft/git-large-coco"
                );
                if (!response.ok) {
                    const resError = await response.json();
                    throw new Error(resError.error);
                }
            }

            const [result] = (await response.json()) as ImageToTextResponse[];
            return result.generated_text;
        } catch (error) {
            console.error(error);
            // Return empty string if an error occurs
            return "";
        }
    }

    async describe() {
        const imageDescriptions: string[] = [];
        imageDescriptions.push(await this.salesforceBlipImageCaptioningLarge());
        imageDescriptions.push(await this.nlpconnectVitGpt2ImageCaptioningModel());
        imageDescriptions.push(await this.microsoftGitLargeCoco());

        return imageDescriptions.map((description) => `- ${description}`).join("\n");
    }
}
