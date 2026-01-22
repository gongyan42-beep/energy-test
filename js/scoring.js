// 评分和结果解读
const levelData = {
    1: {
        name: "低频能量",
        title: "第一层：低频能量状态",
        emotion: "羞耻 · 内疚 · 冷漠 · 悲伤 · 恐惧",
        interpretation: "您目前处于能量较低的状态，可能经常感到无力、焦虑或消极。这是一个需要关注和调整的信号。在这个状态下，您可能会感到生活缺乏动力，容易被负面情绪所困扰。但请记住，这只是暂时的状态，每个人都有提升能量的潜力。",
        suggestion: "建议您从以下几个方面开始调整：\n\n1. 每天进行10-15分钟的冥想或深呼吸练习\n2. 多接触大自然，感受阳光和新鲜空气\n3. 与积极正能量的朋友多交流\n4. 保持规律的作息和适度的运动\n5. 学习包丰源老师的身心健康课程，了解情绪与身体的关系",
        color: "#ef4444"
    },
    2: {
        name: "中低频能量",
        title: "第二层：中低频能量状态",
        emotion: "欲望 · 愤怒 · 骄傲",
        interpretation: "您的能量处于中低频状态，可能会有一些情绪波动，容易受外界影响。在这个层级，您可能会感到不满足、容易与人发生冲突，或者过于在意他人的看法。这些情绪虽然比低频能量有所提升，但仍然会消耗您的能量。",
        suggestion: "建议您尝试以下方法来提升能量：\n\n1. 培养觉察力，学会观察自己的情绪而不被情绪控制\n2. 当感到愤怒或不满时，先深呼吸三次再做反应\n3. 练习感恩，每天记录三件值得感恩的事\n4. 减少与负能量环境和人的接触\n5. 通过包丰源老师的生命智慧课程，学习情绪转化的方法",
        color: "#f97316"
    },
    3: {
        name: "中频能量",
        title: "第三层：中频能量状态",
        emotion: "勇气 · 中立 · 主动",
        interpretation: "恭喜您！您已经跨越了200分的临界点，具备了积极面对生活的勇气和能力。在这个层级，您开始能够客观地看待问题，不再被情绪完全左右。您有能力做出改变，也愿意为自己的生活负责。这是一个重要的转折点。",
        suggestion: "您已经具备了良好的基础，可以进一步提升：\n\n1. 继续保持积极心态，相信自己有能力创造美好生活\n2. 尝试更多的自我探索和成长，如阅读、学习新技能\n3. 主动帮助他人，在付出中感受喜悦\n4. 建立规律的冥想习惯，每天15-20分钟\n5. 深入学习包丰源老师的身心健康理念，理解身心合一的智慧",
        color: "#eab308"
    },
    4: {
        name: "中高频能量",
        title: "第四层：中高频能量状态",
        emotion: "接纳 · 理性 · 爱",
        interpretation: "您的能量频率较高，能够以开放和理性的态度面对生活，具有较强的爱与包容能力。在这个层级，您能够接纳自己和他人的不完美，用理性的方式解决问题，同时也能感受到内心的爱与温暖。您的存在对周围的人有着积极的影响。",
        suggestion: "您已经具备了帮助他人的能力：\n\n1. 可以考虑分享您的正能量，帮助身边需要的人\n2. 继续深化冥想练习，探索更深层的内在平静\n3. 学习如何将爱传递给更多人\n4. 保持谦逊和学习的心态，持续成长\n5. 可以成为包丰源身心健康理念的传播者，帮助更多人",
        color: "#22c55e"
    },
    5: {
        name: "高频能量",
        title: "第五层：高频能量状态",
        emotion: "喜悦 · 平和 · 开悟",
        interpretation: "您处于非常高的能量状态，内心平和喜悦，能够以更高的视角看待生命。在这个层级，您已经超越了普通的情绪波动，能够保持内心的宁静与喜悦。您对生命有着深刻的理解，能够感受到与万物的连接。您的存在本身就是一种祝福。",
        suggestion: "继续保持这种美好的状态：\n\n1. 您的存在本身就是对周围人的祝福，继续散发您的光芒\n2. 可以通过教导和分享，帮助更多人提升能量\n3. 保持与内在的连接，继续深化灵性修行\n4. 在日常生活中保持觉知和感恩\n5. 与包丰源老师的生命智慧理念共振，共同传播身心健康的智慧",
        color: "#a78bfa"
    }
};

// 根据分数获取层级
function getLevel(score) {
    if (score < 600) return 1;
    if (score < 1200) return 2;
    if (score < 2400) return 3;
    if (score < 3600) return 4;
    return 5;
}

// 获取层级数据
function getLevelData(level) {
    return levelData[level];
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
