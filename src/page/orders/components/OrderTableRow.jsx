import { Button, Space } from "antd";

const OrderTableRow = ({ order, indexNumber }) => {
	return (
		<tr>
			<td className="border border-slate-600 p-2">{indexNumber}</td>
			<td className="border border-slate-600 p-2">id</td>
			<td className="border border-slate-600 p-2 text-left text-ellipsis">
				email
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				total amount
			</td>
			<td className="border border-slate-600 p-2 text-left text-ellipsis">
				note
			</td>
			<td className="border border-slate-600 p-2 text-left whitespace-nowrap">
				<Space wrap direction="horizontal" size="small">
					<Button>
						<Button
							className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white"
							onClick={() => {}}
						>
							View
						</Button>
						<Button
							className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white"
							onClick={() => {}}
						>
							Cancel
						</Button>
					</Button>
				</Space>
			</td>
		</tr>
	);
};

export default OrderTableRow;
