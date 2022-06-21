import {
	Form,
	useLoaderData,
	Link,
	Outlet,
	useSubmit,
	useSearchParams,
} from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ request }) {
	const url = new URL(request.url);
	const searchQuery = url.searchParams.get("search");
	const sortValue = url.searchParams.get("sort") ?? "title";
	const db = await connectDb();
	const snippets = await db.models.Snippet.find(
		searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {}
	).sort(sortValue == "title" ? { [sortValue]: 1 } : { [sortValue]: -1 });
	return snippets;
}

export default function SnippetsIndex() {
	const snippets = useLoaderData();

	return (
		<div className="w-full bg-white rounded-lg shadow-lg">
			<ul className="divide-y-2">
				{snippets.map((snippet) => (
					<li
						key={snippet._id}
						className="flex justify-between items-center p-3 hover:bg-gray-200"
					>
						<Link to={`/snippets/${snippet._id}`} key={snippet._id}>
							<div className="">
								<span className="font-bold mr-2">{snippet.title}</span>
								<span className="inline px-2 py-1 text-sm text-blue-800 border-2 border-blue-800 rounded-full">
									{snippet.programmingLanguage}
								</span>
								<p className="text-gray-600">{snippet.description}</p>
								<p className="text-gray-400">{snippet.createdAt}</p>
							</div>
						</Link>
						<div className="flex justify-between">
							<Link to={`/snippets/${snippet._id}/edit`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6 mr-4 text-blue-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</Link>
							<Form action="delete" method="post">
								<button type="submit">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-red-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							</Form>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
