import CategoryTableRow from "./CategoryTableRow";

const CategoryTable = ({ categories, onAction, initialIndex }) => {
	const rows = categories.map((each) => (
		<CategoryTableRow key={each.id} category={each} onAction={onAction} indexNumber={initialIndex++} />
	));

	return (
		<div className="overflow-x-auto my-4">
			<table className="min-w-full divide-y divide-gray-700 border table-auto">
				<thead className="bg-green-200 divide-y">
					<tr>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
							No
						</th>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
							ID
						</th>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-1/4">
							Name
						</th>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-1/2">
							Description
						</th>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
							Create at
						</th>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wide">
							Modify at
						</th>
						<th className="border border-slate-700 p-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

export default CategoryTable;
