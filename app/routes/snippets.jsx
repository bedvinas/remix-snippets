import { Outlet } from "@remix-run/react";

export default function Snippets() {
	return (
		<div>
			<h1>Snippets</h1>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
