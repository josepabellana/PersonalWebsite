import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <h1 className={styles.title}>
              <span className={styles.name}>Josep Abellana</span>
          </h1>
          <p className={styles.disclaimer}>Work in progress...</p>
        <Image
          className={styles.logo}
          src="/profile-BN-closer.png"
          alt="Josep"
          width={480}
          height={408}
          priority
        />
      </main>
      <footer className={styles.footer}>
        <Link href="/experience" passHref>
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            What I do
        </Link>
        <Link href="/blog" passHref>
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Blog
        </Link>
        <Link href="/finance" passHref>
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Finance
        </Link>
      </footer>
    </div>
  );
}
