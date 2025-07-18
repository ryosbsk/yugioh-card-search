# JavaScript学習ガイド - script.js で使用されている機能

このガイドでは、遊戯王カード検索アプリ（script.js）で実際に使用されているJavaScript機能のみを解説します。

## 1. 変数宣言

### `let` と `const` 🆕 **ES6 (2015年)**
```javascript
// script.js での使用例
let cardsData = [];  // 再代入可能な配列
const packSelect = document.getElementById('pack-select');  // 再代入不可能な定数
```

## 2. DOM操作

### 要素の取得
- `document.getElementById()` - IDで要素を取得
- `document.addEventListener()` - DOMContentLoadedイベント
- `document.createElement()` - 新しい要素を作成
- `document.querySelectorAll()` - CSS セレクタで複数要素を取得

```javascript
// script.js での使用例
const packSelect = document.getElementById('pack-select');
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
});
const option = document.createElement('option');
document.querySelectorAll('#results-tbody .card-name').forEach(link => {
    // 処理
});
```

### 要素のプロパティ
- `element.value` - input要素の値
- `element.checked` - checkbox要素のチェック状態
- `element.textContent` - 要素のテキスト内容
- `element.innerHTML` - 要素のHTML内容
- `element.classList` - クラス操作（add, remove）
- `element.dataset` - data-*属性の取得
- `element.appendChild()` - 子要素を追加

```javascript
// script.js での使用例
const selectedPack = packSelect.value;
const isChecked = document.getElementById('type-1').checked;
option.textContent = pack.name;
row.innerHTML = `<td>${card.id}</td>`;
reverseLookup.classList.add('hidden');
const cardId = e.target.dataset.cardId;
packSelect.appendChild(option);
```

## 3. イベント処理

### addEventListener()
- クリック、入力、変更イベントの処理
- `event.preventDefault()` - デフォルト動作のキャンセル
- `event.target` - イベントが発生した要素

```javascript
// script.js での使用例
searchBtn.addEventListener('click', performSearch);
cardNameInput.addEventListener('input', performSearch);
link.addEventListener('click', (e) => {
    e.preventDefault();
    const cardId = e.target.dataset.cardId;
    showReverseLookup(cardId);
});
```

## 4. 配列操作

### 実際に使用されているメソッド
- `forEach()` - 各要素に処理を実行
- `filter()` - 条件に一致する要素で新しい配列を作成
- `map()` - 各要素を変換して新しい配列を作成
- `find()` - 条件に一致する最初の要素を取得 🆕 **ES6**
- `some()` - 条件に一致する要素があるかチェック
- `sort()` - 配列をソート
- `join()` - 配列の要素を文字列で結合

```javascript
// script.js での使用例
packsData.forEach(pack => {
    const option = document.createElement('option');
    // 処理
});

filteredCards = filteredCards.filter(card => {
    return selectedTypes.includes(card.type);
});

const packNames = packIds.map(id => {
    const pack = packsData.find(p => p.id === id.trim().padStart(2, '0'));
    return pack ? pack.name : id;
});

return cardPacks.some(pack => pack.trim().padStart(2, '0') === selectedPack);

filteredCards.sort((a, b) => {
    if (a.type !== b.type) {
        return a.type - b.type;
    }
    return a.id - b.id;
});

${packNames.map(name => `<li>${name}</li>`).join('')}
```

## 5. 文字列操作

### 実際に使用されているメソッド
- `split()` - 文字列を分割して配列にする
- `trim()` - 前後の空白を除去 **ES5**
- `toLowerCase()` - 小文字に変換
- `includes()` - 文字列に指定の文字が含まれているかチェック 🆕 **ES6**
- `padStart()` - 文字列の先頭を指定文字で埋める 🔥 **ES2017**

```javascript
// script.js での使用例
const lines = text.trim().split('\n');
const cardName = cardNameInput.value.toLowerCase();
return card.name.toLowerCase().includes(cardName);
const cardPacks = card.packs.split(',');
pack.trim().padStart(2, '0')
```

