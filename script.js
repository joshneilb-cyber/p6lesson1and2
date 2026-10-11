const LETTERS = ['A','B','C','D'];
const MIXED_SECONDS = 20 * 60;

const formulaSets = {
  1: [
    {group:'MAGNITUDE', name:'2D magnitude', tex:'|\\vec A|=\\sqrt{A_x^2+A_y^2}', note:'Square the x and y components, add them, then take the square root.'},
    {group:'MAGNITUDE', name:'3D magnitude', tex:'|\\vec A|=\\sqrt{A_x^2+A_y^2+A_z^2}', note:'Same as 2D, but include the z-component.'},
    {group:'DIRECTION', name:'Angle of inclination', tex:'\\theta=\\tan^{-1}\\!\\left(\\frac{A_y}{A_x}\\right)', note:'Measured from +x. Always check the quadrant from the component signs.'},
    {group:'UNIT VECTOR', name:'Unit vector in the direction of A', tex:'\\hat u=\\frac{\\vec A}{|\\vec A|}', note:'Find the magnitude first, then divide every component by it.'}
  ],
  2: [
    {group:'COMPONENTS', name:'x-component', tex:'A_x=|\\vec A|\\cos\\theta', note:'Use the standard direction angle measured from +x.'},
    {group:'COMPONENTS', name:'y-component', tex:'A_y=|\\vec A|\\sin\\theta', note:'The sign comes from the vector direction/quadrant.'},
    {group:'VECTOR ADDITION', name:'Component sums', tex:'R_x=\\sum A_x,\\qquad R_y=\\sum A_y,\\qquad R_z=\\sum A_z', note:'Add x with x, y with y, and z with z.'},
    {group:'VECTOR ADDITION', name:'Resultant magnitude', tex:'|\\vec R|=\\sqrt{R_x^2+R_y^2+R_z^2}', note:'For a 2D problem, omit the z-term.'},
    {group:'VECTOR ADDITION', name:'Resultant direction', tex:'\\theta_R=\\tan^{-1}\\!\\left(\\frac{R_y}{R_x}\\right)', note:'Check the quadrant. A raw inverse-tangent result can point to the wrong quadrant.'},
    {group:'VECTOR ADDITION', name:'Equilibrant', tex:'\\vec E=-\\vec R,\\qquad \\theta_E=\\theta_R+180^\\circ', note:'Same magnitude as the resultant, exactly opposite direction.'},
    {group:'DOT PRODUCT', name:'Magnitudes + angle', tex:'\\vec A\\cdot\\vec B=|\\vec A||\\vec B|\\cos\\theta', note:'The answer is a scalar.'},
    {group:'DOT PRODUCT', name:'Components', tex:'\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z', note:'Multiply matching components, then add.'},
    {group:'DOT PRODUCT', name:'Angle between vectors', tex:'\\theta=\\cos^{-1}\\!\\left(\\frac{\\vec A\\cdot\\vec B}{|\\vec A||\\vec B|}\\right)', note:'Use the dot product together with both vector magnitudes.'},
    {group:'CROSS PRODUCT', name:'Magnitude', tex:'|\\vec A\\times\\vec B|=|\\vec A||\\vec B|\\sin\\theta', note:'This gives magnitude only. Direction comes from the right-hand rule.'},
    {group:'CROSS PRODUCT', name:'Components / determinant', tex:'\\vec A\\times\\vec B=(A_yB_z-A_zB_y)\\hat i+(A_zB_x-A_xB_z)\\hat j+(A_xB_y-A_yB_x)\\hat k', note:'Equivalent determinant expansion follows +i, −j, +k.'}
  ]
};

function rawQ(lesson,topic,prompt,correct,distractors,explain){return {lesson,topic,prompt,correct,distractors,explain};}

