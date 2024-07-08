import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Descriptions, Tabs, Image, Button, Space, Modal, message, Divider } from "antd";
import { EditOutlined, ArrowLeftOutlined, StopTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

import { disableProduct, fetchProductDetail } from "../../../services/product_services";

import ProductModal from "../components/ProductModal";

import { formatISODate } from "../../../utils/date_utils";
import ProductStatusConfirmModal from "../components/ProductStatusConfirmModal";

const { TabPane } = Tabs;

const ProductDetailPage = ({ }) => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [open, setOpen] = useState(false);
   const [reloadPage, setReloadPage] = useState(false);
   const [openConfirmModal, setOpenConfirmModal] = useState(false);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await fetchProductDetail(id);
            if (response.success) {
               response.data[0].is_active = Boolean(response.data[0].is_active);
               setProduct(response.data[0]);
            } else {
               message.error("Failed to fetch product details.");
            }
         } catch (error) {
            message.error("An error occurred while fetching product details.");
         } finally {
            setLoading(false);
            setReloadPage(false);
         }
      };
      fetchProduct();
   }, [reloadPage]);

   const handleOpenConfirmModal = () => setOpenConfirmModal(true);

   const handleCancelUpdateModal = () => setOpen(false);

   const handleOpenUpdateModal = () => setOpen(true);

   const handleCancelConfirmModal = (reloadingPage) => {
      if (reloadingPage) setReloadPage(true);
      setOpenConfirmModal(false);
   };

   const handleBack = () => navigate(-1);

   if (loading) return <div>Loading...</div>;

   return (
      <>
         <div className="product-detail-page p-4">
            <div className="header flex justify-between items-center mb-4">
               <h1 className="text-2xl font-semibold">Product Details</h1>
               <Space>
                  <Button
                     icon={<ArrowLeftOutlined />}
                     onClick={handleBack}
                  >
                     Back
                  </Button>
                  <Button
                     type="primary"
                     icon={<EditOutlined />}
                     onClick={handleOpenUpdateModal}
                  >
                     Edit Product
                  </Button>
                  <Button
                     type="danger"
                     icon={
                        product.is_active
                           ? <StopTwoTone />
                           : <CheckCircleTwoTone />
                     }
                     onClick={handleOpenConfirmModal}
                  >
                     {product.is_active ? "Disable" : "Enable"}
                  </Button>
               </Space>
            </div>
            <Card>
               <div className="product-info flex">
                  <Image
                     width={500}
                     src={product.image_path}
                     alt={product.name}
                  // className="mr-4"
                  />
                  <Descriptions title={product.name} layout="horizontal" bordered>
                     <Descriptions.Item label="Price">$ {product.price}</Descriptions.Item>
                     <Descriptions.Item label="In Stock">{product.quantity_in_stock}</Descriptions.Item>
                     <Descriptions.Item label="Date Added">{formatISODate(product.create_at)}</Descriptions.Item>
                     <Descriptions.Item label="Categories">{product.categories.map(cat => cat.name).join(', ')}</Descriptions.Item>
                     <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                  </Descriptions>
               </div>
            </Card>
            <Divider />
            <Tabs
               className="mt-4"
               centered
               items={[{ key: 1, label: "Sale data" }]}
            />
         </div>
         <ProductModal open={open} product={product} onCancel={handleCancelUpdateModal} />
         <ProductStatusConfirmModal
            open={openConfirmModal}
            product={product}
            isDisabling={product.is_active}
            onCancel={handleCancelConfirmModal}
         />
      </>
   );
};

export default ProductDetailPage;
