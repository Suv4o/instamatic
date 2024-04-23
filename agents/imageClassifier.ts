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

    private async microsoftResnet50() {
        try {
            let response: Response;
            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/microsoft/resnet-50",
                this.imageData
            );

            if (!response.ok) {
                // Try again after 60 seconds because the model might be initializing
                delay(60000);
                response = await huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/microsoft/resnet-50",
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

    private async nvidiaMitB0() {
        try {
            let response: Response;
            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/nvidia/mit-b0",
                this.imageData
            );

            if (!response.ok) {
                // Try again after 60 seconds because the model might be initializing
                delay(60000);
                response = await huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/nvidia/mit-b0",
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
        const imageClasses: string[] = [];
        const classesGoogleVitBasePatch16224 = await this.googleVitBasePatch16224();
        const labelsGoogleVitBasePatch16224 = await this.extractLabels(classesGoogleVitBasePatch16224);
        imageClasses.push(...labelsGoogleVitBasePatch16224);

        const classesMicrosoftResnet50 = await this.microsoftResnet50();
        const labelsMicrosoftResnet50 = await this.extractLabels(classesMicrosoftResnet50);
        imageClasses.push(...labelsMicrosoftResnet50);

        const classesNvidiaMitB0 = await this.nvidiaMitB0();
        const labelsNvidiaMitB0 = await this.extractLabels(classesNvidiaMitB0);
        imageClasses.push(...labelsNvidiaMitB0);

        return [...new Set(imageClasses)];
    }
}
