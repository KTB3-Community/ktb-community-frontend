// 로그아웃 처리: 로컬 스토리지/쿠키 정리 후 resolve
function handleLogout() {
    return new Promise(async (resolve, reject) => {
        try {
            // 실제 로그아웃 API 호출 (있는 경우)
            // await fetch('/api/logout', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include'
            // });
            
            // 로컬스토리지/세션스토리지에서 토큰 제거
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            
            // 쿠키 제거 (있는 경우)
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            
            resolve();
        } catch (error) {
            console.error('로그아웃 오류:', error);
            // 오류가 발생해도 로그아웃 처리
            localStorage.clear();
            sessionStorage.clear();
            resolve(); // 오류가 있어도 로그아웃은 성공으로 처리
        }
    });
}

// 로그아웃 클릭 이벤트 연결
function initLogout(element) {
    if (!element) return;
    
    // 로그인 페이지로 리다이렉트
    const redirectUrl = element.dataset.redirect || element.getAttribute('href') || 'login.html';

    element.addEventListener('click', async (e) => {
        e.preventDefault();
        
        await handleLogout();
        
        // 로그아웃 알림 표시
        alert('로그아웃되었습니다.');
        
        // 로그인 페이지로 이동
        window.location.href = redirectUrl;
    });
}

// 모든 페이지에서 공통으로 로그아웃 링크 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        initLogout(logoutLink);
    }
});

