import { huggingFaceFetch } from "../utils";
import { delay } from "../utils";

interface Payload {
    parameters: {
        candidate_labels: string[];
    };
    inputs: string;
}

interface ImageToLabelResponse {
    label: string;
    score: number;
}

export class ImageZeroShotClassifier {
    constructor(
        private readonly imageData: Buffer = imageData,
        private readonly labels: string[] = labels,
        private readonly maxLabels: number = 10
    ) {}

    private async openaiClipVitBasePatch32(payload: string): Promise<ImageToLabelResponse[]> {
        try {
            let response: Response;

            response = await huggingFaceFetch(
                "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
                payload
            );

            if (!response.ok) {
                // Try again after 60 seconds because the model might be initializing
                delay(60000);
                response = await huggingFaceFetch(
                    "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
                    payload
                );
                if (!response.ok) {
                    const resError = await response.json();
                    throw new Error(resError.error);
                }
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            // Return empty array if an error occurs
            return [];
        }
    }

    async analyser() {
        const results = [];
        for (let i = 0; i < this.labels.length; i += this.maxLabels) {
            const chunk = this.labels.slice(i, i + this.maxLabels);
            const payload = {
                parameters: {
                    candidate_labels: chunk,
                },
                inputs: this.imageData.toString("base64"),
            } as Payload;
            const result = await this.openaiClipVitBasePatch32(JSON.stringify(payload));
            results.push(...result);
        }

        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, Math.floor(results.length * 0.4))
            .map((r) => r.label);
    }
}
