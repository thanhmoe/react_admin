import { useState, useEffect } from "react"
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
} from "antd"
const { TextArea } = Input
import { PlusOutlined } from "@ant-design/icons"

import { addProduct, updateProduct } from "../../../services/product_services"

import { fetchCategories } from "../../../services/category_services"

import { notify } from "../../../utils/notify_utils"
import { NOTIFY_STATUS } from "../../../utils/constants"

const normFile = (e) => {
   if (Array.isArray(e)) return e
   return e && e.fileList
}

const ProductModal = ({ open, onCancel, product }) => {
   const [listCategories, setListCategories] = useState([])
   const [fileList, setFileList] = useState([])
   const [form] = Form.useForm()

   const listSelectedCategories = []

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetchCategories()
         console.log(response)
         if (response.success && response.categories) {
            setListCategories(response.categories.map((each) => {
               return {
                  label: each.name,
                  value: each.id
               }
            }))
         }
      }
      if (open)
         fetchData()

   }, [open])

   const handleCategoriesChanged = (value) => {
      listSelectedCategories.push(value)
   }

   const handleCancel = () => {
      form.resetFields()
      setFileList([])
      onCancel(false)
   }

   const handleOk = async () => {
      form
         .validateFields()
         .then(async (values) => {
            values.image = values.image ? values.image[0].originFileObj : null
            const result = !product ? await addProduct(values) : await updateProduct(product.id, values)
            if (result.success) {
               notify(NOTIFY_STATUS.success, result.message)
               form.resetFields()
               onCancel(true)
            }
            else
               notify("error", result.error ? result.error : result.message)
         })
         .catch(info => { })
   }

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
            initialValues={product ? {
               name: product.name,
               quantity: product.quantity_in_stock,
               price: product.price,
               category_ids: product.categories.map(each => parseInt(each.id, 10)
               ),
               description: product.description,
            } : {}}
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
               <TextArea rows={4} />
            </Form.Item>
            <Form.Item
               name="image"
               label="Image"
               valuePropName="fileList"
               getValueFromEvent={normFile}
               rules={[{
                  required: !product ? true : false,
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
   )
}

export default ProductModal