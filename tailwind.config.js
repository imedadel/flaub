const colors = require("@radix-ui/colors")

function getColors() {
	let c = {}

	for (const [name, values] of Object.entries(colors)) {
		if (
			!["gray", "red", "blue", "green", "yellow", "blackA", "whiteA"].includes(
				name
			)
		) {
			continue
		}

		for (const k of Object.keys(values)) {
			c[k] = `var(--${k})`
		}
	}

	return c
}

module.exports = {
	darkMode: "class",
	content: ["index.html", "./src/**/*.{jsx,tsx,js,ts}"],
	theme: {
		extend: {
			colors: {
				...getColors(),
			},
			typography: {
				DEFAULT: {
					css: {
						letterSpacing: "-0.02em",
						color: "var(--gray12)",
						a: {
							color: "var(--gray12)",
							"&:hover": {
								color: "var(--gray12)",
							},
							fontWeight: "400",
						},
						strong: {
							color: "var(--gray12)",
							fontWeight: "600",
						},
						"ol > li::before": {
							color: "var(--gray11)",
						},
						"ul > li::before": {
							backgroundColor: "var(--gray11)",
						},
						hr: {
							borderColor: "var(--gray6)",
						},
						blockquote: {
							fontWeight: "400",
							fontStyle: "normal",
							color: "var(--gray12)",
							borderLeftWidth: "0",
							borderLeftColor: "transparent",
							quotes: '"\\201C""\\201D""\\2018""\\2019"',
						},
						h1: {
							color: "var(--gray12)",
							fontWeight: "700",
						},
						h2: {
							color: "var(--gray12)",
							fontWeight: "700",
						},
						h3: {
							color: "var(--gray12)",
							fontWeight: "600",
						},
						h4: {
							color: "var(--gray12)",
							fontWeight: "600",
						},
						img: {
							marginLeft: "auto",
							marginRight: "auto",
						},
					},
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@downwindcss/text-decoration"),
	],
}
