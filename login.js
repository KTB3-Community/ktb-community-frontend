// 로그인 페이지 폼 검증 및 전송 처리
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const signupLink = document.getElementById('signupLink');

// 이메일 유효성 검사
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return 'empty';
    }
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'invalid';
    }
    // 너무 짧은 경우 (최소 길이 체크)
    if (email.length < 5) {
        return 'invalid';
    }
    return 'valid';
}

// 비밀번호 유효성 검사 (빈 값 체크용 - 버튼 활성화용)
function validatePassword(password) {
    if (!password || password.trim() === '') {
        return 'empty';
    }
    return 'valid';
}

// 비밀번호 형식 검증 (제출 시 사용)
function validatePasswordFormat(password) {
    if (!password || password.trim() === '') {
        return 'empty';
    }
    // 비밀번호 규칙: 8자 이상, 20자 이하, 대문자, 소문자, 숫자, 특수문자 각각 최소 1개
    if (password.length < 8 || password.length > 20) {
        return 'invalid';
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return 'invalid';
    }
    return 'valid';
}

// 에러 메시지 표시
function showEmailError(message) {
    emailError.textContent = message;
    emailError.style.display = 'block';
}

function hideEmailError() {
    emailError.style.display = 'none';
    emailError.textContent = '';
}

function showPasswordError(message) {
    passwordError.textContent = message;
    passwordError.style.display = 'block';
}

function hidePasswordError() {
    passwordError.style.display = 'none';
    passwordError.textContent = '';
}

// 버튼 활성화 상태 업데이트
function updateLoginButton() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    const isEmailValid = validateEmail(email) === 'valid';
    const isPasswordValid = validatePassword(password) === 'valid';
    
    if (isEmailValid && isPasswordValid) {
        loginBtn.classList.add('active');
        loginBtn.disabled = false;
    } else {
        loginBtn.classList.remove('active');
        loginBtn.disabled = true;
    }
}

// 이메일 입력 이벤트 - 형식이 틀렸을 때만 표시
emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    const emailStatus = validateEmail(email);
    
    // 이메일 형식이 틀렸을 때만 표시, 빈 값이거나 유효하면 숨김
    if (emailStatus === 'invalid') {
        showEmailError('* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
    } else {
        hideEmailError();
    }
    updateLoginButton();
});

// // 이메일 blur 이벤트 - 포커스 아웃 시에도 형식 체크
// emailInput.addEventListener('blur', () => {
//     const email = emailInput.value.trim();
//     const emailStatus = validateEmail(email);
    
//     if (emailStatus === 'invalid') {
//         showEmailError('* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
//     } else {
//         hideEmailError();
//     }
// });

// 비밀번호 입력 이벤트 - 제출 전에는 에러 표시 안 함
passwordInput.addEventListener('input', () => {
    hidePasswordError();
    updateLoginButton();
});

// 폼 제출 이벤트 - 제출 후 검증
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // 모든 에러 메시지 초기화
    hideEmailError();
    hidePasswordError();
    
    // 유효성 검사
    const emailStatus = validateEmail(email);
    const passwordStatus = validatePassword(password);
    const passwordFormatStatus = validatePasswordFormat(password); // 비밀번호 형식 검증
    
    let hasError = false;
    
    // 이메일 에러 처리
    if (emailStatus === 'empty') {
        showEmailError('* 이메일을 입력해주세요.');
        hasError = true;
    } else if (emailStatus === 'invalid') {
        showEmailError('* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
        hasError = true;
    }
    
    // 비밀번호 에러 처리
    if (passwordStatus === 'empty') {
        showPasswordError('* 비밀번호를 입력해주세요');
        hasError = true;
    } else if (passwordFormatStatus === 'invalid') {
        // 비밀번호 형식이 안 맞으면 로그인 실패
        showPasswordError('* 아이디 또는 비밀번호를 확인해주세요.');
        hasError = true;
    }
    
    // 유효성 검사 실패 시 여기서 중단
    if (hasError) {
        updateLoginButton();
        return;
    }
    
    // 모든 유효성 검사 통과 시 로그인 시도
    try {
        // 실제 로그인 API 호출
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });
        
        // 로그인 실패 시뮬레이션
        // if (!response.ok) {
        //     showPasswordError('* 아이디 또는 비밀번호를 확인해주세요');
        //     return;
        // }
        
        // 로그인 성공 시 post 페이지로 이동
        console.log('로그인 시도:', { email, password });
        alert('로그인이 완료되었습니다.');
        window.location.href = 'posts.html';
    } catch (error) {
        showPasswordError('* 아이디 또는 비밀번호를 확인해주세요.');
    }
});

// 회원가입 링크 클릭 이벤트
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'sign-up.html';
});

// 초기 버튼 상태 설정
updateLoginButton();
