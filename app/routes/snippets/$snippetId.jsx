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
		<div className="md:flex w-full">
			<div className="md:w-1/3 lg:w-1/4 grow md:mr-6">
				<div className="mb-6">
					<p
						htmlFor="title"
						className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-300"
					>
						Title
					</p>
					<p className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						{snippet.title}
					</p>
				</div>
				<div className="mb-6">
					<p
						htmlFor="description"
						className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-400"
					>
						Description
					</p>
					<p className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50  border border-zinc-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						{snippet.description}
					</p>
				</div>
				<div className="flex items-start mb-6">
					<div className="flex items-center h-5">
						<span className="text-indigo-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill={snippet.favorite ? "currentColor" : "none"}
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</span>
					</div>
					<span className="ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
						Favorite
					</span>
				</div>
				<Link to={`edit`}>
					<button
						className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-w-md mb-6"
						type="submit"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
						Edit
					</button>
				</Link>
				<Form method="post" className="">
					<button
						className="flex items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-sm w-1/2 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 max-w-md mb-6"
						type="submit"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="mr-2 h-6 w-6"
							viewBox="0 0 16 16"
						>
							<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
						</svg>
						Delete
					</button>
				</Form>
			</div>
			<div className="md:w-2/3 lg:w-3/4 grow">
				<div className="mb-2 w-fit px-2 text-sm text-blue-200 bg-blue-600 rounded-full">
					{snippet.programmingLanguage}
				</div>
				<code
					rows="18"
					className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50  border border-zinc-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<pre>{snippet.code}</pre>
				</code>
			</div>
		</div>
	);
}
