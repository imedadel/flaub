import { get } from "idb-keyval"
import { useEffect, useState } from "react"
import { useRoute } from "wouter"
import { Header } from "../components/Header"
import { useScroll } from "../hooks/useScroll"
import { useStore } from "../store"

export default function Page() {
	const [_, params] = useRoute("/read/:id")
	const [content, setContent] = useState<string[]>([])

	useScroll(params?.id)

	useEffect(() => {
		if (params?.id) {
			get(`sections-${params.id}`).then(async (s) => {
				setContent(s ?? [])
			})
		}
	}, [params?.id])

	useEffect(() => {
		if (content.length !== 0) {
			const x = useStore.getState().books[params?.id!].scrollX

			if (x != null) {
				window.scrollTo({
					top: x,
					behavior: "smooth",
				})
			}
		}
	}, [content.length])

	return (
		<div className="max-w-4xl mx-auto min-h-screen px-2 flex flex-col items-center">
			<Header showFontSwitcher />
			<main
				className="mt-32 read"
				dangerouslySetInnerHTML={{ __html: content.join("") }}
			/>
		</div>
	)
}
