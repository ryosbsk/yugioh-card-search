# 遊☆戯☆王デュエルモンスターズ エキスパート2006 カード検索ツール

**GBAゲーム「遊☆戯☆王デュエルモンスターズ エキスパート2006」専用のカード検索ツールです。**

このツールは、ゲームに収録されている約2,000枚のカードを効率的に検索・管理するためのWebアプリケーションです。元々Google Spreadsheetで管理していたデータを、HTML/CSS/JavaScriptを使って高速検索可能なツールに変換しました。

**注意**: パック剥き機能は検索機能のおまけとして実装されており、レアリティ設定はありません。全カード同一確率で抽選されます。

## ゲームについて

「遊☆戯☆王デュエルモンスターズ エキスパート2006」は、2006年にコナミから発売されたゲームボーイアドバンス用の遊戯王カードゲームです。このツールは、ゲーム内でのデッキ構築やカード収集を効率化するために作成されました。

## 特徴

- **高速検索**: ゲーム収録の約2,000枚のカードを瞬時に検索
- **多機能フィルタ**: パック選択、カード種類、カード名での絞り込み
- **逆引き機能**: カードからパック情報を検索（デッキ構築に便利）
- **パック剥き機能**: 実際のパック開封シミュレーション（1パック/5パック対応）
- **レスポンシブデザイン**: デスクトップ・モバイル対応
- **Google Spreadsheet QUERY関数の完全再現**
- **ゲーム専用**: エキスパート2006に収録されたカードのみを対象

## 使い方

### 1. セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/ryosbsk/yugioh-card-search.git
cd yugioh-card-search

# Live Serverでindex.htmlを開く
# または、直接index.htmlをブラウザで開く
```

### 2. 検索機能

- **パック選択**: プルダウンメニューからゲーム内の特定のパックを選択
- **カード種類**: チェックボックスで種類を絞り込み
  - 通常モンスター
  - 効果モンスター
  - 融合モンスター
  - 魔法
  - 罠
- **カード名検索**: リアルタイムで部分一致検索
- **逆引き**: カード名をクリックして収録パック一覧を表示（デッキ構築時に便利）

### 3. パック剥き機能

- **パック選択**: プルダウンメニューから開封するパックを選択
- **開封数選択**: 1パック（5枚）または5パック（25枚）をボタンで選択
- **開封結果**: カードが段階的にアニメーション表示
- **複数パック開封**: 5パック選択時はパック別に結果を表示
- **レアリティなし**: 全カード同一確率で抽選（実際のゲームとは異なります）

## 技術仕様

### 技術スタック
- **フロントエンド**: HTML5, CSS3, vanilla JavaScript (ES6+)
- **データ形式**: CSV files
- **検索機能**: リアルタイム検索、フィルタリング

### ファイル構成
```
yugioh-card-search/
├── data/
│   ├── card_master.csv    # ゲーム収録カードの基本情報
│   ├── pack_master.csv    # ゲーム内パック情報
│   └── query_results.csv  # 検索結果用（未使用）
├── index.html             # メインページ
├── style.css             # スタイル
├── script.js             # 検索ロジック
└── README.md             # このファイル
```

### データ構造

**card_master.csv**
```
#,種,カード名,パック
0001,1,13人目の埋葬者,"01,20,31,46"
0002,1,アクア・マドール,"01,29,46"
```

**pack_master.csv**
```
#,パック名,出現内容,手に入れやすさ
01,LEGEND OF BLUE EYES WHITE DRAGON,最初から出現,1
02,METAL RAIDERS,最初から出現,1
```

## 元の仕様

このアプリは、ゲーム攻略のためにGoogle Spreadsheetで管理していたデータを元に作成されました。元のQUERY関数を完全に再現しています：

```
=QUERY(card!A:D,"select * where B matches '"&JOIN("|",2,3,4,5)&"' and D contains '"&TO_TEXT(B2)&"' order by B,A")
```

Google Spreadsheetでは手動でフィルタリングしていた作業を、このWebアプリで自動化・高速化しました。

## 開発者向け情報

### デバッグ方法
1. ブラウザの開発者ツール（F12）を開く
2. コンソールで「データ読み込み完了」メッセージを確認
3. エラーがある場合はコンソールに表示されます

### データ更新方法
静的サイトのため、data/フォルダ内のCSVファイルを直接置き換えてください。

## ライセンス

MIT License

## 作成者

ryosbsk

---

このプロジェクトは「遊☆戯☆王デュエルモンスターズ エキスパート2006」の攻略支援と学習目的で作成されました。遊戯王は株式会社コナミデジタルエンタテインメントの登録商標です。