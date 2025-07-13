import Image from "next/image";
import Sheet from "@/app/_components/Sheet";
import { getMembersList } from "../_libs/microcms";
import { MEMBERS_LIST_LIMIT } from "@/app/_constants";
import styles from "./page.module.css";

type Member = {
  id: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  name: string;
  position: string;
  profile: string;
};

// const data = {
//   contents: [
//     {
//       id: "1",
//       image: {
//         url: "/img-member1.jpg",
//         width: 240,
//         height: 240,
//       },
//       name: "デイビッド・チャン",
//       position: "CEO",
//       profile:
//         "テクノロジーとイノベーションのリーダーとして、当社を率いています。",
//     },
//     {
//       id: "2",
//       image: {
//         url: "/img-member2.jpg",
//         width: 240,
//         height: 240,
//       },
//       name: "サラ・ジョンソン",
//       position: "COO",
//       profile: "オペレーションと戦略の専門家として、会社の成長を支えています。",
//     },
//     {
//       id: "3",
//       image: {
//         url: "/img-member3.jpg",
//         width: 240,
//         height: 240,
//       },
//       name: "ジョン・ウィルソン",
//       position: "CTO",
//       profile:
//         "技術革新と製品開発の責任者として、当社の技術戦略を推進しています。",
//     },
//   ],
// };

export default async function Page() {
  const data = await getMembersList({ limit: MEMBERS_LIST_LIMIT });
  return (
    <div className={styles.container}>
      {data.contents.length === 0 ? (
        <p className={styles.empty}>メンバーが登録されていません。</p>
      ) : (
        <ul>
          {data.contents.map((member) => (
            <li key={member.id} className={styles.list}>
              <Image
                src={member.image.url}
                alt=""
                width={member.image.width}
                height={member.image.height}
                className={styles.image}
              />
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dd className={styles.position}>{member.position}</dd>
                <dd className={styles.profile}>{member.profile}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
