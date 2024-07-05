import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Descriptions, Tabs, Image, Button, Space, Modal, message, Divider } from "antd";
import { EditOutlined, ArrowLeftOutlined, StopTwoTone } from "@ant-design/icons";

import { fetchProductDetail } from "../../../services/product_services";

import ProductModal from "../components/ProductModal";

import { formatISODate } from "../../../utils/date_utils";

const { TabPane } = Tabs;

const ProductDetailPage = ({ }) => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await fetchProductDetail(id);
            if (response.success) {
               setProduct(response.data[0]);
            } else {
               message.error("Failed to fetch product details.");
            }
         } catch (error) {
            message.error("An error occurred while fetching product details.");
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
   }, []);

   const handleDisable = async () => {
      Modal.confirm({
         title: "Are you sure you want to disable this product?",
         onOk: async () => {
            try {
               const response = await deleteProduct(productId);
               if (response.success) {
                  message.success("Product deleted successfully.");
                  onBack();
               } else {
                  message.error("Failed to delete product.");
               }
            } catch (error) {
               message.error("An error occurred while deleting the product.");
            }
         },
      });
   };

   const handleCancel = () => setOpen(false);

   const handleOpenUpdateModal = () => setOpen(true);

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
                     icon={<StopTwoTone />}
                     onClick={handleDisable}
                  >
                     Disable Product
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
            <Tabs className="mt-4">
               <TabPane tab="Sales Data" key="1">
                  {/* Sales Data Content */}
               </TabPane>
            </Tabs>
         </div>
         <ProductModal open={open} product={product} onCancel={handleCancel} />
      </>
   );
};

export default ProductDetailPage;