const structuredBase = [
  rawQ(1,'2D magnitude','A = ⟨3, 4⟩. What is |A|?','5',['7','12','25'],'√(3²+4²)=√25=5.'),
  rawQ(1,'2D magnitude','A = ⟨5, 12⟩. What is |A|?','13',['17','7','169'],'√(5²+12²)=√169=13.'),
  rawQ(1,'3D magnitude','A = ⟨2, 3, 6⟩. What is |A|?','7',['11','49','6.56'],'√(2²+3²+6²)=√49=7.'),
  rawQ(1,'3D magnitude','A = i − 2j + 2k. What is |A|?','3',['5','√5','9'],'√(1²+(-2)²+2²)=√9=3.'),
  rawQ(1,'Angle of inclination','A = ⟨3, 3⟩ in Quadrant I. What is θ from +x?','45°',['30°','60°','135°'],'tan⁻¹(3/3)=45°.'),
  rawQ(1,'Angle of inclination','A = ⟨−3, 4⟩. What is the standard direction angle?','126.87°',['53.13°','−53.13°','233.13°'],'The reference angle is 53.13°. The vector is in Quadrant II, so 180°−53.13°=126.87°.'),
  rawQ(1,'Unit vector','A = ⟨3, 4⟩. Which is the unit vector in A’s direction?','⟨0.60, 0.80⟩',['⟨3, 4⟩','⟨0.75, 1.00⟩','⟨−0.60, −0.80⟩'],'|A|=5, so divide each component by 5.'),
  rawQ(1,'Unit vector','A = ⟨2, −2, 1⟩. Which is the unit vector in A’s direction?','⟨2/3, −2/3, 1/3⟩',['⟨2, −2, 1⟩','⟨1/3, −1/3, 1/3⟩','⟨−2/3, 2/3, −1/3⟩'],'|A|=√(4+4+1)=3, so divide every component by 3.'),

  rawQ(2,'x-component','A = 10 at 30° from +x. What is Aₓ?','8.66',['5.00','10.00','17.32'],'Aₓ=10 cos30°=8.66.'),
  rawQ(2,'x-component','A = 8 at 120° from +x. What is Aₓ?','−4.00',['4.00','6.93','−6.93'],'Aₓ=8 cos120°=−4.00.'),
  rawQ(2,'y-component','A = 10 at 30° from +x. What is Aᵧ?','5.00',['8.66','10.00','−5.00'],'Aᵧ=10 sin30°=5.00.'),
  rawQ(2,'y-component','A = 8 at 120° from +x. What is Aᵧ?','6.93',['−6.93','4.00','−4.00'],'Aᵧ=8 sin120°=6.93.'),
  rawQ(2,'Component sums','A = 3i + 4j and B = −5i + 2j. What is R = A + B?','−2i + 6j',['8i + 6j','−2i + 2j','2i − 6j'],'Add like components: x=3−5=−2 and y=4+2=6.'),
  rawQ(2,'Component sums','A = 2i + j + 3k and B = −i + 4j − 2k. What is R?','i + 5j + k',['3i + 5j + 5k','i − 3j + k','−i + 5j − k'],'Add x, y, and z separately: (2−1, 1+4, 3−2)=(1,5,1).'),
  rawQ(2,'Resultant magnitude','R = 3i + 4j. What is |R|?','5',['7','12','25'],'√(3²+4²)=5.'),
  rawQ(2,'Resultant magnitude','R = 2i − j + 5k. What is |R|?','√30 ≈ 5.48',['8','√28 ≈ 5.29','30'],'√(2²+(-1)²+5²)=√30≈5.48.'),
  rawQ(2,'Resultant direction','R = 3i + 4j. What is its direction from +x?','53.13°',['36.87°','126.87°','233.13°'],'tan⁻¹(4/3)=53.13°, and the vector is in Quadrant I.'),
  rawQ(2,'Resultant direction','R = −3i + 4j. What is its standard direction angle?','126.87°',['−53.13°','53.13°','233.13°'],'The raw reference angle is 53.13°, but R is in Quadrant II, so the standard angle is 126.87°.'),
  rawQ(2,'Equilibrant','A resultant is 18 m at 40° north of east. Which is its equilibrant?','18 m at 40° south of west',['18 m at 40° north of east','18 m at 40° west of north','−18 m at 40° north of east'],'The equilibrant keeps the magnitude and reverses the direction by 180°.'),
  rawQ(2,'Equilibrant','The resultant is 12 units at 250°. What is the equilibrant direction?','70°',['180°','250°','430°'],'250°+180°=430°. Wrap to 0°–360°: 430°−360°=70°.'),
  rawQ(2,'Dot: magnitudes + angle','|A|=8, |B|=6, and θ=40°. Find A·B.','36.77',['48.00','30.85','−36.77'],'A·B=(8)(6)cos40°=36.77.'),
  rawQ(2,'Dot: magnitudes + angle','|A|=5, |B|=10, and θ=90°. Find A·B.','0',['50','25','−50'],'cos90°=0, so perpendicular vectors have dot product 0.'),
  rawQ(2,'Dot: components','A = 3i − 2j + 4k and B = 5i + j − 2k. Find A·B.','5',['25','−5','21'],'(3)(5)+(−2)(1)+(4)(−2)=15−2−8=5.'),
  rawQ(2,'Dot: components','A = 2i + 3j and B = 4i − 2j. Find A·B.','2',['14','−2','8'],'(2)(4)+(3)(−2)=8−6=2.'),
  rawQ(2,'Angle using dot','A = 3i + 4j and B = 4i + 3j. Find the angle between them.','16.26°',['73.74°','36.87°','90.00°'],'A·B=24 and |A|=|B|=5, so θ=cos⁻¹(24/25)=16.26°.'),
  rawQ(2,'Angle using dot','A = 3i + 4j and B = 4i − 3j. Find the angle between them.','90.00°',['0°','53.13°','180°'],'A·B=12−12=0, so the vectors are perpendicular and θ=90°.'),
  rawQ(2,'Cross: magnitudes + angle','|A|=10, |B|=7, θ=30°. Find |A×B|.','35',['70','60.62','0'],'|A×B|=(10)(7)sin30°=35.'),
  rawQ(2,'Cross: magnitudes + angle','|A|=6, |B|=8, θ=90°. Find |A×B|.','48',['0','24','14'],'sin90°=1, so the cross-product magnitude is (6)(8)=48.'),
  rawQ(2,'Cross: components','A = 2i + 3j + 4k and B = i + 2j + 3k. Find A×B.','i − 2j + k',['−i + 2j − k','i + 2j + k','−i − 2j + k'],'Components are i(9−8) − j(6−4) + k(4−3)=i−2j+k.'),
  rawQ(2,'Cross: components','A = 3i + 2j − k and B = i − 4j + 2k. Find A×B.','0i − 7j − 14k',['−7i − 14j','0i + 7j + 14k','−14i − 7j + 0k'],'i: 2·2−(−1)(−4)=0; j: (−1)(1)−3(2)=−7; k: 3(−4)−2(1)=−14.')
];

