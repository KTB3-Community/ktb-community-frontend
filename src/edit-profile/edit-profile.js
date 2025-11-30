// 프로필 수정 페이지 상호작용 로직
const updateButton = document.getElementById('updateButton');
const nicknameInput = document.getElementById('nickname');
const helper = document.getElementById('nicknameHelper');
const toast = document.getElementById('toast');
const withdrawButton = document.getElementById('withdrawButton');
const withdrawModal = document.getElementById('withdrawModal');
const modalOverlay = document.getElementById('modalOverlay');
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');

const MAX_NICKNAME_LENGTH = 10;

// 이미 있는 닉네임 더미 데이터
const takenNicknames = ['민진', 'kimminjin', 'guestuser'];

// 아바타 파일을 미리보기 적용
const handleAvatarFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        avatar.style.backgroundImage = `url('${event.target.result}')`;
        avatar.classList.add('has-image');
    };
    reader.readAsDataURL(file);
};

avatar.addEventListener('click', () => {
    avatarInput.click();
});

avatar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        avatarInput.click();
    }
});

avatarInput.addEventListener('change', (event) => {
    const [file] = event.target.files;
    handleAvatarFile(file);
});

// 닉네임 에러 메시지 토글
const showHelper = (message) => {
    helper.textContent = message;
    helper.classList.toggle('show', Boolean(message));
}; 

// 저장 완료 토스트 표시
const showToast = () => {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
};

// 회원 탈퇴 모달 열기
const openModal = () => {
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    if (typeof withdrawModal.showModal === 'function') {
        withdrawModal.showModal();
    } else {
        withdrawModal.setAttribute('open', '');
    }
};

// 회원 탈퇴 모달 닫기
const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    if (typeof withdrawModal.close === 'function') {
        withdrawModal.close();
    } else {
        withdrawModal.removeAttribute('open');
    }
};

// 닉네임 유효성 검사
const validateNickname = () => {
    const value = nicknameInput.value.trim();
    if (!value) {
        showHelper('*닉네임을 입력해주세요.');
        return false;
    }
    if (value.length > MAX_NICKNAME_LENGTH) {
        showHelper('*닉네임은 최대 10자 까지 작성 가능합니다.');
        return false;
    }
    if (takenNicknames.includes(value)) {
        showHelper('*중복된 닉네임 입니다.');
        return false;
    }
    showHelper('');
    return true;
};

// 사용자가 입력 중일 때 즉시 검증
nicknameInput.addEventListener('input', () => {
    if (helper.textContent) {
        validateNickname();
    }
});

// 저장 버튼 클릭 시 검증 후 토스트
updateButton.addEventListener('click', () => {
    if (validateNickname()) {
        showHelper('');
        showToast(() => {
            window.location.href = '../posts/posts.html';
        });
    }
});

// 회원 탈퇴 버튼 및 오버레이 이벤트
withdrawButton.addEventListener('click', openModal);
modalOverlay.addEventListener('click', closeModal);

withdrawModal.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        if (action === 'confirm') {
            closeModal();
            alert('회원 탈퇴가 완료되었습니다.');
            window.location.href = 'login.html';
        } else {
            closeModal();
        }
    });
});
