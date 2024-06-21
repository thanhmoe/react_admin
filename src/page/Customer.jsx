import React,{useEffect,useState} from "react"
import { fetchCustomers } from "../utils/api"

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchCustomers();
          if (data.success) {
            setCustomers(data.customers); // Cập nhật danh sách khách hàng từ API
          } else {
            setError(data.message); // Xử lý lỗi từ API
          }
        } catch (error) {
          console.error('Error fetching customers:', error);
          setError('Đã xảy ra lỗi khi lấy dữ liệu khách hàng. Vui lòng thử lại sau.');
        }
      };
  
      fetchData(); // Gọi fetchData khi component được tải lần đầu
    }, []); // Truyền mảng rỗng để chỉ chạy một lần sau khi component được render
  
    return (
      <div className="customer-container">
        <h2>Customer List</h2>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
}