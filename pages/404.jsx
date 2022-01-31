import styles from '../styles/404.module.scss';
import Layout from './components/Layout';
import Link from 'next/link';
import { setPageNumber } from '../redux/notesReducer';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Custom404() {
  const dispatch = useDispatch();
  const router = useRouter();

  const paginationHandler = async (page) => {
    dispatch(setPageNumber(page));
    await router.push(`?page=${page}`);
  };

  return (
    <Layout title={'Notes | 404'}>
      <div className={styles.container}>
        <p>404 - Page Not Found</p>
        <Link href={'/?page=1'}>
          <a onClick={() => paginationHandler(1)}>Back to home page</a>
        </Link>
      </div>
    </Layout>
  );
}
