export default function NewSnippet() {
	return (
		<div>
			<p>Create snippet</p>
			<form method="post">
				<div>
					<label>
						Name: <input type="text" name="name" />
					</label>
				</div>
				<div>
					<label>
						Description: <input type="text" name="description" />
					</label>
				</div>
				<div>
					<label>
						Code: <textarea name="code" />
					</label>
				</div>
				<div>
					<button type="submit" className="button">
						Add
					</button>
				</div>
			</form>
		</div>
	);
}
