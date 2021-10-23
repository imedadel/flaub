import { useStore } from "../store"
import { Link } from "wouter"

export function SavedBooks() {
	const books = useStore((state) => Object.entries(state.books))

	if (books.length === 0) {
		return null
	}

	return (
		<div className="mt-32">
			<h2 className="text-center font-semibold text-xl tracking-tight mb-8">
				Saved Books
			</h2>
			<div className="grid grid-cols-3 gap-x-4 gap-y-2">
				{books.map(([id, info]) => (
					<Link
						key={id}
						href={`/read/${id}`}
						className="bg-gray3 hover:bg-gray4 focus:bg-gray5 text-gray11 transition rounded-lg px-24 py-16 tracking-tight font-medium"
					>
						<span className="text-gray12 text-lg">“{info.title ?? "—"}”</span>{" "}
						<br />
						<span className="text-gray12">{info.author ?? "—"}</span>
					</Link>
				))}
			</div>
		</div>
	)
}
