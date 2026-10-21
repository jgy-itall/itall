/* 리뉴얼 직영 센터/캠프 상단 재현 + 검수 패널 공통 · 아이콘은 [공통]토큰 Design System 에셋 SVG */
const IC = {
  search:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18.5297 11.4398C18.5296 7.52422 15.3555 4.35 11.4398 4.35C7.52427 4.35008 4.35008 7.52427 4.35 11.4398C4.35 15.3555 7.52422 18.5296 11.4398 18.5297C15.3555 18.5297 18.5297 15.3555 18.5297 11.4398ZM20.0297 11.4398C20.0297 13.5662 19.2548 15.5101 17.975 17.0102L20.9213 19.8607C21.219 20.1487 21.2269 20.6236 20.9389 20.9213C20.6509 21.219 20.176 21.2269 19.8783 20.9389L16.9076 18.0648C15.4222 19.2922 13.5172 20.0297 11.4398 20.0297C6.69579 20.0296 2.85 16.1839 2.85 11.4398C2.85008 6.69584 6.69584 2.85008 11.4398 2.85C16.1839 2.85 20.0296 6.69579 20.0297 11.4398Z" fill="#BEBFC1"/></svg>',
  loc:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  locS:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  ext:'<svg class="ext" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.70788 7.08087C7.70787 6.66673 8.04368 6.33107 8.4578 6.33095L16.9797 6.33026C17.1784 6.33026 17.3694 6.40941 17.51 6.54985C17.6507 6.6905 17.7303 6.88196 17.7303 7.08087L17.7296 15.4812C17.7296 15.8954 17.3939 16.2311 16.9797 16.2311C16.5656 16.231 16.2298 15.8953 16.2298 15.4812L16.2298 8.89076L7.61051 17.51C7.31762 17.8029 6.84274 17.8029 6.54985 17.51C6.2573 17.2171 6.25707 16.7421 6.54985 16.4493L15.1684 7.83079L8.4578 7.83079C8.04376 7.83067 7.708 7.49491 7.70788 7.08087Z" fill="currentColor"/></svg>',
  chev:'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="2.5"><path d="m9 6 6 6-6 6"/></svg>',
  logo:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="#D0121B" stroke-width="2.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/></svg>',
  x:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM17.1777 6.82227C16.7482 6.39269 16.0516 6.39269 15.6221 6.82227L12 10.4443L8.37793 6.82227C7.94835 6.39269 7.25184 6.39269 6.82227 6.82227C6.39269 7.25184 6.39269 7.94835 6.82227 8.37793L10.4443 12L6.82227 15.6221C6.39269 16.0516 6.39269 16.7482 6.82227 17.1777C7.25184 17.6073 7.94835 17.6073 8.37793 17.1777L12 13.5557L15.6221 17.1777C16.0516 17.6073 16.7482 17.6073 17.1777 17.1777C17.6073 16.7482 17.6073 16.0516 17.1777 15.6221L13.5557 12L17.1777 8.37793C17.6073 7.94835 17.6073 7.25184 17.1777 6.82227Z" fill="currentColor"/></svg>',
  menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="#262628" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
};

/* CMS 등록 데이터 예시 — type: kw(키워드·현재 창) / link(외부 링크·새 창), 우선순위 순 */
const BASE = [
  {t:'강남센터 확장 오픈',type:'kw',to:'강남센터'},
  {t:'몰입관',type:'link',href:'events/44'},
  {t:'노량진센터 1·2관',type:'kw',to:'노량진'},
  {t:'몰입관 신규 직영캠프 사전 예약하기',type:'link',href:'events/44'},
  {t:'강서센터 3월 확장 오픈',type:'kw',to:'강서센터'},
  {t:'강남센터',type:'kw',to:'강남센터'}
];
const MORE = [
  {t:'대구',type:'kw',to:'대구'},{t:'기숙학원 여주캠프',type:'kw',to:'여주캠프'},{t:'기숙학원 입학 설명회 예약',type:'link'},
  {t:'광주',type:'kw',to:'광주'},{t:'동탄',type:'kw',to:'동탄'},{t:'김포',type:'kw',to:'김포'},{t:'구리',type:'kw',to:'구리'},
  {t:'노원 중계센터',type:'kw',to:'노원'},{t:'부산 동래사직캠프',type:'kw',to:'동래사직'}
];
const DATASETS = {
  base:{label:'기본 6개',list:BASE},
  many:{label:'많음 15개',list:BASE.concat(MORE)},
  long:{label:'30자 검색어',list:[{t:'잇올 스파르타 강남센터 4월 그랜드 오픈 안내',type:'kw',to:'강남센터'},{t:'몰입관 신규 직영캠프 사전 예약하기 (선착순 한정)',type:'link',href:'events/44'}].concat(BASE.slice(1,4))},
  empty:{label:'0개(미게시)',list:[]}
};

