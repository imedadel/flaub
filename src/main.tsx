import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles/global.css"
import "./styles/colors.css"
import "tailwindcss/tailwind.css"

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
