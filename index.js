const questions = [
    {
        question: 'What is the (professional) distance between home plate and 1st base?',
        choices: [
            '100 ft',
            '90 ft',
            '65 ft',
            '120 ft'
        ],
        answer: '90 ft'
    },
    {
        question: 'Who is the MLB all time leader in home runs?',
        choices: [
            'Barry Bonds',
            'Babe Ruth',
            'Derek Jeter',
            'Mark McGuire'
        ],
        answer: 'Barry Bonds'
    },
    {
        question: 'Which of these players won Rookie of the Year and MVP in the same season?',
        choices: [
            'Alex Rodriguez',
            'Ted Williams',
            'Ichiro Suzuki',
            'Randy Johnson'
        ],
        answer: 'Ichiro Suzuki'
    },
    {
        question: 'How many MLB teams does California have?',
        choices: [
            '1',
            '2',
            '4',
            '5'
        ],
        answer: '5'
    },
    {
        question: 'If a player hits a grand slam, how many RBIs (runs batted in) is he responsible for?',
        choices: [
            '4',
            '3',
            '2',
            '1'
        ],
        answer: '4'
    },
    {
        question: 'How many innings must a pitcher complete to qualify for the win?',
        choices: [
            '9',
            '5',
            '7',
            '6'
        ],
        answer: '5'
    },
    {
        question: 'How many players are there in a starting lineup?',
        choices: [
            '12',
            '11',
            '10',
            '9'
        ],
        answer: '9'
    },
    {
        question: 'In baseball, what is a can of corn?',
        choices: [
            'Pitcher throws a shutout',
            'Halftime',
            'Easy pop fly',
            'Seventh inning stretch'
        ],
        answer: 'Easy pop fly'
    },
    {
        question: 'Which of these players did NOT win the Cy Young Award for both the National and American League?',
        choices: [
            'Cy Young',
            'Pedro Martinez',
            'Max Scherzer',
            'Roy Halladay'
        ],
        answer: 'Cy Young'
    },
    {
        question: 'Which player hit two grand slams in the same inning?',
        choices: [
            'Babe Ruth',
            'Fernando Tatis',
            'Mark Buehrle',
            'Placido Polanco'
        ],
        answer: 'Fernando Tatis'
    },
];

var current = 0;
var score = 0;
var incorrect = 0;
const beginButton = $('.beginButton');
const body = $('body');
const page = $('.page');
const next = $('.nextDiv');
const form = $('.form');
const finished = $('#finished');

function begin() {
    beginButton.click(function(event) {
        beginButton.addClass('hidden');
        body.removeClass('wrong right').addClass('blank');
        current = 0;
        score = 0;
        incorrect = 0;
        renderQuestion();
        userProgress();
        page.removeClass('hidden');
        next.addClass('hidden');
        form.removeClass('hidden');
    });

    userAnswer();
}



function renderQuestion() {
    $('#question').html(questions[current].question);
    $('.choice01').html(`<input type="radio" name="choice" value="choice01" required>${questions[current].choices[0]}`);
    $('.choice02').html(`<input type="radio" name="choice" value="choice02">${questions[current].choices[1]}`);
    $('.choice03').html(`<input type="radio" name="choice" value="choice03">${questions[current].choices[2]}`);
    $('.choice04').html(`<input type="radio" name="choice" value="choice04">${questions[current].choices[3]}`);
    $(uncheck);
}

function uncheck(){
    $('input[type="radio"]').each(function(){
      $(this).prop('checked', false);  
  });
}

function checkAnswer(userChoice) {
    var correctAnswer = questions[current].answer;
    var nextPar = $('.nextDiv p');
    if (correctAnswer === userChoice) {
        body.removeClass('blank wrong').addClass('right');
        form.addClass('hidden');
        score++;
        userProgress();
        current++;
        next.removeClass('hidden');
        nextPar.html("CORRECT!");
    } else if (!userChoice) {
        console.log('selection required');
    } else {
        body.removeClass('blank right').addClass('wrong');
        form.addClass('hidden');
        incorrect++;
        userProgress();
        current++;
        next.removeClass('hidden');
        nextPar.html("That was incorrect, the correct answer is: " + correctAnswer)
    }

    if (current === 5) {
        body.addClass('blank');
        end();
    } else {
        pressNext();
    }
}

function userAnswer() {
    form.on('click', ':submit', function(event) {
    	event.preventDefault();
        var userChoice = $('input:checked').parent().text();
        checkAnswer(userChoice);
    });
}

function pressNext() {
    $('#nextQuestion').click(function(event) {
        body.removeClass('right wrong').addClass('blank');
        next.addClass('hidden');
        form.removeClass('hidden');
        renderQuestion();
        userProgress();
    });
}


function userProgress() {
    $('#progress').html(`Question ${current + 1} of 5`);
    $('#score').html(`${score} correct, ${incorrect} incorrect.`);
    console.log('userProgress updated, current ' + current);
}


function end() {
    var restart = $('.restart');
    finishText();
    restart.removeClass('hidden');
    page.addClass('hidden');
    restart.click(function(event) {
        restart.addClass('hidden');
        finished.addClass('hidden');
        beginButton.removeClass('hidden');
        console.log('restart button clicked, current is ' + current);
    });
}

function finishText() {
    if (score < 3) {
        finished.removeClass('hidden').html(`Final score = ${score}/5.<br>You can do better!`);
    } else if (score === 3) {
        finished.removeClass('hidden').html(`Final score = ${score}/5.<br>Nice! But you can do better!`);
    } else {
        finished.removeClass('hidden').html(`Final score = ${score}/5.<br>Excellent work!`);
    }

}

begin();