/* 새 창(링크) 유형 = 광고 영역: 최대 3개 · 항상 맨 뒤 */
const linksLast=list=>list.filter(k=>k.type!=='link').concat(list.filter(k=>k.type==='link').slice(0,3));

/* 한글 매칭: 완성형 · 자모(입력 중 글자, 예: 가→강) · 초성(ㄱㄴ→강남) · 공백 무시
   반환: 원문 기준 [시작, 끝) 또는 null */
const H_CHO='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ',H_JUNG='ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ',
  H_JONG=['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],
  H_SPLIT={'ㄳ':'ㄱㅅ','ㄵ':'ㄴㅈ','ㄶ':'ㄴㅎ','ㄺ':'ㄹㄱ','ㄻ':'ㄹㅁ','ㄼ':'ㄹㅂ','ㄽ':'ㄹㅅ','ㄾ':'ㄹㅌ','ㄿ':'ㄹㅍ','ㅀ':'ㄹㅎ','ㅄ':'ㅂㅅ','ㅘ':'ㅗㅏ','ㅙ':'ㅗㅐ','ㅚ':'ㅗㅣ','ㅝ':'ㅜㅓ','ㅞ':'ㅜㅔ','ㅟ':'ㅜㅣ','ㅢ':'ㅡㅣ'};
function hJamo(ch,choOnly){const c=ch.charCodeAt(0)-0xAC00;
  if(c<0||c>11171)return choOnly?ch.toLowerCase():(H_SPLIT[ch]||ch.toLowerCase());
  const cho=H_CHO[Math.floor(c/588)];if(choOnly)return cho;
  const jung=H_JUNG[Math.floor((c%588)/28)],jong=H_JONG[c%28];return cho+(H_SPLIT[jung]||jung)+(H_SPLIT[jong]||jong);}
function hMatch(text,query){
  const q=query.replace(/\s+/g,'');if(!q)return null;
  const choOnly=[...q].every(ch=>H_CHO.includes(ch));
  let tj='',map=[];
  [...text].forEach((ch,i)=>{if(/\s/.test(ch))return;const j=hJamo(ch,choOnly);tj+=j;for(let k=0;k<j.length;k++)map.push(i);});
  const qj=[...q].map(ch=>hJamo(ch,choOnly)).join('');
  const idx=tj.indexOf(qj);if(idx<0)return null;
  return [map[idx],map[idx+qj.length-1]+1];
}
function hMark(text,range,esc){if(!range)return esc(text);return esc(text.slice(0,range[0]))+'<mark>'+esc(text.slice(range[0],range[1]))+'</mark>'+esc(text.slice(range[1]));}

/* 센터/캠프 목록 — 리뉴얼 개발 페이지(dev1-sparta) 실데이터, 지역은 센터명 기준 분류 */
function regionOf(n){
  if(/^(강남|강동|강서|노량진|노원)/.test(n))return '서울';
  if(/^(대구|부산|김해)/.test(n))return '경상';
  if(/^광주/.test(n))return '강원·전라·제주';
  return '경기ㆍ인천';
}
const AS='https://dev1-sparta.itall.com/assets';
const CENTERS=[
  ['기숙','여주캠프','잇올 기숙학원'],
  ['기숙','이천캠프','잇올기숙학원'],
  ['몰입관','강남캠프','잇올몰입관강남독학재수학원 /\n잇올몰입관강남관리형독서실'],
  ['몰입관','김포 장기캠프','잇올몰입관김포장기독학재수학원 /\n잇올몰입관김포장기관리형독서실'],
  ['몰입관','대구 지산범물캠프','잇올몰입관대구지산범물독학재수학원'],
  ['몰입관','동탄1캠프','잇올몰입관동탄1독학재수학원'],
  ['몰입관','동탄2캠프','잇올몰입관동탄2독학재수학원 /\n잇올몰입관동탄2관리형독서실'],
  ['몰입관','부산 동래사직캠프','잇올몰입관부산동래사직독학재수학원 /\n잇올몰입관부산동래사직관리형독서실'],
  ['몰입관','수원 광교캠프','잇올몰입관수원광교독학재수학원'],
  ['몰입관','인천 검단캠프','잇올몰입관인천검단관리형독서실 /\n잇올몰입관인천검단독학재수학원'],
  ['스파르타','강남센터','잇올스파르타관리형프리미엄독서실 /\n잇올스파르타독학재수학원'],
  ['스파르타','강동센터 1관','잇올스파르타관리형프리미엄독서실 /\n잇올스파르타독학관리학원'],
  ['스파르타','강동센터 2관','잇올스파르타강동독학재수학원'],
  ['스파르타','강서센터','잇올스파르타프리미엄관리형독서실 /\n잇올스파르타강서독학관리학원'],
  ['스파르타','광명센터','잇올스파르타관리형프리미엄독서실 /\n잇올스파르타독학관리학원'],
  ['스파르타','광주 봉선센터','잇올스파르타광주봉선독학재수학원 /\n잇올스파르타광주봉선관리형독서실'],
  ['스파르타','광주 수완센터','잇올스파르타광주수완독학재수학원 /\n잇올스파르타광주수완관리형독서실'],
  ['스파르타','광주 충장로센터','잇올스파르타관리형독서실 /\n잇올스파르타독학관리학원'],
  ['스파르타','구리 수택센터','잇올스파르타구리독학재수학원'],
  ['스파르타','구리남양주센터','잇올스파르타관리형프리미엄독서실 /\n잇올스파르타독학관리학원'],
  ['스파르타','김포센터','잇올스파르타김포독학재수학원 /\n잇올스파르타김포관리형독서실'],
  ['스파르타','김해센터','잇올스파르타김해관리형프리미엄독서실 /\n잇올스파르타김해독학재수학원'],
  ['스파르타','노량진센터 1관','잇올스파르타프리미엄독서실 /\n잇올스파르타노량진독학재수학원'],
  ['스파르타','노량진센터 2관','잇올스파르타독학재수학원'],
  ['스파르타','노원 중계센터 1관','잇올스파르타노원중계1관관리형독서실 /\n잇올스파르타노원중계1관독학재수학원 /\n잇올스파르타노원중계1관재수학원'],
  ['스파르타','노원 중계센터 2관','잇올스파르타노원중계2관관리형프리미엄독서실 /\n잇올스파르타노원중계2독학재수학원'],
  ['스파르타','대구 동성로센터','잇올스파르타관리형독서실'],
  ['스파르타','대구 상인센터','잇올스파르타대구상인독학재수학원 /\n잇올스파르타대구상인관리형독서실'],
  ['스파르타','대구 수성구센터 1관','잇올스파르타수성관리형독서실 /\n잇올스파르타독학관리학원'],
  ['스파르타','대구 수성구센터 2관','잇올스파르타대구수성2관리형학원 /\n잇올스파르타대구수성2독학재수학원 /\n잇올스파르타대구수성2관리형프리미엄독서실 /\n잇올스파르타대구수성2관리형독서실']
].map(([brand,name,sub])=>({brand,name,sub,region:regionOf(name)}));

/* 같은 곳에 연결된 칩 = 한 묶음(키워드: 연결 센터/캠프, 링크: 이동 URL) — 하나만 눌러도 묶음 전체 활성화 */
const grpOf=k=>k.type==='link'?'link:'+(k.href||k.t):'kw:'+(k.to||k.t);
function chipHTML(k,cls='kw-chip'){
  const link = k.type==='link';
  return `<button type="button" class="${cls}" data-type="${k.type}" data-t="${k.t}" data-g="${grpOf(k)}" title="${k.t}">`+
    `<span class="h">#</span><span class="t">${k.t}</span>`+
    (link?`${IC.ext}<span class="sr">(새 창 열림)</span>`:'')+`</button>`;
}

const tabBtn=(t,i)=>`<button type="button" role="tab" class="${i?'':'on'}" aria-selected="${!i}">${t}</button>`;
function pageHTML(slots={}){
  return `
<header class="gnb">
  <div class="logo">${IC.logo}잇올 스파르타</div>
  <nav><span>몰입공부 시스템</span><span class="on">직영 센터/캠프</span><span>모집안내</span><span>입시 결과</span><span>장학</span><span>고객센터</span><span>콘텐츠</span><span>이벤트</span></nav>
  <div class="right"><div class="util"><span class="dk">수능 D-30</span><span>APP 다운로드</span></div><button type="button" class="menu" aria-label="전체 메뉴">${IC.menu}</button></div>
</header>
<main class="wrap">
  <div class="title-row">
    <div><h1 class="title">직영 센터/캠프</h1><p class="sub">잇올 전 센터/캠프 직영 운영</p></div>
    <div class="bc">홈 ${IC.chev} 직영센터/캠프</div>
  </div>
  <div class="search-row">
    <div class="search-col">
      <div class="search-box" id="searchBox">${IC.search}<input id="q" aria-label="센터/캠프 검색" placeholder="센터/캠프를 검색해 보세요." autocomplete="off"><button type="button" class="clr" id="clr" hidden aria-label="검색어 지우기" onclick="clearSel()">${IC.x}</button><button type="button" class="loc" id="locBtn" aria-label="현재 위치로 찾기">${IC.loc}</button>${slots.inBox||''}</div>
      ${slots.hint===false?'':`<p class="hint" id="hint">${IC.locS}위치 접근 권한을 허용하면 사용자의 현재 위치에서 가장 가까운 센터/캠프가 자동으로 검색됩니다.</p>`}
      ${slots.afterHint||''}
    </div>
    <button type="button" class="btn-req">직영 센터/캠프 개설 요청</button>
  </div>
  <div class="filters">
    <div class="brand" role="tablist" aria-label="브랜드">${["전체","스파르타","기숙","몰입관"].map(tabBtn).join("")}</div>
    <div class="region" role="tablist" aria-label="지역">${["전체","서울","경기ㆍ인천","충청","경상","강원·전라·제주"].map(tabBtn).join("")}</div>
  </div>
  <a class="banner" href="#" onclick="return false"><img src="https://cdn.itall.com/SPARTA/public/landing/images/new-camp-open/new_camp_banner-6-${document.body.classList.contains('mo')&&!document.body.classList.contains('tab')?'mo':'pc'}.webp" alt="잇올 몰입관 다산캠프 10월 22일 입학 설명회 - 입학 설명회 예약"></a>
  <div class="sort" id="sortRow"><button type="button" class="on">가나다순</button><button type="button">거리순</button></div>
  <div class="cards" id="cards">${cardsHTML(CENTERS,0)}</div>
</main>`;
}

/* ---------- toast ---------- */
let toastT;
function toast(msg){
  let el=document.querySelector('.toast');
  if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}
  el.textContent=msg;el.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('show'),1800);
}
/* ---------- 결과 목록 · 선택 상태 ---------- */
const LOGO={'스파르타':'sparta_v2','기숙':'dormitory_v2','몰입관':'study_cafe_v2'};
const BRAND_CLS={'스파르타':'b-sp','기숙':'b-gi','몰입관':'b-mo'};
const DETAIL={addr:'(12603) 경기 여주시 산북면 금품1로 124-1 잇올 기숙학원 여주캠프',
  hours:[['평일','06:30 ~ 23:00'],['토요일','06:30 ~ 23:00'],['일요일','07:30 ~ 22:10'],['공휴일','07:30 ~ 22:10']],
  tel:'031-8087-7201 | 010-6400-6202 | 1599-6286',park:'건물 내 주차장 보유',seat:'교실형',
  way:[['제2영동고속도로(광주원주고속도로)','동곤지암IC 진출 → IC 나오자마자 삼거리에서 좌회전 후 약 5km 직진'],['중부내륙고속도로','북여주IC 진출 → 북여주IC교차로에서 양평·이포 방면 우회전 후 약 9km 직진']],
  reg:'&lt;제414호&gt; 잇올 기숙학원'};
