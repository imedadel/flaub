import { defineConfig } from "windicss/helpers"
import formsPlugin from "windicss/plugin/forms"
import colors from "@radix-ui/colors"

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

export default defineConfig({
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				...getColors(),
			},
		},
	},
	plugins: [formsPlugin],
})
