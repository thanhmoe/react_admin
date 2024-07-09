import { Modal } from "antd"
import { disableCategory, enableCategory } from "../../../services/category_services"
import { notify } from "../../../utils/notify_utils"
import { NOTIFY_STATUS } from "../../../utils/constants"

const CategoryConfirmStatusChangeModal = ({ category, open, onCancel }) => {
   const isDisabling = Boolean(category.is_active)

   const handleOk = async () => {
      const result = isDisabling
         ? await disableCategory(category.id)
         : await enableCategory(category.id)
      notify(
         result.success
            ? NOTIFY_STATUS.success
            : NOTIFY_STATUS.error,
         result.message
      )
      onCancel(result.success)
   }

   const handleCancel = () => onCancel(false)

   return (
      <Modal
         open={open}
         onOk={handleOk}
         onCancel={handleCancel}
         okText="Confirm"
         cancelText="Cancel"
      >
         <h3>
            Are you sure you want to {isDisabling ? "disable" : "enable"}{" "}
            this category?
         </h3>
         <p>{category.name}</p>
      </Modal>
   )
}

export default CategoryConfirmStatusChangeModal