## 6. 非同期処理

### async/await 🔥 **ES2017 (2017年)**
- `async function` - 非同期関数を定義
- `await` - Promiseの完了を待つ
- `fetch()` - HTTP通信でデータを取得
- `response.text()` - レスポンスをテキストとして取得
- `try...catch` - エラーハンドリング

```javascript
// script.js での使用例
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    performSearch();
});

async function loadData() {
    try {
        const cardsResponse = await fetch('data/card_master.csv');
        const cardsText = await cardsResponse.text();
        cardsData = parseCSV(cardsText);
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        alert('データの読み込みに失敗しました。');
    }
}
```

## 7. 制御構造

### 実際に使用されている構造
- `if...else` - 条件分岐
- `for` - 繰り返し処理
- `switch...case` - 多分岐処理

```javascript
// script.js での使用例
if (selectedPack) {
    filteredCards = filteredCards.filter(card => {
        // 処理
    });
}

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // 処理
}

switch(typeId) {
    case '1': return '通常モンスター';
    case '2': return '効果モンスター';
    case '3': return '融合モンスター';
    case '4': return '魔法';
    case '5': return '罠';
    default: return typeId;
}
```

## 8. 関数定義

### アロー関数 🆕 **ES6 (2015年)**
```javascript
// script.js での使用例
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
});

link.addEventListener('click', (e) => {
    e.preventDefault();
});

packsData.forEach(pack => {
    const option = document.createElement('option');
});
```

## 9. デバッグ・ログ出力

### console メソッド
```javascript
// script.js での使用例
console.log('データ読み込み完了:', cardsData.length, 'カード', packsData.length, 'パック');
console.error('データ読み込みエラー:', error);
```

## 10. 実際のコードパターン

### CSVパース処理
```javascript
// ダブルクォート対応のCSV行解析
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}
```

### 検索・フィルタリング処理
```javascript
function performSearch() {
    let filteredCards = cardsData;
    
    // パックフィルター
    if (selectedPack) {
        filteredCards = filteredCards.filter(card => {
            const cardPacks = card.packs.split(',');
            return cardPacks.some(pack => pack.trim().padStart(2, '0') === selectedPack);
        });
    }
    
    // 種類フィルター
    if (selectedTypes.length > 0) {
        filteredCards = filteredCards.filter(card => {
            return selectedTypes.includes(card.type);
        });
    }
    
    // カード名フィルター
    if (cardName) {
        filteredCards = filteredCards.filter(card => {
            return card.name.toLowerCase().includes(cardName);
        });
    }
    
    displayResults(filteredCards);
}
```

### 動的DOM生成
```javascript
// プルダウンオプションの生成
function populatePackSelect() {
    packsData.forEach(pack => {
        const option = document.createElement('option');
        option.value = pack.id;
        option.textContent = pack.name;
        packSelect.appendChild(option);
    });
}

// テーブル行の生成
cards.forEach(card => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${card.id}</td>
        <td>${getTypeText(card.type)}</td>
        <td><a href="#" class="card-name" data-card-id="${card.id}">${card.name}</a></td>
        <td>${formatPackNames(card.packs)}</td>
    `;
    resultsTbody.appendChild(row);
});
```

## 11. 学習のポイント

### script.js を読み解くコツ
1. **データフロー**: `loadData()` → `performSearch()` → `displayResults()`
2. **イベント駆動**: ユーザーの操作（入力、クリック、変更）が検索を実行
3. **配列操作の連鎖**: filter → filter → filter → sort のパターン
4. **DOM更新**: 検索結果に応じてテーブルとカードビューを両方更新

### 次に学ぶべき機能
このアプリをベースに以下の機能追加にチャレンジしてみてください：
- **ローカルストレージ**: お気に入り機能の実装
- **URL状態管理**: 検索条件をURLに保存
- **パフォーマンス最適化**: 大量データでの高速検索

---

**💡 このガイドはscript.jsで実際に使用されている機能のみを収録しています。まずはこれらの機能を確実に理解しましょう♪**