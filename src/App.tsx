import { lazy, Suspense, useState } from "react"
// import logo from "./logo.svg"
// import "./App.css"
import { Switch, Route } from "wouter"
import { ThemeProvider } from "./contexts/theme"

import Home from "./pages/Home"
import Read from "./pages/Read"

// const Home = lazy(() => import("./pages/Home"))
// const Read = lazy(() => import("./pages/Read"))

function App() {
	return (
		<ThemeProvider>
			<Suspense
				fallback={
					<div className="w-screen h-screen text-gray-900 flex items-center justify-center text-2xl">
						Loading!
					</div>
				}
			>
				<Switch>
					<Route component={Home} path="/" />
					<Route component={Read} path="/read/:id" />
				</Switch>
			</Suspense>
		</ThemeProvider>
	)
}

export default App
