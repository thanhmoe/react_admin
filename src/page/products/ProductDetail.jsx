import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
	Card,
	Descriptions,
	Tabs,
	Image,
	Button,
	Space,
	message,
	Divider,
	Badge,
} from "antd"
import {
	EditOutlined,
	ArrowLeftOutlined,
	StopTwoTone,
	CheckCircleTwoTone,
} from "@ant-design/icons"

import { fetchProductDetail } from "../../services/product_services"

import ProductModal from "./components/ProductModal"
import ProductConfirmStatusChangeModal from "./components/ProductConfirmStatusChangeModal"

import { formatISODate, getFormattedDate, getFormattedTime } from "../../utils/date_utils"

const ProductDetailPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [open, setOpen] = useState(false)
	const [reloadPage, setReloadPage] = useState(false)
	const [openConfirmModal, setOpenConfirmModal] = useState(false)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetchProductDetail(id)
				if (response.success) {
					setProduct(response.data[0])
				} else {
					message.error("Failed to fetch product details.")
				}
			} catch (error) {
				message.error(
					"An error occurred while fetching product details."
				)
			} finally {
				setLoading(false)
				setReloadPage(false)
			}
		}
		fetchProduct()
	}, [reloadPage])

	const handleOpenConfirmModal = () => setOpenConfirmModal(true)

	const handleCancelUpdateModal = () => setOpen(false)

	const handleOpenUpdateModal = () => setOpen(true)

	const handleCancelConfirmModal = (reloadingPage) => {
		if (reloadingPage) setReloadPage()
		setOpenConfirmModal(false)
	}

	const handleBack = () => navigate(-1)

	if (loading) return <div>Loading...</div>

	return (
		<>
			<div className="product-detail-page p-4">
				<div className="header flex justify-between items-center mb-4">
					<h1 className="text-2xl font-semibold">Product Details</h1>
					<Space>
						<Button
							icon={<ArrowLeftOutlined />}
							onClick={handleBack}
						>
							Back
						</Button>
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={handleOpenUpdateModal}
						>
							Edit Product
						</Button>
						<Button
							type="danger"
							icon={
								Boolean(product.is_active) ? (
									<StopTwoTone />
								) : (
									<CheckCircleTwoTone />
								)
							}
							onClick={handleOpenConfirmModal}
						>
							{Boolean(product.is_active) ? "Disable" : "Enable"}
						</Button>
					</Space>
				</div>

				<Card>
					<div className="product-info flex">
						<div className="mr-8">
							<Image
								width={300}
								height={300}
								src={product.image_path}
								alt={product.name}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<Badge.Ribbon text={Boolean(product.is_active) ? "Enable" : "Disable"} color={Boolean(product.is_active) ? "green" : "red"}>
							<Descriptions
								title={product.name}
								layout="horizontal"
								bordered
							>
								<Descriptions.Item label="ID">
									{product.id}
								</Descriptions.Item>
								<Descriptions.Item label="Price">
									$ {product.price}
								</Descriptions.Item>
								<Descriptions.Item label="In Stock">
									{product.quantity_in_stock}
								</Descriptions.Item>
								<Descriptions.Item label="Date Added" >
									{`${getFormattedDate(product.create_at)} ${getFormattedTime(product.create_at)}`}
								</Descriptions.Item>
								<Descriptions.Item label="Categories" span={3}>
									{
										product.categories.map(
											(cat) => <div>
												<Badge status="default" text={cat.name} />
											</div>
										)
									}
								</Descriptions.Item>
								<Descriptions.Item label="Description" span={3}>
									{product.description}
								</Descriptions.Item>
							</Descriptions>
						</Badge.Ribbon>
					</div>
				</Card>
				<Divider />
				<Tabs
					className="mt-4"
					centered
					items={[{ key: 1, label: "Sale data" }]}
				/>
			</div>
			<ProductModal
				open={open}
				product={product}
				onCancel={handleCancelUpdateModal}
			/>
			<ProductConfirmStatusChangeModal
				open={openConfirmModal}
				product={product}
				onCancel={handleCancelConfirmModal}
			/>
		</>
	)
}

export default ProductDetailPage
