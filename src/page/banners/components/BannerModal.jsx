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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
};

const BannerModal = ({ open, onCancel, onSubmit, banner }) => {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (banner) {
                form.setFieldsValue({
                    title: banner.title,
                    descriptions: banner.descriptions,
                    product_id: banner.product_id,
                });
            } else {
                form.resetFields();
                setFileList([]);
            }
        }
    }, [open]);

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

    return (
        <Modal
            open={open}
            title={!banner ? "Add a new banner" : "Update banner"}
            style={{ top: 100 }}
            width={1000}
            cancelText="Cancel"
            onCancel={handleCancel}
            okText={!banner ? "Create" : "Confirm"}
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
                    <Input />
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
