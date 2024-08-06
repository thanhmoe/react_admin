import { Button, Image, Modal } from "antd";
import { useState } from "react";
import { DeleteOutlined } from '@ant-design/icons';
import {
    getFormattedTime,
    getFormattedDate,
} from "../../../utils/date_utils";

const BannerTableRow = ({ banner, onDelete, indexNumber }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showDeleteModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        await onDelete(banner.id);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <tr>
                <td className="border border-slate-600 p-2">{indexNumber}</td>
                <td className="border border-slate-600 p-2 text-blue-500 font-semibold">{banner.id}</td>
                <td className="border border-slate-600 p-2 whitespace-nowrap">
                    <Image
                        className="w-32 h-32 object-contain"
                        src={banner.image}
                        alt=""
                    />
                </td>
                <td className="border border-slate-600 p-2 text-left text-ellipsis">
                    {banner.title}
                </td>
                <td className="border border-slate-600 p-2 text-left text-ellipsis">
                    {banner.descriptions}
                </td>
                <td className="border border-slate-600 p-2 text-left text-ellipsis">
                    {banner.product_id}
                </td>
                <td className="border border-slate-600 p-2 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                        <span>{getFormattedDate(banner.create_at)}</span>
                        <span>{getFormattedTime(banner.create_at)}</span>
                    </div>
                </td>
                <td className="border border-slate-600 p-2 text-left whitespace-nowrap">
                    <Button
                        className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white"
                        onClick={showDeleteModal}
                        icon={<DeleteOutlined />}
                    />
                </td>
            </tr>
            <Modal
                title="Delete Banner"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this banner?</p>
            </Modal>
        </>
    );
};

export default BannerTableRow;
