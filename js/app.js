// 应用主逻辑
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let scoreChart = null;

// 页面切换
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// 开始测试
function startTest() {
    currentQuestion = 0;
    answers = new Array(questions.length).fill(null);
    showPage('test-page');
    renderQuestion();
}

// 渲染题目
function renderQuestion() {
    const question = questions[currentQuestion];

    // 更新进度
    document.getElementById('current-num').textContent = currentQuestion + 1;
    document.getElementById('total-num').textContent = questions.length;
    document.getElementById('progress-fill').style.width =
        ((currentQuestion + 1) / questions.length * 100) + '%';

    // 更新题目
    document.getElementById('question-text').textContent = question.text;

    // 渲染选项
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option' + (answers[currentQuestion] === index ? ' selected' : '');
        optionDiv.onclick = () => selectOption(index);

        optionDiv.innerHTML = `
            <div class="option-radio"></div>
            <div class="option-text">${option.text}</div>
        `;

        optionsContainer.appendChild(optionDiv);
    });

    // 更新按钮状态
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    updateNextButton();
}

// 选择选项
function selectOption(index) {
    answers[currentQuestion] = index;

    // 更新选中状态
    document.querySelectorAll('.option').forEach((opt, i) => {
        opt.classList.toggle('selected', i === index);
    });

    updateNextButton();

    // 自动跳转到下一题（延迟300ms）
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        }
    }, 300);
}

// 更新下一题按钮
function updateNextButton() {
    const nextBtn = document.getElementById('next-btn');
    const isLastQuestion = currentQuestion === questions.length - 1;
    const hasAnswer = answers[currentQuestion] !== null;

    nextBtn.disabled = !hasAnswer;
    nextBtn.querySelector('span').textContent = isLastQuestion ? '查看结果' : '下一题';
}

// 上一题
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// 下一题
function nextQuestion() {
    if (answers[currentQuestion] === null) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResult();
    }
}

// 显示结果
function showResult() {
    const totalScore = calculateScore(answers);
    const level = getLevel(totalScore);
    const data = getLevelData(level);

    showPage('result-page');

    // 动画显示分数
    animateScore(totalScore);

    // 更新层级信息
    document.getElementById('level-name').textContent = data.name;
    document.getElementById('level-badge').style.background =
        `linear-gradient(135deg, ${data.color}, ${adjustColor(data.color, 30)})`;

    document.getElementById('level-title').textContent = data.title;
    document.getElementById('level-emotion').textContent = data.emotion;
    document.getElementById('interpretation').textContent = data.interpretation;
    document.getElementById('suggestion').textContent = data.suggestion;

    // 高亮当前层级
    document.querySelectorAll('.scale-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.level) === level) {
            item.classList.add('active');
        }
    });

    // 绘制图表
    drawScoreChart(totalScore);
}

// 分数动画
function animateScore(targetScore) {
    const scoreElement = document.getElementById('total-score');
    let currentScore = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentScore = Math.round(targetScore * easeOut);

        scoreElement.textContent = currentScore;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// 绘制分数图表
function drawScoreChart(score) {
    const canvas = document.getElementById('scoreChart');
    const ctx = canvas.getContext('2d');

    // 清除之前的图表
    if (scoreChart) {
        scoreChart.destroy();
    }

    const maxScore = getMaxScore();
    const percentage = (score / maxScore) * 100;

    scoreChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: [
                    createGradient(ctx),
                    'rgba(167, 139, 250, 0.1)'
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            animation: {
                animateRotate: true,
                duration: 1500
            }
        }
    });
}

// 创建渐变色
function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(1, '#60a5fa');
    return gradient;
}

// 调整颜色亮度
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + amount);
    const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + amount);
    const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + amount);
    return `rgb(${r}, ${g}, ${b})`;
}

// 重新测试
function restartTest() {
    startTest();
}

// 分享结果
function shareResult() {
    const totalScore = calculateScore(answers);
    const level = getLevel(totalScore);
    const data = getLevelData(level);

    const shareText = `我在「能量频率层级测评」中获得了${totalScore}分，处于${data.name}状态！快来测测你的能量频率吧～`;

    // 尝试使用 Web Share API
    if (navigator.share) {
        navigator.share({
            title: '能量频率层级测评',
            text: shareText,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text + '\n' + window.location.href).then(() => {
            showToast('已复制到剪贴板，快去分享吧！');
        });
    } else {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text + '\n' + window.location.href;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('已复制到剪贴板，快去分享吧！');
    }
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 预加载
    document.getElementById('total-num').textContent = questions.length;
});
