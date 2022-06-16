import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.scss';
import utilStyles from '../styles/index.module.css';
import Link from 'next/link';
import SearchField from './search-field/search-field.component';

export const siteTitle = 'Radio Stream #1 in the World';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="description"
            content="Тестовое задание - каталог радиостанций"
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
            <SearchField />
        </header>
        <main>{children}</main>
    </div>
  );
}