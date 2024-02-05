import markdownit from "markdown-it";

export const useMarkdownParser = () => {
	const md = markdownit();

	function parse(markdown: string) {
		return md.render(markdown);
	}

	return { parse };
};
