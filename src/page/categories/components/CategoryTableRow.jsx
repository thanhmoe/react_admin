import { Button, Space } from "antd"
import { useState } from "react"
import CategoryModal from "./CategoryModal"
import { formatISODate } from "../../../utils/date_utils"

const CategoryTableRow = ({ category }) => {
   const [openConfirmModal, setOpenConfirmModal] = useState(false)
   const [openUpdateModal, setOpenUpdateModal] = useState(false)

   return (
      <>
         <tr>
            <td className="border border-slate-600 p-2 text-left text-ellipsis">{category.name}</td>
            <td className="border border-slate-600 p-2 text-left text-ellipsis">{category.description}</td>
            <td className="border border-slate-600 p-2 text-left text-ellipsis">{formatISODate(category.create_at)}</td>
            <td className="border border-slate-600 p-2 text-left text-ellipsis">{formatISODate(category.modify_at)}</td>
            <td className="border border-slate-600 p-2 flex-1 text-right">
               <Space>
                  <Button
                     className="bg-transparent border !border-yellow-600 text-yellow-600 hover:!bg-yellow-600 hover:!text-white"
                     onClick={() => setOpenUpdateModal(true)}
                  >
                     Edit
                  </Button>
                  {category.is_active ? (
                     <Button
                        className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white"
                        onClick={() => setOpenConfirmModal(true)}
                     >
                        Disable
                     </Button>
                  ) : (
                     <Button
                        className="bg-transparent border !border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white"
                        onClick={() => setOpenConfirmModal(true)}
                     >
                        Enable
                     </Button>
                  )}
               </Space>
            </td>
         </tr>
         <CategoryModal
            key={category.id}
            open={openUpdateModal}
            onCancel={() => setOpenUpdateModal(false)}
            category={category}
         />
      </>
   )
}

export default CategoryTableRow