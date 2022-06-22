import {
	Form,
	Link,
	Outlet,
	useLoaderData,
	useSearchParams,
	useSubmit,
} from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";
import Snippet from "../components/Snippet";

const DEFAULT_SORT_FIELD = "updatedAt";

export async function loader({ request }) {
	const url = new URL(request.url);
	const searchQuery = url.searchParams.get("search");
	const sortValue = url.searchParams.get("sort") ?? DEFAULT_SORT_FIELD;
	const db = await connectDb();
	const snippets = await db.models.Snippet.find(
		searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {}
	).sort(sortValue == "title" ? { [sortValue]: 1 } : { [sortValue]: -1 });
	return snippets;
}

export default function Snippets() {
	const snippets = useLoaderData();
	const submit = useSubmit();

	const [searchParams] = useSearchParams();
	const search = searchParams.get("search");

	function handleChange(event) {
		submit(event.currentTarget, { replace: true });
	}

	return (
		<div className="flex min-h-screen">
			<div className="w-5/12 flex-1 relative">
				<Link
					to="/snippets"
					className="flex items-center justify-center border-b-2 mb-5 border-zinc-600"
				>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
						</svg>
					</span>
					<h1 className="m-3 text-2xl font-bold">SnippetCloud</h1>
				</Link>
				<div className="m-2">
					<div className="relative mb-2">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<input
							type="text"
							name="search"
							className=" border border-zinc-400  text-zinc-900 sm:text-sm focus:outline-none focus:border-black focus:ring-1 block w-full pl-10 p-1"
							placeholder="Search"
						/>
					</div>
					<Form
						action="sort"
						method="get"
						className="mb-3"
						onChange={handleChange}
					>
						<label className="block text-sm font-medium text-gray-900">
							Sort by:
						</label>
						<input name="search" defaultValue={""} hidden />
						<select
							name="sort"
							className=" border border-zinc-400 text-zinc-900 text-sm block w-full p-1"
							defaultValue={"createdAt"}
						>
							<option readOnly="title">Title</option>
							<option readOnly="favorite">Favorite</option>
							<option readOnly="createdAt">Created</option>
							<option readOnly="updatedAt">Updated</option>
						</select>
					</Form>
					<Link
						to="/snippets/new"
						className="flex w-full justify-center items-center space- border-2 p-1 border-zinc-600 rounded-none mb-4 hover:bg-zinc-800 hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
						<span>New snippet</span>
					</Link>
				</div>
				<div className="max-h-96 overflow-y-scroll">
					<ul>
						{snippets.map((snippet) => (
							<Snippet key={snippet._id} snippet={snippet} />
						))}
					</ul>
				</div>
				<div className="w-full h-14 border-t-2 border-zinc-600 absolute bottom-0 left-0 flex">
					<div className="w-full flex items-center justify-around">
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
						</button>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</button>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="flex-auto w-7/12 bg-zinc-200">
				<h2>
					<Outlet></Outlet>
				</h2>
			</div>
		</div>
	);
}
