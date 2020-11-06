import styles from '../styles/New.module.scss';
import Layout from "./components/Layout";
import {Form, Input, Button} from "antd";
import {useDispatch} from "react-redux";
import {createNote} from "../redux/notesReducer";

export default function New() {
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const onFinish = async (note) => {
        const res = await dispatch(createNote(note))
        if (res && res.success) {
            form.resetFields()
        }
    }

    const validateMessages = {
        required: '${label} is required!',
        max: {
            title: '${label} cannot be longer than 30 characters!',
            description: '${label} cannot be longer than 250 characters!',
        }
    }

    return (
        <Layout title={'Notes | Create Note'}>
            <div className={styles.container}>
                <Form form={form} onFinish={onFinish} validateMessages={validateMessages} layout={'vertical'}>
                    <Form.Item name={'title'} label="Title" rules={[{required: true, max: 30}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'description'} label="Description" rules={[{required: true, max: 250}]}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form>
            </div>
        </Layout>
    )
}