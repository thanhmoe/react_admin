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

const ProductModal = ({ open, onCancel, product }) => {
   const [listCategories, setListCategories] = useState([]);
   const [fileList, setFileList] = useState([]);
   const [form] = Form.useForm();

   const listSelectedCategories = [];

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetchCategory();
         console.log(response);
         if (response.success && response.categories) {
            setListCategories(response.categories.map((each) => {
               return {
                  label: each.name,
                  value: each.id
               };
            }));
         }
      };
      if (open)
         fetchData();

   }, [open]);

   const handleCategoriesChanged = (value) => {
      listSelectedCategories.push(value);
   };

   const handleCancel = () => {
      form.resetFields();
      setFileList([]);
      onCancel(false);
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
               onCancel(true);
            }
            else
               notify("error", result.message);
         })
         .catch(info => { });
   };

   return (
      <Modal
         open={open}
         title={!product ? "Add a new product" : "Update product"}
         style={{ top: 100 }}
         width={1000}
         cancelText="Cancel"
         onCancel={handleCancel}
         okText={!product ? "Create" : "Confirm"}
         onOk={handleOk}
      >
         <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ width: "100%" }}
         >
            <Form.Item
               name="name"
               label="Name"
               rules={[{
                  required: true,
                  message: "Please input the name!"
               }]}
            >
               <Input defaultValue={product ? product.name : ""} />
            </Form.Item>
            <Row>
               <Col span={12}>
                  <Form.Item
                     name="quantity"
                     label="Quantity"
                     labelCol={{ span: 8 }}
                     wrapperCol={{ span: 16 }}
                     rules={[{
                        required: true,
                        message: "Please input the quantity!",
                     }]}
                  >
                     <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        defaultValue={product ? product.quantity_in_stock : 0}
                     />
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
                        pattern: new RegExp(/^\d{1,8}(\.\d{1,2})?$/),
                        message: "Please enter a valid price (up to 8 digits before decimal and 2 after)",
                     }]}
                  >
                     <InputNumber
                        min={0}
                        max={99999999.99}
                        precision={2}
                        step={0.01}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: '100%' }}
                        defaultValue={product ? product.price : 0}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item
               name="category_ids"
               label="Categories"
               rules={[{
                  required: true,
                  message: "Please select at least one category!"
               }]}
            >
               <Select
                  mode="multiple"
                  allowClear
                  defaultValue={
                     product ? product.categories.map(each => {
                        return parseInt(each.id, 10);
                     }) : []
                  }
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
               <TextArea
                  rows={2}
                  defaultValue={product ? product.description : ""}
               />
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