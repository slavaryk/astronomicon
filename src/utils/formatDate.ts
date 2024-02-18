type Schema = ["d" | "D", "m" | "M", "y" | "Y"];

export function formatDate(schema: Schema, date: Date) {
	const dateTimeFormatter = new Intl.DateTimeFormat(
		"en-GB",
		parseOptionsFromSchema(schema),
	);

	return dateTimeFormatter.format(date);
}

function parseOptionsFromSchema(schema: Schema): Intl.DateTimeFormatOptions {
	return {
		day: (function() {
			switch (schema[0]) {
				case "d": return "numeric";
				case "D": return "2-digit";
				default: return "numeric";
			}
		})(),
		month: (function() {
			switch (schema[1]) {
				case "m": return "numeric";
				case "M": return "long";
				default: return "numeric";
			}
		})(),
		year: (function() {
			switch (schema[2]) {
				case "y": return "numeric";
				case "Y": return "2-digit";
				default: return "numeric";
			}
		})(),
	};
}
