const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"Shark", correct: false},
            {text:"Blue whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct:false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text:"Kenya", correct: false},
            {text:"Bhutan", correct: false},
            {text:"Vatican city", correct: true},
            {text: "Nepal", correct: false}
        ]
    },
    {
        question: "Which one is a mammal?",
        answers:[
            {text:"Snake", correct: false},
            {text:"Crocodile", correct: false},
            {text:"Penguins", correct: false},
            {text: "Whale", correct: true}
        ]
    },
    {
        question: "Which river is the longest?",
        answers:[
            {text:"Parana River", correct: false},
            {text:"Yellow River", correct: false},
            {text:"Nile River", correct: true},
            {text: "Lena River", correct: false}
        ]
    },
    {
        question: "Which is a mountain in Kenya?",
        answers:[
            {text:"Mount Kilimanjaro", correct: false},
            {text:"Mount Satima", correct: true},
            {text:"Mount Semien", correct: false},
            {text: "Mount Stanley", correct: false}
        ]
    }
];

const question = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    next.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(ans){
    const selectedBtn = ans.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    question.innerHTML = 'You scored ' + score + 'out of '+ questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
