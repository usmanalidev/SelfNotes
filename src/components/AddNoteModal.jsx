import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddNoteModal = ({ visible, onCancel, onSave, categories, editingNote }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editingNote) {
        form.setFieldsValue({
          category: editingNote.category,
          question: editingNote.question,
          answer: editingNote.answer
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingNote, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave({
        ...values,
        id: editingNote ? editingNote.id : Date.now()
      });
      form.resetFields();
      message.success(editingNote ? 'Note updated successfully!' : 'Note added successfully!');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: '18px', fontWeight: 600 }}>
          {editingNote ? 'Edit Note' : 'Add New Note'}
        </span>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSubmit}
        >
          {editingNote ? 'Update' : 'Save'}
        </Button>
      ]}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="category"
          label={<span style={{ fontWeight: 500 }}>Category</span>}
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select
            placeholder="Select a category"
            size="large"
            style={{ width: '100%' }}
          >
            {categories.map(cat => (
              <Option key={cat.key} value={cat.key}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="question"
          label={<span style={{ fontWeight: 500 }}>Question</span>}
          rules={[
            { required: true, message: 'Please enter a question' },
            { min: 5, message: 'Question must be at least 5 characters' }
          ]}
        >
          <Input
            placeholder="Enter your question..."
            size="large"
            style={{ borderRadius: '6px' }}
          />
        </Form.Item>

        <Form.Item
          name="answer"
          label={<span style={{ fontWeight: 500 }}>Answer</span>}
          rules={[
            { required: true, message: 'Please enter an answer' },
            { min: 10, message: 'Answer must be at least 10 characters' }
          ]}
        >
          <TextArea
            placeholder="Enter your answer... (You can use **bold** for emphasis and ```code``` for code blocks)"
            rows={8}
            size="large"
            style={{ borderRadius: '6px' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;

