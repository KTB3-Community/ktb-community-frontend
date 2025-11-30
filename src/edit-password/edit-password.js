// 비밀번호 변경 페이지 검증 로직
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('passwordConfirm');
const passwordHelp = document.getElementById('passwordHelp');
const confirmHelp = document.getElementById('confirmHelp');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('passwordForm');
const toast = document.getElementById('toast');
const togglePasswordBtn = document.getElementById('togglePassword');
const togglePasswordConfirmBtn = document.getElementById('togglePasswordConfirm');

const PASSWORD_RULE_MSG = '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';

// 비밀번호 규칙 검증
function validatePassword(value){
    if(!value){ return 'empty'; }
    if(value.length < 8 || value.length > 20){ return 'invalid'; }
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNum = /[0-9]/.test(value);
    const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return (hasUpper && hasLower && hasNum && hasSpec) ? 'valid' : 'invalid';
}

// 입력 값 상태 업데이트 및 버튼 활성화 판단
function updateState(){
    const p1 = passwordInput.value.trim();
    const p2 = confirmInput.value.trim();

    const v1 = validatePassword(p1);
    const v2 = validatePassword(p2);

    if(v1 === 'invalid'){
        passwordHelp.textContent = PASSWORD_RULE_MSG;
    }else{
        passwordHelp.textContent = '';
    }

    if(p1 && p2 && p1 !== p2){
        confirmHelp.textContent = '* 비밀번호가 다릅니다';
    }else{
        if(v2 === 'valid') confirmHelp.textContent = '';
    }

    const isValid = v1 === 'valid' && v2 === 'valid' && p1 === p2;
    submitBtn.disabled = !isValid;
    submitBtn.classList.toggle('enabled', isValid);
}

// 입력 변화와 포커스 아웃 시 모두 재검증
passwordInput.addEventListener('input', updateState);
confirmInput.addEventListener('input', updateState);
passwordInput.addEventListener('blur', updateState);
confirmInput.addEventListener('blur', updateState);

if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
        const isText = passwordInput.type === 'text';
        passwordInput.type = isText ? 'password' : 'text';
        togglePasswordBtn.textContent = isText ? '보기' : '숨기기';
        togglePasswordBtn.setAttribute('aria-pressed', String(!isText));
        passwordInput.focus();
    });
}

if (togglePasswordConfirmBtn) {
    togglePasswordConfirmBtn.addEventListener('click', () => {
        const isText = confirmInput.type === 'text';
        confirmInput.type = isText ? 'password' : 'text';
        togglePasswordConfirmBtn.textContent = isText ? '보기' : '숨기기';
        togglePasswordConfirmBtn.setAttribute('aria-pressed', String(!isText));
        confirmInput.focus();
    });
}

// 제출 시 최종 검증 후 토스트 표시
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    updateState();
    if(submitBtn.disabled) return;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 2000);
});

updateState();
