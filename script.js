// データ格納用変数
let cardsData = [];
let packsData = [];

// DOM要素の取得
const packSelect = document.getElementById('pack-select');
const cardNameInput = document.getElementById('card-name');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsTable = document.getElementById('results-table');
const resultsTbody = document.getElementById('results-tbody');
const resultsCards = document.getElementById('results-cards');
const resultCount = document.getElementById('result-count');
const reverseLookup = document.getElementById('reverse-lookup');
const packInfo = document.getElementById('pack-info');
const closeReverse = document.getElementById('close-reverse');

// 初期化
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    performSearch(); // 初期表示
});

// CSVファイルを読み込む
async function loadData() {
    try {
        // カードデータを読み込み
        const cardsResponse = await fetch('data/card_master.csv');
        const cardsText = await cardsResponse.text();
        cardsData = parseCSV(cardsText);
        
        // パックデータを読み込み
        const packsResponse = await fetch('data/pack_master.csv');
        const packsText = await packsResponse.text();
        packsData = parsePackCSV(packsText);
        
        // パックプルダウンを生成
        populatePackSelect();
        
        console.log('データ読み込み完了:', cardsData.length, 'カード', packsData.length, 'パック');
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        alert('データの読み込みに失敗しました。');
    }
}

// CSV文字列を配列に変換
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // カンマ区切りでパース（ダブルクォートを考慮）
        const row = parseCSVLine(line);
        if (row.length >= 4) {
            data.push({
                id: row[0],
                type: row[1],
                name: row[2],
                packs: row[3]
            });
        }
    }
    
    return data;
}

// CSV行をパース（ダブルクォートを考慮）
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

// パックCSVをパース
function parsePackCSV(text) {
    const lines = text.trim().split('\n');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const row = parseCSVLine(line);
        if (row.length >= 2) {
            data.push({
                id: row[0],
                name: row[1]
            });
        }
    }
    
    return data;
}

// パックプルダウンを生成
function populatePackSelect() {
    packsData.forEach(pack => {
        const option = document.createElement('option');
        option.value = pack.id;
        option.textContent = pack.name;
        packSelect.appendChild(option);
    });
}

// イベントリスナーの設定
function setupEventListeners() {
    searchBtn.addEventListener('click', performSearch);
    clearBtn.addEventListener('click', clearForm);
    cardNameInput.addEventListener('input', performSearch);
    packSelect.addEventListener('change', performSearch);
    
    // カード種類チェックボックス
    document.getElementById('type-1').addEventListener('change', performSearch);
    document.getElementById('type-2').addEventListener('change', performSearch);
    document.getElementById('type-3').addEventListener('change', performSearch);
    document.getElementById('type-4').addEventListener('change', performSearch);
    document.getElementById('type-5').addEventListener('change', performSearch);
    
    // 逆引き機能
    closeReverse.addEventListener('click', () => {
        reverseLookup.classList.add('hidden');
    });
}

// 検索実行
function performSearch() {
    const selectedPack = packSelect.value;
    const cardName = cardNameInput.value.toLowerCase();
    const selectedTypes = getSelectedTypes();
    
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
    
    // 並び替え（種類→カードID）
    filteredCards.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type - b.type;
        }
        return a.id - b.id;
    });
    
    displayResults(filteredCards);
}

// 選択された種類を取得
function getSelectedTypes() {
    const types = [];
    if (document.getElementById('type-1').checked) types.push('1');
    if (document.getElementById('type-2').checked) types.push('2');
    if (document.getElementById('type-3').checked) types.push('3');
    if (document.getElementById('type-4').checked) types.push('4');
    if (document.getElementById('type-5').checked) types.push('5');
    return types;
}

// 検索結果を表示
function displayResults(cards) {
    resultCount.textContent = `${cards.length}件`;
    
    // テーブル表示（デスクトップ用）
    displayTableResults(cards);
    
    // カード表示（モバイル用）
    displayCardResults(cards);
}

// テーブル表示
function displayTableResults(cards) {
    resultsTbody.innerHTML = '';
    
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
    
    // カード名クリック時の逆引き機能
    document.querySelectorAll('#results-tbody .card-name').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cardId = e.target.dataset.cardId;
            showReverseLookup(cardId);
        });
    });
}

// カード表示
function displayCardResults(cards) {
    resultsCards.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = `card-item type-${card.type}`;
        cardElement.innerHTML = `
            <div class="card-name" data-card-id="${card.id}">${card.name}</div>
            <div class="card-type">${getTypeText(card.type)}</div>
            <div class="card-id">ID: ${card.id}</div>
            <div class="card-packs">収録: ${formatPackNames(card.packs)}</div>
        `;
        resultsCards.appendChild(cardElement);
    });
    
    // カード名クリック時の逆引き機能
    document.querySelectorAll('#results-cards .card-name').forEach(link => {
        link.addEventListener('click', (e) => {
            const cardId = e.target.dataset.cardId;
            showReverseLookup(cardId);
        });
    });
}

// 種類IDを文字列に変換
function getTypeText(typeId) {
    switch(typeId) {
        case '1': return '通常モンスター';
        case '2': return '効果モンスター';
        case '3': return '融合モンスター';
        case '4': return '魔法';
        case '5': return '罠';
        default: return typeId;
    }
}

// パックIDをパック名に変換
function formatPackNames(packIds) {
    const ids = packIds.split(',');
    return ids.map(id => {
        const pack = packsData.find(p => p.id === id.trim().padStart(2, '0'));
        return pack ? pack.name : id;
    }).join(', ');
}

// 逆引き表示
function showReverseLookup(cardId) {
    const card = cardsData.find(c => c.id === cardId);
    if (!card) return;
    
    const packIds = card.packs.split(',');
    const packNames = packIds.map(id => {
        const pack = packsData.find(p => p.id === id.trim().padStart(2, '0'));
        return pack ? pack.name : id;
    });
    
    packInfo.innerHTML = `
        <h4>${card.name}</h4>
        <p>収録パック:</p>
        <ul>
            ${packNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
    `;
    
    reverseLookup.classList.remove('hidden');
}

// フォームクリア
function clearForm() {
    packSelect.value = '';
    cardNameInput.value = '';
    document.getElementById('type-1').checked = true;
    document.getElementById('type-2').checked = true;
    document.getElementById('type-3').checked = true;
    document.getElementById('type-4').checked = true;
    document.getElementById('type-5').checked = true;
    performSearch();
}