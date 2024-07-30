import { Button, Popconfirm } from "antd";

const ACTION_TYPES = {
	cancel: "cancel",
	confirm: "confirm",
	ship: "ship",
};

export const OrderStatusChangePopConfirm = ({
	orderId,
	statusConfirmType,
	title,
	description,
	onConfirm,
	icon,
}) => {
	return (
		<Popconfirm
			title={title}
			description={description}
			okText="Yes"
			cancelText="No"
			icon={icon}
		>
			{statusConfirmType === ACTION_TYPES.cancel ? (
				<Button ype="primary" danger onClick={onConfirm}>
					Cancel
				</Button>
			) : statusConfirmType === ACTION_TYPES.confirm ? (
				<Button
					className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white"
					onClick={onConfirm}
				>
					Confirm
				</Button>
			) : statusConfirmType === ACTION_TYPES.ship ? (
				<Button
					className="bg-transparent border !border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white"
					onClick={onConfirm}
				>
					Ship
				</Button>
			) : null}
		</Popconfirm>
	);
};
