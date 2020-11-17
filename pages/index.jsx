import styles from '../styles/Index.module.scss';
import Layout from "./components/Layout";
import {getNotesApi} from "../api/notes";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote, setIsModalVisible, setNotes} from "../redux/notesReducer";
import {Card, Button} from "antd";
import Link from "next/link";
import CustomModal from "./components/CustomModal";

export default function Index({notes}) {
    const state = useSelector(state => state.notes)
    const dispatch = useDispatch()

    const [deleteId, setDeleteId] = useState('')

    const deleteNoteHandler = () => {
        dispatch(deleteNote(deleteId))
    }

    useEffect(() => {
        if (notes.success) {
            dispatch(setNotes(notes.data))
        }
    }, [dispatch])

    return (
        <Layout title={'Notes'}>
            <CustomModal
                title={'Delete this note?'}
                isVisible={state.isModalVisible}
                handleOk={() => {
                    deleteNoteHandler()
                    dispatch(setIsModalVisible(false))
                }}
                handleCancel={() => dispatch(setIsModalVisible(false))}
            />
            <div className={styles.container}>
                {state.notes.length
                    ? state.notes.map(note => {
                        return (
                            <Card key={note._id} title={note.title}
                                  actions={[
                                      <Link href={`${note._id}/edit`}>
                                          <Button type="primary">Edit</Button>
                                      </Link>,
                                      <Button type={'danger'} onClick={() => {
                                          dispatch(setIsModalVisible(true))
                                          setDeleteId(note._id)
                                      }} loading={state.isDeletingInProcess.some(id => id === note._id)}
                                      >Delete
                                      </Button>
                                  ]}
                            >
                                <p>{note.description}</p>
                            </Card>
                        )
                    })
                    : <div className={styles.noNotes}>
                        <p>There are no notes yet :)</p>
                        <Link href={'/new'}>
                            <a>Create new note!</a>
                        </Link>
                    </div>
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const notes = await getNotesApi()
    return {props: {notes}}
}

// export async function getStaticProps () {
//     const notes = await getNotesApi()
//     return {props: {notes}}
// }