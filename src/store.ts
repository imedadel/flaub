import create from "zustand"
import { persist } from "zustand/middleware"

export type Store = {
	books: {
		[id: string]: {
			title?: string
			author?: string
			publisher?: string
			scrollX?: number
		}
	}
	addBook: (
		id: string,
		title?: string,
		author?: string,
		publisher?: string
	) => void
	setScrollX: (id: string, x: number) => void
	delBook: (id: string) => void
}

export const useStore = create<Store>(
	persist(
		(set) => ({
			books: {},
			addBook: (id, title, author, publisher) =>
				set((state) => ({
					books: { ...state.books, [id]: { title, author, publisher } },
				})),
			setScrollX: (id, x) =>
				set((state) => ({
					books: { ...state.books, [id]: { ...state.books[id], scrollX: x } },
				})),
			delBook: (id) =>
				set((state) => {
					console.log("TODO: `delBook`")
				}),
		}),
		{
			name: "reader-store",
		}
	)
)
