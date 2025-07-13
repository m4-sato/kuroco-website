import type { Category as CategoryType } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
  category?: CategoryType;
};

export default function Category({ category }: Props) {
  if (!category) {
    return null;
  }

  return <span className={styles.tag}>{category.name}</span>;
}
