import { Form, Modal, Input, Button, Checkbox } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { ITodo } from '../../../types';

export interface TodoModalProps {
    onSubmit: (todo: Partial<ITodo>) => Promise<void>
}

export interface TodoModalRef {
    openModal: (todo?: ITodo) => void
}

function TodoModal({ onSubmit }: TodoModalProps, ref: Ref<TodoModalRef>) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    const [id, setId] = useState(-1);

    const isEditMode = id > -1;

    const onCancel = () => {
        form.resetFields();
        setId(-1);
        setOpen(false);
        setLoading(false);
    }

    useImperativeHandle(ref, () => ({
        openModal: (todo?: ITodo) => {
            if (todo) {
                form.setFieldsValue({
                    is_completed: todo?.is_completed,
                    title: todo?.title,
                    description: todo?.description,
                })
                setId(todo.id);
            }

            setOpen(true);
        }
    }))

    const onFinish = async (values: Partial<ITodo>) => {
        try {
            setLoading(true);
            if (isEditMode) {
                values.id = id;
            }
            await onSubmit(values);
            onCancel();
        } catch {
            //
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title={isEditMode ? 'Edit Todo' : 'Add Todo'}
            confirmLoading={loading}
            open={open}
            onOk={() => form.submit()}
            okText={isEditMode ? 'Update' : 'Submit'}
            onCancel={onCancel}
        >
            <Form
                form={form}
                name="basic"
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your todo title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input todo description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name="is_completed" valuePropName="checked">
                    <Checkbox>Completed</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default forwardRef(TodoModal)