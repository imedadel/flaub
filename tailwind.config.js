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
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@downwindcss/text-decoration"),
	],
}
