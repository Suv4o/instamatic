export class ImageResearcher {
    constructor(private readonly imageName: string) {}

    private async fetchResults() {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: process.env.TAVILY_AI_TOKEN,
                query: `Give me more details about ${this.imageName}`,
                search_depth: "advanced",
                include_answer: true,
            }),
        });
        const result = await response.json();
        return result.answer;
    }

    async research() {
        return await this.fetchResults();
    }
}
