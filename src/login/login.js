// 간결한 로그인 폼 스크립트
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const signupLink = document.getElementById('signupLink');
const findPasswordLink = document.getElementById('findPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('rememberEmail');

const REMEMBER_EMAIL_KEY = 'rememberedEmail';
let isRiotLinked = false;

function validateEmail(email) {
    if (!email || email.trim() === '') {
        return 'empty';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length >= 5 ? 'valid' : 'invalid';
    }

function validatePassword(password) {
    if (!password || password.trim() === '') {
        return 'empty';
    }
    return 'valid';
}

function validatePasswordFormat(password) {
    if (!password || password.trim() === '') {
        return 'empty';
    }
    if (password.length < 8 || password.length > 20) {
        return 'invalid';
    }
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpper && hasLower && hasNumber && hasSpecial ? 'valid' : 'invalid';
    }

function showEmailError(message) {
    emailError.textContent = message;
}

function hideEmailError() {
    emailError.textContent = '';
}

function showPasswordError(message) {
    passwordError.textContent = message;
}

function hidePasswordError() {
    passwordError.textContent = '';
}

function updateLoginButton() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const isEmailValid = validateEmail(email) === 'valid';
    const isPasswordValid = validatePassword(password) === 'valid';
    loginBtn.disabled = !(isEmailValid && isPasswordValid);
    loginBtn.classList.toggle('active', !loginBtn.disabled);
}

function restoreRememberedEmail() {
    const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
}

restoreRememberedEmail();
updateLoginButton();

emailInput.addEventListener('input', () => {
    const emailStatus = validateEmail(emailInput.value.trim());
    if (emailStatus === 'invalid') {
        showEmailError('* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
    } else {
        hideEmailError();
    }
    updateLoginButton();
});

passwordInput.addEventListener('input', () => {
    hidePasswordError();
    updateLoginButton();
});

if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
        const isText = passwordInput.type === 'text';
        passwordInput.type = isText ? 'password' : 'text';
        togglePasswordBtn.textContent = isText ? '보기' : '숨기기';
        togglePasswordBtn.setAttribute('aria-pressed', String(!isText));
        passwordInput.focus();
    });
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    hideEmailError();
    hidePasswordError();
    
    const emailStatus = validateEmail(email);
    const passwordStatus = validatePassword(password);
    const passwordFormatStatus = validatePasswordFormat(password);
    
    let hasError = false;
    
    if (emailStatus === 'empty') {
        showEmailError('* 이메일을 입력해주세요.');
        hasError = true;
    } else if (emailStatus === 'invalid') {
        showEmailError('* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
        hasError = true;
    }
    
    if (passwordStatus === 'empty') {
        showPasswordError('* 비밀번호를 입력해주세요.');
        hasError = true;
    } else if (passwordFormatStatus === 'invalid') {
        showPasswordError('* 아이디 또는 비밀번호를 확인해주세요.');
        hasError = true;
    }
    
    if (hasError) {
        updateLoginButton();
        return;
    }
    
    if (rememberCheckbox.checked) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
    } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }
        
    // 임시 인증 데이터
    const mockAuthSuccess = email === 'tft@example.com' && password === 'Tft12345!';

    if (!mockAuthSuccess) {
        showPasswordError('* 아이디 또는 비밀번호를 확인해주세요.');
        updateLoginButton();
        return;
    }

    alert('로그인이 완료되었습니다.');
    window.location.href = '../posts/posts.html';
});

if (signupLink) {
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
        window.location.href = '../sign-up/sign-up.html';
});
}

if (findPasswordLink) {
    findPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('비밀번호 찾기 기능은 준비 중입니다.');
    });
}
