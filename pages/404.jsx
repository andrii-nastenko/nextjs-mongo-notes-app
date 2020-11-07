import styles from '../styles/404.module.scss';
import Layout from "./components/Layout";
import Link from "next/link";

export default function Custom404() {
    return (
        <Layout title={'Notes | 404'}>
            <div className={styles.container}>
                <p>404 - Page Not Found</p>
                <Link href={'/'}>
                    <a>Back to home page</a>
                </Link>
            </div>
        </Layout>
    )
}