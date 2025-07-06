import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <dl>
        <dt className={styles.title}>ページが見つかりませんでした</dt>
        <dd className={styles.text}>
          あなたがアクセスしようとしたページは存在しないか、削除された可能性があります。
          <br />
          URLを再度ご確認ください。
        </dd>
      </dl>
    </div>
  );
}
