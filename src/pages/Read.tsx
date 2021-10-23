import { get } from "idb-keyval"
import { useEffect, useState } from "react"
import { useRoute } from "wouter"
import { Header } from "../components/Header"

export default function Page() {
	const [_, params] = useRoute("/read/:id")
	const [content, setContent] = useState<string[]>([])

	useEffect(() => {
		if (params?.id) {
			get(`sections-${params.id}`).then(async (s) => {
				setContent(s ?? [])
			})
		}
	}, [params?.id])

	return (
		<div className="max-w-4xl mx-auto min-h-screen px-2 flex flex-col">
			<Header />
			<main className="mt-32 prose prose-2xl" dangerouslySetInnerHTML={{ __html: content.join("") }} />
		</div>
	)
}
