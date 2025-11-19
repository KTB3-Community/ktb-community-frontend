// 프로필 드롭다운 토글 로직 (모든 페이지 공용)
window.__profileDropdownInitialized = window.__profileDropdownInitialized || false;

// 프로필 드롭다운 메뉴 토글 기능
function initProfileDropdown() {
    if (window.__profileDropdownInitialized) return;
    
    const profileToggle = document.getElementById('profileToggle');
    const profileMenu = document.getElementById('profileMenu');
    
    if (!profileToggle || !profileMenu) return;
    
    window.__profileDropdownInitialized = true;
    
    const toggleProfileMenu = () => {
        const isOpen = profileMenu.classList.toggle('open');
        profileToggle.setAttribute('aria-expanded', String(isOpen));
    };
    
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleProfileMenu();
    });
    
    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (event) => {
        if (!profileMenu.contains(event.target) && !profileToggle.contains(event.target)) {
            profileMenu.classList.remove('open');
            profileToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// DOMContentLoaded 시 자동 초기화 (다른 페이지에서 사용)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfileDropdown);
} else {
    // DOM이 이미 로드된 경우 즉시 실행
    initProfileDropdown();
}

