import React from 'react';
import { Modal, Descriptions } from 'antd';

export default function CustomerModal({ open, onClose, customer }) {
    return (
        <Modal
            title="Customer Details"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            {customer ? (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
                    <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{customer.gender}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">{new Date(customer.dob).toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{customer.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="Is Active">{customer.is_active ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Create At">{new Date(customer.create_at).toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="Modify At">{new Date(customer.modify_at).toLocaleDateString()}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>No customer data available</p>
            )}
        </Modal>
    );
}
