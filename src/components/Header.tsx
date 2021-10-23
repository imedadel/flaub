import { ThemeSwitcher } from "./ThemeSwitcher"
import { ReactComponent as Logo } from "../icons/Custom/logo.svg"
import { Link } from "wouter"

export function Header() {
	return (
		<div className="w-full flex h-16 items-center justify-between">
			<Link href="/">
				<a>
					<div className="text-lg">
						<Logo className="h-[1em] w-auto" />
					</div>
				</a>
			</Link>
			<ThemeSwitcher />
		</div>
	)
}
