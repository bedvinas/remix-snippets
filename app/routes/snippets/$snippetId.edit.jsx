import { Form, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { useState } from "react";
import connectDb from "~/db/connectDb.server";

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

export async function action({ request, params }) {
	const formData = await request.formData();
	const db = await connectDb();
	try {
		let isFavorite = formData.get("favorite") === "on" ? true : false;
		formData.set("favorite", `${isFavorite}`);
		await db.models.Snippet.findByIdAndUpdate(
			params.snippetId,
			Object.fromEntries(formData)
		);
		return redirect(`/snippets/${params.snippetId}`);
	} catch (error) {
		return json(
			{ errors: error.errors, values: Object.fromEntries(formData) },
			{ status: 400 }
		);
	}
}

export default function SnippetIdEdit() {
	let snippet = useLoaderData();
	console.log(snippet.favorite);
	let [isChecked, setIsChecked] = useState(snippet.favorite);

	return (
		<div className="flex flex-col my-4 mx-10">
			<Form method="post">
				<div className="mb-2">
					<label
						htmlFor="title"
						className="block mb-2 text-sm font-medium text-zinc-900"
					>
						Title
					</label>
					<input
						defaultValue={snippet.title}
						name="title"
						type="text"
						className="bg-zinc-100 border border-zinc-300 text-zinc-900 text-sm p-2 md:w-1/3"
						required
					/>
				</div>
				<div className="mb-2">
					<label
						htmlFor="description"
						className="block mb-2 text-sm font-medium text-zinc-900"
					>
						Description
					</label>
					<textarea
						name="description"
						defaultValue={snippet.description}
						rows="5"
						className="block p-2 w-full text-sm text-zinc-900 bg-zinc-100 border border-zinc-300 md:w-1/2"
					></textarea>
				</div>
				<div className="mb-4">
					<label
						htmlFor="programmingLanguage"
						className="block mb-2 text-sm font-medium text-zinc-900"
					>
						Programming language
					</label>
					<select
						defaultValue={snippet.programmingLanguage}
						name="programmingLanguage"
						className="bg-zinc-100 text-zinc-900 text-sm block md:w-1/3 p-1 rounded-none"
					>
						<option value="Python">Python</option>
						<option value="JavaScript">JavaScript</option>
						<option value="Java">Java</option>
						<option value="C#">C#</option>
						<option value="C">C</option>
						<option value="C++">C++</option>
						<option value="HTML">HTML</option>
						<option value="CSS">CSS</option>
						<option value="PHP">PHP</option>
						<option value="R">R</option>
					</select>
				</div>
				<div className="flex mb-2">
					<input
						key={snippet._id}
						name="favorite"
						type="checkbox"
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
						className=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
					/>
					<svg
						onClick={() => setIsChecked(!isChecked)}
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-yellow-400"
						fill={isChecked ? "currentColor" : "none"}
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
					<label
						htmlFor="favorite"
						className="ml-2 text-sm font-medium text-zinc-900"
					>
						Favorite
					</label>
				</div>
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-medium text-zinc-900"
						htmlFor="code"
					>
						Snippet
					</label>
					<textarea
						defaultValue={snippet.code}
						rows="18"
						className="block p-2.5 w-full text-sm text-gray-900 bg-zinc-100 border border-gray-300"
					></textarea>
				</div>
				<button
					type="submit"
					className="flex md:w-1/4 justify-center items-center space- border-2 p-1 bg-zinc-100 border-zinc-600 rounded-none mb-4 hover:bg-zinc-800 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
					</svg>
					<span>Save</span>
				</button>
			</Form>
		</div>
	);
}
