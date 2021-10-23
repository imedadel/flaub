import { AddBookButton } from "../components/AddBookButton"
import { Header } from "../components/Header"
import { SavedBooks } from "../components/SavedBooks"

export default function Page() {
	return (
		<div className="max-w-4xl mx-auto min-h-screen px-2 flex flex-col mb-64">
			<Header />
			<div className="flex flex-col items-center">
				<AddBookButton />
				<SavedBooks />
			</div>
		</div>
	)
}
