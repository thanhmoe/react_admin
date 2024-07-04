import { Modal } from "antd";
import { useState } from "react";

const DisableProductModal = ({ product, open, onCancel }) => {


   const handleOk = () => {
      // setOpen(false);
      // Call the onConfirm callback to perform the disable action
      // onConfirm();
   };

   const handleCancel = () => {
      onCancel(false);
   };

   return (
      <Modal
         title="Disable Product"
         open={open}
         onOk={handleOk}
         onCancel={handleCancel}
         okText="Confirm"
         cancelText="Cancel"
      >
         <h3>Are you sure you want to disable this product?</h3>
         <p>{product.name}</p>
      </Modal>
   );
};

export default DisableProductModal;