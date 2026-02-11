// Funny but helpful Magic 8-Ball answers
const answers = [
    // Positive / Yes answers
    { text: "Yes! Do it before you overthink it.", type: "positive" },
    { text: "Absolutely. Your gut knows.", type: "positive" },
    { text: "100% yes. Now stop asking and start doing.", type: "positive" },
    { text: "The stars say yes. So does common sense.", type: "positive" },
    { text: "Yes, but maybe take a snack break first.", type: "positive" },
    { text: "Green light! Full send!", type: "positive" },
    { text: "Yes. Future you will thank present you.", type: "positive" },
    { text: "Obviously yes. You knew that already.", type: "positive" },
    { text: "Yes! The universe is literally begging you.", type: "positive" },
    { text: "Certified yes. I'd bet my plastic on it.", type: "positive" },
    
    // Negative / No answers
    { text: "Nope. But you'll ignore me anyway.", type: "negative" },
    { text: "Hard no. Trust the ball.", type: "negative" },
    { text: "Not today, friend. Maybe try again never.", type: "negative" },
    { text: "The answer is no. I'm saving you from yourself.", type: "negative" },
    { text: "No. Go touch grass instead.", type: "negative" },
    { text: "Negative. But at least you asked!", type: "negative" },
    { text: "No way. Even I can see that's a bad idea.", type: "negative" },
    { text: "That's a no from me, dawg.", type: "negative" },
    { text: "Absolutely not. Take a nap and reconsider.", type: "negative" },
    { text: "No. But I still believe in you.", type: "negative" },
    
    // Maybe / Uncertain answers
    { text: "Ask again after coffee.", type: "maybe" },
    { text: "Hmm... flip a coin. Heads yes, tails also yes.", type: "maybe" },
    { text: "The vibes are unclear. Try again.", type: "maybe" },
    { text: "Maybe? I'm a ball, not a therapist.", type: "maybe" },
    { text: "Reply hazy. Have you tried turning it off and on?", type: "maybe" },
    { text: "50/50. Which honestly is pretty good odds.", type: "maybe" },
    { text: "Cannot predict now. Mercury is in Gatorade.", type: "maybe" },
    { text: "Unclear. But whatever happens, you'll handle it.", type: "maybe" },
    { text: "My sources say... they're on lunch break.", type: "maybe" },
    { text: "Concentrate and ask again. I wasn't listening.", type: "maybe" },
    
    // Sassy / Philosophical answers
    { text: "Bold of you to ask a ball for life advice.", type: "sass" },
    { text: "You already know the answer. Trust yourself.", type: "sass" },
    { text: "What would your therapist say? Ask them instead.", type: "sass" },
    { text: "The real question is: why are you asking me?", type: "sass" },
    { text: "I'm literally filled with liquid. But sure, yes.", type: "sass" },
    { text: "Plot twist: the answer was inside you all along.", type: "sass" },
    { text: "Sure, but have you considered just winging it?", type: "sass" },
    { text: "Life's too short. Just do the thing.", type: "sass" },
    { text: "You're asking the right questions. Wrong ball though.", type: "sass" },
    { text: "Permission granted. Now go be chaotic.", type: "sass" },
];

// Track last answer to avoid immediate repeats
let lastAnswerIndex = -1;

function getRandomAnswer() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * answers.length);
    } while (newIndex === lastAnswerIndex && answers.length > 1);
    
    lastAnswerIndex = newIndex;
    return answers[newIndex];
}

function shakeBall() {
    const ball = document.getElementById('ball');
    const triangle = document.getElementById('triangle');
    const answerEl = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeBtn = document.getElementById('shake-btn');
    
    // Require a question
    if (!questionInput.value.trim()) {
        questionInput.placeholder = "C'mon, ask something first! 🤔";
        questionInput.focus();
        questionInput.classList.add('shake-input');
        setTimeout(() => {
            questionInput.classList.remove('shake-input');
            questionInput.placeholder = "Type your question here...";
        }, 1000);
        return;
    }
    
    // Disable button during animation
    shakeBtn.disabled = true;
    
    // Hide the answer and shake
    triangle.classList.add('hidden');
    triangle.classList.remove('revealed');
    ball.classList.add('shaking');
    
    // After shake animation, reveal the answer
    setTimeout(() => {
        ball.classList.remove('shaking');
        const answer = getRandomAnswer();
        answerEl.textContent = answer.text;
        triangle.classList.remove('hidden');
        triangle.classList.add('revealed');
        
        // Re-enable button
        shakeBtn.disabled = false;
        
        // Track the shake
        if (window.trackEvent) trackEvent('shake', answer.type);
    }, 700);
}

// Allow Enter key to shake the ball
document.getElementById('question').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        shakeBall();
    }
});

// Add some CSS for the input shake animation
const style = document.createElement('style');
style.textContent = `
    .shake-input {
        animation: inputShake 0.4s ease;
        border: 2px solid #ff6b6b !important;
    }
    @keyframes inputShake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code reveals a secret answer
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const answerEl = document.getElementById('answer');
        const triangle = document.getElementById('triangle');
        answerEl.textContent = "🎮 You found the secret! The answer is always 42.";
        triangle.classList.remove('hidden');
        triangle.classList.add('revealed');
        
        // Confetti effect (simple version)
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
        }, 2000);
    }
});
