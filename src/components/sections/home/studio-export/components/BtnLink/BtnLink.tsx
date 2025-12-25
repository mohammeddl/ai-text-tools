"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";
import styles from "./BtnLink.module.css";

interface BtnLinkProps {
  label: string;
  route: string;
  dark?: boolean;
}

const BtnLink: React.FC<BtnLinkProps> = ({ label, route, dark = false }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(route);
  };

  return (
    <a
      className={`${styles.sm} ${styles.caps} ${styles.mono} ${dark ? styles.linkDark : styles.linkLight}`}
      href={route}
      onClick={handleClick}
    >
      <div
        className={`${styles.animeLink} ${
          dark ? styles.animeLinkDark : styles.animeLinkLight
        }`}
      >
        <div className={styles.animeLinkLabel}>
          <p className={`${styles.sm} ${styles.caps} ${styles.mono}`}>
            <span>{label}</span>
          </p>
        </div>
        <div className={styles.animeLinkIcon}>
          <IoMdArrowForward color={dark ? "#fff" : "#000"} />
        </div>
      </div>
    </a>
  );
};

export default BtnLink;
