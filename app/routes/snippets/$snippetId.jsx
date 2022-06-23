import { useLoaderData, Form, Link } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
	const db = await connectDb();
	const snippet = await db.models.Snippet.findById(params.snippetId);
	if (!snippet) {
		throw new Response("Not Found", {
			status: 404,
		});
	}
	return json(snippet);
}

export async function action({ params }) {
	const db = await connectDb();
	const snippetId = params.snippetId;
	await db.models.Snippet.findByIdAndDelete(snippetId);
	return redirect(`/`);
}

export default function SnippetId() {
	const snippet = useLoaderData();
	return (
		<div className="flex flex-col my-4 mx-10">
			<div className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8 text-yellow-400"
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
				<h1 className="ml-2 font-bold text-xl">{snippet.title}</h1>
				<span className="ml-2 px-2 py-1 text-sm text-blue-800 border-2 border-blue-800 rounded-full">
					{snippet.programmingLanguage}
				</span>
			</div>
			<p className="ml-10 text-lg text-zinc-600">{snippet.description}</p>
			<p className="ml-10 text-zinc-400">
				Created: {new Date(snippet.createdAt).toLocaleDateString()}
			</p>
			<p className="ml-10 mb-6 text-zinc-400">
				Last updated: {new Date(snippet.updatedAt).toLocaleDateString()}
			</p>
			<div className="flex">
				<button className="flex items-center mr-12 border-2 p-2 border-zinc-600 rounded-none mb-4 hover:bg-zinc-800 hover:text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
						<path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
					</svg>
					<span>Copy</span>
				</button>
				<Link
					to={`/snippets/${snippet._id}/edit`}
					className="flex items-center mr-12 border-2 p-2 border-zinc-600 rounded-none mb-4 hover:bg-zinc-800 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
						<path
							fillRule="evenodd"
							d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Edit</span>
				</Link>
				<button className="flex items-center border-2 p-2 border-zinc-600 rounded-none mb-4 hover:bg-zinc-800 hover:text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Delete</span>
				</button>
			</div>
			<code
				rows="18"
				className="block p-2.5 w-full text-sm text-gray-900 bg-zinc-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			>
				<pre>{snippet.code}</pre>
			</code>
		</div>
	);
}