const mixedExtras = [
  rawQ(1,'2D magnitude','A = ⟨8, 15⟩. What is |A|?','17',['23','7','289'],'√(8²+15²)=√289=17.'),
  rawQ(1,'Angle of inclination','A = ⟨5, 0⟩. What is θ from +x?','0°',['90°','180°','45°'],'The vector lies exactly along the positive x-axis.'),
  rawQ(1,'Unit vector','A = ⟨−6, 8⟩. Which is the unit vector?','⟨−0.60, 0.80⟩',['⟨0.60, −0.80⟩','⟨−6, 8⟩','⟨−0.75, 1.00⟩'],'|A|=10, then divide both components by 10.'),
  rawQ(2,'Components','A = 20 N, 30° north of east. What is Aᵧ?','10.00 N',['17.32 N','20.00 N','−10.00 N'],'North of east means 30° from +x, so Aᵧ=20sin30°=10 N.'),
  rawQ(2,'Resultant','A = 9 m east and B = 12 m north. What is the resultant magnitude?','15 m',['21 m','3 m','10.82 m'],'√(9²+12²)=15 m.'),
  rawQ(2,'Equilibrant','R = 4.66i + 11.93j. Which is E?','−4.66i − 11.93j',['4.66i − 11.93j','−4.66i + 11.93j','11.93i + 4.66j'],'E=−R, so every component changes sign.'),
  rawQ(2,'Dot product','Two nonzero vectors have A·B < 0. What does that tell you?','The angle between them is greater than 90°',['They are perpendicular','They point in exactly the same direction','Their cross product must be zero'],'A negative dot product means cosθ<0, which occurs for an obtuse angle.'),
  rawQ(2,'Cross product','What is i × j?','k',['−k','i','0'],'Using the right-hand cyclic order: i×j=k.'),
  rawQ(2,'Cross product','What is j × i?','−k',['k','j','0'],'Reversing the cross-product order changes the sign: j×i=−k.'),
  rawQ(2,'Vector addition','A person walks 12 m east, 7 m west, 15 m east, then 9 m west. Resultant?','11 m east',['11 m west','43 m east','1 m east'],'Treat east as positive: 12−7+15−9=11 m east.')
];

