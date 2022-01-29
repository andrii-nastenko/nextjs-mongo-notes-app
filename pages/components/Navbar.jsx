import styles from '../../styles/Navbar.module.scss';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setPageNumber } from '../../redux/notesReducer';
import { useRouter } from 'next/router';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const paginationHandler = async (page) => {
    dispatch(setPageNumber(page));
    await router.push(`?page=${page}`);
  };

  return (
    <nav className={styles.container}>
      <Link href={'/?page=1'}>
        <a onClick={() => paginationHandler(1)}>Notes</a>
      </Link>
      <Link href={'/new'}>
        <a>Create Note</a>
      </Link>
    </nav>
  );
}
