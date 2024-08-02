import { useEffect, useState } from "react";
import { fetchBanners } from "../../services/bannerServices";
import BannerTable from "./components/BannerTable";

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(10);
    const [sortOption, setSortOption] = useState("create_at");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [error, setError] = useState(null); // Add error state


    const fetchData = async () => {
        try {
            const res = await fetchBanners({
                page: currentPage,
                limit: itemsPerPage,
                sortBy: sortOption,
                sortOrder: sortOrder
            })
            if (res.success) {
                setBanners(res.banners)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <BannerTable banners={banners} fetchData={fetchData} />
        </div>

    )
}

export default BannerList;