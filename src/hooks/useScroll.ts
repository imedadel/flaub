import { useEffect } from "react"
import { Store, useStore } from "../store"
import { debounce } from "throttle-debounce"

const getSetScrollX = (state: Store) => state.setScrollX

export function useScroll(bookId?: string) {
	const setScrollX = useStore(getSetScrollX)

	function listen() {
		setScrollX(
			bookId!,
			document.body.scrollTop || document.documentElement.scrollTop
		)
	}

	const debounced = debounce(1000, listen)

	useEffect(() => {
		if (bookId == null) {
			return
		}

		window.addEventListener("scroll", debounced, {
			capture: false,
			passive: true,
		})

		return () => {
			window.removeEventListener("scroll", debounced)
		}
	}, [bookId])
}
