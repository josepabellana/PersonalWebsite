import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome!</h1>
        <h3>Site in progress...</h3>
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
        <a
          href="/experience"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          What I do
        </a>
        <a
          href="/blog"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Blog
        </a>
        <a
          href="/finance"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Finance
        </a>
      </footer>
    </div>
  );
}
