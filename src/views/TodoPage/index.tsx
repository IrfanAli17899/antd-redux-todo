import React, { useEffect, useRef } from 'react'
import { Button, Col, Row, Space, Table } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import TodoModal, { TodoModalRef } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { ITodo } from '../../types';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../../api/todos';


export default function TodoPage() {
    const todoModal = useRef<TodoModalRef>(null);
    const todos = useAppSelector(store => store.todos.data);
    const loading = useAppSelector(store => store.todos.loading);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodos());
    }, [])

    const onTodoSubmit = async (todo: Partial<ITodo>) => {
        const handler = (todo.id && todo.id > -1) ? updateTodo : addTodo;
        await dispatch(handler(todo));
    }

    return (
        <div>
            <Space style={{ width: '100%' }} direction='vertical'>
                <Row>
                    <Col span={24}>
                        <Button onClick={() => todoModal.current?.openModal()}>
                            + Add Todo
                        </Button>
                    </Col>
                </Row>
                <Table
                    loading={loading}
                    columns={[
                        {
                            title: 'ID',
                            dataIndex: 'id',
                            key: 'id',
                        },
                        {
                            title: 'Title',
                            dataIndex: 'title',
                            key: 'title',
                        },
                        {
                            title: 'Description',
                            dataIndex: 'description',
                            key: 'description',
                        },
                        {
                            title: 'Completed',
                            render: (todo: ITodo) => {
                                return (
                                    todo.is_completed ? <CheckOutlined /> : '----'
                                )
                            }
                        },
                        {
                            title: '',
                            render: (todo: ITodo) => {
                                return (
                                    <Space>
                                        <Button onClick={() => todoModal.current?.openModal(todo)}>Edit</Button>
                                        <Button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>
                                    </Space>)
                            }
                        }

                    ]}
                    rowKey={(row) => row.id}
                    dataSource={todos}
                />
            </Space>
            <TodoModal onSubmit={onTodoSubmit} ref={todoModal} />
        </div>
    )
}
