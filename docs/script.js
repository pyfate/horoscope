// 星座資料
const zodiacSigns = {
    'aries': { name: '牡羊座', dates: [321, 419] },
    'taurus': { name: '金牛座', dates: [420, 520] },
    'gemini': { name: '雙子座', dates: [521, 621] },
    'cancer': { name: '巨蟹座', dates: [622, 722] },
    'leo': { name: '獅子座', dates: [723, 822] },
    'virgo': { name: '處女座', dates: [823, 922] },
    'libra': { name: '天秤座', dates: [923, 1023] },
    'scorpio': { name: '天蠍座', dates: [1024, 1122] },
    'sagittarius': { name: '射手座', dates: [1123, 1221] },
    'capricorn': { name: '魔羯座', dates: [1222, 119] },
    'aquarius': { name: '水瓶座', dates: [120, 218] },
    'pisces': { name: '雙魚座', dates: [219, 320] }
};

// 性格特徵資料
const personalityTraits = {
    'aries': '熱情活潑、勇於冒險、領導力強，但有時過於衝動',
    'taurus': '穩重務實、享受生活、重視物質，但可能固執',
    'gemini': '靈活多變、善於溝通、思維敏捷，但可能優柔寡斷',
    'cancer': '重感情、富同情心、有保護慾，但易受情緒影響',
    'leo': '自信開朗、慷慨大方、有領袖魅力，但可能自我中心',
    'virgo': '細心謹慎、邏輯分明、追求完美，但易過分苛求',
    'libra': '優雅和諧、追求公平、善解人意，但猶豫不決',
    'scorpio': '神秘深邃、洞察力強、意志堅定，但容易鑽牛角尖',
    'sagittarius': '樂觀開朗、愛冒險、追求自由，但缺乏耐心',
    'capricorn': '務實穩重、有責任感、目標明確，但過於保守',
    'aquarius': '創新獨特、人道主義、思想前衛，但較難親近',
    'pisces': '富同情心、想像力豐富、浪漫感性，但現實感較弱'
};

function calculateHoroscope() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    if (!birthDate || isNaN(birthDate)) {
        alert('請輸入有效的出生日期！');
        return;
    }

    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const dateNum = month * 100 + day;

    // 計算太陽星座
    let sunSign = '';
    for (let sign in zodiacSigns) {
        const [start, end] = zodiacSigns[sign].dates;
        if ((dateNum >= start && dateNum <= end) || 
            (sign === 'capricorn' && (dateNum >= 1222 || dateNum <= 119))) {
            sunSign = sign;
            break;
        }
    }

    // 顯示結果
    document.getElementById('sunSign').textContent = zodiacSigns[sunSign].name;
    document.getElementById('moonSign').textContent = calculateMoonSign(birthDate);
    document.getElementById('personalityText').textContent = personalityTraits[sunSign];
    
    // 更新運勢
    updateYearlyFortune();
    updateMonthlyFortune();
    
    // 顯示結果區域
    document.getElementById('resultSection').style.display = 'block';
}

function calculateMoonSign(birthDate) {
    // 這裡使用簡化的月亮星座計算方法
    const moonSigns = Object.values(zodiacSigns).map(sign => sign.name);
    const index = (birthDate.getDate() + birthDate.getMonth()) % 12;
    return moonSigns[index];
}

function updateYearlyFortune() {
    const year = document.getElementById('yearSelect').value;
    const sunSign = document.getElementById('sunSign').textContent;
    
    // 根據年份和星座生成運勢
    document.getElementById('loveFortuneText').textContent = generateLoveFortune(sunSign, year);
    document.getElementById('careerFortuneText').textContent = generateCareerFortune(sunSign, year);
    document.getElementById('moneyFortuneText').textContent = generateMoneyFortune(sunSign, year);
    document.getElementById('healthFortuneText').textContent = generateHealthFortune(sunSign, year);
}

function updateMonthlyFortune() {
    const month = document.getElementById('monthSelect').value;
    const sunSign = document.getElementById('sunSign').textContent;
    
    document.getElementById('monthlyFortuneText').textContent = 
        generateMonthlyFortune(sunSign, month);
}

// 首先定義一些通用的函數來生成運勢內容
function getYearRange() {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear + 1];
}