const allBaseQuestions = [...structuredBase, ...mixedExtras];

const flashcards = [
  {id:'l1-mag2',lesson:1,topic:'2D magnitude',front:'How do you find a vector magnitude in 2D?',back:'√(Aₓ² + Aᵧ²)',explain:'Square the two components, add them, then square-root.'},
  {id:'l1-mag3',lesson:1,topic:'3D magnitude',front:'How do you find vector magnitude in 3D?',back:'√(Aₓ² + Aᵧ² + A_z²)',explain:'Include the z-component in the sum of squares.'},
  {id:'l1-dir',lesson:1,topic:'Direction',front:'What basic formula finds θ from components?',back:'θ = tan⁻¹(Aᵧ/Aₓ)',explain:'Then inspect the component signs to correct the quadrant.'},
  {id:'l1-unit',lesson:1,topic:'Unit vector',front:'How do you get the unit vector in A’s direction?',back:'û = A / |A|',explain:'Find the magnitude, then divide every component by it.'},
  {id:'l1-unit2',lesson:1,topic:'Unit vector',front:'What must the magnitude of any unit vector equal?',back:'1',explain:'A unit vector keeps direction but is normalized to length 1.'},
  {id:'l2-x',lesson:2,topic:'x-component',front:'Formula for the x-component?',back:'Aₓ = |A| cosθ',explain:'Cosine gives the horizontal component when θ is measured from +x.'},
  {id:'l2-y',lesson:2,topic:'y-component',front:'Formula for the y-component?',back:'Aᵧ = |A| sinθ',explain:'Sine gives the vertical component when θ is measured from +x.'},
  {id:'l2-sum',lesson:2,topic:'Component sums',front:'How do you add vectors in component form?',back:'Add matching x, y, and z components',explain:'Never add unlike components.'},
  {id:'l2-rmag',lesson:2,topic:'Resultant magnitude',front:'Formula for a 2D resultant magnitude?',back:'|R| = √(Rₓ² + Rᵧ²)',explain:'The resultant components form a right triangle.'},
  {id:'l2-rdir',lesson:2,topic:'Resultant direction',front:'What must you check after tan⁻¹(Rᵧ/Rₓ)?',back:'The quadrant',explain:'Inverse tangent alone can return an angle in the wrong quadrant.'},
  {id:'l2-equil',lesson:2,topic:'Equilibrant',front:'How is the equilibrant related to the resultant?',back:'Same magnitude, opposite direction',explain:'E = −R, so its direction differs by 180°.'},
  {id:'l2-dot1',lesson:2,topic:'Dot product',front:'Dot product with magnitudes and angle?',back:'A·B = |A||B| cosθ',explain:'The result is a scalar.'},
  {id:'l2-dot2',lesson:2,topic:'Dot product',front:'Dot product from components?',back:'AₓBₓ + AᵧBᵧ + A_zB_z',explain:'Multiply matching components, then add.'},
  {id:'l2-dangle',lesson:2,topic:'Angle using dot',front:'Formula for the angle between two vectors?',back:'θ = cos⁻¹[(A·B)/(|A||B|)]',explain:'Combine the dot product with both magnitudes.'},
  {id:'l2-cross1',lesson:2,topic:'Cross product',front:'Cross-product magnitude formula?',back:'|A×B| = |A||B| sinθ',explain:'This gives magnitude; use the right-hand rule for direction.'},
  {id:'l2-cross2',lesson:2,topic:'Cross product',front:'What sign pattern is used in determinant expansion?',back:'+i, −j, +k',explain:'The middle j term carries the negative cofactor sign.'},
  {id:'l2-cross3',lesson:2,topic:'Cross product',front:'What kind of result does a cross product give?',back:'A vector',explain:'That is why it is also called the vector product.'},
  {id:'l2-dot3',lesson:2,topic:'Dot product',front:'What kind of result does a dot product give?',back:'A scalar',explain:'That is why it is also called the scalar product.'}
];

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function save(key,val){localStorage.setItem(key,JSON.stringify(val));}
function load(key,fallback=null){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
function formatClock(seconds){seconds=Math.max(0,seconds);const m=Math.floor(seconds/60),s=seconds%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}

function balanceQuestions(base){
  const positions = shuffle(base.map((_,i)=>i%4));
  return base.map((item,i)=>{
    const pos=positions[i];
    const distractors=shuffle(item.distractors).slice(0,3);
    const options=[...distractors];
    options.splice(pos,0,item.correct);
    return {...item,options,answer:pos};
  });
}

let state={
  structured:load('vl2_structured'),
  mixed:load('vl2_mixed'),
  flash:load('vl2_flash')
};

function route(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active-view',v.id===name));
  document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===name));
  if(name==='structured') renderStructured();
  if(name==='mixed') renderMixed();
  if(name==='flashcards') renderFlashcards();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));

