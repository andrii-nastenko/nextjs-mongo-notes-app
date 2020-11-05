import styles from '../../styles/Navbar.module.scss';
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className={styles.container}>
            <Link href={'/'}>
                <a>Notes</a>
            </Link>
            <Link href={'/new'}>
                <a>Create note</a>
            </Link>
        </nav>
    )
}