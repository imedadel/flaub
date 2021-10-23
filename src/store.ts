import create from "zustand"
import { persist } from "zustand/middleware"

type Store = {
	books: {
		[id: string]: {
			title?: string
			author?: string
			publisher?: string
		}
	}
	addBook: (
		id: string,
		title?: string,
		author?: string,
		publisher?: string
	) => void
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
