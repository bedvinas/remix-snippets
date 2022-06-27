import { Links, Outlet, LiveReload } from "@remix-run/react";
import styles from "./styles/tailwind.css";

export const links = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "manifest", href: "/manifest.webmanifest" },
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<Links />
				<title>SnippetCloud</title>
			</head>
			<body className="h-full">
				<Outlet />
				<LiveReload />
			</body>
		</html>
	);
}
