import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Notes</title>
            </Head>
            <p>Notes</p>
        </div>
    )
}