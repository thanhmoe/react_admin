import OrderTableRow from "./OrderTableRow";

const OrderTable = ({ orders, initialIndex }) => {
	const rows = orders.map((each) => {
		return (
			<OrderTableRow
				key={orders.id}
				order={each}
				indexNumber={initialIndex++}
			/>
		);
	});

	return (
		<div className="overflow-x-auto my-2">
			<table className="min-w-full divide-y divide-gray-500 border table-auto">
				<thead className="bg-green-200 divide-y">
					<tr>
						<th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap max-w-min">
							No
						</th>
						<th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap max-w-min">
							ID
						</th>
						<th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wide w-40">
							Customer
						</th>
						<th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/4">
							Total Amount
						</th>
						<th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Note
						</th>
						<th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
