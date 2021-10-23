import { set } from "idb-keyval"
import { nanoid } from "nanoid"
import { useLocation } from "wouter"
import { useStore } from "../store"
import { parse } from "../utils/parse"

export function AddBookButton() {
	const [_, setLocation] = useLocation()
	const addBook = useStore((s) => s.addBook)

	async function handleChange(event: React.MouseEvent<HTMLButtonElement>) {
		// @ts-ignore
		if (!window.showOpenFilePicker) {
			return
		}

		// @ts-ignore
		const [fileHandle] = await window.showOpenFilePicker()
		const file = (await fileHandle.getFile()) as File

		if (file.type !== "application/epub+zip") {
			return alert("Unsupported type")
		}

		const id = nanoid(14)

		const parsed = await parse(file)

		if (parsed == null) {
			return
		}

		addBook(id, parsed.info?.title, parsed.info?.author, parsed.info?.publisher)

		await set(`file-${id}`, file)
		await set(`sections-${id}`, parsed.sections)

		setLocation(`/read/${id}`)
	}
	return (
		<button
			onClick={handleChange}
			className="w-full max-w-lg py-24 rounded-lg bg-blue3 hover:bg-blue4 focus:bg-blue5 text-blue11 border border-blue7 hover:border-blue8 mt-32 transition font-medium tracking-tight"
		>
			Upload
		</button>
	)
}
