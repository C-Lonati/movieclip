const header = document.getElementById('header');
const story = document.getElementById('story');
const casting = document.getElementById('casting');
const interview = document.getElementById('interview');
const review = document.getElementById('review');
const soundTrack = document.getElementById('soundTrack');
const storys = document.querySelectorAll('.story');
const section = document.querySelectorAll('section');
const epi01 = storys[0].querySelector('.script');
const storySlide = document.querySelector('#storySlide');
const actor = document.querySelectorAll('.actor');
const moreBtn = document.querySelectorAll('.moreBtn');
const interviewHide = document.querySelectorAll('.interviewHide');
const slideIn = document.querySelector('.slideIn');
const storyTab = document.querySelector('#header .storyTab');
const castingTab = document.querySelector('#header .castingTab');
const interviewTab = document.querySelector('#header .interviewTab');
const reviewTab = document.querySelector('#header .reviewTab');
const soundTrackTab = document.querySelector('#header .soundTrackTab');
const allTab = document.querySelectorAll('.lnb>li');
const reviewCount = document.querySelectorAll('.reviewList .review').length;
const reviewList = document.querySelector('.reviewList');
let epi = [];
let sectionTop = [];
let storyIndex = 0;
let actorHeight = window.innerHeight * 4;//actor.length;
let reviewWidth = reviewCount * 350 + reviewCount-1 * 40;
let winInner = window.innerWidth/2 + 100;
let mobile = false;
for(let i = 0; i < actor.length;i++){
    //actor[i].style.height = window.innerHeight + 'px';
    actor[i].style.top = window.innerHeight * i + 'px';
    actor[i].style.zIndex = i*10;
}

// 브라우저 크기 계산 및 초기화
// Calculate the dimensions of the page
for(let i=0; i<storys.length; i++){
    epi[i] = window.innerWidth * i * 1.5 - 325;
    sectionTop[i] = window.innerWidth * 1.5 * i;
    storys[i].style.left = window.innerWidth * i * 1.5 + 'px';
    storys[i].style.zIndex = i * 10 + 5;
}
let storyHeight;
if(window.innerWidth >= 1200){
    storyHeight = window.innerWidth * (storys.length - 1) * 1.5;
}else if(window.innerWidth >= 768){
    storyHeight = window.innerWidth * (storys.length - 1) * 1.5 + 300;
}else mobile = true;
casting.style.top = storyHeight + window.innerWidth + 'px';
reviewList.style.width = reviewWidth + 'px';
if (!mobile) {
    interview.style.paddingTop = storyHeight + actorHeight + window.innerWidth + 'px';
    soundTrack.style.paddingTop = reviewWidth + (window.innerWidth >= 1200 ? 0 : winInner) + 'px';
}
let interviewHeight;
interviewHeight = Number(getComputedStyle(interview).height.substring(0, getComputedStyle(interview).height.length - 2));


// 스크롤 위치를 통한 사이드바 네비게이션 탭 위치 계산
// Side navigation bar tab calc
let loading = false;
for(let i=0; i < allTab.length; i++){
    allTab[i].addEventListener('click', function(){
        window.scrollTo({top : scrollTab(i),behavior : 'smooth'});
    });
}
function scrollTab(i){
    switch(i){
        case 0 : return 0;
        case 1 : return storyHeight + window.innerWidth +1;
        case 2 : return storyHeight + window.innerWidth + actorHeight +1;
        case 3 : return interviewHeight + 1;
        case 4 : return interviewHeight + window.innerWidth + window.innerHeight + 1;
        default : alert('에러, 관리자에게 문의하세요. 에러 명칭 : scrollTab'); break;
    }
}


