import styles from '../styles/New.module.scss';
import Layout from "./components/Layout";

export default function New() {
    return (
        <Layout title={'Notes | Create Note'}>
            <div className={styles.container}>
                <p>Create New Note</p>
            </div>
        </Layout>
    )
}