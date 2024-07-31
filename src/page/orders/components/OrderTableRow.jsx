import { Button, Space, Tag } from "antd";

import {
	formatISODate,
	getFormattedTime,
	getFormattedDate,
} from "../../../utils/date_utils";
import OrderDetailDrawer from "./OrderDetailDrawer";
import { useCallback, useEffect, useState } from "react";
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	DropboxOutlined,
	SyncOutlined
} from "@ant-design/icons"

const OrderTableRow = ({ order, indexNumber, onAction }) => {
	const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
	const [statusColor, setStatusColor] = useState(null);
	const [statusIcon, setStatusIcon] = useState(null);

	useEffect(() => {
		switch (order.status) {
			case "pending":
				setStatusColor("default");
				setStatusIcon(<ClockCircleOutlined />);
				break;
			case "processing":
				setStatusColor("processing");
				setStatusIcon(<DropboxOutlined />);
				break;
			case "shipping":
				setStatusColor("cyan");
				setStatusIcon(<SyncOutlined spin />);
				break;
			case "delivered":
				setStatusColor("green");
				setStatusIcon(<CheckCircleOutlined />);
				break;
			case "cancelled":
				setStatusColor("error");
				setStatusIcon(<CloseCircleOutlined />);
				break;
		}
	}, [order])

	const handleCancelDetailDrawer = useCallback(
		(reloadingPage) => {
			if (reloadingPage) onAction()
			setOpenDetailDrawer(false)
		},
		[onAction]
	)

	return (
		<>
			<tr>
				<td className="border border-slate-600 p-2">{indexNumber}</td>
				<td className="border border-slate-600 p-2 text-blue-500 font-semibold">{order.order_id}</td>
				<td className="border border-slate-600 p-2 text-left text-ellipsis">
					{order.customer_email}
				</td>
				<td className="border border-slate-600 p-2 flex-1 text-right">
					{order.total_amount}
				</td>
				<td className="border border-slate-600 p-2 text-left text-ellipsis">
					{order.note}
				</td>
				<td className="border border-slate-600 p-2 text-right whitespace-nowrap">
					<div className="flex flex-col items-end">
						<span>{getFormattedDate(order.create_at)}</span>
						<span>{getFormattedTime(order.create_at)}</span>
					</div>
				</td>
				<td className="border border-slate-600 p-2 text-left whitespace-nowrap">
					<Tag color={statusColor} icon={statusIcon}>{order.status}</Tag>
				</td>
				<td className="border border-slate-600 p-2 text-left whitespace-nowrap">
					<Space wrap direction="horizontal" size="small">
						<Button
							className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white"
							onClick={() => setOpenDetailDrawer(true)}
						>
							View
						</Button>
					</Space>
				</td>
			</tr>
			<OrderDetailDrawer
				key={order.order_id}
				orderId={order.order_id}
				open={openDetailDrawer}
				onCancel={handleCancelDetailDrawer}
				statusColor={statusColor}
				statusIcon={statusIcon}
			/>
		</>
	);
};

export default OrderTableRow;