// 根據星座和年份生成運勢描述
function generateYearlyFortune(sign, year, type) {
    const baseDescriptions = {
        'love': {
            '牡羊座': '感情運勢活躍，易受異性青睞',
            '金牛座': '感情穩定發展，重視承諾',
            '雙子座': '桃花運旺盛，社交場合機會多',
            '巨蟹座': '感情深刻，易陷入浪漫',
            '獅子座': '魅力四射，感情主動',
            '處女座': '感情細膩，重視品質',
            '天秤座': '浪漫多情，享受追求過程',
            '天蠍座': '感情專一，重視承諾',
            '射手座': '感情自由，享受冒險',
            '魔羯座': '感情務實，講求穩定',
            '水瓶座': '獨特魅力，創新思維',
            '雙魚座': '感情豐富，富有同理心'
        },
        'career': {
            '牡羊座': '事業充滿活力，勇於挑戰',
            '金牛座': '工作穩定，注重實效',
            '雙子座': '職場靈活，善於溝通',
            '巨蟹座': '工作細心，重視團隊',
            '獅子座': '領導能力強，創意十足',
            '處女座': '專業細緻，完美主義',
            '天秤座': '人際關係好，善於協調',
            '天蠍座': '專注投入，策略性強',
            '射手座': '視野開闊，充滿熱情',
            '魔羯座': '目標明確，循序漸進',
            '水瓶座': '創新思維，獨特見解',
            '雙魚座': '直覺敏銳，富有創意'
        },
        'money': {
            '牡羊座': '財運活躍，投資果斷',
            '金牛座': '理財穩健，善於累積',
            '雙子座': '財運多變，機會多樣',
            '巨蟹座': '理財謹慎，重視保障',
            '獅子座': '財運亮眼，投資大方',
            '處女座': '理財細心，注重細節',
            '天秤座': '財運平衡，享受生活',
            '天蠍座': '理財精明，善於理財',
            '射手座': '財運樂觀，投資冒險',
            '魔羯座': '理財保守，長期投資',
            '水瓶座': '財運創新，投資獨特',
            '雙魚座': '理財直覺，靈活運用'
        },
        'health': {
            '牡羊座': '精力充沛，注意頭部',
            '金牛座': '體質穩定，注意頸部',
            '雙子座': '活力充足，注意呼吸',
            '巨蟹座': '情緒影響健康，注意胃部',
            '獅子座': '體能良好，注意心臟',
            '處女座': '健康細心，注意腸胃',
            '天秤座': '體態優美，注意腰部',
            '天蠍座': '恢復力強，注意生殖',
            '射手座': '活力旺盛，注意髖部',
            '魔羯座': '耐力持久，注意關節',
            '水瓶座': '精神活躍，注意循環',
            '雙魚座': '體質敏感，注意足部'
        }
    };

    // 根據年份生成具體運勢
    const yearOffset = year - new Date().getFullYear();
    const intensity = yearOffset === 0 ? '特別' : '較為';
    const timing = yearOffset === 0 ? '上半年' : '下半年';
    
    const baseDesc = baseDescriptions[type][sign];
    const yearSpecific = `，${timing}${intensity}明顯`;
    
    // 根據不同類型添加特定建議
    const suggestions = {
        'love': '，建議把握良緣',
        'career': '，多加努力必有收穫',
        'money': '，注意理財規劃',
        'health': '，保持規律作息'
    };

    return baseDesc + yearSpecific + suggestions[type];
}

// 生成月運勢
function generateMonthlyDetail(sign, year, month) {
    const baseTraits = {
        '牡羊座': ['活力', '衝勁', '領導', '創新'],
        '金牛座': ['穩重', '務實', '享受', '堅持'],
        '雙子座': ['靈活', '溝通', '學習', '適應'],
        '巨蟹座': ['關懷', '直覺', '保護', '情感'],
        '獅子座': ['自信', '創意', '表現', '熱情'],
        '處女座': ['細心', '分析', '完美', '服務'],
        '天秤座': ['和諧', '公平', '藝術', '社交'],
        '天蠍座': ['專注', '洞察', '意志', '重生'],
        '射手座': ['冒險', '哲學', '自由', '樂觀'],
        '魔羯座': ['負責', '紀律', '野心', '實際'],
        '水瓶座': ['獨特', '創新', '理想', '友誼'],
        '雙魚座': ['同理', '藝術', '靈感', '奉獻']
    };

    const traits = baseTraits[sign];
    const traitIndex = (month + year) % traits.length;
    const mainTrait = traits[traitIndex];

    // 根據月份特性生成運勢
    const seasonality = Math.floor((month - 1) / 3);
    const seasons = ['春', '夏', '秋', '冬'];
    const season = seasons[seasonality];

    return `${year}年${month}月運勢以${mainTrait}為主，${season}季特質明顯。工作上要發揮${traits[(traitIndex + 1) % 4]}的特點，感情方面注意${traits[(traitIndex + 2) % 4]}的表現，財運則要把握${traits[(traitIndex + 3) % 4]}的機會。`;
}

function generateLoveFortune(sign, year) {
    return generateYearlyFortune(sign, year, 'love');
}

function generateCareerFortune(sign, year) {
    return generateYearlyFortune(sign, year, 'career');
}

function generateMoneyFortune(sign, year) {
    return generateYearlyFortune(sign, year, 'money');
}

function generateHealthFortune(sign, year) {
    return generateYearlyFortune(sign, year, 'health');
}

