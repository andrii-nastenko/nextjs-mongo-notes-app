import styles from '../styles/Index.module.scss';
import Layout from "./components/Layout";
import {getNotesApi} from "../api/notes";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNotes} from "../redux/appReducer";
import {Card, Button} from "antd";

export default function Index({notes}) {
    const state = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setNotes(notes))
    }, [JSON.stringify(notes)])

    return (
        <Layout title={'Notes'}>
            <div className={styles.container}>
                {state.notes.map(n => {
                    return (
                        <Card key={n._id} title={n.title} hoverable
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
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const notes = await getNotesApi()
    return {props: {notes}}
}