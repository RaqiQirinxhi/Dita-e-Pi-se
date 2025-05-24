// Select elements
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

// Data për quiz-et
const quizzes = {
  "quiz1.html": [
    { question: "Çfarë përfaqëson numri π?", answers: { a: "Një vlerë e fiksuar për rreze", b: "Raporti i perimetrit me diametrin", c: "Një simbol i çuditshëm" }, correct: "b" },
    { question: "Kush ishte ndër të parët që llogariti π me saktësi?", answers: { a: "Arkimedi", b: "Pitagora", c: "Euklidi" }, correct: "a" },
    { question: "Çfarë lloj numri është π?", answers: { a: "Numër i thjeshtë", b: "Numër racional", c: "Numër iracional" }, correct: "c" },
    { question: "Cila është dita ndërkombëtare e Pi-së?", answers: { a: "3 Mars", b: "14 Mars", c: "22 Mars" }, correct: "b" },
    { question: "Simboli π përfaqëson?", answers: { a: "Një konstante universale", b: "Një vlerë të përkohshme", c: "Një ekuacion" }, correct: "a" },
    { question: "Cili numër vjen pas 3.14159 në shifrat e π?", answers: { a: "2", b: "3", c: "2" }, correct: "a" },
    { question: "A mund të shprehet π si thyesë e thjeshtë?", answers: { a: "Po", b: "Jo", c: "Vetëm në disa raste" }, correct: "b" },
    { question: "Kush e përdori për herë të parë simbolin π për këtë numër?", answers: { a: "Leonhard Euler", b: "William Jones", c: "Isaac Newton" }, correct: "b" },
    { question: "Në cilën fushë përdoret më shumë π?", answers: { a: "Gjeometri", b: "Algjebër", c: "Statistikë" }, correct: "a" },
    { question: "Cili është përdorimi kryesor i π?", answers: { a: "Për të llogaritur vëllime", b: "Për të matur rrethin", c: "Për të matur diagonale" }, correct: "b" }
],
  
  "quiz2.html": [
    { question: "Cili është perimetri i një rrethi me diametër 10 cm?", answers: { a: "31.4 cm", b: "25 cm", c: "28.6 cm" }, correct: "a" },
    { question: "Sa është sipërfaqja e një rrethi me rreze 5 cm (π ≈ 3.14)?", answers: { a: "78.5 cm²", b: "25 cm²", c: "50 cm²" }, correct: "a" },
    { question: "Nëse π ≈ 3.1416, sa është 2π?", answers: { a: "6.2832", b: "6.14", c: "7.1416" }, correct: "a" },
    { question: "Cili është rrethi me sipërfaqe më të madhe?", answers: { a: "R = 4", b: "d = 2.5", c: "R = 3.5" }, correct: "b" },
    { question: "Sa është π × 10²?", answers: { a: "314.16", b: "100", c: "141.6" }, correct: "a" },
    { question: "Sa është rrënja katrore e (π²)?", answers: { a: "π", b: "3.15", c: "9.86" }, correct: "a" },
    { question: "Nëse një rreth ka perimetër 62.8 cm, sa është diametri i tij (π ≈ 3.14)?", answers: { a: "20 cm", b: "15 cm", c: "10 cm" }, correct: "a" },
    { question: "Sa është 3π + 2π?", answers: { a: "5π", b: "6π", c: "4π" }, correct: "a" },
    { question: "Nëse rreze = 7 cm, sa është sipërfaqja?", answers: { a: "153.86 cm²", b: "100 cm²", c: "143 cm²" }, correct: "a" },
    { question: "Cili është volumi i një sfere me rreze 3 cm? ", answers: { a: "113.1 cm³", b: "90 cm³", c: "105 cm³" }, correct: "a" }
],

  "quiz3.html": [ // Science quiz
    { question: "Cili është elementi kimik me simbolin O?", answers: { a: "Oxigjeni", b: "Oksidi", c: "Osmium" }, correct: "a" },
    { question: "Sa është temperatura e duhur për të pasur ujë në gjendje të lëngshme?", answers: { a: "0°C", b: "100°C", c: "50°C" }, correct: "a" },
    { question: "Cila është formula e ujit?", answers: { a: "H2O", b: "H2SO4", c: "CO2" }, correct: "a" },
    { question: "Cili është planeti më i afërt me Diellin?", answers: { a: "Venusi", b: "Merkuri", c: "Toka" }, correct: "b" },
    { question: "Cili është procesi përmes të cilit bimët bëjnë ushqim?", answers: { a: "Fotosinteza", b: "Respirimi", c: "Dhembja" }, correct: "a" },
    { question: "Cila është ngjyra që përdoret për të përfaqësuar botën e gjallë në grafikun e ekosistemit?", answers: { a: "E kuqe", b: "E gjelbër", c: "E kaltër" }, correct: "b" },
    { question: "Cili është elementet që krijojnë molekulën e CO2?", answers: { a: "Karboni dhe oksigjeni", b: "Hidrogjeni dhe oksigjeni", c: "Karboni dhe azoti" }, correct: "a" },
    { question: "Si quhet procesi që përdor shigjetat elektrike për të transportuar informacione në trurin e njeriut?", answers: { a: "Impulsi nervor", b: "Fotosinteza", c: "Energji elektrike" }, correct: "a" },
    { question: "Sa vjet mund të jetojë një dhelpër në natyrë?", answers: { a: "4-5 vjet", b: "10-15 vjet", c: "20 vjet" }, correct: "a" },
    { question: "Çfarë është një element në tabelën periodike?", answers: { a: "Një material që nuk mund të ndahet më tej", b: "Një substancë që ka vetëm një tip atomi", c: "Një lloj molekule" }, correct: "b" }
  ]
};

// Merr quiz-in aktual nga URL-ja
const quizName = window.location.pathname.split('/').pop();
const questions = quizzes[quizName];

// Krijo quiz-in dinamikisht
function buildQuiz() {
  const output = questions.map((q, index) => {
    const answers = Object.keys(q.answers).map(
      key =>
        `<label>
          <input type="radio" name="question${index}" value="${key}">
          ${q.answers[key]}
        </label>`
    ).join('');
    return `<div class="question">${q.question}</div>
            <div class="answers">${answers}</div>`;
  });
  quizContainer.innerHTML = output.join('');
}

// Trego rezultatet
function showResults() {
  const answers = quizContainer.querySelectorAll('.answers');
  let score = 0;

  questions.forEach((q, i) => {
    const selected = answers[i].querySelector('input[name="question' + i + '"]:checked');
    if (selected && selected.value === q.correct) {
      score++;
      answers[i].style.color = 'green';
    } else {
      answers[i].style.color = 'red';
    }
  });

  resultContainer.innerHTML = `Keni marrë ${score} nga ${questions.length} pyetje të sakta.`;
}

// Inicializo quiz-in
buildQuiz();
submitButton.addEventListener('click', showResults);
