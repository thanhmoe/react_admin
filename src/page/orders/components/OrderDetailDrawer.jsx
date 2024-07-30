import { Button, Col, Divider, Drawer, Row, Space, Tag } from "antd";
import { useEffect, useState } from "react"
import { fetchOrderDetails } from "../../../services/order_services";

import { getFormattedDate, getFormattedTime, formatISODate } from "../../../utils/date_utils";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DropboxOutlined, SyncOutlined } from "@ant-design/icons";

const DescriptionItem = ({ title, content }) => (
   <Space>
      <p className="text-sm">{title}: {content}</p>
   </Space>
);

const TableRow = ({ orderItem, indexNumber }) => {
   return (
      <tr>
         <td className="border border-slate-600 p-2">{indexNumber}</td>
         <td className="border border-slate-600 p-2">{orderItem.product_id}</td>
         <td className="border border-slate-600 p-2 whitespace-nowrap">
            <img
               className="w-32 h-32 object-contain"
               src={orderItem.product_image}
               alt=""
            />
         </td>
         <td className="border border-slate-600 p-2 text-left text-ellipsis">
            {orderItem.product_name}
         </td>
         <td className="border border-slate-600 p-2 flex-1 text-right">
            {orderItem.quantity}
         </td>
         <td className="border border-slate-600 p-2 flex-1 text-right">
            {orderItem.price}
         </td>
         <td className="border border-slate-600 p-2 flex-1 text-right">
            {orderItem.quantity * orderItem.price}
         </td>
      </tr>
   )
}

const OrderDetailDrawer = ({ open, onCancel, orderId }) => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null)
   const [orderDetail, setOrderDetail] = useState({})
   const [listOrderItemRows, setListOrderItemRows] = useState([]);
   const [statusColor, setStatusColor] = useState(null)
   const [statusIcon, setStatusIcon] = useState(null)

   useEffect(() => {
      if (open)
         fetchOrderDetail(orderId)
   }, [open])

   const fetchOrderDetail = async (id) => {
      setLoading(true)

      const response = await fetchOrderDetails(id);
      if (response.success && response.order) {
         setOrderDetail(response.order)
         setLoading(false)

         const rows = response.order.products.map((each, index) => (
            <TableRow key={each.product_id} indexNumber={index + 1} orderItem={each} />
         ));
         setListOrderItemRows(rows);
      } else {
         setError(response.error)
      }
   }

   useEffect(() => {
      switch (orderDetail.status) {
         case "pending":
            setStatusColor("default")
            setStatusIcon(<ClockCircleOutlined />)
            break;
         case "processing":
            setStatusColor("processing")
            setStatusIcon(<DropboxOutlined />)
            break;
         case "shipping":
            setStatusColor("cyan")
            setStatusIcon(<SyncOutlined spin />)
            break;
         case "delivered":
            setStatusColor("success");
            setStatusIcon(<CheckCircleOutlined />)
            break;
         case "cancelled":
            setStatusColor("error")
            setStatusIcon(<CloseCircleOutlined />)
            break;
      }
   }, [orderDetail])

   const handleCancel = () => {
      onCancel(false)
   }

   const handleOrderCancel = () => { }
   const handleOrderConfirm = () => { }

   return (
      <>
         <Drawer
            width={800}
            placement="right"
            title={`Order Detail: ${orderDetail.order_id}`}
            destroyOnClose
            loading={loading}
            closable
            onClose={handleCancel}
            open={open}
            extra={
               <Space>
                  {
                     orderDetail.status === "pending" ? (
                        <>
                           <Button type="primary" danger onClick={handleOrderCancel}>
                              Cancel
                           </Button>
                           <Button
                              className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white"
                              onClick={handleOrderConfirm}
                           >
                              Confirm
                           </Button>
                        </>
                     ) : orderDetail.status === "processing" ? (
                        <Button onClick={handleOrderCancel}>
                           Cancel
                        </Button>
                     ) : null
                  }
               </Space>
            }
         >
            <Space>
               <p className="text-lg">
                  Order Detail
               </p>
               <Tag color={statusColor} icon={statusIcon}>{orderDetail.status}</Tag>
            </Space>
            <Row className="mt-2">
               <Col span={12}>
                  <DescriptionItem title="Receiver" content={orderDetail.customer_name} />
               </Col>
               <Col span={12}>
                  <DescriptionItem title="Phone Number" content={orderDetail.phone_number} />
               </Col>
            </Row>
            <Row className="mt-2">
               <Col span={12}>
                  <DescriptionItem title="Total Amount" content={`${orderDetail.total_amount} $`} />
               </Col>
               <Col span={12}>
                  <DescriptionItem title="Ordered At" content={`${getFormattedDate(orderDetail.create_at)} ${getFormattedTime(orderDetail.create_at)}`} />
               </Col>
            </Row>
            <Row className="mt-2">
               <Col span={24}>
                  <DescriptionItem
                     title="Address"
                     content={`${orderDetail.address_detail} - ${orderDetail.commune_ward} - ${orderDetail.district} - ${orderDetail.province_city}`}
                  />
               </Col>
            </Row>
            <Row className="my-2">
               <Col span={24}>
                  <DescriptionItem
                     title="Note"
                     content={orderDetail.note}
                  />
               </Col>
            </Row>
            <table className="min-w-full divide-y divide-gray-500 border table-auto">
               <thead className="bg-green-300 divide-y">
                  <tr>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">No</th>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Unit Price ($)</th>
                     <th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total ($)</th>
                  </tr>
               </thead>
               <tbody>
                  {listOrderItemRows}
               </tbody>
            </table>
         </Drawer>
      </>
   )
}

export default OrderDetailDrawer