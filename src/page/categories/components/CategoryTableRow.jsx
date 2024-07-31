import { Button, Space } from "antd";
import { useCallback, useState } from "react";
import CategoryModal from "./CategoryModal";
import {
	formatISODate,
	getFormattedDate,
	getFormattedTime,
} from "../../../utils/date_utils";
import CategoryConfirmStatusChangeModal from "./CategoryConfirmStatusChangeModal";

const CategoryTableRow = ({ category, onAction, indexNumber }) => {
	const [openConfirmModal, setOpenConfirmModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);

	const handleCategoryModelCancel = useCallback(
		(reloadingPage) => {
			if (reloadingPage) onAction();
			setOpenUpdateModal(false);
		},
		[onAction]
	);

	const handleConfirmModalCancel = useCallback(
		(reloadingPage) => {
			if (reloadingPage) onAction();
			setOpenConfirmModal(false);
		},
		[onAction]
	);

	return (
		<>
			<tr>
				<td className="border border-slate-600 p-2">{indexNumber}</td>
				<td className="border border-slate-600 p-2 text-blue-500 font-semibold">{category.id}</td>
				<td className="border border-slate-600 p-2 text-left text-ellipsis">
					{category.name}
				</td>
				<td className="border border-slate-600 p-2 text-left text-ellipsis">
					{category.description}
				</td>
				<td className="border border-slate-600 p-2 text-right whitespace-nowrap">
					<div className="flex flex-col items-end">
						<span>{getFormattedDate(category.create_at)}</span>
						<span>{getFormattedTime(category.create_at)}</span>
					</div>
				</td>
				<td className="border border-slate-600 p-2 text-right whitespace-nowrap">
					<div className="flex flex-col items-end">
						<span>{getFormattedDate(category.create_at)}</span>
						<span>{getFormattedTime(category.create_at)}</span>
					</div>
				</td>
				<td className="border border-slate-600 p-2 flex-1 text-right">
					<Space>
						<Button
							className="bg-transparent border !border-yellow-600 text-yellow-600 hover:!bg-yellow-600 hover:!text-white"
							onClick={() => setOpenUpdateModal(true)}
						>
							Edit
						</Button>
						{category.is_active ? (
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
				</td>
			</tr>
			<CategoryModal
				open={openUpdateModal}
				onCancel={handleCategoryModelCancel}
				category={category}
			/>
			<CategoryConfirmStatusChangeModal
				open={openConfirmModal}
				onCancel={handleConfirmModalCancel}
				category={category}
			/>
		</>
	);
};

export default CategoryTableRow;
