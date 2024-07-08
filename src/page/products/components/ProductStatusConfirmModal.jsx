import { Modal } from "antd";
import {
	disableProduct,
	enableProduct,
} from "../../../services/product_services";
import { notify } from "../../../utils/notify_utils";
import { NOTIFY_STATUS } from "../../../utils/constants";

const ProductStatusConfirmModal = ({ product, open, onCancel }) => {
	const isDisabling = Boolean(product.is_active);
	const handleOk = async () => {
		const result = isDisabling
			? await disableProduct(product.id)
			: await enableProduct(product.id);
		notify(
			result.success ? NOTIFY_STATUS.success : NOTIFY_STATUS.error,
			result.message
		);
		if (result.success) onCancel(true);
		onCancel(false);
	};

	const handleCancel = () => {
		onCancel(false);
	};

	return (
		<Modal
			title={isDisabling ? "Disable Product" : "Enable Product"}
			open={open}
			onOk={handleOk}
			onCancel={handleCancel}
			okText="Confirm"
			cancelText="Cancel"
		>
			<h3>
				Are you sure you want to {isDisabling ? "disable" : "enable"}{" "}
				this product?
			</h3>
			<p>{product.name}</p>
		</Modal>
	);
};

export default ProductStatusConfirmModal;