function ensureMath(){if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise();}

const drawer=document.getElementById('formulaDrawer');
const scrim=document.getElementById('drawerScrim');
function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');scrim.hidden=false;document.getElementById('formulaRail').setAttribute('aria-expanded','true');renderFormula(1);}
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');scrim.hidden=true;document.getElementById('formulaRail').setAttribute('aria-expanded','false');}
['formulaRail','formulaNav','formulaCalloutBtn'].forEach(id=>document.getElementById(id)?.addEventListener('click',openDrawer));
document.getElementById('formulaClose').addEventListener('click',closeDrawer);scrim.addEventListener('click',closeDrawer);
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='f'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();drawer.classList.contains('open')?closeDrawer():openDrawer()}if(e.key==='Escape')closeDrawer();});
document.querySelectorAll('[data-formula-tab]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-formula-tab]').forEach(x=>x.classList.toggle('active',x===btn));renderFormula(Number(btn.dataset.formulaTab));}));
function renderFormula(lesson){
  const groups={};formulaSets[lesson].forEach(f=>(groups[f.group]??=[]).push(f));
  document.getElementById('formulaContent').innerHTML=Object.entries(groups).map(([group,items])=>`<section class="formula-group"><h3>${group}</h3>${items.map(x=>`<article class="formula-item"><strong>${x.name}</strong><div class="formula-equation">\\[${x.tex}\\]</div><div class="formula-note">${x.note}</div></article>`).join('')}</section>`).join('');
  ensureMath();
}
renderFormula(1);

function freshStructured(){return {questions:balanceQuestions(structuredBase),index:0,score:0,answered:false,choice:null,done:false};}
function freshMixed(){const picked=shuffle(allBaseQuestions).slice(0,20);return {questions:balanceQuestions(picked),index:0,score:0,answered:false,choice:null,done:false,startAt:Date.now(),duration:MIXED_SECONDS,expired:false};}

