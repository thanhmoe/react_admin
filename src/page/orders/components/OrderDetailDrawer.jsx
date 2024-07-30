import { Button, Drawer } from "antd";
import { useState } from "react"


const OrderDetailDrawer = ({ order, open, onCancel }) => {
   const [loading, setLoading] = useState(true);

   const handleCancel = () => {
      onCancel(false)
   }

   return (
      <>
         <Drawer
            closable
            destroyOnClose
            title="Order Detail"
            placement="right"
            open={open}
            loading={loading}
            onClose={handleCancel}
         >

         </Drawer>
      </>
   )
}

export default OrderDetailDrawer