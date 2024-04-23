export interface ImageToTextResponse {
    generated_text: string;
}

export interface ImageToLabelResponse {
    score: number;
    label: string;
}
