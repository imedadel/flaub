import { unzip } from "unzipit"

export async function parse(file: File) {
	const { entries } = await unzip(file)
	console.log(entries)

	// Init parser
	const domParser = new DOMParser()
	const parseXml = (xml: string) =>
		domParser.parseFromString(xml, "application/xml")

	// Find root file
	const containerXml = parseXml(await entries["META-INF/container.xml"].text())
	let opfPath = containerXml
		.querySelector("rootfile")
		?.getAttribute("full-path")

	if (opfPath == null) {
		return
	}

	const root = determineRoot(opfPath)

	// Parse content.opf
	const contentOpf = parseXml(
		await entries[resolvePath("/" + opfPath, root)].text()
	)

	// Get manifest
	const manifest = contentOpf.querySelector("manifest")

	const metadata = contentOpf?.querySelector("metadata")

	let toc: Document | undefined

	const tocId =
		contentOpf.querySelector("spine[toc]")?.getAttribute("toc") ?? "toc.xhtml"

	let tocPath = manifest
		?.querySelector(`item[id="${tocId}"]`)
		?.getAttribute("href")

	if (tocPath) {
		toc = parseXml(await entries[resolvePath(tocPath, root)].text())
	}

	const spine = [...contentOpf.querySelectorAll("spine > itemref")].map(
		(item) => item.getAttribute("idref")
	)

	const cleanMetadata = {
		title: metadata?.querySelector("title")?.innerHTML,
		author: metadata?.querySelector("creator")?.innerHTML,
		publisher: metadata?.querySelector("creator")?.innerHTML,
	}

	const sections: string[] = []

	for (const item of spine) {
		const path = manifest
			?.querySelector(`item[id="${item}"]`)
			?.getAttribute("href")

		if (path == null) {
			return
		}

		const html = await entries[resolvePath(path, root)].text()

		sections.push(html)
	}

	return {
		entries,
		cleanMetadata,
		toc,
		manifest,
		content: contentOpf,
		opfPath,
		metadata,
		info: cleanMetadata,
		sections,
	}
}

function removeLeadingSlash(str: string) {
	return str.replace(/^\/+/g, "")
}

function resolvePath(str: string, root: string) {
	return str[0] === "/" ? str.slice(1) : root + str
}

function determineRoot(opfPath: string) {
	let root = ""
	if (opfPath.match(/\//)) {
		root = opfPath.replace(/\/([^\/]+)\.opf/i, "")
		if (!root.match(/\/$/)) {
			root += "/"
		}
		if (root.match(/^\//)) {
			root = root.replace(/^\//, "")
		}
	}
	return root
}
