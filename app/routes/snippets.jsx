import { Link, Outlet } from "@remix-run/react";

export default function JokesRoute() {
	return (
		<div>
			<header>
				<div>
					<h1>
						<Link to="/" title="SnippetCloud" aria-label="Snippet Cloud">
							<span>SNIPPETS</span>
						</Link>
					</h1>
				</div>
			</header>
			<main>
				<div>
					<div>
						<Link to=".">Get a random snippet</Link>
						<p>Here are a few more snippets to check out:</p>
						<ul>
							<li>
								<Link to="some-snippet-id">Java - Product recomendation</Link>
							</li>
						</ul>
						<Link to="new">Add your own snippet</Link>
					</div>
					<div>
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
