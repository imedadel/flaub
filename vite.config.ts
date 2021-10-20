import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	// resolve: {
	// 	alias: [
	// 		{
	// 			find: /^es5-ext\/(.*)?\/#\/(.*)$/,
	// 			replacement: path.resolve(require.resolve("es5-ext"), "../$1/../#/$2"),
	// 		},
	// 		{
	// 			find: /^.\/#$/,
	// 			replacement: "../#/index.js",
	// 		},
	// 	],
	// },
	plugins: [react()],
})