// 마우스 스크롤 이벤트
// mouse scroll event controls
window.addEventListener('scroll',()=>{
    if(mobile == true){
        soundTrack.innerHTML = `<ul><li><a href='https://www.youtube.com/watch?v=_latgzoqoSE'><img src="images/sum1.jpg" alt="썸네일 이미지">ost 1 : the luckiest-BenFolds</a></li><li><a href='https://www.youtube.com/watch?v=wrFsC1ldJEc'><img src="images/sum2.jpg" alt="썸네일 이미지">ost 2 : Il Mondo </a></li><li><a href='https://www.youtube.com/watch?v=atfsD6CjS80'><img src="images/sum3.jpg" alt="썸네일 이미지">ost 3 : Mid Air - Paul Buchanan</a></li></ul>`
        return;
    } 
    // 사이드 바 네비게이션 제어s
    // Side navigation bar controls
    if(window.scrollY <= storyHeight + window.innerWidth){
        allTab.forEach((e) =>{
            e.classList.remove('view');
        });
        storyTab.classList.add('view');
    }else if(window.scrollY <= storyHeight + window.innerWidth + actorHeight){
        allTab.forEach((e) =>{
            e.classList.remove('view');
        });
        castingTab.classList.add('view');
    }
    else if(window.scrollY <= interviewHeight){
        allTab.forEach((e) =>{
            e.classList.remove('view');
        });
        interviewTab.classList.add('view');
    }else if(window.scrollY <= interviewHeight + window.innerWidth + window.innerHeight){
        allTab.forEach((e) =>{
            e.classList.remove('view');
        });
        reviewTab.classList.add('view');
    }else {
        allTab.forEach((e) =>{
            e.classList.remove('view');
        });
        soundTrackTab.classList.add('view');
    }
    let actorTop = window.scrollY - storyHeight - window.innerHeight - window.innerHeight;

    
    // storySlide 초기 위치 설정
    // Set initial static positions for storySlide elements
    storySlide.style.left = -1 * window.scrollY + 'px';
    slideIn.style.right = window.scrollY - window.innerHeight * 12.8 + 'px';
    if(slideIn.style.right.substring(0, slideIn.style.right.length - 2) > 20)
        slideIn.style.right = '20px';
    epi01.style.top = window.scrollY * 0.5 + window.innerHeight * 0.2 + 'px';
    epi01.querySelector('span').style.top = window.scrollY + 'px';
    for(let i = 1; i < epi.length; i++){
        let temp = [];
        temp[i] = storys[i].querySelectorAll('.script');
        temp[i].forEach((e) => {
            if(window.innerWidth >= 1200)
                e.style.left = window.scrollY - epi[i] + 'px';
            else e.style.left = window.scrollY - epi[i] - (window.innerWidth / 2) + 'px';
            if (window.scrollY - epi[i] > 1500) {
                e.style.display = 'none';
            }
            else {
                e.style.display = 'block';
            }
        });
    }
    for (let i = 0; i < storys.length; i++) {
        if (window.scrollY > sectionTop[i] && window.scrollY < sectionTop[i + 1]) {
            storys[i].style.position = 'fixed';
            storys[i].style.left = 0;
        } else if(sectionTop[i+1] == null && window.scrollY > sectionTop[i] && window.scrollY < sectionTop[i] + window.innerWidth){
            storys[i].style.position = 'fixed';
            storys[i].style.left = 0;
        }else {
            storys[i].style.position = 'absolute';
            storys[i].style.left = sectionTop[i] + 'px';
        }
    }
    // 스크롤 위치에 따른 영상 비동기 로딩
    // Asynchronously load and inject video iframes to optimize performance
    // Load videos based on scroll position
    // 스크롤 위치에 따른 슬라이드 정지 제어
    // Toggle 'stop' state based on scroll threshold
    if(window.scrollY > storyHeight){
        story.classList.add('stop');
        // 프리징 발생
        /* 
        if (!loading) soundTrack.innerHTML = `<iframe width="1120" height="730" src="https://www.youtube.com/embed/_latgzoqoSE?si=_MeqFqW9yxa7Ira7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><iframe width="1120" height="730" src="https://www.youtube.com/embed/wrFsC1ldJEc?si=XbBQws6AjhPReo4-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><iframe width="1120" height="730" src="https://www.youtube.com/embed/atfsD6CjS80?si=v2SUCRLnz3Sdpwi6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
            loading = true;
        */
        // 원인 : iframe생성보다 loading의 변수 변경이 후순위였기에 영상 재생 시 프리징 문제가 발생
        // 해결 : loading변수값 변경을 iframe생성보다 이전으로 둬서 해결
        if (!loading) {
            loading = true;
            soundTrack.innerHTML = `<iframe width="1120" height="730" src="https://www.youtube.com/embed/_latgzoqoSE?si=_MeqFqW9yxa7Ira7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><iframe width="1120" height="730" src="https://www.youtube.com/embed/wrFsC1ldJEc?si=XbBQws6AjhPReo4-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><iframe width="1120" height="730" src="https://www.youtube.com/embed/atfsD6CjS80?si=v2SUCRLnz3Sdpwi6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        }
    }else {
        story.classList.remove('stop');
    }

    
    // section#review 스크롤 제어
    // section#review scroll control
    if(window.scrollY > interviewHeight + 170 && window.scrollY < interviewHeight + reviewWidth - winInner){
        review.style.position = 'fixed';
        review.style.left = 0;
        review.style.top = 0;
        reviewList.style.left = interviewHeight + 170 - window.scrollY + 'px';
    }else if(window.scrollY < interviewHeight + 170){
        review.style.position = 'absolute';
        review.style.top = interviewHeight + 170 + 'px';
        reviewList.style.left = 0;
    }else if(window.scrollY > interviewHeight + window.innerHeight){
        review.style.position = 'absolute';
        review.style.top = interviewHeight + reviewWidth - winInner + 'px';
        reviewList.style.left = winInner - reviewWidth + 'px';
    }


    // section#caster 및 .actor 위치 제어
    // Set initial static positions for section#caster and .actor
    for(let i = 0; i < actor.length;i++){
        if(actor[i].style.top.substring(0, actor[i].style.top.length - 2) < actorTop && actorTop > window.innerHeight * i && actorTop < actorHeight - window.innerHeight && window.innerWidth >= 1200){
            actor[i].style.position = 'fixed';
            actor[i].style.top = 0;
        }
        else {
            actor[i].style.position = 'absolute';
            actor[i].style.top = window.innerHeight * i + 'px';
        }
    }
});

//interview 더보기/원문보기 버튼 제어
//interview moreBtn button control
moreBtn[0].addEventListener('click', ()=>{
    interviewHide.forEach(e => {
        e.style.display = 'block';
    });
    moreBtn[0].style.display = 'none';
    moreBtn[1].style.display = 'block';
    interviewHeight = Number(getComputedStyle(interview).height.substring(0, getComputedStyle(interview).height.length - 2));
    review.style.top = interviewHeight + 170 + 'px';
});
moreBtn[1].addEventListener('click', ()=>{
    interviewHide.forEach(e => {
        e.style.display = 'none';
    });
    moreBtn[1].style.display = 'none';
    moreBtn[0].style.display = 'block';
    interviewHeight = Number(getComputedStyle(interview).height.substring(0, getComputedStyle(interview).height.length - 2));
    review.style.top = interviewHeight + 170 + 'px';
});