// 회원가입 폼 제어: 필수값 검증, 이미지 업로드, 버튼 상태 관리
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');
const avatarRemove = document.getElementById('avatarRemove');
const avatarHelp = document.getElementById('avatarHelp');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('passwordConfirm');
const nicknameInput = document.getElementById('nickname');

const emailHelp = document.getElementById('emailHelp');
const passwordHelp = document.getElementById('passwordHelp');
const confirmHelp = document.getElementById('confirmHelp');
const nicknameHelp = document.getElementById('nicknameHelp');

const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('signUpForm');

let avatarLocked = false; // 업로드 완료 시 재업로드 막기
let avatarTouched = false;
let emailTouched = false;
let passwordTouched = false;
let confirmTouched = false;
let nicknameTouched = false;

const DUP_EMAILS = ['test@example.com', 'taken@mail.com'];
const DUP_NICKS = ['kimminjin', '민진'];

// 프로필 이미지 업로드 후 미리보기 & 상태 갱신
function setAvatar(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    avatar.style.background = `url('${e.target.result}') center/cover no-repeat`;
    avatar.querySelector('.avatar-plus').style.display = 'none';
    avatarRemove.hidden = false;
    avatarLocked = true;
    avatarTouched = true;
    avatarHelp.textContent = '';
    updateState();
  };
  reader.readAsDataURL(file);
}

avatar.addEventListener('click', () => {
  if (avatarLocked) return; // 프로필 이미지 업로드 완료 후 재업로드 방지
  avatarInput.click();
});

avatar.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && !avatarLocked) {
    e.preventDefault();
    avatarInput.click();
  }
});

avatarInput.addEventListener('change', (e) => {
  const [file] = e.target.files;
  if (!file) return;
  setAvatar(file);
});

avatarRemove.addEventListener('click', () => {
  // 이미지 제거 후 재업로드 가능하게
  avatar.style.background = '#d0d0d0';
  avatar.querySelector('.avatar-plus').style.display = '';
  avatarRemove.hidden = true;
  avatarLocked = false;
  avatarTouched = true;
  updateState();
});

// 이메일 형식/중복 검사
function validateEmail(value) {
  if (!value) return 'empty';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'invalid';
  if (DUP_EMAILS.includes(value)) return 'duplicate';
  return 'valid';
}

// 비밀번호 규칙 검사
function validatePassword(value) {
  if (!value) return 'empty';
  if (value.length < 8 || value.length > 20) return 'invalid';
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNum = /[0-9]/.test(value);
  const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return hasUpper && hasLower && hasNum && hasSpec ? 'valid' : 'invalid';
}

// 닉네임 제약 조건 검사
function validateNickname(value) {
  if (!value) return 'empty';
  if (value.includes(' ')) return 'space';
  if (value.length > 10) return 'long';
  if (DUP_NICKS.includes(value)) return 'duplicate';
  return 'valid';
}

// 이메일 도움말 문구 표시/숨김
function updateEmailHelp(status, show) {
  if (!show) {
    emailHelp.textContent = '';
    return;
  }
  if (status === 'empty') emailHelp.textContent = '* 이메일을 입력해주세요.';
  else if (status === 'invalid') emailHelp.textContent = '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
  else if (status === 'duplicate') emailHelp.textContent = '* 중복된 이메일 입니다.';
  else emailHelp.textContent = '';
}

// 비밀번호 도움말 문구 표시/숨김
function updatePasswordHelp(status, show) {
  if (!show) {
    passwordHelp.textContent = '';
    return;
  }
  if (status === 'empty') passwordHelp.textContent = '* 비밀번호를 입력해주세요';
  else if (status === 'invalid') passwordHelp.textContent = '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
  else passwordHelp.textContent = '';
}

// 비밀번호 확인 도움말 문구 표시/숨김
function updateConfirmHelp(status, p1, p2, show) {
  if (!show) {
    confirmHelp.textContent = '';
    return;
  }
  if (status === 'empty') confirmHelp.textContent = '* 비밀번호를 한번 더 입력해주세요';
  else if (p1 && p2 && p1 !== p2) confirmHelp.textContent = '* 비밀번호가 다릅니다.';
  else confirmHelp.textContent = '';
}

// 닉네임 도움말 문구 표시/숨김
function updateNicknameHelp(status, show) {
  if (!show) {
    nicknameHelp.textContent = '';
    return;
  }
  if (status === 'empty') nicknameHelp.textContent = '* 닉네임을 입력해주세요';
  else if (status === 'space') nicknameHelp.textContent = '* 띄어쓰기를 없애주세요.';
  else if (status === 'long') nicknameHelp.textContent = '* 닉네임은 최대 10자 까지 작성 가능합니다.';
  else if (status === 'duplicate') nicknameHelp.textContent = '* 중복된 닉네임 입니다.';
  else nicknameHelp.textContent = '';
}

// 필드 상태 종합 후 에러 및 버튼 상태 갱신
function updateState(force = false) {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmInput.value.trim();
  const nickname = nicknameInput.value.trim();

  const e = validateEmail(email);
  const p = validatePassword(password);
  const c = validatePassword(confirm);
  const n = validateNickname(nickname);

  const showEmail = force || emailTouched;
  const showPassword = force || passwordTouched;
  const showConfirm = force || confirmTouched;
  const showNickname = force || nicknameTouched;
  const showAvatar = force || avatarTouched;

  updateEmailHelp(e, showEmail);
  updatePasswordHelp(p, showPassword);
  updateConfirmHelp(c, password, confirm, showConfirm);
  updateNicknameHelp(n, showNickname);

  if (showAvatar && !avatarLocked) {
    avatarHelp.textContent = '* 프로필 이미지는 필수입니다.';
  } else if (avatarLocked) {
    avatarHelp.textContent = '';
  } else if (!showAvatar) {
    avatarHelp.textContent = '';
  }

  const ok = avatarLocked && e === 'valid' && p === 'valid' && c === 'valid' && password === confirm && n === 'valid';
  submitBtn.disabled = !ok;
  submitBtn.classList.toggle('enabled', ok);
  return ok;
}

emailInput.addEventListener('input', () => {
  emailTouched = true;
  updateState();
});
passwordInput.addEventListener('input', () => {
  passwordTouched = true;
  updateState();
});
confirmInput.addEventListener('input', () => {
  confirmTouched = true;
  updateState();
});
nicknameInput.addEventListener('input', () => {
  nicknameTouched = true;
  updateState();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  avatarTouched = true;
  emailTouched = true;
  passwordTouched = true;
  confirmTouched = true;
  nicknameTouched = true;
  const ok = updateState(true);
  if (!ok) return;
    alert('회원가입이 완료되었습니다.');
    window.location.href = 'login.html';
});

updateState(false);
