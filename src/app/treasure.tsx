import styles from "./treasure.module.css";

interface Props {
  isActive: boolean;
  isShaking: boolean;
}

const Treasure = (props:Props) => {
  return (
    <div
      className={`${styles.chest} ${props.isActive ? styles.active : ""} ${
        props.isShaking ? styles.shake : ""
      }`}
    >
      <div className={styles.insert}></div>
      <div className={styles.top}></div>
      <div style={{ width: "100%", position: "relative" }}>
        <div className={styles.chest_keyholeBG}>
          <div className={styles.chest_keyhole}></div>
        </div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default Treasure;
