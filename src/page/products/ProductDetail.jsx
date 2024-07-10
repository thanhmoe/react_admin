import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CountUp from "react-countup"

import {
	Card,
	Descriptions,
	Image,
	Button,
	Space,
	message,
	Divider,
	Badge,
	Row,
	Col,
	Statistic,
	Tag,
} from "antd"

import {
	EditOutlined,
	ArrowLeftOutlined,
	StopTwoTone,
	CheckCircleTwoTone,
	LikeOutlined,
	DislikeOutlined,
} from "@ant-design/icons"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { fetchProductDetail } from "../../services/product_services"

import ProductModal from "./components/ProductModal"
import ProductConfirmStatusChangeModal from "./components/ProductConfirmStatusChangeModal"

import { getFormattedDate, getFormattedTime } from "../../utils/date_utils"

const formatter = (value) => <CountUp end={value} separator="," />
function generateMonthlyData() {
	const data = []

	for (let month = 1; month <= 12; month++) {
		const revenue = parseFloat((Math.random() * 10000).toFixed(2)) // Random revenue between 0 and 10000
		const units = Math.floor(Math.random() * 1000) // Random units between 0 and 999

		data.push({
			month,
			revenue,
			units
		})
	}

	return data
}
const data = generateMonthlyData()

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
								column={2}
							>
								<Descriptions.Item label="ID">
									{product.id}
								</Descriptions.Item>
								<Descriptions.Item label="Price">
									$ {product.price}
								</Descriptions.Item>
								<Descriptions.Item label="Reaction">
									<Space direction="vertical" size={"small"}>
										<Tag icon={<LikeOutlined />} color="processing">
											{product.like_count}
										</Tag>
										<Tag icon={<DislikeOutlined />} color="error">
											{product.dislike_count}
										</Tag>
									</Space>
								</Descriptions.Item>
								<Descriptions.Item label="In Stock">
									{product.quantity_in_stock}
								</Descriptions.Item>
								<Descriptions.Item label="Date Added" >
									{`${getFormattedDate(product.create_at)} ${getFormattedTime(product.create_at)}`}
								</Descriptions.Item>
								<Descriptions.Item label="Categories" span={2}>
									{
										product.categories.map(
											(cat) => <div key={cat.id}>
												<Badge status="default" text={cat.name} />
											</div>
										)
									}
								</Descriptions.Item>
								<Descriptions.Item label="Description" span={2}>
									{product.description}
								</Descriptions.Item>
							</Descriptions>
						</Badge.Ribbon>
					</div>
				</Card>
				<Divider />
				<div style={{ width: "100%" }}>
					<Row gutter={16}>
						<Col span={16}>
							<Card title="Monthly revenue & sale units">
								<ResponsiveContainer width="100%" height={400}>
									<BarChart
										width={500}
										height={300}
										data={data}
										margin={{
											top: 5,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis yAxisId={"left"} stroke="#8884d8" />
										<YAxis yAxisId={"right"} orientation="right" stroke="#82ca9d" />
										<Tooltip />
										<Legend />
										<Bar yAxisId={"left"} type="monotone" dataKey="revenue" fill="#8884d8" activeDot={{ r: 8 }} />
										<Bar yAxisId={"right"} type="monotone" dataKey="units" fill="#82ca9d" />
									</BarChart>
								</ResponsiveContainer>
							</Card>
						</Col>
						<Col span={8}>
							<Space direction="vertical" size={"large"}>
								<Statistic title="Total revenue" value={194847} formatter={formatter} />
								<Statistic title="Total units" value={19447} formatter={formatter} />
							</Space>
						</Col>
					</Row>
				</div>
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
