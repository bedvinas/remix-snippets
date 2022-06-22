import { Link, Form, NavLink } from "@remix-run/react";

export default function Snippet({ snippet }) {
	const activeClassName = "flex justify-between items-center p-2 bg-zinc-200";
	const inactiveClassName =
		"flex justify-between items-center p-2 hover:bg-zinc-200";

	return (
		<li className="border-b-2 border-zinc-300" key={snippet._id}>
			<NavLink
				className={({ isActive }) =>
					isActive ? activeClassName : inactiveClassName
				}
				to={`/snippets/${snippet._id}`}
				key={snippet._id}
			>
				<div className="">
					<span className="font-bold mr-2">{snippet.title}</span>
					<span className="px-2 py-1 text-sm text-blue-800 border-2 border-blue-800 rounded-full">
						{snippet.programmingLanguage}
					</span>
					<p className="text-zinc-600">{snippet.description}</p>
					<p className="text-zinc-400">{snippet.createdAt}</p>
				</div>
				<div className="flex justify-between">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-yellow-400"
						fill={snippet.favorite ? "currentColor" : "none"}
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
						/>
					</svg>
				</div>
			</NavLink>
		</li>
	);
}
