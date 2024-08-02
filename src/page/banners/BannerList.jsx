import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import BannerTable from "./components/BannerTable";
import BannerModal from "./components/BannerModal";
import { fetchBanners, deleteBanner, addBanner } from "../../services/bannerServices";
import { notify } from "../../utils/notify_utils";
import { NOTIFY_STATUS } from "../../utils/constants";

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(10);
    const [sortOption, setSortOption] = useState("create_at");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetchBanners({
                page: currentPage,
                limit: itemsPerPage,
                sortBy: sortOption,
                sortOrder: sortOrder
            });
            if (res.success) {
                setBanners(res.banners);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showAddModal = () => {
        setSelectedBanner(null);
        setIsModalVisible(true);
    };

    const handleAdd = async (values) => {
        try {
            const res = await addBanner(values);
            if (res.success) {
                notify(NOTIFY_STATUS.success, res.message);
                fetchData();
                setIsModalVisible(false);
            } else {
                notify(NOTIFY_STATUS.error, res.message);
            }
        } catch (error) {
            notify(NOTIFY_STATUS.error, "Failed to add banner");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteBanner(id);
            if (res.success) {
                notify(NOTIFY_STATUS.success, res.message);
                fetchData();
            } else {
                notify(NOTIFY_STATUS.error, res.message);
            }
        } catch (error) {
            notify(NOTIFY_STATUS.error, "Failed to delete banner");
        }
    };

    return (
        <div>
            <h1>Banners</h1>
            <Button className="bg-green-600 text-white hover:!text-green-600 hover:!border-green-600"
                size="large"
                onClick={showAddModal}>
                Add Banner
            </Button>
            <BannerTable banners={banners} onDelete={handleDelete} />
            <BannerModal
                open={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleAdd}
            />
        </div>
    );
};

export default BannerList;
