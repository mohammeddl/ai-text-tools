"use client";
import styles from "./StudioHeader.module.css";
import Copy from "../Copy/Copy";

interface StudioHeaderProps {
  children: React.ReactNode;
}

const StudioHeader: React.FC<StudioHeaderProps> = ({ children }) => {
  return (
    <section className={styles.studioHeader}>
      <div className={styles.studioHeaderCopy}>
        <Copy>
          <h2>{children}</h2>
        </Copy>
      </div>
    </section>
  );
};

export default StudioHeader;
