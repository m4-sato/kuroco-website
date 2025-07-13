#!/bin/bash

# --- エラー発生時にスクリプトを停止 ---
set -e

# --- 変数定義 ---
# 1. リポジトリのルートパス
REPOSITORY_PATH="/home/site/repository"
# 2. Next.jsプロジェクトのディレクトリ
PROJECT_DIR="my-next-project"
# 3. デプロイ先のパス
DEPLOYMENT_TARGET="/home/site/wwwroot"

echo "### Starting custom deployment script ###"

# --- ビルド実行 ---
echo "1. Navigating to project directory: $PROJECT_DIR"
cd "$REPOSITORY_PATH/$PROJECT_DIR"

echo "2. Installing dependencies..."
npm install

echo "3. Running build command..."
npm run build

# --- デプロイ先に成果物をコピー ---
echo "4. Copying build artifacts to $DEPLOYMENT_TARGET"

# 既存のデプロイ先を一度空にする
rm -rf $DEPLOYMENT_TARGET/*

# Next.jsの実行に必要なファイルをコピー
cp -r .next "$DEPLOYMENT_TARGET/"
cp -r public "$DEPLOYMENT_TARGET/"
cp package.json "$DEPLOYMENT_TARGET/"
cp package-lock.json "$DEPLOYMENT_TARGET/"
cp next.config.mjs "$DEPLOYMENT_TARGET/"

echo "### Custom deployment finished successfully! ###"
