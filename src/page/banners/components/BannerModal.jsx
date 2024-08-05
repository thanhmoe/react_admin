import { useState, useEffect } from "react";
import {
    Modal,
    Form,
    Input,
    Upload,
    Button,
    message,
    Row,
    Col,
    Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { fetchProducts } from "../../../services/product_services";

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
};

const BannerModal = ({ open, onCancel, onSubmit, banner }) => {
    const [fileList, setFileList] = useState([]);
    const [products, setProducts] = useState([]);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(6);
    const [sortOption, setSortOption] = ("create_at");
    const [sortOrder, setSortOrder] = ("DESC")

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        onCancel();
    };

    const handleOk = async () => {
        form.validateFields()
            .then(async (values) => {
                values.image = values.image ? values.image[0].originFileObj : null;
                await onSubmit(values);
            })
            .catch((info) => { });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchProducts({
                page: currentPage,
                limit: itemsPerPage,
            });
            if (response.success) {
                setProducts(response.products.map(product => ({
                    label: product.name,
                    value: product.id
                })));
            } else {
                message.error("Failed to fetch products");
            }
        };

        if (open) {
            fetchData();
        }
    }, [open]);

    return (
        <Modal
            open={open}
            title={"Add a new banner"}
            style={{ top: 100 }}
            width={1000}
            cancelText="Cancel"
            onCancel={handleCancel}
            okText={"Create"}
            onOk={handleOk}
        >
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                style={{ width: "100%" }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "Please input the title!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: "Please input the description!",
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="product_id"
                    label="Product ID"
                >
                    <Select
                        options={products}
                        placeholder="Select a product"
                    />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="image"
                            label="Image"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: !banner ? true : false,
                                    message: "Banner image is required!",
                                },
                            ]}
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
                                        background: "none",
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
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default BannerModal;
