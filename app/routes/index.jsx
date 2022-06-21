import { Link } from "@remix-run/react";

export default function Index() {
	return (
		<div className="container">
			<div className="content">
				<h1>SnippetCloud!!</h1>
				<nav>
					<ul>
						<li>
							<Link to="snippets">Check Snippets</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
