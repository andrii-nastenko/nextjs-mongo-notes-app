import styles from '../styles/Index.module.scss';
import Layout from "./components/Layout";
import {getNotesApi} from "../api/notes";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote, setIsModalVisible, setNotes, setPageNumber} from "../redux/notesReducer";
import {Card, Button, Pagination} from "antd";
import Link from "next/link";
import CustomModal from "./components/CustomModal";
import {useRouter} from "next/router";

export default function Index({notes}) {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const router = useRouter()

    const [deleteId, setDeleteId] = useState('')

    const deleteNoteHandler = () => {
        dispatch(deleteNote(deleteId))
    }

    const paginationHandler = (page) => {
        router.push(`?page=${page}`)
        dispatch(setPageNumber(page))
    }

    useEffect(() => {
        if (notes.success) {
            dispatch(setNotes(notes.data.notes, notes.data.totalCount))
        }
    }, [dispatch, JSON.stringify(notes)])

    useEffect(() => {
        if (router.query.page) {
            dispatch(setPageNumber(Number(router.query.page)))
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
            <Pagination defaultCurrent={1} current={state.pageNumber} total={state.totalCount}
                        onChange={paginationHandler}/>
        </Layout>
    )
}

export async function getServerSideProps({query: {page}}) {
    const notes = await getNotesApi({page})
    return {props: {notes}}
}

// export async function getStaticProps () {
//     const notes = await getNotesApi()
//     return {props: {notes}}
// }