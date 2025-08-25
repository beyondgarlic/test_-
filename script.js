// --- DOM 요소 선택 ---
const startPage = document.querySelector('#start-page');
const gamePage = document.querySelector('#game-page');
const resultPage = document.querySelector('#result-page');

const timerDisplay = document.querySelector('#timer');
const scoreDisplay = document.querySelector('#score');
const feverGauge = document.querySelector('#fever-gauge');
const feverText = document.querySelector('#fever-text');
const peachButton = document.querySelector('#peach-button');
const instructionText = document.querySelector('.instruction-text');

const finalScoreDisplay = document.querySelector('#final-score');
const resultRank = document.querySelector('#result-rank');
const contributionText = document.querySelector('#contribution-text');

// --- 게임 상태 변수 ---
let score = 0;
let timeLeft = 10;
let timerId = null;
let feverCount = 0;
let isFeverTime = false;
let chosenFaction = '';

// --- 게임 로직 함수 ---

// 1. 진영 선택 및 게임 시작
function chooseFaction(faction) {
    chosenFaction = faction;
    startPage.style.display = 'none';
    gamePage.style.display = 'block';
    startGame();
}

// 2. 게임 시작 처리
function startGame() {
    // 변수 초기화
    score = 0;
    timeLeft = 10;
    feverCount = 0;
    isFeverTime = false;

    // UI 초기화
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft.toFixed(1);
    feverGauge.style.width = '0%';
    feverText.style.opacity = 0;
    document.body.style.backgroundColor = 'var(--background-color)';
    instructionText.style.display = 'block'; // 안내 문구 다시 보이게 설정
    
    // 타이머 시작
    timerId = setInterval(updateTimer, 100);
}

// 3. 타이머 업데이트 (0.1초마다 실행)
function updateTimer() {
    timeLeft -= 0.1;
    timerDisplay.innerText = timeLeft.toFixed(1);

    if (timeLeft <= 0) {
        endGame();
    }
}

// 4. 복숭아 버튼 탭(클릭) 이벤트
peachButton.addEventListener('click', () => {
    if (timeLeft > 0) {
        // 첫 탭일 때 안내 문구 숨기기
        if (score === 0) {
            instructionText.style.display = 'none';
        }

        // 점수 획득
        score += isFeverTime ? 5 : 1;
        scoreDisplay.innerText = score;

        // 피버 게이지 상승 (피버 아닐 때만)
        if (!isFeverTime) {
            feverCount++;
            feverGauge.style.width = (feverCount / 20) * 100 + '%'; // 20번 탭하면 피버
            if (feverCount >= 20) {
                startFever();
            }
        }
    }
});

// 5. 피버 모드 시작
function startFever() {
    isFeverTime = true;
    feverText.style.opacity = 1;
    document.body.style.backgroundColor = 'var(--fever-color)';
}

// 6. 게임 종료 처리
function endGame() {
    clearInterval(timerId); // 타이머 중지
    timerDisplay.innerText = '0.0';

    gamePage.style.display = 'none';
    resultPage.style.display = 'block';

    // 결과 표시
    finalScoreDisplay.innerText = score;
    resultRank.innerText = getResultRank(score);
    
    const factionName = chosenFaction === 'soft' ? '물복파' : '딱복군';
    contributionText.innerText = `당신의 복숭아력 ${score}점이 ${factionName} 총점수에 기여했습니다!`;
}

// 7. 점수에 따른 등급(칭호) 반환
function getResultRank(score) {
    if (score <= 50) return "복숭아 병아리";
    if (score <= 100) return "복숭아 하수";
    if (score <= 150) return "복숭아 고수";
    return "인간 복숭아";
}

// 8. 다시 시작
function restart() {
    resultPage.style.display = 'none';
    startPage.style.display = 'block';
}

// 9. 쇼핑몰로 이동 (본인의 쇼핑몰 주소로 변경하세요)
function goToShop() {
    window.open('https://esmall.cyso.co.kr/shop/list.php?ca_id=es4040');
}