function renderStructured(){if(!state.structured||!Array.isArray(state.structured.questions))state.structured=freshStructured();save('vl2_structured',state.structured);renderTest('structuredMount',state.structured,'structured');}
function renderMixed(){if(!state.mixed||!Array.isArray(state.mixed.questions))state.mixed=freshMixed();save('vl2_mixed',state.mixed);renderTest('mixedMount',state.mixed,'mixed');}

let timerHandle=null;
function stopTimer(){if(timerHandle){clearInterval(timerHandle);timerHandle=null;}}
function startMixedTimer(){
  stopTimer();
  const tick=()=>{
    if(!state.mixed||state.mixed.done)return stopTimer();
    const elapsed=Math.floor((Date.now()-state.mixed.startAt)/1000);
    const remain=state.mixed.duration-elapsed;
    const el=document.getElementById('mixedTimer');
    if(el){el.textContent=formatClock(remain);el.classList.toggle('warning',remain<=120);}
    if(remain<=0){state.mixed.done=true;state.mixed.expired=true;save('vl2_mixed',state.mixed);stopTimer();renderMixed();}
  };
  tick();timerHandle=setInterval(tick,1000);
}

function testSidebar(type,s){
  const current=s.questions[s.index];
  const timer=type==='mixed'?`<div class="side-card panel timer-card"><div class="timer-label">TIME REMAINING</div><div id="mixedTimer" class="timer-value">20:00</div></div>`:'';
  return `<aside class="test-sidebar">${timer}<div class="side-card panel"><p class="eyebrow">LIVE SCORE</p><div class="score-big">${s.score}<small> / ${s.index}</small></div></div><div class="side-card panel"><h3>Current block</h3><div class="mini-list"><div class="mini-row"><span>Lesson</span><strong>${current?current.lesson:'—'}</strong></div><div class="mini-row"><span>Topic</span><strong>${current?current.topic:'—'}</strong></div></div></div><div class="side-card panel formula-hint"><h3>Formula Vault</h3><p style="color:var(--muted);font-size:12px;line-height:1.55;margin:0">Use the bright <strong>Σ FORMULA VAULT</strong> tab on the right, or press <strong>F</strong>. It opens over this question.</p></div></aside>`;
}

