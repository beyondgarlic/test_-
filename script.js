const startPage = document.querySelector('#start-page');
const qnaPage = document.querySelector('#qna-page');
const resultPage = document.querySelector('#result-page');

const userChoices = []; // 사용자의 선택을 저장할 배열

const qnaList = [
    {
        q: '누구를 위한, 어떤 마음을 담은 상차림인가요?',
        a: [
            { answer: '오랜만에 모인 <b>가족</b>을 위한 따뜻하고 건강한 밥상', type: 'family' },
            { answer: '사랑하는 <b>연인</b>과 함께하는 오붓하고 로맨틱한 밥상', type: 'couple' },
            { answer: '소중한 <b>친구</b>들과의 신나고 즐거운 파티상', type: 'friends' }
        ]
    },
    {
        q: '상차림의 중심이 될 메인 요리를 골라주세요.',
        a: [
            { answer: '<b>의성 흑마늘</b>로 깊은 풍미를 더한 야들야들 <b>보쌈</b>', type: 'pork' },
            { answer: '<b>의성 빨간 고추</b>로 맛을 낸 매콤달콤 <b>찜닭</b>', type: 'chicken' }
        ]
    },
    {
        q: '입맛을 돋울 후식은 어떤게 좋을까요?',
        a: [
            { answer: '꿀과 함께 즐기는 아삭하고 달콤한 <b>의성 사과</b>', type: 'apple' },
            { answer: '입안 가득 퍼지는 새콤달콤함! <b>의성 자두</b>', type: 'plum' }
        ]
    }
];

const resultData = {
    family: {
        title: '정성 가득! 따뜻한 가족 건강 밥상',
        img: './img/result_family.png',
        desc: '의성의 건강한 재료들로 차려낸 정성 가득 한상입니다. 흑마늘 보쌈과 신선한 사과가 어우러져 온 가족의 입맛과 건강을 모두 사로잡을 거예요.',
        products: [
            { name: '의성 흑마늘 구매하기', link: 'https://shopping.naver.com/home' },
            { name: '의성 명품 사과 구매하기', link: 'https://shopping.naver.com/home' }
        ]
    },
    couple: {
        title: '둘이라서 더 특별한, 로맨틱 테이블',
        img: './img/result_couple.png',
        desc: '사랑하는 사람과 함께하는 특별한 순간. 매콤달콤한 찜닭과 새콤한 자두가 어우러져 잊지 못할 저녁을 선사할 거예요.',
        products: [
            { name: '의성 고춧가루 구매하기', link: 'https://shopping.naver.com/home' },
            { name: '의성 자두 구매하기', link: 'https://shopping.naver.com/home' }
        ]
    },
    friends: {
        title: '웃음이 끊이지 않는, 즐거운 파티 한상',
        img: './img/result_friends.png',
        desc: '친구들과의 즐거운 파티에 맛이 빠질 수 없죠! 모두가 좋아할 흑마늘 보쌈과 상큼한 자두 디저트로 파티 분위기를 한껏 끌어올려 보세요.',
        products: [
            { name: '의성 흑마늘 구매하기', link: 'https://shopping.naver.com/home' },
            { name: '의성 자두 구매하기', link: 'https://shopping.naver.com/home' }
        ]
    }
};


function start() {
    startPage.style.display = 'none';
    qnaPage.style.display = 'block';
    goNext(0);
}

function goNext(qIdx) {
    if (qIdx === qnaList.length) {
        goResult();
        return;
    }

    const q = qnaList[qIdx];
    const questionTitle = document.querySelector('#question-title');
    const answerBox = document.querySelector('#answer-box');
    const progress = document.querySelector('.progress');

    questionTitle.innerHTML = q.q;
    answerBox.innerHTML = ''; // 답변 버튼 초기화

    for (let i = 0; i < q.a.length; i++) {
        const answer = q.a[i];
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.innerHTML = answer.answer;
        answerBtn.addEventListener('click', () => {
            userChoices.push(answer.type);
            goNext(qIdx + 1);
        });
        answerBox.appendChild(answerBtn);
    }
    
    progress.style.width = ((qIdx + 1) / qnaList.length) * 100 + '%';
}

function goResult() {
    qnaPage.style.display = 'none';
    resultPage.style.display = 'block';
    
    // 첫 번째 선택(family, couple, friends)을 기반으로 결과 결정
    const finalResultType = userChoices[0];
    setResult(finalResultType);
}

function setResult(resultType) {
    const result = resultData[resultType];
    const resultTitle = document.querySelector('#result-title');
    const resultImg = document.querySelector('#result-img');
    const resultDesc = document.querySelector('#result-desc');
    const productButtons = document.querySelector('#product-buttons');

    resultTitle.innerHTML = result.title;
    resultImg.src = result.img;
    resultImg.alt = result.title;
    resultDesc.innerHTML = result.desc;

    productButtons.innerHTML = '';
    result.products.forEach(product => {
        const productBtn = document.createElement('button');
        productBtn.className = 'product-btn';
        productBtn.innerHTML = product.name;
        productBtn.onclick = () => window.open(product.link);
        productButtons.appendChild(productBtn);
    });
}

function restart() {
    // userChoices 초기화
    while(userChoices.length > 0) {
        userChoices.pop();
    }
    
    resultPage.style.display = 'none';
    startPage.style.display = 'block';
}
