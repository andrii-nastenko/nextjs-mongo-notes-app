import styles from '../styles/Index.module.scss';
import Layout from "./components/Layout";
import {getNotesApi} from "../api/notes";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNotes} from "../redux/appReducer";
import {Spin, Card, Button} from "antd";

export default function Index({notes}) {
    const isFetching = useSelector(state => state.app.isFetching)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!notes.length) {
            dispatch(getNotes())
        }
    }, [notes])

    return (
        <Layout title={'Notes'}>
            <Spin tip="Loading..." size="large" spinning={isFetching}>
                <div className={styles.container}>
                    {notes.map(n => {
                        return (
                            <Card key={n._id} title={n.title}
                                  actions={[
                                      <Button type="primary">View</Button>,
                                      <Button type="primary">Edit</Button>
                                  ]}
                            >
                                <p>{n.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </Spin>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const notes = await getNotesApi()
    return {props: {notes}}
}