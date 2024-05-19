const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.PNG';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  var matchImg = document.createElement('img');
  const imgDiv2 = document.querySelector('#matchImg');
  var imgURL = 'img/match-' + point + '.PNG';
  matchImg.src = imgURL;
  matchImg.alt = point;
  matchImg.classList.add('img-fluid');
  imgDiv2.appendChild(matchImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
  }

function download(link){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var element = document.createElement('a');
  element.setAttribute('href','img/image-'+point+'.png');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

/*function message(){
  var Name = document.getElementById('name');
  var MBTI = document.getElementById('MBTI');
  var Question13 = document.getElementById('Question13');
  var Question14 = document.getElementById('Question14');
  const success = document.getElementById('success');
  const danger = document.getElementById('danger');

  if(Name.value ===''|| MBTI.value === '' || Question13 === '' || Question14 === ''){
    danger.style.display = 'block';
  }
  else{
    setTimeout(()=> {
      Name.value = '';
      MBTI.value = '';
      Question13.value = '';
      Question14.value = '';
    },2000);
    success.style.display = 'block';
  }

  setTimeout(()=>{
    danger.style.display='none';
    success.style.display='none';

  }, 4000);


}*/

function myFunction() {
  alert("소중한 기록 감사합니다!");
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}

function shareTwitter() {
  var resultImg = document.querySelector("#resultImg");
  var resultAlt = resultImg.firstElementChild.alt;
  const shareDes = infoList[resultAlt].name;
  const shareImage = sendUrl + "img/image-" + resultAlt + ".png";
    var sendText = "미용인 MBTI"; // 전달할 텍스트
    var sendUrl = "https://moreon-mbti.netlify.app"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl+"page/result-"+resultAlt+".html");
}

/*
const form = document.querySelector('form');
const thankYouMessage = document.querySelector('#thank-you-message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  thankYouMessage.classList.add('show');
  setTimeout(() => form.submit(), 2000);
});
*/

function shareFacebook() {
  var resultImg = document.querySelector("#resultImg");
  var resultAlt = resultImg.firstElementChild.alt;
    var sendUrl = "https://moreon-mbti.netlify.app/page/result-"+resultAlt+".html"; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

const url = "https://moreon-mbti.netlify.app/";

function setShare() {
  var resultImg = document.querySelector("#resultImg");
  var resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = "미용인 MBTI";
  console.log("?", resultAlt);
  console.log(infoList[resultAlt]);
  const shareDes = infoList[resultAlt].name;
  const shareImage = url + "img/image-" + resultAlt + ".png";
  const shareURL = url + "page/result-" + resultAlt +".html";

  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: shareTitle,
      description: shareDes,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
    buttons: [
      {
        title: "결과 확인하기",
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
    ],
  });
}
