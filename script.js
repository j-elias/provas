document.addEventListener('DOMContentLoaded', function () {
    // Encapsula cada pergunta em um contêiner `.question` para tornar manipulação mais robusta
    function wrapQuestions() {
        const headers = Array.from(document.querySelectorAll('.container h3'));
        headers.forEach(h3 => {
            if (h3.closest('.question')) return;
            const q = document.createElement('div');
            q.className = 'question';
            h3.parentNode.insertBefore(q, h3);
            let node = h3;
            while (node && node.nodeType === 1 && node.tagName !== 'HR' && node.tagName !== 'H3') {
                const next = node.nextSibling;
                q.appendChild(node);
                node = next;
            }
        });
    }

    wrapQuestions();

    let score = 0;

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'scoreboard';
    scoreDiv.textContent = 'Pontuação: 0';
    document.body.insertBefore(scoreDiv, document.body.firstChild);

    function findFeedback(el) {
        let sib = el.nextElementSibling;
        while (sib) {
            if (sib.classList && sib.classList.contains('feedback')) return sib;
            sib = sib.nextElementSibling;
        }
        return el.parentElement.querySelector('.feedback');
    }

    function getQuestionButtons(btn) {
        const buttons = new Set();
        buttons.add(btn);
        let sib = btn.previousElementSibling;
        while (sib && sib.tagName !== 'H3' && sib.tagName !== 'HR') {
            if (sib.tagName === 'BUTTON') buttons.add(sib);
            sib = sib.previousElementSibling;
        }
        sib = btn.nextElementSibling;
        while (sib && sib.tagName !== 'H3' && sib.tagName !== 'HR') {
            if (sib.tagName === 'BUTTON') buttons.add(sib);
            sib = sib.nextElementSibling;
        }
        return Array.from(buttons);
    }

    function handleAnswer(btn, isCorrect) {
        const feedback = findFeedback(btn);
        const qButtons = getQuestionButtons(btn);
        if (qButtons.some(b => b.disabled)) return;
        qButtons.forEach(b => b.disabled = true);
        if (isCorrect) {
            btn.classList.add('correct-answer');
            if (feedback) feedback.textContent = 'Correta!';
            score++;
        } else {
            btn.classList.add('incorrect-answer');
            if (feedback) feedback.textContent = 'Incorreta!';
            const correctBtn = qButtons.find(b => b.classList.contains('correct'));
            if (correctBtn) {
                correctBtn.classList.add('show-correct');
                if (feedback) feedback.innerHTML = 'Incorreta! <br><strong>Resposta correta:</strong> ' + correctBtn.textContent;
            }
        }
        scoreDiv.textContent = 'Pontuação: ' + score;
    }

    document.querySelectorAll('button.correct').forEach(btn => {
        btn.addEventListener('click', function () { handleAnswer(btn, true); });
    });

    document.querySelectorAll('button.incorrect').forEach(btn => {
        btn.addEventListener('click', function () { handleAnswer(btn, false); });
    });

    const reset = document.createElement('button');
    reset.id = 'reset-answers';
    reset.textContent = 'Reiniciar';
    reset.style.margin = '8px';
    scoreDiv.appendChild(reset);
    reset.addEventListener('click', function () {
        score = 0;
        scoreDiv.textContent = 'Pontuação: 0';
        document.querySelectorAll('button').forEach(b => {
            b.disabled = false;
            b.classList.remove('correct-answer', 'incorrect-answer', 'show-correct');
        });
        document.querySelectorAll('.feedback').forEach(f => f.innerHTML = '');
    });
});