// 게시글 목록 페이지: 무한 스크롤 + 카드 렌더링
const postsList = document.getElementById('postsList');
const loadingIndicator = document.getElementById('loading');
const writeButton = document.getElementById('writeButton');
const riotLinkButton = document.getElementById('riotLinkButton');

const getPostDetailUrl = (postId) => (`../post/post.html?id=${postId}`);
// 상세 페이지에서 사용할 ID를 세션에 저장
const persistPostId = (postId) => {
    if (postId !== null && postId !== undefined && !Number.isNaN(postId)) {
        sessionStorage.setItem('currentPostId', String(postId));
    }
};

const POSTS_BATCH_SIZE = 8;
let currentPage = 0;
let isLoading = false;

// 긴 제목은 말줄임 처리
function formatTitle(title) {
    if (title.length <= 26) return title;
    return `${title.slice(0, 26)}…`;
}

// 소형 숫자 포맷
function formatCount(value) {
    return String(value);
}

// 날짜를 YYYY-MM-DD HH:mm:ss로 변환
function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

// Mock 데이터 생성 (실제 API 대체)
function createMockPost(index) {
    const now = new Date();
    now.setHours(now.getHours() - index);
    const baseTitle = `제목 ${index + 1} - TFT 전략 이야기`; 

    return {
        id: index,
        title: baseTitle,
        likes: Math.floor(Math.random() * 100) + 1, // 1~100 사이의 작은 숫자
        comments: Math.floor(Math.random() * 50) + 1, // 1~50 사이의 작은 숫자
        views: Math.floor(Math.random() * 200) + 1, // 1~200 사이의 작은 숫자
        author: `더미 작성자 ${index + 1}`,
        date: now,
    };
}

// 단일 게시글 카드를 만들어 DOM에 삽입
function renderPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${post.title} 게시글 상세보기`);

    const info = document.createElement('div');
    info.className = 'post-info';

    const title = document.createElement('h2');
    title.className = 'post-title';
    title.textContent = formatTitle(post.title);

    const meta = document.createElement('div');
    meta.className = 'post-meta';

    const likes = document.createElement('span');
    likes.textContent = `좋아요 ${formatCount(post.likes)}`;

    const comments = document.createElement('span');
    comments.textContent = `댓글수 ${formatCount(post.comments)}`;

    const views = document.createElement('span');
    views.textContent = `조회수 ${formatCount(post.views)}`;

    meta.append(likes, comments, views);

    const footer = document.createElement('div');
    footer.className = 'post-footer';

    const author = document.createElement('div');
    author.className = 'post-author';

    const avatar = document.createElement('div');
    avatar.className = 'avatar-placeholder';

    const authorName = document.createElement('span');
    authorName.textContent = post.author;

    author.append(avatar, authorName);

    const date = document.createElement('time');
    date.className = 'post-date';
    date.dateTime = post.date.toISOString();
    date.textContent = formatDate(post.date);

    footer.append(author, date);

    info.append(title, meta, footer);
    card.append(info);

    card.addEventListener('click', () => {
        console.log(`게시글 ${post.id} 클릭`);
        persistPostId(post.id);
        window.location.href = getPostDetailUrl(post.id);
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });

    postsList.appendChild(card);
}

// 무한 스크롤에 따라 게시글 배치 로드
async function loadPosts() {
    if (isLoading) return;

    isLoading = true;
    loadingIndicator.classList.add('active');

    // 가상의 API 호출을 시뮬레이션하기 위해 지연 추가
    await new Promise((resolve) => setTimeout(resolve, 600));

    const startIndex = currentPage * POSTS_BATCH_SIZE;
    const posts = Array.from({ length: POSTS_BATCH_SIZE }, (_, i) => createMockPost(startIndex + i));

    posts.forEach(renderPostCard);

    currentPage += 1;
    isLoading = false;
    loadingIndicator.classList.remove('active');
}

// IntersectionObserver 콜백
function handleScroll(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading) {
            loadPosts();
        }
    });
}

const sentinel = document.createElement('div');
postsList.after(sentinel);

const observer = new IntersectionObserver(handleScroll, {
    root: null,
    threshold: 0.1,
});

observer.observe(sentinel);

writeButton.addEventListener('click', () => {
    window.location.href = '../make-post/make-post.html';
});

// 프로필 드롭다운 초기화 (profile-dropdown.js의 함수 사용)
initProfileDropdown();

// 초기 데이터 로드
loadPosts();

if (riotLinkButton) {
    let riotLabel = riotLinkButton.querySelector('.riot-link-label');
    if (!riotLabel) {
        riotLabel = riotLinkButton.querySelector('span:not(.riot-logo-icon)');
        if (riotLabel) {
            riotLabel.classList.add('riot-link-label');
        }
    }
    let isRiotLinked = false;
    riotLinkButton.addEventListener('click', () => {
        if (isRiotLinked) return;
        isRiotLinked = true;
        if (riotLabel) {
            riotLabel.textContent = 'Riot 계정 연동 완료';
        }
        riotLinkButton.classList.add('linked');
        riotLinkButton.disabled = true;
        alert('Riot 계정이 연동되었습니다.');
    });
}

