import Head from 'next/head';
import Navbar from "./Navbar";
import styles from '../../styles/Layout.module.scss';
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {setIsFetching} from "../../redux/notesReducer";
import {Spin} from "antd";
import ScrollToTop from "react-scroll-to-top";

export default function Layout({children, title}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.notes)

    useEffect(() => {
        router.events.on("routeChangeStart", () => dispatch(setIsFetching(true)))
        router.events.on("routeChangeComplete", () => dispatch(setIsFetching(false)))
        router.events.on("routeChangeError", () => dispatch(setIsFetching(false)))
        return () => {
            router.events.off("routeChangeStart", () => dispatch(setIsFetching(true)))
            router.events.off("routeChangeComplete", () => dispatch(setIsFetching(false)))
            router.events.off("routeChangeError", () => dispatch(setIsFetching(false)))
        }
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar/>
            <Spin size="large" spinning={state.isFetching}>
                {children}
            </Spin>
            <ScrollToTop top={400} smooth/>
        </div>
    )
}