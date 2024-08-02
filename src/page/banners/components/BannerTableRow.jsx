import { Button, Modal, Space } from "antd";
import { useCallback, useState } from "react";
import Icon, { DeleteOutlined } from '@ant-design/icons'
import {
    getFormattedTime,
    getFormattedDate,
} from "../../../utils/date_utils";

import { deleteBanner } from "../../../services/bannerServices";

const BannerTableRow = ({ banner, fetchData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showDeleteModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = async () => {
        try {
            const res = await deleteBanner(banner.id);
            if (res.success) {
                fetchData(); // Refresh banner list
                setIsModalVisible(false);
                console.log(123123);
            }
        } catch (error) {
            console.error("Failed to delete banner:", error.message);
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <tr>
                <td className="border border-slate-600 p-2 text-blue-500 font-semibold">{banner.id}</td>
                <td className="border border-slate-600 p-2 whitespace-nowrap">
                    <img
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
                <td className="border border-slate-600 p-2 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                        <span>{getFormattedDate(banner.create_at)}</span>
                        <span>{getFormattedTime(banner.create_at)}</span>
                    </div>
                </td>
                <td className="border border-slate-600 p-2 flex-1 text-right">
                    <Button
                        className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white"
                        onClick={showDeleteModal}
                    >
                        <DeleteOutlined />
                    </Button>
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