function cardDetail(){
  const row=(l,v)=>`<div class="ir"><span class="il">${l}</span><div class="iv">${v}</div></div>`;
  return `<div class="card-bd"><div class="map"></div><div class="info">
    ${row('주소',DETAIL.addr)}
    ${row('운영시간',`<p class="ht">학원 교습시간</p>${DETAIL.hours.map(([d,t])=>`<p class="hr"><b>${d}</b>${t}</p>`).join('')}`)}
    ${row('연락처',DETAIL.tel)}${row('주차',DETAIL.park)}${row('좌석유형',DETAIL.seat)}
    ${row('찾아오시는 길',DETAIL.way.map(([h,d])=>`<div class="way"><p>${h}</p><p>${d}</p></div>`).join(''))}
    ${row('등록번호 / 교습비',`<span class="reg">${DETAIL.reg}<img src="${AS}/icons/basic/ico_arrow_down.svg" width="16" height="16" alt=""></span>`)}
  </div>
  <div class="acts"><button type="button"><img src="${AS}/icons/direct-center/ico_detail_add.svg" alt="">자세히 보기</button><button type="button"><img src="${AS}/icons/direct-center/ico_phone.svg" alt="">전화 문의하기</button><button type="button"><img src="${AS}/icons/direct-center/ico_chat.svg" alt="">채팅 문의하기</button><button type="button" class="pri"><img src="${AS}/icons/direct-center/ico_consult.svg" alt="">입학 상담 예약하기</button></div></div>`;
}
function cardsHTML(list,openIdx=-1){
  return list.map((c,i)=>{const op=i===openIdx;
    return `<div class="card ${BRAND_CLS[c.brand]}${op?' open':''}"><button type="button" class="card-hd" aria-expanded="${op}" onclick="toggleCard(this)">
      <div class="hd"><div class="nm"><img class="lg" src="${AS}/images/logo/${LOGO[c.brand]}.svg" alt="${c.brand}"><span>${c.name}</span></div>
      <div class="hi"><img class="tel" src="${AS}/icons/basic/ico_phone_call.svg" alt="전화"><img class="cv" src="${AS}/icons/basic/ico_arrow_down.svg" alt=""></div></div>
      <div class="sb">${c.sub}</div></button>${op?cardDetail():''}</div>`}).join('');
}
function toggleCard(btn){
  const card=btn.parentElement,op=!card.classList.contains('open');
  card.classList.toggle('open',op);btn.setAttribute('aria-expanded',op);
  const bd=card.querySelector('.card-bd');
  if(op&&!bd)card.insertAdjacentHTML('beforeend',cardDetail());
  if(!op&&bd)bd.remove();
}
const ALL_KW=[...BASE,...MORE,...DATASETS.long.list];
const findTo=(t)=>{const k=ALL_KW.find(x=>x.t===t);return k&&k.to?k.to:t};
const matchTo=to=>CENTERS.filter(c=>c.name.includes(to));
let SEL=null;
const FILTER={brand:'전체',region:'전체'};
function setTabs(){
  document.querySelectorAll('#vp .brand button').forEach(b=>{const on=b.textContent===FILTER.brand;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
  document.querySelectorAll('#vp .region button').forEach(b=>{const on=b.textContent===FILTER.region;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
}
function applyFilter(){
  const list=CENTERS.filter(c=>(FILTER.brand==='전체'||c.brand===FILTER.brand)&&(FILTER.region==='전체'||c.region===FILTER.region));
  document.getElementById('cards').innerHTML=list.length?cardsHTML(list,0):'<p class="no-res">선택한 조건에 맞는 센터/캠프가 없어요.</p>';
  setTabs();
}
document.addEventListener('click',e=>{
  const b=e.target.closest('#vp .brand button, #vp .region button');
  if(b){
    const key=b.parentElement.classList.contains('brand')?'brand':'region';
    if(SEL)clearSel(true);
    FILTER[key]=b.textContent;
    applyFilter();
    b.scrollIntoView({inline:'nearest',block:'nearest'});
    return;
  }
  const so=e.target.closest('#vp .sort > button');
  if(so){
    document.querySelectorAll('#vp .sort > button').forEach(x=>x.classList.toggle('on',x===so));
    if(so.textContent==='거리순')toast('⊕ 위치 권한 허용 시 가까운 순으로 정렬');
  }
});
function selectKeyword(t){
  SEL=t;
  FILTER.brand='전체';FILTER.region='전체';setTabs();
  const to=findTo(t),res=matchTo(to);
  const q=document.getElementById('q');q.value=t;
  document.getElementById('clr').hidden=false;
  document.getElementById('searchBox').classList.add('has-sel');
  const k=ALL_KW.find(x=>x.t===t),g=k&&grpOf(k);
  document.querySelectorAll('#vp [data-type="kw"]').forEach(el=>{const on=el.dataset.t===t||(!!g&&el.dataset.g===g);el.classList.toggle('is-sel',on);el.setAttribute('aria-pressed',on)});
  const sel=document.querySelector('#vp .kw-chip.is-sel');if(sel)sel.scrollIntoView({inline:'nearest',block:'nearest'});
  document.getElementById('cards').innerHTML=res.length?cardsHTML(res,0):'<p class="no-res">연결된 센터/캠프가 없어요.</p>';
  document.dispatchEvent(new CustomEvent('kwselect',{detail:t}));
  const list=document.getElementById('sortRow');
  if(list.getBoundingClientRect().top>innerHeight*.7)list.scrollIntoView({behavior:'smooth',block:'start'});
}
function clearSel(keep){
  SEL=null;
  document.getElementById('q').value='';
  document.getElementById('clr').hidden=true;
  document.getElementById('searchBox').classList.remove('has-sel');
  document.querySelectorAll('#vp .is-sel').forEach(el=>{el.classList.remove('is-sel');el.setAttribute('aria-pressed',false)});
  if(!keep)applyFilter();
  document.dispatchEvent(new CustomEvent('kwclear'));
}
document.addEventListener('click',e=>{
  const c=e.target.closest('#vp [data-type]');
  if(!c)return;
  const chip=c.classList.contains('kw-chip');
  if(chip&&c.classList.contains('is-sel')&&SEL===c.dataset.t)return; /* 선택 유지 — 해제는 다른 칩 선택 또는 검색창 × */
  if(c.dataset.type==='link'){
    if(chip){if(SEL)clearSel();pressLink(c)} /* 선택된 칩이 있으면 해제 후 새 창 */
    toast(`↗ 새 창에서 열림 — 「${c.dataset.t}」 (현재 화면 유지)`);return;
  }
  selectKeyword(c.dataset.t);
});

/* 링크 칩: 선택 상태 고정 없음 — 누르는 순간 같은 곳으로 가는 칩 묶음만 함께 활성화 후 새 창 */
function pressLink(c){
  const g=document.querySelectorAll(`#vp .kw-chip[data-g="${c.dataset.g}"]`);
  g.forEach(el=>el.classList.add('is-press'));
  setTimeout(()=>g.forEach(el=>el.classList.remove('is-press')),500);
}

/* ---------- 가로 스크롤: 터치는 기본, 마우스는 휠·드래그 지원 ---------- */
function enableHScroll(el){
  el.addEventListener('wheel',e=>{
    if(el.scrollWidth<=el.clientWidth||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
    e.preventDefault();el.scrollLeft+=e.deltaY;
  },{passive:false});
  let down=false,sx=0,sl=0,moved=false;
  el.addEventListener('pointerdown',e=>{
    if(e.pointerType!=='mouse'||el.scrollWidth<=el.clientWidth)return;
    down=true;moved=false;sx=e.clientX;sl=el.scrollLeft;
  });
  addEventListener('pointermove',e=>{
    if(!down)return;const dx=e.clientX-sx;
    if(Math.abs(dx)>4){moved=true;el.classList.add('dragging')}
    el.scrollLeft=sl-dx;
  });
  addEventListener('pointerup',()=>{down=false;el.classList.remove('dragging')});
  el.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true);
}

/* ---------- review panel ---------- */
const OPTIONS=[{id:'a',file:'a.html',name:'A안'},{id:'b',file:'b.html',name:'B안'},{id:'c',file:'c.html',name:'C안'}];
const state={device:'pc',data:'base'};

function initReview(cfg){
  document.body.classList.add('pc');
  document.body.insertAdjacentHTML('beforeend',`<div class="viewport" id="vp"></div>
  <aside class="rv" id="rv">
    <div class="rv-head"><b>${cfg.title}</b><button type="button" id="rvMin" aria-expanded="true">접기</button></div>
    <div class="rv-body">
      <div class="rv-g"><p>시안</p><div class="nav">${OPTIONS.map(o=>`<a href="${o.file}" class="${o.id===cfg.id?'on':''}">${o.name}</a>`).join('')}</div></div>
      <div class="rv-g"><p>화면</p><div class="seg" id="segDev"><button type="button" data-v="pc" class="on">PC 1216</button><button type="button" data-v="tab">TAB 768</button><button type="button" data-v="mo">MO 390</button></div><p class="lock-note">창 너비 1024px 미만 → 자동으로 태블릿(768~1023)·모바일(~767) 화면</p></div>
      <div class="rv-g"><p>CMS 데이터</p><div class="seg" id="segData">${Object.entries(DATASETS).map(([k,v])=>`<button type="button" data-v="${k}" class="${k==='base'?'on':''}">${v.label}</button>`).join('')}</div></div>
      ${cfg.extraControls||''}
      <div class="rv-g"><p>개발 노트</p><ul>${cfg.points.map(p=>`<li>${p}</li>`).join('')}</ul></div>
    </div>
  </aside>`);
  /* 창 너비 768 미만 → MO(풀폭), 1024 미만 → TAB(풀폭), 이상이면 토글 값 */
  const applyDevice=()=>{
    const w=innerWidth;
    const auto=w<768?'mo':w<1024?'tab':null;
    const dev=auto||state.device;
    document.body.classList.remove('pc','mo','tab');
    if(dev==='pc')document.body.classList.add('pc');
    else if(dev==='tab')document.body.classList.add('mo','tab');
    else document.body.classList.add('mo');
    document.body.classList.toggle('fluid',!!auto);
    document.getElementById('segDev').classList.toggle('lock',!!auto);
  };
  const render=()=>{
    SEL=null;FILTER.brand='전체';FILTER.region='전체';
    applyDevice();
    document.getElementById('vp').innerHTML=pageHTML(cfg.slots);
    cfg.mount(DATASETS[state.data].list);
    document.querySelectorAll('#vp .list, #vp .region').forEach(enableHScroll);
  };
  window._render=render;
  let lastKey='',rT;
  addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(()=>{
    const key=innerWidth;
    if(key!==lastKey){lastKey=key;render()}
  },120)});
  const bindSeg=(id,key)=>document.getElementById(id).addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    state[key]=b.dataset.v;
    [...b.parentElement.children].forEach(x=>x.classList.toggle('on',x===b));
    render();
  });
  bindSeg('segDev','device');bindSeg('segData','data');
  const rv=document.getElementById('rv'),rvMin=document.getElementById('rvMin');
  const setMin=v=>{rv.classList.toggle('min',v);rvMin.textContent=v?'펼치기':'접기';rvMin.setAttribute('aria-expanded',!v)};
  rvMin.onclick=()=>setMin(!rv.classList.contains('min'));
  if(innerWidth<1024)setMin(true);
  cfg.onInit&&cfg.onInit(render);
  render();
}
