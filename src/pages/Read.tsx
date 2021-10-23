import { get } from "idb-keyval"
import { useEffect, useState } from "react"
import { useRoute } from "wouter"

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
		<div style={{ height: "100vh" }}>
			<div dangerouslySetInnerHTML={{ __html: content.join("") }} />
		</div>
	)
}
