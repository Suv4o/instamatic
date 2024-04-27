import { ImageToTextResponse } from "../types";
import { huggingFaceFetch } from "../utils";
import { delay } from "../utils";

export class ImageDescriber {
    constructor(private readonly imageData: Buffer = imageData) {}

    private async salesforceBlipImageCaptioningLarge() {
        let response: Response;
        response = await huggingFaceFetch(
            "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
            this.imageData
        );

        if (response.ok) {
            const [result] = (await response.json()) as ImageToTextResponse[];
            return result.generated_text;
        }

        try {
            // Try again after 60 seconds because the model might be initializing
            await delay(60000);
            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
                this.imageData
            );
            if (!response.ok) {
                const resError = await response.json();
                throw new Error(resError.error);
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
        let response: Response;
        response = await huggingFaceFetch(
            "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
            this.imageData
        );

        if (response.ok) {
            const [result] = (await response.json()) as ImageToTextResponse[];
            return result.generated_text;
        }

        try {
            // Try again after 60 seconds because the model might be initializing
            await delay(60000);
            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
                this.imageData
            );
            if (!response.ok) {
                const resError = await response.json();
                throw new Error(resError.error);
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
        let response: Response;
        response = await huggingFaceFetch(
            "https://api-inference.huggingface.co/models/microsoft/git-large-coco",
            this.imageData
        );

        if (response.ok) {
            const [result] = (await response.json()) as ImageToTextResponse[];
            return result.generated_text;
        }

        try {
            // Try again after 60 seconds because the model might be initializing
            await delay(60000);
            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/microsoft/git-large-coco",
                this.imageData
            );
            if (!response.ok) {
                const resError = await response.json();
                throw new Error(resError.error);
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

        return imageDescriptions
            .filter((description) => description.trim() !== "")
            .map((description) => `- ${description}`)
            .join("\n");
    }
}
