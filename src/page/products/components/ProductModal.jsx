import { useState, useEffect } from "react";
import {
   Modal,
   Form,
   Input,
   InputNumber,
   Space,
   Upload,
   Button,
   Select,
   message,
   Row,
   Col,
} from "antd";
const { TextArea } = Input;
import { PlusOutlined } from "@ant-design/icons";

import { addProduct } from "../../../services/product_services";
import { fetchCategory } from "../../../services/category_services";
import { notify } from "../../../utils/notify_utils";

const normFile = (e) => {
   if (Array.isArray(e)) return e;
   return e && e.fileList;
};

const ProductModal = ({ open, onCreate, onCancel }) => {
   const [listCategories, setListCategories] = useState([]);
   const [fileList, setFileList] = useState([]);
   const [form] = Form.useForm();

   const listSelectedCategories = [];

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetchCategory();
         if (response.success && response.data) {
            setListCategories(response.data.map((each) => {
               return {
                  label: each.name,
                  value: each.id
               };
            }));
         }
      };
      fetchData();
   }, []);

   const handleCategoriesChanged = (value) => {
      listSelectedCategories.push(value);
   };

   const handleCancel = () => {
      form.resetFields();
      setFileList([]);
      onCancel();
   };

   const handleOk = async () => {
      form
         .validateFields()
         .then(async (values) => {
            values.image = values.image[0].originFileObj;
            const result = await addProduct(values);
            if (result.success) {
               notify("success", result.message);
               form.resetFields();
               onCancel();
            }
            else
               notify("error", result.message);
         })
         .catch(info => { });
   };

   return (
      <Modal
         open={open}
         title="Add a new product"
         style={{ top: 100 }}
         cancelText="Cancel"
         onCancel={handleCancel}
         okText="Create"
         onOk={handleOk}
      >
         <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
         >
            <Form.Item
               name="name"
               label="Name"
               rules={[{
                  required: true,
                  message: "Please input the name!"
               }]}
            >
               <Input />
            </Form.Item>
            <Row gutter={0}>
               <Col span={12}>
                  <Form.Item
                     name="quantity"
                     label="Quantity"
                     labelCol={{ span: 12 }}
                     wrapperCol={{ span: 12 }}
                     rules={[{
                        required: true,
                        message: "Please input the quantity!",
                     }]}
                  >
                     <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item
                     name="price"
                     label="Price"
                     labelCol={{ span: 8 }}
                     wrapperCol={{ span: 16 }}
                     rules={[{
                        required: true,
                        message: "Please input the price!",
                     }]}
                  >
                     <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item
               name="categories"
               label="Categories"
               rules={[{
                  required: true,
                  message: "Please select at least one category!"
               }]}
            >
               <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select categories"
                  options={listCategories}
                  onChange={handleCategoriesChanged}
               />
            </Form.Item>
            <Form.Item
               name="description"
               label="Description"
            >
               <TextArea rows={2} />
            </Form.Item>
            <Form.Item
               name="image"
               label="Image"
               valuePropName="fileList"
               getValueFromEvent={normFile}
               rules={[{
                  required: true,
                  message: "Product image is required!"
               }]}
            >
               <Upload
                  name="image"
                  action={null}
                  fileList={fileList}
                  listType="picture-card"
                  beforeUpload={() => false}
                  maxCount={1}
               >
                  <button
                     style={{
                        border: 0,
                        background: 'none',
                     }}
                     type="button"
                  >
                     <PlusOutlined />
                     <div
                        style={{
                           marginTop: 8,
                        }}
                     >
                        Upload
                     </div>
                  </button>
               </Upload>
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default ProductModal;