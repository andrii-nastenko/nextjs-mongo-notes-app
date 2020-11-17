import styles from '../../styles/Edit.module.scss';
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input} from "antd";
import {getNotesApi, getSingleNoteApi} from "../../api/notes";
import {updateNote} from "../../redux/notesReducer";
import {useRouter} from "next/router";

export default function Edit({note}) {
    const state = useSelector(state => state.notes)
    const dispatch = useDispatch()
    const router = useRouter()

    const onFinish = async (note) => {
        const id = router.query.id
        const res = await dispatch(updateNote(id, note))
        if (res && res.success) {
            router.push('/')
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
        <Layout title={'Notes | Edit Note'}>
            <div className={styles.container}>
                <h1>Edit Note</h1>
                <Form onFinish={onFinish} validateMessages={validateMessages} layout={'vertical'}
                      initialValues={note.data}
                >
                    <Form.Item name={'title'} label="Title" rules={[{required: true, max: 30}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'description'} label="Description" rules={[{required: true, max: 250}]}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={state.isUpdatingInProcess}>Update</Button>
                </Form>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({query: {id}}) {
    const note = await getSingleNoteApi(id)
    return {props: {note}}
}

// export async function getStaticPaths() {
//     const notes = await getNotesApi()
//     const paths = notes.data.map(note => `/${note._id}/edit`)
//     return {paths, fallback: false}
// }
//
// export async function getStaticProps({params: {id}}) {
//     const note = await getSingleNoteApi(id)
//     return {props: {note}}
// }

