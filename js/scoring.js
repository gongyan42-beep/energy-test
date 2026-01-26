// 评分和结果解读（基于霍金斯意识能量层级的平均值）
const levelRanges = {
    1: { min: 20, max: 199, label: "< 200" },
    2: { min: 200, max: 299, label: "200-299" },
    3: { min: 300, max: 399, label: "300-399" },
    4: { min: 400, max: 499, label: "400-499" },
    5: { min: 500, max: 700, label: "≥ 500" }
};

const levelData = {
    1: {
        name: "低频能量",
        title: "第一层：低频能量状态",
        emotion: "羞耻 · 内疚 · 冷漠 · 悲伤 · 恐惧 · 欲望 · 愤怒 · 骄傲",
        interpretation: "您的能量指数处于200以下，情绪容易被恐惧、悲伤或愤怒牵动，内在力量感较弱。这是一个需要稳定身心、重建安全感的阶段。重要的是先把自己照顾好，慢慢恢复内在能量。",
        suggestion: "建议您从以下方向开始：\n\n1. 保持规律作息与基础运动，让身体先恢复稳定\n2. 每天10分钟呼吸或冥想练习，增强情绪觉察\n3. 接触大自然与阳光，帮助提升整体能量\n4. 用温柔的方式对待自己，减少自我批评\n5. 学习包丰源老师的身心健康课程，建立身心连接",
        color: "#ef4444"
    },
    2: {
        name: "中低频能量",
        title: "第二层：中低频能量状态",
        emotion: "勇气 · 中立",
        interpretation: "您的能量指数在200-299之间，已经跨过‘勇气’临界点，具备面对生活的基本力量。此阶段更像“稳住自己”，能量开始回升，但仍可能被外界事件影响。",
        suggestion: "您可以进一步巩固：\n\n1. 练习情绪观察，把情绪当作信息而非敌人\n2. 建立小而确定的目标，提升行动感\n3. 适度表达真实感受，减少内耗\n4. 保持规律运动与清晰的生活节奏\n5. 结合包丰源老师的生命智慧，强化内在力量",
        color: "#f97316"
    },
    3: {
        name: "中频能量",
        title: "第三层：中频能量状态",
        emotion: "主动 · 接纳",
        interpretation: "您的能量指数在300-399之间，主动性增强，能够接纳现实并积极行动。您开始具备更清晰的心态，看待问题更客观，行动力也在提升。",
        suggestion: "继续提升的方法：\n\n1. 将目标拆解为具体行动，持续前进\n2. 练习“接纳与允许”，减少对抗与焦虑\n3. 多做有价值的连接与协作\n4. 规律冥想或静坐，稳定内在能量\n5. 深入学习包丰源老师的身心智慧，拓展认知",
        color: "#eab308"
    },
    4: {
        name: "中高频能量",
        title: "第四层：中高频能量状态",
        emotion: "理性 · 清明",
        interpretation: "您的能量指数在400-499之间，代表理性与清明的状态。您能够更清楚地理解自己与他人，做出稳定而智慧的选择，同时具备帮助他人的能力。",
        suggestion: "保持高质量状态：\n\n1. 深化学习与实践，持续精进思维能力\n2. 将爱与善意落实到行动中\n3. 保持谦逊与开放，允许自己不断成长\n4. 分享经验，帮助身边的人提升能量\n5. 与包丰源身心健康理念共振，实践身心合一",
        color: "#22c55e"
    },
    5: {
        name: "高频能量",
        title: "第五层：高频能量状态",
        emotion: "爱 · 喜悦 · 平和",
        interpretation: "您的能量指数在500及以上，内在更柔软而稳定，能够体验到爱、喜悦与平和。此阶段的影响力更大，您的存在本身就能带来正向影响。",
        suggestion: "持续保持并扩展影响力：\n\n1. 以爱与慈悲为出发点，滋养自己与他人\n2. 深化冥想或静心练习，稳固内在平和\n3. 在日常生活中持续觉察与感恩\n4. 用分享与服务扩大正向影响\n5. 与包丰源老师生命智慧理念共修共行",
        color: "#a78bfa"
    }
};

// 根据平均能量指数获取层级
function getLevel(avgScore) {
    if (avgScore < levelRanges[2].min) return 1;
    if (avgScore < levelRanges[3].min) return 2;
    if (avgScore < levelRanges[4].min) return 3;
    if (avgScore < levelRanges[5].min) return 4;
    return 5;
}

// 获取层级数据
function getLevelData(level) {
    return levelData[level];
}

// 获取层级范围
function getLevelRange(level) {
    return levelRanges[level];
}

// 计算总分
function calculateScore(answers) {
    let total = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] !== null && answers[i] !== undefined) {
            total += questions[i].options[answers[i]].score;
        }
    }
    return total;
}

// 计算平均能量指数
function calculateAverageScore(answers) {
    const total = calculateScore(answers);
    return Math.round(total / questions.length);
}

// 获取最高可能分数
function getMaxScore() {
    let max = 0;
    questions.forEach(q => {
        const maxOption = Math.max(...q.options.map(o => o.score));
        max += maxOption;
    });
    return max;
}

// 获取最低可能分数
function getMinScore() {
    let min = 0;
    questions.forEach(q => {
        const minOption = Math.min(...q.options.map(o => o.score));
        min += minOption;
    });
    return min;
}
