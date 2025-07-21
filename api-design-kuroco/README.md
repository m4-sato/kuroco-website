#

| テーブル名 (API 名) | フィールド（例）                                                                                                | 型・設定                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **site_settings**   | header_title / sub_title / copyright                                                                            | Text                      |
| **ai_cases**        | title (Text) / thumbnail (Image) / tag (Select “人気/レア/通常”) / summary (Textarea) / published_at (DateTime) | 必要に応じて slug も      |
| **ai_tools**        | name (Text) / icon (Image) / status (Select “準備中/OK/β”) / description                                        | —                         |
| **chatbot_widget**  | embed_code (Textarea)                                                                                           | Dify スニペット貼り付け用 |

### Docker コマンド

```bash
$ docker compose -f docker-compose.dev.yml down
$ docker compose -f docker-compose.dev.yml up --build -d
```

```bash
$ docker compose -f docker-compose.dev.yml exec web \
 printenv | grep NEXT_PUBLIC_API_BASE
```

```bash
$ docker compose -f docker-compose.dev.yml restart web
```

### Tailwindcss ドキュメント

[Next.js 版](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

[shadcn ui](https://ui.shadcn.com/docs/components/carousel)
