import React from "react";

import ProductTableRow from "./ProductTableRow";

const ProductTable = ({ products, onAction, initialIndex }) => {
	const rows = products.map((each) => {
		return (
			<ProductTableRow product={each} key={each.id} onAction={onAction} indexNumber={initialIndex++} />
		);
	});

	return (
		<div className="overflow-x-auto my-4">
			<table className="min-w-full divide-y divide-gray-600 border table-auto">
				<thead className="bg-green-200 divide-y">
					<tr>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
							No
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
							ID
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide w-40">
							Image
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider w-1/4">
							Name
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							In Stock
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							Price ($)
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							React
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							Total sold
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							Create at
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							Modify at
						</th>
						<th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

export default ProductTable;
