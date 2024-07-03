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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchCategory } from "../../../services/category_services";
const { TextArea } = Input;

const ProductModal = ({ open, onCreate, onCancel }) => {
   const [listCategories, setListCategories] = useState([]);
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
      console.log("This is the selected category:", value);
   };

   return (
      <Modal
         open={open}
         title="Add a new product"
         okText="Create"
         style={{
            top: 100
         }}
         cancelText="Cancel"
         onCancel={onCancel}
         onOk={() => {
            form
               .validateFields()
               .then((values) => {
                  form.resetFields();
                  onCreate(values);
               })
               .catch(info => {
                  console.log("Validate failed:", info);
               });
         }}
      >
         <Form
            labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
         >
            <Form.Item
               name="name"
               label="Name"
               rules={[{
                  required: true,
                  message: "Please input the name for product!"
               }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="quantity"
               label="Quantity"
            >
               <InputNumber min={0} />
            </Form.Item>
            <Form.Item
               name="price"
               label="Price"
            >
               <InputNumber min={0} />
            </Form.Item>
            <Form.Item
               name="categories"
               label="Categories"
               rules={[{
                  require: true,
                  message: "Please select at least one category!"
               }]}
            >
               <Select
                  mode="multiple"
                  allowClear
                  style={{
                     width: "100%"
                  }}
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
               label="Image"
               valuePropName="image"
               rules={[{
                  required: true,
                  message: "Product image is required!"
               }]}
            >
               <Upload
                  action={null}
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