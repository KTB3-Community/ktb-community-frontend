// 게시글 수정 페이지 스크립트
const titleInput = document.getElementById('title');
const titleCount = document.getElementById('titleCount');
const fileInput = document.getElementById('image');
const fileName = document.getElementById('fileName');
const preview = document.getElementById('imagePreview');
const contentInput = document.getElementById('content');

const EDITED_POSTS_KEY = 'editedPosts';
let selectedImageData = null;

// 현재 정적 파일 대상으로 url 생성, 서버 api 연동 시 수정
const isStaticHtmlRoute = () => /\.html$/.test(window.location.pathname);
const getPostDetailUrl = (postId) => (`post.html?id=${postId}`);

// url 게시글 ID 파싱
function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
        const parsed = parseInt(idParam, 10);
        if (!isNaN(parsed)) return parsed;
    }
    const match = window.location.pathname.match(/\/posts\/(\d+)\/edit$/);
    if (match) {
        return parseInt(match[1], 10);
    }
    return null;
}

// 현재는 정적 파일 기반으로 하다보니 리다이렉트 할때 ID가 날아가서 게시글 ID가 존재하지 않는다는 에러 발생
// 세션 스토리지에 저장된 ID 조회
function getStoredPostId() {
    const stored = sessionStorage.getItem('currentPostId');
    if (!stored) return null;
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) ? null : parsed;
}

// 세션 스토리지에 ID 저장
function persistPostId(postId) {
    if (postId !== null && postId !== undefined && !Number.isNaN(postId)) {
        sessionStorage.setItem('currentPostId', String(postId));
    }
}

// URL → 세션 순으로 ID 확보
function getPostId() {
    let postId = getPostIdFromURL();
    if (postId === null) {
        postId = getStoredPostId();
        if (postId !== null) {
            console.log('URL에 ID 없음 → 세션 값 사용:', postId);
            persistPostId(postId);
            if (isStaticHtmlRoute()) {
                const newUrl = `${window.location.pathname}?id=${postId}`;
                window.history.replaceState({}, '', newUrl);
            }
        }
    } else {
        persistPostId(postId);
    }
    return postId;
}

const currentPostId = getPostId();

// 세션에 저장된 수정된 글 목록 불러오기
const getEditedPosts = () => {
    try {
        return JSON.parse(sessionStorage.getItem(EDITED_POSTS_KEY)) || {};
    } catch (error) {
        console.error('editedPosts 파싱 오류:', error);
        return {};
    }
};

// 세션에 게시글 수정본 저장
const saveEditedPost = (postId, data) => {
    const editedPosts = getEditedPosts();
    editedPosts[postId] = data;
    sessionStorage.setItem(EDITED_POSTS_KEY, JSON.stringify(editedPosts));
};

// 서버 미연동 - 사용할 Mock 데이터
function createMockPost(index) {
    const now = new Date();
    now.setHours(now.getHours() - index);
    const paragraphs = [
        '무엇을 얘기할까요? 아무말이네요, 해본 적은 없지만 말입니다만. 우리는 매일 새로운 경험을 하고 살아야 행복합니다.',
        '자연 속에선 아무말이라도, 우리 주변 사람들과 함께하는 아름다움과 신뢰감을 얻고 있다는 사실을, 또한, 매일을 좋은 날로 꾸미는 즐거운 순간임을 잊지 말아요.',
        '아무말이지만, 지혜로운 말들 한 문장을 이용해 이해하기 쉽게 말을 엮어보겠습니다.'
    ];

    return {
        id: index,
        title: `제목 ${index + 1} - 아무 말 대잔치의 긴 제목 예시`,
        content: paragraphs.join('\n\n'),
        body: paragraphs,
        image: null,
    };
}

// 폼 초기값 채우기
const populateForm = (post) => {
    if (!post) return;
    titleInput.value = post.title || titleInput.value;
    contentInput.value = post.content || post.body?.join('\n\n') || contentInput.value;
    updateTitleCount();

    if (post.image) {
        preview.style.backgroundImage = `url('${post.image}')`;
        selectedImageData = post.image;
    }
};

// 세션 우선, 없으면 Mock 데이터 로드
const loadPostData = () => {
    if (currentPostId === null) return;
    const editedPosts = getEditedPosts();
    if (editedPosts[currentPostId]) {
        populateForm(editedPosts[currentPostId]);
        return;
    }
    const mock = createMockPost(currentPostId);
    populateForm(mock);
};

// 제목 글자수 카운터 업데이트
const updateTitleCount = () => {
    titleCount.textContent = titleInput.value.length;
};

titleInput.addEventListener('input', () => {
    if (titleInput.value.length > 26) {
        titleInput.value = titleInput.value.slice(0, 26);
    }
    updateTitleCount();
});

updateTitleCount();

// 이미지 업로드 시 파일명/미리보기 갱신
fileInput.addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) return;

    fileName.textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
        preview.style.backgroundImage = `url('${e.target.result}')`;
        selectedImageData = e.target.result;
    };
    reader.readAsDataURL(file);
});

loadPostData();

// 폼 제출 시 세션 저장 및 상세 페이지로 이동
document.getElementById('editForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    if (currentPostId === null || Number.isNaN(currentPostId)) {
        alert('게시글 ID를 찾을 수 없습니다.');
        window.location.href = 'posts.html';
        return;
    }
    
    /*
    // 서버 연동 시 PATCH
    fetch(`/posts/${currentPostId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: titleInput.value,
            content: document.getElementById('content').value,
            imageUrl: selectedImageUrl
        }),
        credentials: 'include'
    })
        .then((res) => {
            if (!res.ok) throw new Error('게시글 수정 실패');
            return res.json();
        })
        .then(() => {
            // 성공 후 상세 페이지 이동
            window.location.href = `/posts/${currentPostId}`;
        })
        .catch((err) => {
            alert(err.message);
        });
    */
    
    alert('게시글이 수정되었습니다.');
    sessionStorage.setItem('currentPostId', String(currentPostId));
    
    const contentValue = contentInput.value.trim();
    const body = contentValue ? contentValue.split(/\n{2,}/).map((para) => para.trim()).filter(Boolean) : [];
    const postData = {
        id: currentPostId,
        title: titleInput.value.trim() || `제목 ${currentPostId}`,
        content: contentValue,
        body: body.length ? body : [contentValue],
        image: selectedImageData,
    };
    saveEditedPost(currentPostId, postData);
    persistPostId(currentPostId);
    
    window.location.href = getPostDetailUrl(currentPostId);
});
