import { set } from "idb-keyval"
import { nanoid } from "nanoid"
import { useLocation } from "wouter"
import { AddBookButton } from "../components/AddBookButton"
import { Header } from "../components/Header"
import { SavedBooks } from "../components/SavedBooks"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { useStore } from "../store"
import { parse } from "../utils/parse"

export default function Page() {
	return (
		<div className="max-w-7xl mx-auto min-h-screen px-2 flex flex-col">
			<Header />
			<div className="flex flex-col items-center">
				<AddBookButton />
				<SavedBooks />
			</div>
		</div>
	)
}
