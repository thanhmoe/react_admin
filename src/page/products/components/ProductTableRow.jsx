import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Space } from "antd";

import {
	formatISODate,
	getFormattedTime,
	getFormattedDate,
} from "../../../utils/date_utils";

import ProductModal from "./ProductModal";
import ProductConfirmStatusChangeModal from "./ProductConfirmStatusChangeModal";

const ProductTableRow = ({ product, onAction }) => {
	const [openConfirmModal, setOpenConfirmModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const navigate = useNavigate();

	const handleCancelProductModal = useCallback(
		(reloadingPage) => {
			if (reloadingPage) onAction();
			setOpenUpdateModal(false);
		},
		[onAction]
	);

	const handleCancelConfirmModal = useCallback(
		(reloadingPage) => {
			if (reloadingPage) onAction();
			setOpenConfirmModal(false);
		},
		[onAction]
	);

	const handleViewDetail = () => navigate(`/products/${product.id}`);
	return (
		<tr>
			<td className="border border-slate-600 p-2">{product.id}</td>
			<td className="border border-slate-600 p-2 whitespace-nowrap">
				<img
					className="w-32 h-32 object-contain"
					src={product.image_path}
					alt=""
				/>
			</td>
			<td className="border border-slate-600 p-2 text-left text-ellipsis">
				{product.name}
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				{product.quantity_in_stock}
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				{product.price}
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				<div className="flex flex-col items-end space-y-1">
					<span className="text-green-500">{product.like_count}</span>
					<span className="text-red-500">
						{product.dislike_count}
					</span>
				</div>
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				{0}
			</td>
			<td className="border border-slate-600 p-2 text-right whitespace-nowrap">
				<div className="flex flex-col items-end">
					<span>{getFormattedDate(product.create_at)}</span>
					<span>{getFormattedTime(product.create_at)}</span>
				</div>
			</td>
			<td className="border border-slate-600 p-2 text-right whitespace-nowrap">
				<div className="flex flex-col items-end">
					<span>{getFormattedDate(product.modify_at)}</span>
					<span>{getFormattedTime(product.modify_at)}</span>
				</div>
			</td>
			<td className="border border-slate-600 p-2 text-left whitespace-nowrap">
				<Space wrap direction="horizontal" size="small">
					<Button
						className="bg-transparent border !border-yellow-600 text-yellow-600 hover:!bg-yellow-600 hover:!text-white"
						onClick={() => setOpenUpdateModal(true)}
					>
						Edit
					</Button>
					<Button
						className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white"
						onClick={handleViewDetail}
					>
						View
					</Button>
					{product.is_active ? (
						<Button
							className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white"
							onClick={() => setOpenConfirmModal(true)}
						>
							Disable
						</Button>
					) : (
						<Button
							className="bg-transparent border !border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white"
							onClick={() => setOpenConfirmModal(true)}
						>
							Enable
						</Button>
					)}
				</Space>
				<ProductModal
					open={openUpdateModal}
					product={product}
					onCancel={handleCancelProductModal}
				/>
				<ProductConfirmStatusChangeModal
					open={openConfirmModal}
					product={product}
					onCancel={handleCancelConfirmModal}
				/>
			</td>
		</tr>
	);
};

export default ProductTableRow;
