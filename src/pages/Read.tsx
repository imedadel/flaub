import { get } from "idb-keyval"
import { useEffect, useState } from "react"
// import { ReactReader } from "react-reader"
import { useRoute } from "wouter"

export default function Page() {
	const [_, params] = useRoute("/read/:id")
	const [file, setFile] = useState<any>()
	const [loaded, setLoaded] = useState<boolean>(false)

	useEffect(() => {
		if (params?.id) {
			console.log(params.id)
			get(params.id).then((f) => {
				// console.log(f)
				setFile(f)
				setLoaded(true)
			})
		} else {
			setLoaded(false)
		}
	}, [params?.id])

	// And your own state logic to persist state
	const [elocation, setElocation] = useState<string>()
	const locationChanged = (epubcifi: string) => {
		// epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
		setElocation(epubcifi)
	}

	return (
		<div style={{ height: "100vh" }}>
			Hi
			{/* {loaded ? (
				<ReactReader
					location={elocation}
					locationChanged={locationChanged}
					url={
						// file ||
						"https://gerhardsletten.github.io/react-reader/files/alice.epub"
					}
				/>
			) : (
				<div>Loading...</div>
			)} */}
		</div>
	)
}
