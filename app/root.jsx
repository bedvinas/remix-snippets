import { Outlet, LiveReload } from "@remix-run/react";

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>SnippetCloud</title>
			</head>
			<body>
				<Outlet />
				<LiveReload />
			</body>
		</html>
	);
}
