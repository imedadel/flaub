import { get } from "idb-keyval"
import { useEffect, useState } from "react"
import { useRoute } from "wouter"
import { parse } from "../utils/parse"

export default function Page() {
	const [_, params] = useRoute("/read/:id")
	const [content, setContent] = useState<string[]>([])

	useEffect(() => {
		if (params?.id) {
			get(params.id).then(async (f) => {
				const parsed = await parse(f)
				setContent(parsed?.sections ?? [])
			})
		}
	}, [params?.id])

	return (
		<div style={{ height: "100vh" }}>
			<div dangerouslySetInnerHTML={{ __html: content.join("") }} />
		</div>
	)
}
