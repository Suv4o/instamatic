import { ImageToLabelResponse } from "../types";
import { huggingFaceFetch } from "../utils";
import { delay } from "../utils";

export class ImageClassifier {
    constructor(private readonly imageData: Buffer = imageData) {}

    private async extractLabels(imageClasses: ImageToLabelResponse[]) {
        return imageClasses.flatMap((item) => item.label.split(",").map((label) => label.trim()));
    }

    private async googleVitBasePatch16224() {
        try {
            let response: Response;
            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
                this.imageData
            );

            if (!response.ok) {
                // Try again after 60 seconds because the model might be initializing
                delay(60000);
                response = await huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
                    this.imageData
                );
                if (!response.ok) {
                    const resError = await response.json();
                    throw new Error(resError.error);
                }
            }

            const result = (await response.json()) as ImageToLabelResponse[];
            return result;
        } catch (error) {
            console.error(error);
            // Return empty array if an error occurs
            return [];
        }
    }

    async classify() {
        const imageClasses = await this.googleVitBasePatch16224();
        return this.extractLabels(imageClasses);
    }
}
