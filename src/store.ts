import create from "zustand"
import { persist } from "zustand/middleware"

type Store = {
	books: {
		[id: string]: string
	}
	addBook: (id: string, name: string) => void
	delBook: (id: string) => void
}

export const useStore = create<Store>(
	persist(
		(set) => ({
			books: {},
			addBook: (id, name) =>
				set((state) => ({ books: { ...state.books, [id]: name } })),
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
