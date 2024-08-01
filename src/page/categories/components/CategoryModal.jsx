import { Form, Input, Modal } from "antd"
import { addCategory, updateCategory } from "../../../services/category_services"
import { notify } from "../../../utils/notify_utils"
import { NOTIFY_STATUS } from "../../../utils/constants"
const { TextArea } = Input

const CategoryModal = ({ open, onCancel, category }) => {
   const [form] = Form.useForm()

   const handleCancel = () => onCancel(false)

   const handleOk = () => {
      form
         .validateFields()
         .then(async (values) => {
            const result = !category
               ? await addCategory(values)
               : await updateCategory(category.id, values)
            if (result.success) {
               notify(NOTIFY_STATUS.success, result.message)
               // form.resetFields([])
               onCancel(true)
            } else {
               notify(NOTIFY_STATUS.error, result.error ? result.error : result.message)
            }
         })
         .catch(info => notify(NOTIFY_STATUS.error, info))
   }

   return (
      <Modal
         open={open}
         title={!category ? "Add a new category" : "Update category"}
         style={{ top: 200 }}
         width={800}
         cancelText="Cancel"
         onCancel={handleCancel}
         okText={!category ? "Create" : "Confirm"}
         onOk={handleOk}
      >
         <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ width: "100%" }}
            initialValues={
               category ? {
                  name: category.name,
                  description: category.description
               } : {}
            }
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
            <Form.Item
               name="description"
               label="Description"
            >
               <TextArea rows={4} />
            </Form.Item>
         </Form>
      </Modal>
   )
}

export default CategoryModal