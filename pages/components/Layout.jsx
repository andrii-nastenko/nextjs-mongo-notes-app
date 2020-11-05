import Head from 'next/head';
import Navbar from "./Navbar";
import styles from '../../styles/Layout.module.scss';

export default function Layout({children, title}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar/>
            {children}
        </div>
    )
}