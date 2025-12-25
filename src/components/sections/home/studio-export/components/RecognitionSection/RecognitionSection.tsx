"use client";
import styles from "./RecognitionSection.module.css";
import Copy from "../Copy/Copy";

interface RecognitionSectionProps {
  label?: string;
  children: React.ReactNode;
}

const RecognitionSection: React.FC<RecognitionSectionProps> = ({ 
  label = "(Recognition)",
  children 
}) => {
  return (
    <section className={styles.recognition}>
      <div className={styles.recognitionCopy}>
        <Copy>
          <p className={`${styles.sm} ${styles.caps}`}>{label}</p>
          <br />
          <h2>{children}</h2>
        </Copy>
      </div>
    </section>
  );
};

export default RecognitionSection;
