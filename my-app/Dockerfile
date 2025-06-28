FROM node:18-alpine

# コンテナ内での作業ディレクトリを指定
WORKDIR /app

# まず、依存関係のファイルのみをコピーする
# これにより、依存関係に変更がない限りキャッシュが利用され、ビルドが高速化します
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトの全てのファイルをコピー
COPY . .

# Next.jsが使用するポート3000番を開放
EXPOSE 3000

# コンテナ起動時に開発サーバーを起動するコマンド
CMD ["npm", "run", "dev"]
