import { unzip, ZipEntry } from "unzipit"

export async function parse(file: File) {
	const { entries } = await unzip(file)
	console.log(entries)

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
		publisher: metadata?.querySelector("publisher")?.innerHTML,
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

		const cleaned = await cleanHtml(item!, html, root, manifest!, entries)

		sections.push(cleaned)
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

async function cleanHtml(
	id: string,
	text: string,
	root: string,
	manifest: Element,
	entries: {
		[key: string]: ZipEntry
	}
) {
	const OMITTED_TAGS = ["head", "input", "textarea", "script", "style", "svg"]
	const UNWRAP_TAGS = ["body", "html", "div", "span"]

	const doc = parseXml(text)
	const omittedEls = [...doc.querySelectorAll(OMITTED_TAGS.join(", "))]
	const unwrapEls = [
		...doc.querySelectorAll(
			UNWRAP_TAGS.map((t) => `${t} > *:only-child`).join(", ")
		),
	]

	const allEls = [...doc.querySelectorAll("*")]

	for (const el of omittedEls) {
		el.remove()
	}

	for (const el of unwrapEls) {
		el.parentNode?.replaceChildren(...el.childNodes)
	}

	for (const el of allEls) {
		const attrs = [...el.attributes]
		for (const attr of attrs) {
			if (attr.name === "src") {
				let src = attr.value

				if (isInternal(src)) {
					src = resolvePath(src, root)
					const mime = getMime(src)

					if (!mime) {
						continue
					}

					const imgBlob = await entries[src].blob(mime)
					if (!imgBlob) {
						continue
					}

					const imgb64 = (await toBase64(imgBlob)) as string
					src = imgb64
				}

				el.setAttribute("src", src)
			} else if (attr.name === "href") {
				let href = attr.value

				if (isInternal(href)) {
					// Hack to avoid error
					const { hash } = new URL(href, "http://example.com")

					// TODO: what if a link only contains hash part?
					const sectionId = idFromLink(href, manifest)

					if (hash) {
						href = `#${sectionId},${hash}`
					}

					href = `#${sectionId}`
				}

				el.setAttribute("href", href)
			} else if (attr.name === "id") {
				continue
			} else {
				el.removeAttribute(attr.name)
			}
		}
	}

	const content =
		`<section id="${id}">` +
		(doc.querySelector("body") ?? doc.documentElement).innerHTML.replace(
			/xmlns=\"(.*?)\"/g,
			""
		) +
		`</section>`

	return content
}

const toBase64 = (file: Blob) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

function idFromLink(link: string, manifest: Element) {
	const { pathname } = new URL(link, "http://example.com")

	const item = manifest.querySelector(`[href="${pathname.slice(1)}"]`)

	return item?.getAttribute("id")!
}

function getMime(name: string) {
	const ext = name.slice(name.lastIndexOf("."))

	switch (ext) {
		case ".jpeg":
		case ".jpg": {
			return "image/jpeg"
		}
		case ".svg": {
			return "image/svg+xml"
		}
		case ".tif":
		case ".tiff": {
			return "image/tiff"
		}
		case ".webp": {
			return "image/webp"
		}
		case ".bmp": {
			return "image/bmp"
		}
		case ".gif": {
			return "image/gif"
		}
		case ".ico": {
			return "image/vnd.microsoft.icon"
		}
		case ".png": {
			return "image/png"
		}
		default: {
			return undefined
		}
	}
}

const isInternal = (href: string) =>
	!href.startsWith("http://") && !href.startsWith("https://")

const domParser = new DOMParser()
const parseXml = (xml: string) =>
	domParser.parseFromString(xml, "application/xml")
