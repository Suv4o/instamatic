export class ImageImagineer {
    constructor(
        private readonly imageContent: string,
        private readonly imageLabels: string,
        private readonly imageResearch: string
    ) {}

    private async fetchResults() {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "user",
                        content: `
                        Your job is to write a description for an image that will be used on Instagram. The description should depict the image in one paragraph, and feel free to use emojis if possible. The image is briefly described in three sentences, along with a few labels and and research findings related to the place—based on the image title. Use this information to craft a compelling Instagram image description.
                        Briefly description:
                        ${this.imageContent}
                        And has the following labels:
                        ${this.imageLabels}
                        Research findings based on the image title:
                        ${this.imageResearch}
                        Please provide ten different paragraphs. The output should be a JavaScript array without any additional text at the beginning in the following format:
                        [
                            "Paragraph 1",
                            "Paragraph 2",
                            "Paragraph 3",
                            "Paragraph 4",
                            "Paragraph 5",
                            "Paragraph 6",
                            "Paragraph 7",
                            "Paragraph 8",
                            "Paragraph 9",
                            "Paragraph 10"
                        ]
                        `,
                    },
                ],
                model: "llama3-70b-8192",
            }),
        });
        const result = await response.json();
        const output = result.choices[0].message.content;

        const firstBracketIndex = output.indexOf("[");
        const lastBracketIndex = output.lastIndexOf("]");

        if (firstBracketIndex === -1 || lastBracketIndex === -1) {
            throw new Error("Invalid string format. No array found.");
        }

        const onlyResults = output.slice(firstBracketIndex, lastBracketIndex + 1);
        const resultInArray = JSON.parse(onlyResults.trim());

        return resultInArray;
    }

    public async imagine(): Promise<string[]> {
        return await this.fetchResults();
    }
}