function generateMonthlyFortune(sign, month) {
    const year = document.getElementById('yearSelect').value;
    return generateMonthlyDetail(sign, parseInt(year), parseInt(month));
}

// 初始化年份選擇
function initializeYearSelect() {
    const yearSelect = document.getElementById('yearSelect');
    const [currentYear, nextYear] = getYearRange();
    
    yearSelect.innerHTML = ''; // 清空現有選項
    
    [currentYear, nextYear].forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}年`;
        yearSelect.appendChild(option);
    });
}

// 頁面載入時初始化年份
window.onload = function() {
    initializeYearSelect();
};

// 填充時區選項
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timezoneSelect = document.getElementById('timezone');

// 獲取所有時區
const timeZones = Intl.supportedValuesOf('timeZone');
timeZones.forEach(zone => {
    const option = new Option(zone, zone);
    timezoneSelect.add(option);
});

// 設置預設時區
timezoneSelect.value = timezone;

// 填充年份選項
const yearSelect = document.getElementById('year');
const currentYear = new Date().getFullYear();
for (let year = currentYear; year <= currentYear + 5; year++) {
    const option = new Option(year + '年', year);
    yearSelect.add(option);
}

// 處理出生時間選項的顯示/隱藏
document.getElementById('hasTime').addEventListener('change', function() {
    document.getElementById('timeGroup').style.display = this.checked ? 'block' : 'none';
    if (!this.checked) {
        document.getElementById('birthTime').value = '';
    }
});

// 處理年月選項的顯示/隱藏
document.getElementById('includeYearMonth').addEventListener('change', function() {
    document.getElementById('yearMonthGroup').style.display = this.checked ? 'block' : 'none';
    if (!this.checked) {
        document.getElementById('year').value = '';
        document.getElementById('month').value = '';
    }
});

function createAnalysisHTML(title, analysis, isMainSection = true) {
    if (!analysis) return '';
    
    // 添加除錯資訊
    console.log('Title:', title);
    console.log('Analysis:', JSON.stringify(analysis, null, 2));
    
    const className = isMainSection ? 'zodiac-analysis' : 'analysis-section';
    return `
        <div class="${className}">
            <h3>${title}</h3>
            ${Object.entries(analysis).map(([key, value]) => {
                console.log('Key:', key, 'Value:', JSON.stringify(value, null, 2));
                
                if (key === '流年運勢') {
                    return `
                        <div class="analysis-section">
                            <h4>${key}</h4>
                            <p><strong>整體運勢：</strong> ${value.整體運勢}</p>
                            <div class="monthly-forecast">
                                <h5>重點月份預測</h5>
                                <ul>
                                    ${Object.entries(value.重點月份).map(([month, prediction]) => 
                                        `<li><strong>${month}：</strong>${prediction}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                } else if (typeof value === 'object') {
                    return `
                        <div class="analysis-section">
                            <h4>${key}</h4>
                            <ul>
                                ${Object.entries(value).map(([subKey, subValue]) => 
                                    `<li><strong>${subKey}：</strong> ${subValue}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    `;
                } else {
                    return `
                        <div class="analysis-section">
                            <p><strong>${key}：</strong> ${value}</p>
                        </div>
                    `;
                }
            }).join('')}
        </div>
    `;
}

document.getElementById('birthForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const birthDate = document.getElementById('birthDate').value;
    const hasTime = document.getElementById('hasTime').checked;
    const birthTime = hasTime ? document.getElementById('birthTime').value : null;
    const selectedTimezone = document.getElementById('timezone').value;
    const includeYearMonth = document.getElementById('includeYearMonth').checked;
    const year = includeYearMonth ? document.getElementById('year').value : null;
    const month = includeYearMonth ? document.getElementById('month').value : null;

    try {
        const response = await fetch('https://zodiac-eosin.vercel.app/api/calculate-signs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: birthDate,
                time: birthTime,
                timezone: selectedTimezone,
                year: year ? parseInt(year) : null,
                month: month ? parseInt(month) : null
            })
        });

        const data = await response.json();
        const resultDiv = document.getElementById('result');
        
        let html = createAnalysisHTML('太陽星座：' + data.sun_sign, data.sun_analysis);
        
        if (birthTime && data.moon_sign) {
            html += createAnalysisHTML('月亮星座：' + data.moon_sign, data.moon_analysis);
            html += createAnalysisHTML('綜合分析', data.combined_analysis);
        }
        
        if (year) {
            html += createAnalysisHTML(`${year}年運勢預測`, data.yearly_forecast);
            if (month) {
                html += createAnalysisHTML(`${year}年${month}月運勢預測`, data.monthly_forecast);
            }
        }
        
        resultDiv.innerHTML = html;
        resultDiv.classList.add('has-content');

    } catch (error) {
        console.error('Error:', error);
        alert('計算出錯，請稍後再試');
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('has-content');
    }
}); 