function renderTest(mountId,s,type){
  const mount=document.getElementById(mountId);if(type==='mixed')stopTimer();
  if(s.done||s.index>=s.questions.length){
    s.done=true;save(type==='mixed'?'vl2_mixed':'vl2_structured',s);
    const tpl=document.getElementById('completionTemplate').content.cloneNode(true);
    const wrap=tpl.querySelector('.completion');
    const pct=Math.round((s.score/s.questions.length)*100);
    tpl.querySelector('.completion-cat').src=type==='structured'?'assets/cat-sleepy.png':'assets/cat-tabby.png';
    tpl.querySelector('.completion-title').textContent=type==='structured'?'Structured test complete.':'Mixed test complete.';
    tpl.querySelector('.completion-score').textContent=`${s.score} / ${s.questions.length} • ${pct}%`;
    tpl.querySelector('.completion-copy').textContent=s.expired?'Time expired, so the test was submitted automatically. Review the questions you answered and run a fresh timed set when ready.':pct===100?'Perfect run. Every question was correct.':pct>=80?'Strong run. Review the few missed explanations, then try again.':'Use the Formula Vault on your missed topics, then repeat the test.';
    tpl.querySelector('.completion-restart').addEventListener('click',()=>resetTest(type));
    mount.replaceChildren(wrap);return;
  }
  const item=s.questions[s.index];
  mount.innerHTML=`<div class="test-shell"><article class="question-card panel"><div class="question-meta"><span class="lesson-label">LESSON ${item.lesson} • ${item.topic.toUpperCase()}</span><span class="progress-text">QUESTION ${s.index+1} / ${s.questions.length}</span></div><div class="progress-track"><div class="progress-fill" style="width:${(s.index/s.questions.length)*100}%"></div></div><h2 class="question-title">${item.prompt}</h2><div class="options">${item.options.map((o,i)=>`<button class="option-btn" data-choice="${i}"><span class="option-letter">${LETTERS[i]}</span><span>${o}</span></button>`).join('')}</div><div class="feedback" id="feedback"></div><div class="next-row"><button class="primary next-btn" id="nextQuestion">Next question →</button></div></article>${testSidebar(type,s)}</div>`;
  mount.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>answer(Number(btn.dataset.choice))));
  function persist(){save(type==='mixed'?'vl2_mixed':'vl2_structured',s)}
  function answer(choice){
    if(s.answered)return;s.answered=true;s.choice=choice;if(choice===item.answer)s.score++;
    mount.querySelectorAll('[data-choice]').forEach((b,i)=>{b.disabled=true;if(i===item.answer)b.classList.add('correct');if(i===choice&&i!==item.answer)b.classList.add('wrong');});
    const correct=choice===item.answer;const fb=mount.querySelector('#feedback');fb.className=`feedback show ${correct?'correct-fb':'wrong-fb'}`;fb.innerHTML=`<strong>${correct?'Correct.':'Not quite.'}</strong><div><b>Right answer:</b> ${LETTERS[item.answer]}. ${item.options[item.answer]}</div><div><b>Why:</b> ${item.explain}</div>`;
    const next=mount.querySelector('#nextQuestion');next.classList.add('show');next.onclick=()=>{s.index++;s.answered=false;s.choice=null;if(s.index>=s.questions.length)s.done=true;persist();renderTest(mountId,s,type)};persist();
  }
  if(s.answered&&Number.isInteger(s.choice)){
    const choice=s.choice,correct=choice===item.answer;mount.querySelectorAll('[data-choice]').forEach((b,i)=>{b.disabled=true;if(i===item.answer)b.classList.add('correct');if(i===choice&&i!==item.answer)b.classList.add('wrong');});const fb=mount.querySelector('#feedback');fb.className=`feedback show ${correct?'correct-fb':'wrong-fb'}`;fb.innerHTML=`<strong>${correct?'Correct.':'Not quite.'}</strong><div><b>Right answer:</b> ${LETTERS[item.answer]}. ${item.options[item.answer]}</div><div><b>Why:</b> ${item.explain}</div>`;const next=mount.querySelector('#nextQuestion');next.classList.add('show');next.onclick=()=>{s.index++;s.answered=false;s.choice=null;if(s.index>=s.questions.length)s.done=true;persist();renderTest(mountId,s,type)};
  }
  if(type==='mixed')startMixedTimer();
}

function resetTest(type){
  if(type==='structured'){state.structured=freshStructured();save('vl2_structured',state.structured);renderStructured();}
  else{state.mixed=freshMixed();save('vl2_mixed',state.mixed);renderMixed();}
}
document.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',()=>resetTest(b.dataset.reset)));

