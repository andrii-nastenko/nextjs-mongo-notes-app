import styles from '../styles/New.module.scss';
import Layout from './components/Layout';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../redux/notesReducer';
import { useRouter } from 'next/router';

export default function New() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (note) => {
    const res = await dispatch(createNote(note));
    if (res && res.success) {
      await router.push(`/?page=${state.pageNumber}`);
    }
  };

  const validateMessages = {
    required: '${label} is required!',
    max: {
      title: '${label} cannot be longer than 30 characters!',
      description: '${label} cannot be longer than 250 characters!'
    }
  };

  return (
    <Layout title={'Notes | Create Note'}>
      <div className={styles.container}>
        <h1>Create New Note</h1>
        <Form onFinish={onFinish} validateMessages={validateMessages} layout={'vertical'}>
          <Form.Item name={'title'} label="Title" rules={[{ required: true, max: 30 }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={'description'}
            label="Description"
            rules={[{ required: false, max: 250 }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={state.isCreatingInProcess}>
            Create
          </Button>
        </Form>
      </div>
    </Layout>
  );
}
