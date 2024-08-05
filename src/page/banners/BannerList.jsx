import { useState, useEffect } from "react";
import { Button, Modal, Pagination } from "antd";
import BannerTable from "./components/BannerTable";
import BannerModal from "./components/BannerModal";
import { fetchBanners, deleteBanner, addBanner } from "../../services/bannerServices";
import { notify } from "../../utils/notify_utils";
import { NOTIFY_STATUS } from "../../utils/constants";

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(10);
    const [totalBanner, setTotalBanner] = useState(null);
    const [sortOption, setSortOption] = useState("create_at");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let initialProductNumberIndex = (currentPage - 1) * itemsPerPage + 1


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
                setTotalBanner(res.total)
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage,
        itemsPerPage,]);

    const showAddModal = () => {
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

    const handlePageChange = (page) => {
        initialProductNumberIndex = (page - 1) * itemsPerPage + 1
        setCurrentPage(page);
    };

    const onShowSizeChange = (current, pageSize) => {
        initialProductNumberIndex = (current - 1) * pageSize + 1
        setCurrentPage(current);
        setItemPerPage(pageSize);
    };

    return (
        <>
            <div style={{ margin: '1rem', minHeight: '90vh' }}>
                <h1>Banners</h1>
                <Button className="bg-green-600 text-white hover:!text-green-600 hover:!border-green-600"
                    size="large"
                    onClick={showAddModal}>
                    Add Banner
                </Button>
                <BannerTable banners={banners} onDelete={handleDelete} initialIndex={initialProductNumberIndex} />
                <BannerModal
                    open={isModalVisible}
                    onCancel={handleCancel}
                    onSubmit={handleAdd}
                />
            </div>
            <Pagination style={{ marginBottom: '2rem' }}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                current={currentPage}
                total={totalBanner}
                onChange={handlePageChange}
            />
        </>
    );
};

export default BannerList;
