import { set } from "idb-keyval"
import { nanoid } from "nanoid"
import { unzip } from "unzipit"
import { useLocation } from "wouter"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { useStore } from "../store"
import { parse } from "../utils/parse"

export default function Page() {
	const [_, setLocation] = useLocation()
	const addBook = useStore((s) => s.addBook)
	// async function handleChange(event: React.MouseEvent<HTMLButtonElement>) {
	// 	// @ts-ignore
	// 	if (!window.showOpenFilePicker) {
	// 		return
	// 	}

	// 	// @ts-ignore
	// 	const [fileHandle] = await window.showOpenFilePicker()
	// 	const file = (await fileHandle.getFile()) as File

	// 	if (file.type !== "application/epub+zip") {
	// 		return alert("Unsupported type")
	// 	}

	// const id = nanoid(14)

	// await set(id, file)

	// 	setLocation(`/read/${id}`)

	// 	// const reader = new FileReader()

	// 	// reader.onload = (e) => {
	// 	// 	console.log(e.target?.result)
	// 	// }

	// 	// // Read in the image file as a data URL.
	// 	// reader.readAsDataURL(file)
	// }
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

		console.log()
		// const parsed = await parse(file)

		// const { entries } = await unzip(file)
		// console.log(entries)
		// for (const [name, entry] of Object.entries(entries)) {
		// 	console.log(name, entry.size)
		// }

		const id = nanoid(14)

		addBook(id, file.name ?? "")

		await set(id, file)

		setLocation(`/read/${id}`)

		// const reader = new FileReader()

		// reader.onload = (e) => {
		// 	console.log(e.target?.result)
		// }

		// // Read in the image file as a data URL.
		// reader.readAsDataURL(file)
	}

	return (
		<div className="bg-grau100">
			<button onClick={handleChange}>Upload</button>
			<ThemeSwitcher />
		</div>
	)
}
