// Mock 데이터 - 실제로는 API에서 받아올 데이터
const mockUserData = {
    tier: 'PLATINUM',
    rank: 'II',
    lp: 67,
    wins: 8,
    losses: 12
};

// 시즌 15 기준 매치 데이터 (TraitDto, UnitDto 포함)
const mockMatches = [
    {
        placement: 1,
        time: '12/01 21:34',
        traits: [
            { name: '현혹', num_units: 4, style: 1, tier_current: 2, tier_total: 4 },
            { name: '마법사', num_units: 3, style: 1, tier_current: 1, tier_total: 3 }
        ],
        units: [
            { character_id: 'TFT15_Ahri', name: '아리', rarity: 4, tier: 2, items: [1, 2], itemNames: ['도란의 반지', '도란의 방패'], chosen: null },
            { character_id: 'TFT15_Lux', name: '럭스', rarity: 3, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Kaisa', name: '카이사', rarity: 2, tier: 3, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Syndra', name: '신드라', rarity: 4, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Neeko', name: '니코', rarity: 3, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Sona', name: '소나', rarity: 2, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_MissFortune', name: '미스 포츈', rarity: 4, tier: 1, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 3,
        time: '12/01 20:40',
        traits: [
            { name: '격투가', num_units: 4, style: 1, tier_current: 2, tier_total: 4 },
            { name: '수호자', num_units: 2, style: 1, tier_current: 1, tier_total: 2 }
        ],
        units: [
            { character_id: 'TFT15_Sett', name: '세트', rarity: 3, tier: 2, items: [1, 2, 3], itemNames: ['도란의 반지', '도란의 방패', '도란의 검'], chosen: null },
            { character_id: 'TFT15_Riven', name: '리븐', rarity: 2, tier: 3, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Vi', name: '바이', rarity: 2, tier: 2, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Jayce', name: '제이스', rarity: 3, tier: 1, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Fiora', name: '피오라', rarity: 2, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Irelia', name: '이렐리아', rarity: 3, tier: 2, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 5,
        time: '12/01 20:05',
        traits: [
            { name: '정찰단', num_units: 3, style: 1, tier_current: 1, tier_total: 3 },
            { name: '별수호자', num_units: 2, style: 1, tier_current: 1, tier_total: 2 }
        ],
        units: [
            { character_id: 'TFT15_Ashe', name: '애쉬', rarity: 1, tier: 3, items: [2, 3], itemNames: ['도란의 방패', '도란의 검'], chosen: null },
            { character_id: 'TFT15_Ezreal', name: '이즈리얼', rarity: 2, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Quinn', name: '퀸', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Caitlyn', name: '케이틀린', rarity: 1, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Soraka', name: '소라카', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Nasus', name: '나서스', rarity: 1, tier: 2, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 2,
        time: '12/01 19:22',
        traits: [
            { name: '저격수', num_units: 4, style: 1, tier_current: 2, tier_total: 4 },
            { name: '현혹', num_units: 2, style: 1, tier_current: 1, tier_total: 2 }
        ],
        units: [
            { character_id: 'TFT15_Jhin', name: '진', rarity: 4, tier: 2, items: [1, 2], itemNames: ['도란의 반지', '도란의 방패'], chosen: null },
            { character_id: 'TFT15_Ahri', name: '아리', rarity: 4, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_TwistedFate', name: '트위스티드 페이트', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Zeri', name: '제리', rarity: 4, tier: 1, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Shen', name: '쉔', rarity: 3, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Yone', name: '요네', rarity: 4, tier: 1, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 1,
        time: '11/30 23:14',
        traits: [
            { name: '현혹', num_units: 4, style: 1, tier_current: 2, tier_total: 4 },
            { name: '마법사', num_units: 3, style: 1, tier_current: 1, tier_total: 3 }
        ],
        units: [
            { character_id: 'TFT15_Ahri', name: '아리', rarity: 4, tier: 3, items: [1, 2, 3], itemNames: ['도란의 반지', '도란의 방패', '도란의 검'], chosen: null },
            { character_id: 'TFT15_Sona', name: '소나', rarity: 2, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Janna', name: '잔나', rarity: 3, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Syndra', name: '신드라', rarity: 4, tier: 2, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Taliyah', name: '탈리야', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Veigar', name: '베이가', rarity: 2, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null }
        ]
    },
    {
        placement: 7,
        time: '11/30 22:40',
        traits: [
            { name: '격투가', num_units: 2, style: 1, tier_current: 1, tier_total: 2 },
            { name: '전략가', num_units: 3, style: 1, tier_current: 1, tier_total: 3 }
        ],
        units: [
            { character_id: 'TFT15_Sett', name: '세트', rarity: 3, tier: 1, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Vi', name: '바이', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Jayce', name: '제이스', rarity: 3, tier: 1, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Poppy', name: '뽀삐', rarity: 1, tier: 2, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Nunu', name: '누누', rarity: 4, tier: 1, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Warwick', name: '워윅', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 4,
        time: '11/30 21:55',
        traits: [
            { name: '별수호자', num_units: 4, style: 1, tier_current: 2, tier_total: 4 },
            { name: '정찰단', num_units: 2, style: 1, tier_current: 1, tier_total: 2 }
        ],
        units: [
            { character_id: 'TFT15_Ashe', name: '애쉬', rarity: 1, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Syndra', name: '신드라', rarity: 4, tier: 2, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Rakan', name: '라칸', rarity: 3, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_KaiSa', name: '카이사', rarity: 2, tier: 3, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Nilah', name: '닐라', rarity: 3, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Taric', name: '타릭', rarity: 4, tier: 1, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 6,
        time: '11/30 21:30',
        traits: [
            { name: '현혹', num_units: 2, style: 1, tier_current: 1, tier_total: 2 },
            { name: '수호자', num_units: 3, style: 1, tier_current: 1, tier_total: 3 }
        ],
        units: [
            { character_id: 'TFT15_Lux', name: '럭스', rarity: 3, tier: 1, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Garen', name: '가렌', rarity: 1, tier: 2, items: [2], itemNames: ['도란의 방패'], chosen: null },
            { character_id: 'TFT15_Poppy', name: '뽀삐', rarity: 1, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Galio', name: '갈리오', rarity: 2, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Janna', name: '잔나', rarity: 3, tier: 1, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Kayle', name: '케일', rarity: 3, tier: 1, items: [3], itemNames: ['도란의 검'], chosen: null }
        ]
    },
    {
        placement: 3,
        time: '11/30 21:00',
        traits: [
            { name: '저격수', num_units: 3, style: 1, tier_current: 1, tier_total: 3 },
            { name: '정찰단', num_units: 2, style: 1, tier_current: 1, tier_total: 2 }
        ],
        units: [
            { character_id: 'TFT15_Jhin', name: '진', rarity: 4, tier: 2, items: [2, 3], itemNames: ['도란의 방패', '도란의 검'], chosen: null },
            { character_id: 'TFT15_Ashe', name: '애쉬', rarity: 1, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Caitlyn', name: '케이틀린', rarity: 1, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Ezreal', name: '이즈리얼', rarity: 2, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Senna', name: '세나', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Lulu', name: '룰루', rarity: 1, tier: 2, items: [], itemNames: [], chosen: null }
        ]
    },
    {
        placement: 2,
        time: '11/30 20:20',
        traits: [
            { name: '마법사', num_units: 4, style: 1, tier_current: 2, tier_total: 4 },
            { name: '격투가', num_units: 2, style: 1, tier_current: 1, tier_total: 2 }
        ],
        units: [
            { character_id: 'TFT15_Lux', name: '럭스', rarity: 3, tier: 3, items: [1, 2], itemNames: ['도란의 반지', '도란의 방패'], chosen: null },
            { character_id: 'TFT15_Sett', name: '세트', rarity: 3, tier: 2, items: [3], itemNames: ['도란의 검'], chosen: null },
            { character_id: 'TFT15_Sona', name: '소나', rarity: 2, tier: 2, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Taliyah', name: '탈리야', rarity: 2, tier: 2, items: [1], itemNames: ['도란의 반지'], chosen: null },
            { character_id: 'TFT15_Annie', name: '애니', rarity: 1, tier: 3, items: [], itemNames: [], chosen: null },
            { character_id: 'TFT15_Orianna', name: '오리아나', rarity: 3, tier: 1, items: [], itemNames: [], chosen: null }
        ]
    }
];

// DOM 요소
const matchList = document.getElementById('matchList');
const unitList = document.getElementById('unitList');
const winsValueEl = document.getElementById('winsValue');
const lossesValueEl = document.getElementById('lossesValue');
const tierImageEl = document.getElementById('tierImage');
const tierTextEl = document.getElementById('tierText');
const rankTextEl = document.getElementById('rankText');
const lpTextEl = document.getElementById('lpText');
const topChampionEl = document.getElementById('topChampion');
const loadingIndicator = document.getElementById('loadingIndicator');

// 새로운 랭크 정보 요소
const rankImageLargeEl = document.getElementById('rankImageLarge');
const rankTierTextEl = document.getElementById('rankTierText');
const rankDivisionTextEl = document.getElementById('rankDivisionText');
const rankLpTextEl = document.getElementById('rankLpText');
const topChampionDisplayEl = document.getElementById('topChampionDisplay');

function createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (textContent !== undefined) {
        element.textContent = textContent;
    }
    return element;
}

function updateElementContent(element, nodes = []) {
    if (!element) return;
    element.replaceChildren(...nodes);
}


// 무한 스크롤 관련 변수
let currentPage = 0;
const matchesPerPage = 10;
let isLoading = false;
let allMatches = [...mockMatches]; // 전체 매치 데이터 (실제로는 API에서 받아옴)

// 티어 이미지 스타일 생성 (CSS로 표시 - 실제 API 연동 시 이미지 URL 사용)
function getTierStyle(tier) {
    const tierMap = {
        'IRON': { bg: '#4A5568', color: '#FFFFFF', text: 'IRON' },
        'BRONZE': { bg: '#CD7F32', color: '#FFFFFF', text: 'BRONZE' },
        'SILVER': { bg: '#C0C0C0', color: '#000000', text: 'SILVER' },
        'GOLD': { bg: '#FFD700', color: '#000000', text: 'GOLD' },
        'PLATINUM': { bg: '#00D9FF', color: '#000000', text: 'PLAT' },
        'DIAMOND': { bg: '#00B8FF', color: '#FFFFFF', text: 'DIAMOND' },
        'MASTER': { bg: '#9B59B6', color: '#FFFFFF', text: 'MASTER' },
        'GRANDMASTER': { bg: '#E74C3C', color: '#FFFFFF', text: 'GM' },
        'CHALLENGER': { bg: '#F39C12', color: '#FFFFFF', text: 'CHALL' }
    };
    return tierMap[tier] || tierMap['GOLD'];
}

// 챔피언 이미지 URL 생성 (실제 API 연동 시 수정 필요)
// 이미지 로드 실패 시 CSS fallback 사용
function getChampionImageUrl(characterId) {
    // 실제로는 백엔드에서 이미지 URL을 제공받아야 함
    // 일단 빈 문자열 반환하고, CSS fallback 사용
    return '';
}

// 챔피언 이름 추출
function getChampionName(characterId) {
    return characterId.replace('TFT15_', '');
}

// 티어 정보 렌더링
function renderTierInfo() {
    if (!tierImageEl || !tierTextEl || !rankTextEl || !lpTextEl) return;
    
    const { tier, rank, lp } = mockUserData;
    
    // 왼쪽 프로필 카드에 랭크 이미지 적용
    tierImageEl.src = '../assets/TFT_Regalia_Platinum.png';
    tierImageEl.alt = tier;
    tierImageEl.style.display = 'block';
    tierImageEl.style.width = '28px';
    tierImageEl.style.height = '28px';
    tierImageEl.style.objectFit = 'contain';
    tierImageEl.style.background = 'transparent';
    tierImageEl.style.border = 'none';
    tierImageEl.style.borderRadius = '0';
    tierImageEl.style.padding = '0';
    tierImageEl.style.color = 'transparent';
    tierImageEl.style.justifyContent = '';
    tierImageEl.style.alignItems = '';
    tierImageEl.style.fontSize = '';
    tierImageEl.style.fontWeight = '';
    tierImageEl.textContent = '';
    
    tierTextEl.textContent = tier;
    if (rank && rank.trim() !== '') {
        rankTextEl.textContent = rank;
        rankTextEl.style.display = 'inline';
    } else {
        rankTextEl.style.display = 'none';
    }
    lpTextEl.textContent = `${lp} LP`;
    
    // 오른쪽 상단 랭크 정보 렌더링
    renderRankInfo();
}

// 오른쪽 상단 랭크 정보 렌더링
function renderRankInfo() {
    if (!rankImageLargeEl || !rankTierTextEl || !rankDivisionTextEl || !rankLpTextEl) return;
    
    const { tier, rank, lp } = mockUserData;
    
    // 큰 랭크 이미지 - 실제 이미지 파일 사용
    rankImageLargeEl.src = '../assets/TFT_Regalia_Platinum.png';
    rankImageLargeEl.alt = tier;
    rankImageLargeEl.style.display = 'block';
    rankImageLargeEl.style.width = '150px';
    rankImageLargeEl.style.height = '150px';
    rankImageLargeEl.style.objectFit = 'contain';
    rankImageLargeEl.style.background = 'transparent';
    rankImageLargeEl.style.border = 'none';
    rankImageLargeEl.style.borderRadius = '0';
    rankImageLargeEl.style.padding = '0';
    rankImageLargeEl.style.color = 'transparent';
    rankImageLargeEl.style.justifyContent = '';
    rankImageLargeEl.style.alignItems = '';
    rankImageLargeEl.style.fontSize = '';
    rankImageLargeEl.style.fontWeight = '';
    rankImageLargeEl.textContent = '';
    
    rankTierTextEl.textContent = tier;
    if (rank && rank.trim() !== '') {
        rankDivisionTextEl.textContent = rank;
        rankDivisionTextEl.style.display = 'block';
    } else {
        rankDivisionTextEl.style.display = 'none';
    }
    rankLpTextEl.textContent = `${lp} LP`;
}

// Wins/Losses 원형 그래프 렌더링
function renderWinsLossesChart() {
    if (!winsValueEl || !lossesValueEl) return;
    
    const { wins, losses } = mockUserData;
    const total = wins + losses;
    
    if (total === 0) {
        winsValueEl.textContent = '0';
        lossesValueEl.textContent = '0';
        return;
    }
    
    winsValueEl.textContent = wins;
    lossesValueEl.textContent = losses;
    
    const winsPercentage = (wins / total) * 100;
    const lossesPercentage = (losses / total) * 100;
    
    // 원주 계산 (2 * π * r, r = 45)
    const circumference = 2 * Math.PI * 45;
    
    const winsSegment = document.querySelector('.wins-segment');
    const lossesSegment = document.querySelector('.losses-segment');
    
    if (winsSegment) {
        const winsLength = (winsPercentage / 100) * circumference;
        winsSegment.style.strokeDasharray = `${winsLength} ${circumference}`;
    }
    
    if (lossesSegment) {
        // Losses는 wins 다음에 시작
        const winsLength = (winsPercentage / 100) * circumference;
        const lossesLength = (lossesPercentage / 100) * circumference;
        lossesSegment.style.strokeDasharray = `${lossesLength} ${circumference}`;
        lossesSegment.style.strokeDashoffset = `-${winsLength}`;
    }
}

// 희귀도에 따른 테두리 색상 반환
function getRarityBorderColor(rarity) {
    const rarityMap = {
        1: 'grey',
        2: 'green',
        3: 'blue',
        4: 'purple',
        5: 'orange'
    };
    return rarityMap[rarity] || 'grey';
}

// 매치 기록 렌더링 (이미지 스타일)
function renderMatchRow(match) {
    const row = document.createElement('div');
    row.className = 'match-row';
    
    // 왼쪽: 랭크/시간 정보와 아바타
    const matchLeft = document.createElement('div');
    matchLeft.className = 'match-left';
    
    const matchInfo = document.createElement('div');
    matchInfo.className = 'match-info';
    const placementClass = match.placement === 1 
        ? 'placement-first' 
        : match.placement <= 4 
            ? 'placement-top' 
            : 'placement-bottom';

    const rankBlock = createElement('div', 'match-rank-block');
    const rankLabel = createElement('span', 'match-rank-label', '랭크');
    const rankTag = createElement('div', `match-rank-tag ${placementClass}`);
    const placementNumber = createElement('span', 'placement-number', String(match.placement));
    const placementSuffix = createElement('span', 'placement-suffix', '등');
    rankTag.append(placementNumber, placementSuffix);
    rankBlock.append(rankLabel, rankTag);

    const timeEl = createElement('div', 'match-time', match.time);

    matchInfo.append(rankBlock, timeEl);

    matchLeft.appendChild(matchInfo);
    
    // 시너지 아이콘들 (육각형)
    const traitsRow = document.createElement('div');
    traitsRow.className = 'match-traits-row';
    match.traits.forEach(trait => {
        const traitIcon = document.createElement('div');
        traitIcon.className = `trait-icon-hex ${trait.tier_current >= trait.tier_total ? 'gold' : 'bronze'}`;
        const traitText = createElement('span', 'trait-icon-text', trait.name.substring(0, 2));
        traitIcon.appendChild(traitText);
        traitIcon.title = `${trait.name} (${trait.num_units}유닛)`;
        traitsRow.appendChild(traitIcon);
    });
    
    // 유닛 카드들
    const unitsRow = document.createElement('div');
    unitsRow.className = 'match-units-row';
    match.units.forEach(unit => {
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card-match';
        
        const unitWrapper = document.createElement('div');
        unitWrapper.className = `unit-image-wrapper ${getRarityBorderColor(unit.rarity)}`;
        
        const unitImage = document.createElement('div');
        unitImage.className = 'unit-image';
        unitImage.textContent = unit.name;
        unitImage.style.background = `linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 0.3))`;
        
        // 성급 표시
        if (unit.tier > 1) {
            const stars = document.createElement('div');
            stars.className = 'unit-stars';
            for (let i = 0; i < unit.tier; i++) {
                const star = document.createElement('div');
                star.className = 'star-icon';
                stars.appendChild(star);
            }
            unitWrapper.appendChild(stars);
        }
        
        unitWrapper.appendChild(unitImage);
        unitCard.appendChild(unitWrapper);
        
        // 아이템 아이콘들
        if (unit.items && unit.items.length > 0) {
            const itemsRow = document.createElement('div');
            itemsRow.className = 'unit-items-row';
            unit.items.forEach((itemId, idx) => {
                const itemIcon = document.createElement('div');
                itemIcon.className = 'item-icon-small';
                itemIcon.title = unit.itemNames && unit.itemNames[idx] ? unit.itemNames[idx] : '아이템';
                itemsRow.appendChild(itemIcon);
            });
            unitCard.appendChild(itemsRow);
        }
        
        unitsRow.appendChild(unitCard);
    });
    
    row.appendChild(matchLeft);
    row.appendChild(traitsRow);
    row.appendChild(unitsRow);
    
    return row;
}

// 매치 기록 렌더링 (페이지네이션)
function renderMatches(page = 0, append = false) {
    if (!matchList) return;
    
    if (!append) {
        matchList.replaceChildren();
        currentPage = 0;
    }
    
    const startIndex = page * matchesPerPage;
    const endIndex = startIndex + matchesPerPage;
    const matchesToRender = allMatches.slice(startIndex, endIndex);
    
    if (matchesToRender.length === 0 && !append) {
        const emptyMessage = createElement('p', 'match-empty-message', '매치 기록이 없습니다');
        matchList.appendChild(emptyMessage);
        return;
    }
    
    matchesToRender.forEach(match => {
        const row = renderMatchRow(match);
        matchList.appendChild(row);
    });
    
    currentPage = page;
}

// 더 많은 매치 로드 (무한 스크롤)
async function loadMoreMatches() {
    if (isLoading) return;
    
    const nextPage = currentPage + 1;
    const startIndex = nextPage * matchesPerPage;
    
    if (startIndex >= allMatches.length) {
        // 더 이상 로드할 데이터가 없음
        return;
    }
    
    isLoading = true;
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
    
    // 실제로는 API 호출
    // const newMatches = await fetchMatches(nextPage);
    // allMatches = [...allMatches, ...newMatches];
    
    // 시뮬레이션을 위한 딜레이
    setTimeout(() => {
        renderMatches(nextPage, true);
        isLoading = false;
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }, 500);
}

// 스크롤 이벤트 리스너
function setupInfiniteScroll() {
    const recordCard = document.querySelector('.record-card');
    if (!recordCard) return;
    
    recordCard.addEventListener('scroll', () => {
        const scrollTop = recordCard.scrollTop;
        const scrollHeight = recordCard.scrollHeight;
        const clientHeight = recordCard.clientHeight;
        
        // 스크롤이 하단 200px 이내에 도달하면 더 로드
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            loadMoreMatches();
        }
    });
}

// 매치 상세 정보 표시
function showMatchDetails(match) {
    if (!matchDetailsEl) return;
    
    matchDetailsEl.style.display = 'block';
    matchDetailsEl.replaceChildren();

    const fragment = document.createDocumentFragment();

    const header = createElement('div', 'match-details-header');
    const title = createElement('h3', null, `${match.placement}위 · ${match.time}`);
    const closeButton = createElement('button', 'close-details', '×');
    closeButton.type = 'button';
    closeButton.addEventListener('click', closeMatchDetails);
    header.append(title, closeButton);
    fragment.append(header);

    const traitsSection = createElement('div', 'match-traits');
    const traitsTitle = createElement('h4', null, '시너지');
    const traitsGrid = createElement('div', 'traits-grid');
    if (match.traits.length === 0) {
        traitsGrid.append(createElement('p', 'match-empty-message', '시너지 정보가 없습니다'));
    } else {
        match.traits.forEach(trait => {
            const chip = createElement('div', 'trait-chip');
            chip.append(
                createElement('span', 'trait-name', trait.name),
                createElement('span', 'trait-level', `(${trait.num_units}유닛 · ${trait.tier_current}/${trait.tier_total})`)
            );
            traitsGrid.appendChild(chip);
        });
    }
    traitsSection.append(traitsTitle, traitsGrid);
    fragment.append(traitsSection);

    const unitsSection = createElement('div', 'match-units');
    const unitsTitle = createElement('h4', null, '유닛');
    const unitsGrid = createElement('div', 'units-grid');
    if (match.units.length === 0) {
        unitsGrid.append(createElement('p', 'match-empty-message', '유닛 정보가 없습니다'));
    } else {
        match.units.forEach(unit => {
            const card = createElement('div', 'unit-card');
            const placeholder = createElement('div', 'unit-image-placeholder', unit.name);
            if (unit.tier > 1) {
                placeholder.appendChild(createElement('span', 'unit-tier', String(unit.tier)));
            }
            card.appendChild(placeholder);
            card.appendChild(createElement('span', 'unit-name', unit.name));
            if (unit.rarity) {
                card.appendChild(createElement('span', 'unit-cost-label', `${unit.rarity}코스트`));
            }
            if (unit.items && unit.items.length > 0) {
                const itemsWrap = createElement('div', 'unit-items');
                unit.items.forEach((itemId, idx) => {
                    const itemIcon = createElement('div', 'item-icon');
                    itemIcon.title = unit.itemNames && unit.itemNames[idx] ? unit.itemNames[idx] : '아이템';
                    itemsWrap.appendChild(itemIcon);
                });
                card.appendChild(itemsWrap);
            }
            unitsGrid.appendChild(card);
        });
    }
    unitsSection.append(unitsTitle, unitsGrid);
    fragment.append(unitsSection);

    matchDetailsEl.appendChild(fragment);
    matchDetailsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 매치 상세 정보 닫기
function closeMatchDetails() {
    if (matchDetailsEl) {
        matchDetailsEl.style.display = 'none';
    }
}

// TFT character_id를 LoL 챔피언 ID로 변환
function convertTFTToLoLChampionId(characterId) {
    // TFT15_Ahri -> Ahri 형식으로 변환
    if (characterId && characterId.startsWith('TFT15_')) {
        return characterId.replace('TFT15_', '');
    }
    // 이미 LoL 형식이면 그대로 반환
    return characterId;
}

// 챔피언 정보를 API에서 가져오기
async function fetchChampionInfo(championId) {
    try {
        const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.23.1/data/ko_KR/champion/${championId}.json`);
        if (!response.ok) {
            throw new Error(`챔피언 정보를 불러올 수 없습니다: ${response.status}`);
        }
        const data = await response.json();
        return data.data[championId];
    } catch (error) {
        console.error('챔피언 정보 로딩 오류:', error);
        return null;
    }
}

// 가장 많이 픽한 챔피언 렌더링
async function renderTopChampion() {
    // 모든 매치에서 챔피언 카운트
    const championCount = {};
    
    allMatches.forEach(match => {
        match.units.forEach(unit => {
            if (!championCount[unit.character_id]) {
                championCount[unit.character_id] = {
                    count: 0,
                    name: unit.name,
                    character_id: unit.character_id
                };
            }
            championCount[unit.character_id].count++;
        });
    });
    
    // 가장 많이 픽한 챔피언 찾기
    let topChampion = null;
    let maxCount = 0;
    
    Object.values(championCount).forEach(champ => {
        if (champ.count > maxCount) {
            maxCount = champ.count;
            topChampion = champ;
        }
    });
    
    if (topChampionDisplayEl) {
        topChampionDisplayEl.classList.add('is-loading');
    }
    
    if (!topChampion) {
        // 챔피언이 없으면 기본 처리
        if (topChampionDisplayEl) {
            topChampionDisplayEl.replaceChildren(createElement('div', 'champion-placeholder', '전적 데이터가 없습니다'));
            topChampionDisplayEl.classList.remove('is-loading');
        }
        return;
    }
    
    // TFT character_id를 LoL 챔피언 ID로 변환
    const lolChampionId = convertTFTToLoLChampionId(topChampion.character_id);
    // const lolChampionId = "Sona";
    
    // 챔피언 정보 가져오기
    const championInfo = await fetchChampionInfo(lolChampionId);
    
    if (championInfo) {
        // 배경 이미지 설정 (splash 이미지)
        const championBg = document.getElementById('championBackground');
        if (championBg) {
            const splashImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${lolChampionId}_0.jpg`;
            console.log('splashImageUrl:', splashImageUrl);
            championBg.style.backgroundImage = `url('${splashImageUrl}')`;
            championBg.style.backgroundSize = 'cover';
            championBg.style.backgroundPosition = 'center top';
            championBg.style.backgroundRepeat = 'no-repeat';
            championBg.classList.add('active');
        }
        
        // 챔피언 박스 이미지 설정
        const championImageUrl = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${lolChampionId}.png`;
        
        // 오른쪽 상단에 챔피언 표시
        if (topChampionDisplayEl) {
            const championImg = createElement('img', 'top-champion-image');
            championImg.src = championImageUrl;
            championImg.alt = championInfo.name;
            championImg.addEventListener('error', () => {
                topChampionDisplayEl.replaceChildren(createElement('div', 'champion-placeholder', '이미지 로드 실패'));
            }, { once: true });
            topChampionDisplayEl.replaceChildren(championImg);
            topChampionDisplayEl.classList.remove('is-loading');
        }
    } else {
        // API 호출 실패 시 기본 처리
        const championBg = document.getElementById('championBackground');
        if (championBg) {
            championBg.style.backgroundImage = `url('../assets/ari.png')`;
            championBg.style.backgroundSize = 'cover';
            championBg.style.backgroundPosition = 'center top';
            championBg.style.backgroundRepeat = 'no-repeat';
            championBg.classList.add('active');
        }
        
        if (topChampionDisplayEl) {
            const placeholder = createElement('div', 'top-champion-image');
            placeholder.textContent = topChampion.name;
            topChampionDisplayEl.replaceChildren(placeholder);
            topChampionDisplayEl.classList.remove('is-loading');
        }
    }
    
    // 기존 topChampionEl도 업데이트 (하위 호환성)
    if (topChampionEl) {
        if (topChampion) {
            const championImageUrl = championInfo 
                ? `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${lolChampionId}.png`
                : '';

            const elements = [];
            if (championImageUrl) {
                const image = createElement('img', 'top-champion-image');
                image.src = championImageUrl;
                image.alt = topChampion.name;
                elements.push(image);
            } else {
                const placeholder = createElement('div', 'top-champion-image', topChampion.name);
                elements.push(placeholder);
            }
            elements.push(
                createElement('div', 'top-champion-name', topChampion.name),
                createElement('div', 'top-champion-picks', `${maxCount}회 픽`)
            );
            updateElementContent(topChampionEl, elements);
        } else {
            updateElementContent(topChampionEl, [createElement('div', 'champion-placeholder', '전적 데이터가 없습니다')]);
        }
    }
}

// 최근 픽한 기물 렌더링 (최근 20게임)
function renderUnits() {
    if (!unitList) return;
    unitList.replaceChildren();
    
    // 최근 20게임에서 픽한 모든 챔피언 수집
    const recentUnits = [];
    const unitMap = new Map();
    
    allMatches.slice(0, 20).forEach(match => {
        match.units.forEach(unit => {
            if (!unitMap.has(unit.character_id)) {
                unitMap.set(unit.character_id, {
                    name: unit.name,
                    character_id: unit.character_id,
                    count: 0
                });
            }
            unitMap.get(unit.character_id).count++;
        });
    });
    
    // 카운트 순으로 정렬
    const sortedUnits = Array.from(unitMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // 상위 10개만 표시
    
    if (sortedUnits.length === 0) {
        unitList.appendChild(createElement('p', 'unit-empty-message', '픽 기록이 없습니다'));
        return;
    }
    
    sortedUnits.forEach(unit => {
        const chip = createElement('div', 'unit-chip');
        const chipAvatar = createElement('div', 'unit-chip-avatar', unit.name.substring(0, 2));
        const chipLabel = createElement('span', null, `${unit.name} (${unit.count})`);
        chip.append(chipAvatar, chipLabel);
        unitList.appendChild(chip);
    });
}

// 초기화
function init() {
    renderTierInfo();
    renderWinsLossesChart();
    renderMatches(0, false);
    renderTopChampion();
    setupInfiniteScroll();
}

// 전역 함수로 등록 (HTML에서 호출 가능하도록)
window.closeMatchDetails = closeMatchDetails;

// 페이지 로드 시 초기화
init();
