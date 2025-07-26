#

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

[sample code](https://github.com/fsubal/gihyo_tailwindcss_book)
