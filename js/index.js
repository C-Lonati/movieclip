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
const img = document.querySelectorAll('#story .story img');
const actor = document.querySelectorAll('.actor');
const moreBtn = document.querySelectorAll('.moreBtn');
const interviewHide = document.querySelectorAll('.interviewHide');
const slideIn = document.querySelector('.slideIn');
const stroyTab = document.querySelector('#header .storyTab');
const castingTab = document.querySelector('#header .castingTab');
const interviewTab = document.querySelector('#header .interviewTab');
const reviewTab = document.querySelector('#header .reviewTab');
const soundTrackTab = document.querySelector('#header .soundTrackTab');
const allTab = document.querySelectorAll('.lnb>li');
let epi = [];
let sectionTop = [];
let storyIndex = 0;
let actorHeight = window.innerHeight * 4;//actor.length;
section.forEach((e)=>{
    e.style.width = window.innerWidth + 'px';
});
for(let i = 0; i < actor.length;i++){
    actor[i].style.height = window.innerHeight + 'px';
    actor[i].style.top = window.innerHeight * i + 'px';
    actor[i].style.zIndex = i*10;
}
for(let i=0; i<storys.length; i++){
    storys[i].style.height = window.innerHeight + 'px';
    epi[i] = window.innerWidth * i * 1.5 - 325;
    sectionTop[i] = window.innerWidth * 1.5 * i;
    storys[i].style.width = window.innerWidth - 15 + 'px';
    storys[i].style.left = window.innerWidth * i * 1.5 + 'px';
    storys[i].style.zIndex = i * 10 + 5;
}
let storyHeight = window.innerWidth * (storys.length - 1) * 1.5;
story.style.height = storyHeight + 'px';
casting.style.top = storyHeight + window.innerWidth + 'px';
casting.style.height = actorHeight + 'px';
interview.style.paddingTop = storyHeight + actorHeight + window.innerWidth + 'px';
soundTrack.style.paddingTop = window.innerWidth + window.innerHeight + 'px';
let interviewHeight = Number(getComputedStyle(interview).height.substring(0, getComputedStyle(interview).height.length - 2));
header.style.height = window.innerHeight + 'px';
img.forEach((e)=>{
    //e.style.marginTop = getComputedStyle(e).height.replace([/^0-9/], '')/-2 + 'px';
    let temp = getComputedStyle(e).height.substring(0,3);
    e.style.marginTop = temp/-2 + 'px';
});
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
        default : alert('에러, 관리자에게 문의하세요.'); break;
    }
}
window.addEventListener('scroll',()=>{
    if(window.scrollY <= storyHeight + window.innerWidth){
        allTab.forEach((e) =>{
            e.classList.remove('view');
        });
        stroyTab.classList.add('view');
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
            e.style.left = window.scrollY - epi[i] + 'px';
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
    if(window.scrollY > storyHeight){
        story.classList.add('stop');
        if (!loading) soundTrack.innerHTML = `<iframe width="1120" height="730" src="https://www.youtube.com/embed/_latgzoqoSE?si=_MeqFqW9yxa7Ira7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><iframe width="1120" height="730" src="https://www.youtube.com/embed/wrFsC1ldJEc?si=XbBQws6AjhPReo4-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><iframe width="1120" height="730" src="https://www.youtube.com/embed/atfsD6CjS80?si=v2SUCRLnz3Sdpwi6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        loading = true;
    }else {
        story.classList.remove('stop');
    }
    if(window.scrollY > interviewHeight + 170 && window.scrollY < interviewHeight + window.innerWidth){
        review.style.position = 'fixed';
        review.style.left = 0;
        review.style.top = 0;
        review.querySelector('.reviewList').style.left = interviewHeight + 170 - window.scrollY + 'px';
    }else if(window.scrollY < interviewHeight + 170){
        review.style.position = 'absolute';
        review.style.top = interviewHeight + 170 + 'px';
    }else if(window.scrollY > interviewHeight + window.innerHeight){
        review.style.position = 'absolute';
        review.style.top = interviewHeight + window.innerWidth + 'px';
        review.querySelector('.reviewList').style.left = -1730 + 'px';
    }
    for(let i = 0; i < actor.length;i++){
        if(actor[i].style.top.substring(0, actor[i].style.top.length - 2) < actorTop && actorTop > window.innerHeight * i && actorTop < actorHeight - window.innerHeight){
            actor[i].style.position = 'fixed';
            actor[i].style.top = 0;
        }
        else {
            actor[i].style.position = 'absolute';
            actor[i].style.top = window.innerHeight * i + 'px';
        }
    }
});
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
for(let i = 0; i < storys.length; i++){
    let clock = storys[i].querySelector('.clock');
    if(clock){
        storys[i].addEventListener('mouseover', ()=>{
            clock.style.transform = 'rotate(' + -720 + 'deg)';
            clock.style.transition = 'transform ease 0s';
            setTimeout(()=>{
                clock.style.transform = 'rotate(' + 0 + 'deg)';
                clock.style.transition = 'transform ease 3s';
            },3000);
        });
        storys[i].addEventListener('mouseleave', ()=>{
            clock.style.transform = 'rotate(' + 0 + 'deg)';
            clock.style.transition = 'transform ease 3s';
        });
    }
}