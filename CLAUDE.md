# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
遊戯王カード検索アプリ - 2,000件のカードデータをCSVで読み込み、高速検索を実現する静的Webアプリケーション

## 開発・実行方法
- **開発環境**: Live Server拡張機能を使用してindex.htmlを開く
- **テスト**: ブラウザで動作確認（コンソールで「データ読み込み完了」メッセージを確認）
- **デバッグ**: ブラウザの開発者ツール（F12）でコンソールエラーを確認
- **スマホ確認**: MacのIPアドレス:5500でアクセス（同一Wi-Fi必須）

## アーキテクチャ
### データ構造
- **card_master.csv**: カード基本情報（ID、種類1-5、名前、パック情報）
- **pack_master.csv**: パック情報（ID、パック名）
- **query_results.csv**: 元のGoogle SpreadsheetのQUERY関数結果（現在未使用）

### 検索システム
アプリは元のGoogle Spreadsheet QUERY関数を完全再現：
```
=QUERY(card!A:D,"select * where B matches '"&JOIN("|",2,3,4,5)&"' and D contains '"&TO_TEXT(B2)&"' order by B,A")
```

3つの主要なフィルタリング機能：
1. **パック選択**: pack_master.csvからプルダウン生成、選択されたパックIDでカードをフィルタリング
2. **種類フィルター**: 5つのチェックボックス（通常モンスター、効果モンスター、融合モンスター、魔法、罠）
3. **カード名検索**: リアルタイム部分一致検索

### CSVパーサー
カスタムCSVパーサーがダブルクォートで囲まれたデータを処理：
- `parseCSV()`: card_master.csv用
- `parsePackCSV()`: pack_master.csv用
- `parseCSVLine()`: ダブルクォート考慮の行パーサー

### データフロー
1. `loadData()`: 初期化時に両CSVファイルを読み込み
2. `performSearch()`: フィルター条件に基づいて検索実行
3. `displayResults()`: デスクトップ用テーブルとモバイル用カード表示の両方を更新
4. `showReverseLookup()`: カード名クリック時の逆引き機能

### レスポンシブ対応
- **768px以上**: テーブル表示（.desktop-only）
- **768px未満**: カード型表示（.mobile-only）
- CSS Grid で自動レイアウト調整

## 重要な実装詳細
### 種類マッピング
```javascript
1: '通常モンスター'
2: '効果モンスター'
3: '融合モンスター'
4: '魔法'
5: '罠'
```

### パックIDの処理
- CSVデータ内のパック情報は「"01,20,31,46"」形式
- 検索時は2桁ゼロパディング（`padStart(2, '0')`）で比較

### 逆引き機能
カード名をクリックすると、そのカードが収録されているパック一覧を表示するモーダルが開く

## データ更新方法
静的サイトのため、データ更新は手動でCSVファイルを置き換え。data/フォルダ内の該当ファイルを更新後、ブラウザリロードで反映。

## 今後の開発方針
### 短期計画
- GitHubリポジトリの作成とアップロード
- README.md作成（セットアップ手順含む）
- データ更新手順の文書化

### 中期計画（技術学習）
- React + Tailwind CSS への移行
- Fuse.js導入による高度な検索機能
- TypeScript導入による型安全性向上
- PWA対応（オフライン利用）

### 長期計画（機能拡張）
- カード詳細情報の追加（攻撃力・守備力・効果）
- デッキ管理機能（お気に入り・構築）
- 遊戯王公式API連携
- ユーザー機能（設定・履歴）

## ファイル役割分担
- **PROJECT.md**: 学習目標、仕様書、人間向けプロジェクト情報
- **CLAUDE.md**: 開発手順、技術情報、Claude Code向けガイド
- **README.md**: セットアップ手順、使用方法、一般向け情報