function makeFlashState(filter='all'){
  const ids=shuffle(flashcards.filter(c=>filter==='all'||String(c.lesson)===filter).map(c=>c.id));
  return {filter,step:0,current:null,newQueue:ids.map(id=>({id,due:0,stage:0})),retry:[],later:[],mastered:[]};
}
function cardById(id){return flashcards.find(c=>c.id===id)}
function normalizeFlash(){const filter=document.getElementById('deckFilter').value;if(!state.flash||state.flash.filter!==filter)state.flash=makeFlashState(filter);save('vl2_flash',state.flash);}
function getNextCard(){
  const f=state.flash;const pools=['retry','newQueue','later'];
  let due=[];pools.forEach(k=>f[k].forEach(x=>{if(x.due<=f.step)due.push({bucket:k,item:x})}));
  if(!due.length){const all=pools.flatMap(k=>f[k].map(x=>({bucket:k,item:x})));if(!all.length)return null;f.step=Math.min(...all.map(x=>x.item.due));return getNextCard();}
  due.sort((a,b)=>{const pr={retry:0,newQueue:1,later:2};return pr[a.bucket]-pr[b.bucket]||a.item.due-b.item.due});
  const pick=due[0];f[pick.bucket]=f[pick.bucket].filter(x=>x!==pick.item);return pick.item;
}
function boxHtml(){const f=state.flash||{later:[],retry:[],mastered:[]};const chips=arr=>arr.slice(0,8).map(x=>`<span>${cardById(typeof x==='string'?x:x.id)?.topic||'Card'}</span>`).join('');return `<aside class="box-stack"><div class="memory-box panel later"><p class="eyebrow">BOX 1</p><h3>Correct • Later</h3><p>Right cards wait before one reinforcement pass.</p><div class="box-count">${f.later.length}</div><div class="box-list">${chips(f.later)}</div></div><div class="memory-box panel retry"><p class="eyebrow">BOX 2</p><h3>Wrong • Retry Soon</h3><p>Missed cards return quickly until you get them right.</p><div class="box-count">${f.retry.length}</div><div class="box-list">${chips(f.retry)}</div></div><div class="memory-box panel mastered"><p class="eyebrow">DONE</p><h3>Mastered</h3><p>Cards answered correctly again after the delay.</p><div class="box-count">${f.mastered.length}</div><div class="box-list">${chips(f.mastered)}</div></div></aside>`;}
function renderFlashcards(){
  normalizeFlash();const mount=document.getElementById('flashMount');let current=state.flash.current;if(!current){current=getNextCard();state.flash.current=current;save('vl2_flash',state.flash)}
  if(!current){mount.innerHTML=`<div class="flash-layout"><div class="flash-stage panel"><div class="flash-finish"><h2>Deck mastered.</h2><p>Every selected card was answered correctly, then correctly again after its delay.</p><button class="primary" id="againCards">Run deck again</button></div></div>${boxHtml()}</div>`;document.getElementById('againCards').onclick=restartCards;return;}
  const c=cardById(current.id);mount.innerHTML=`<div class="flash-layout"><div class="flash-stage panel"><div class="flash-stage-top"><span class="lesson-label">LESSON ${c.lesson} • ${c.topic.toUpperCase()}</span><span class="progress-text">REVIEW STEP ${state.flash.step+1}</span></div><div class="flash-card"><div class="flash-inner"><span class="flash-kicker">PROMPT</span><div class="flash-prompt">${c.front}</div><div class="flash-answer" id="cardAnswer"><span class="flash-kicker">ANSWER</span><strong>${c.back}</strong><p><b>Why:</b> ${c.explain}</p></div></div></div><div class="flash-actions" id="flashActions"><button class="primary" id="showAnswer">Show answer</button></div></div>${boxHtml()}</div>`;
  document.getElementById('showAnswer').onclick=()=>{document.getElementById('cardAnswer').classList.add('show');document.getElementById('flashActions').innerHTML=`<button class="know-btn" id="knewIt">✓ I got it right</button><button class="miss-btn" id="missedIt">× I got it wrong</button>`;document.getElementById('knewIt').onclick=()=>rateCard(true);document.getElementById('missedIt').onclick=()=>rateCard(false)};
}
function rateCard(correct){
  const f=state.flash,item=f.current;f.step++;
  if(correct){if(item.stage>=1)f.mastered.push(item.id);else f.later.push({...item,stage:1,due:f.step+5});}
  else f.retry.push({...item,due:f.step+2});
  f.current=null;save('vl2_flash',f);renderFlashcards();
}
function restartCards(){const filter=document.getElementById('deckFilter').value;state.flash=makeFlashState(filter);save('vl2_flash',state.flash);renderFlashcards();}
document.getElementById('restartCards').onclick=restartCards;document.getElementById('deckFilter').onchange=()=>{state.flash=makeFlashState(document.getElementById('deckFilter').value);save('vl2_flash',state.flash);renderFlashcards()};

route('home');
