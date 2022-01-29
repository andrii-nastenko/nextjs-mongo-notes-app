import styles from '../styles/Index.module.scss';
import Layout from './components/Layout';
import { api } from '../api/notes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, setIsModalVisible, setNotes, setPageNumber } from '../redux/notesReducer';
import { Card, Button, Pagination } from 'antd';
import Link from 'next/link';
import CustomModal from './components/CustomModal';
import { useRouter } from 'next/router';

export default function Index({ notes }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const [deleteId, setDeleteId] = useState('');

  const deleteNoteHandler = () => {
    dispatch(deleteNote(deleteId));
  };

  const paginationHandler = async (page) => {
    dispatch(setPageNumber(page));
    await router.push(`?page=${page}`);
  };

  useEffect(() => {
    if (notes.success) {
      dispatch(setNotes(notes.data.notes, notes.data.totalCount));
    }
  }, [dispatch, JSON.stringify(notes)]);

  useEffect(() => {
    if (router.query.page) {
      dispatch(setPageNumber(Number(router.query.page)));
    }
  }, [dispatch]);

  return (
    <Layout title={'Notes'}>
      <CustomModal
        title={'Delete note?'}
        isVisible={state.isModalVisible}
        handleOk={() => {
          deleteNoteHandler();
          dispatch(setIsModalVisible(false));
        }}
        handleCancel={() => dispatch(setIsModalVisible(false))}
      />
      <div className={styles.container}>
        {state.totalCount >= 1 ? (
          state.notes.map((note) => {
            return (
              <Card
                key={note._id}
                title={note.title}
                actions={[
                  <Link href={`${note._id}/edit`}>
                    <Button type="primary">Edit</Button>
                  </Link>,
                  <Button
                    type={'danger'}
                    onClick={() => {
                      dispatch(setIsModalVisible(true));
                      setDeleteId(note._id);
                    }}
                    loading={state.isDeletingInProcess.some((id) => id === note._id)}
                  >
                    Delete
                  </Button>
                ]}
              >
                <p>{note.description}</p>
              </Card>
            );
          })
        ) : (
          <div className={styles.noNotes}>
            <p>There are no notes yet!</p>
            <Link href={'/new'}>
              <a>Create new note!</a>
            </Link>
          </div>
        )}
        {!state.notes.length && state.pageNumber > 1 && (
          <div className={styles.noNotes}>
            <p>No notes on this page</p>
            <Link href={'/'}>
              <a onClick={() => paginationHandler(1)}>Back to home</a>
            </Link>
          </div>
        )}
      </div>
      <Pagination
        defaultCurrent={1}
        current={state.pageNumber}
        total={state.totalCount}
        onChange={paginationHandler}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page } }) {
  const notes = await api.getNotes({ page });
  return { props: { notes } };
}

// export async function getStaticProps () {
//     const notes = await getNotesApi()
//     return {props: {notes}}
// }
