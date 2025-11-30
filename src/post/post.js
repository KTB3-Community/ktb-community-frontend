// 게시글 상세 페이지 로직: 데이터 로드, 렌더링, 댓글/좋아요 제어
const createId = () => {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

const backButton = document.getElementById('backButton');
const editPostButton = document.getElementById('editPostButton');
const deletePostButton = document.getElementById('deletePostButton');

const EDITED_POSTS_KEY = 'editedPosts';
const getPostDetailUrl = (postId) => (`post.html?id=${postId}`);
const getPostEditUrl = (postId) => (`edit-post.html?id=${postId}`);

const getEditedPosts = () => {
    try {
        return JSON.parse(sessionStorage.getItem(EDITED_POSTS_KEY)) || {};
    } catch (error) {
        console.error('editedPosts 파싱 오류:', error);
        return {};
    }
};

if (!editPostButton) {
    console.error('editPostButton을 찾을 수 없습니다.');
}
const postTitleEl = document.getElementById('postTitle');
const postAuthorEl = document.getElementById('postAuthor');
const postDateEl = document.getElementById('postDate');
const postBodyEl = document.getElementById('postBody');
const postImageEl = document.querySelector('.post-image');
const postContainer = document.querySelector('.post');
const likeButton = document.getElementById('likeButton');
const likeCountEl = document.getElementById('likeCount');
const viewCountEl = document.getElementById('viewCount');
const commentCountEl = document.getElementById('commentCount');
const commentInput = document.getElementById('commentInput');
const commentSubmitButton = document.getElementById('commentSubmitButton');
const clearCommentButton = document.getElementById('clearCommentButton');
const commentsSection = document.getElementById('commentsSection');

const modalOverlay = document.getElementById('modalOverlay');
const deletePostModal = document.getElementById('deletePostModal');
const deleteCommentModal = document.getElementById('deleteCommentModal');

// URL에서 게시물 ID 가져오기
function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
        const id = parseInt(idParam, 10);
        return isNaN(id) ? null : id;
    }
    const pathMatch = window.location.pathname.match(/\/posts\/(\d+)(?:\/edit)?$/);
    if (pathMatch) {
        return parseInt(pathMatch[1], 10);
    }
    return null;
}

// 세션스토리지에 저장된 ID 가져오기
function getStoredPostId() {
    const stored = sessionStorage.getItem('currentPostId');
    if (!stored) return null;
    const parsed = parseInt(stored, 10);
    console.log('세션에서 가져온 ID:', stored, '파싱:', parsed, 'isNaN:', isNaN(parsed));
    return isNaN(parsed) ? null : parsed;
}

// 서버 미연동 - 사용할 Mock 데이터
function createMockPost(index) {
    const now = new Date();
    now.setHours(now.getHours() - index);
    const baseTitle = `제목 ${index + 1} - 아무 말 대잔치의 긴 제목 예시`;

    return {
        id: index,
        title: baseTitle,
        likes: Math.floor(Math.random() * 100) + 1,
        comments: Math.floor(Math.random() * 50) + 1,
        views: Math.floor(Math.random() * 200) + 1,
        author: `더미 작성자 ${index + 1}`,
        date: now,
        // 상세 페이지용 본문 내용
        body: [
            '무엇을 얘기할까요? 아무말이네요, 해본 적은 없지만 말입니다만. 우리는 매일 새로운 경험을 하고 살아야 행복합니다. 다양한 아이디어와 도전이 있겠죠, 그것들이 우리의 삶을 더욱 지혜롭게 만들어줍니다. 또한 오늘도 주변의 사람들과 소통하며 서로를 지지해 봅시다. 그래서 우리 모두 웃음을 잃지 않길 바랍니다.',
            '자연 속에선 아무말이라도, 우리 주변 사람들과 함께하는 아름다움과 신뢰감을 얻고 있다는 사실을, 또한, 매일을 좋은 날로 꾸미는 즐거운 순간임을 잊지 말아요. 지금은 우리의 생각과 감정을 자유롭게 나눌 때입니다.',
            '아무말이지만, 지혜로운 말들 한 문장을 이용해 이해하기 쉽게 말을 엮어보겠습니다. 우리는 새로운 지식의 바다에서 새로운 것을 발견할 수 있으며, 이야기가 우리의 도전 의지를 이끌어주는 시대에 살고 있죠! 그러니요, 이제부터 예쁜 말과 긍정적 마음으로 가득 채워줍시다. 서로의 경험을 경청하고 항상 앞으로 나아가는 것이 중요하다고 생각합니다.'
        ]
    };
}

// ==================== Post API ====================
// 서버에서 게시물 데이터 가져오기
async function fetchPost(postId) {
    try {
        // 개발 중: Mock 데이터 사용 (posts.js와 동일한 방식)
        await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
        
        // posts.js의 createMockPost와 동일한 방식으로 데이터 생성
        const mockPost = createMockPost(postId);
        
        // post.js에서 사용하는 형식으로 변환
        return {
            id: mockPost.id,
            title: mockPost.title,
            author: mockPost.author,
            createdAt: mockPost.date,
            body: mockPost.body,
            likes: mockPost.likes,
            views: mockPost.views,
            comments: mockPost.comments
        };
        
        // 실제 API 호출
        /*
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // 인증이 필요한 경우
            },
        });
        
        if (!response.ok) {
            throw new Error(`게시물을 불러올 수 없습니다: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        */
    } catch (error) {
        console.error('게시물 로딩 오류:', error);
        throw error;
    }
}

// ==================== Comment API ====================
// 서버에서 댓글 목록 가져오기
async function fetchComments(postId) {
    try {
        // 더미 데이터 사용 
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return [
            {
                id: createId(),
                author: '더미 작성자 1',
                createdAt: new Date('2021-01-01T00:00:00'),
                content: '댓글 내용',
            },
            {
                id: createId(),
                author: '더미 작성자 1',
                createdAt: new Date('2021-01-01T00:05:00'),
                content: '댓글 내용',
            },
        ];
        
        // 실제 API 호출
        /*
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // 인증이 필요한 경우
            },
        });
        
        if (!response.ok) {
            throw new Error(`댓글을 불러올 수 없습니다: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        */
    } catch (error) {
        console.error('댓글 로딩 오류:', error);
        // 댓글 로딩 실패는 치명적이지 않으므로 빈 배열 반환
        return [];
    }
}

function formatCount(value) {
    return String(value);
}

function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function renderPost(post) {
    postTitleEl.textContent = post.title;
    postAuthorEl.textContent = post.author;
    
    // 서버에서 받은 날짜가 문자열일 수도 있으므로 Date 객체로 변환
    const createdAt = post.createdAt instanceof Date 
        ? post.createdAt 
        : new Date(post.createdAt);
    
    postDateEl.textContent = formatDate(createdAt);
    postDateEl.dateTime = createdAt.toISOString();

    postBodyEl.innerHTML = '';
    const bodyParagraphs = Array.isArray(post.body)
        ? post.body
        : post.content
            ? post.content.split(/\n{2,}/).map((para) => para.trim()).filter(Boolean)
            : [];

    bodyParagraphs.forEach((paragraph) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        postBodyEl.appendChild(p);
    });

    if (postImageEl) {
        if (post.image) {
            postImageEl.classList.add('has-image');
            postImageEl.style.display = 'block';
            postImageEl.setAttribute('aria-hidden', 'false');
            postImageEl.innerHTML = '';
            const imageEl = document.createElement('img');
            imageEl.src = post.image;
            imageEl.alt = `${post.title || '게시글'} 이미지`;
            postImageEl.appendChild(imageEl);
        } else {
            postImageEl.classList.remove('has-image');
            postImageEl.style.display = 'none';
            postImageEl.setAttribute('aria-hidden', 'true');
            postImageEl.innerHTML = '';
        }
    }

    likeCountEl.textContent = formatCount(post.likes);
    viewCountEl.textContent = formatCount(post.views);
}

let currentPostId = null;
let postState = {
    likes: 0,
    views: 0,
};
let comments = [];

let likeEnabled = false;
let editingCommentId = null;
let pendingDeleteCommentId = null;

function updateLikeButton() {
    likeButton.classList.toggle('enabled', likeEnabled);
}

function updateCommentCount() {
    commentCountEl.textContent = formatCount(comments.length);
}

function closeModal(dialog) {
    if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
    }
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function openModal(dialog) {
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.setAttribute('open', '');
    }
}

function renderComments() {
    commentsSection.innerHTML = '';

    comments.forEach((comment) => {
        const card = document.createElement('article');
        card.className = 'comment-card';
        card.dataset.commentId = comment.id;

        const header = document.createElement('div');
        header.className = 'comment-header';

        const meta = document.createElement('div');
        meta.className = 'comment-meta';

        const author = document.createElement('span');
        author.textContent = comment.author;

        const time = document.createElement('time');
        time.dateTime = comment.createdAt.toISOString();
        time.textContent = formatDate(comment.createdAt);

        meta.append(author, time);

        const actions = document.createElement('div');
        actions.className = 'comment-actions';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.textContent = '수정';
        editBtn.addEventListener('click', () => startEditComment(comment.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => {
            pendingDeleteCommentId = comment.id;
            openModal(deleteCommentModal);
        });

        actions.append(editBtn, deleteBtn);
        header.append(meta, actions);

        const content = document.createElement('p');
        content.className = 'comment-content';
        content.textContent = comment.content;

        card.append(header, content);
        commentsSection.appendChild(card);
    });

    updateCommentCount();
}

function resetCommentForm() {
    commentInput.value = '';
    commentSubmitButton.textContent = '댓글 등록';
    commentSubmitButton.disabled = true;
    commentSubmitButton.classList.remove('enabled');
    editingCommentId = null;
}

function startEditComment(commentId) {
    const comment = comments.find((item) => item.id === commentId);
    if (!comment) return;

    editingCommentId = commentId;
    commentInput.value = comment.content;
    commentInput.focus();
    commentSubmitButton.textContent = '댓글 수정';
    commentSubmitButton.disabled = false;
    commentSubmitButton.classList.add('enabled');
}

function handleCommentSubmit() {
    const text = commentInput.value.trim();
    if (!text) return;

    if (editingCommentId) {
        comments = comments.map((comment) => {
            if (comment.id === editingCommentId) {
                return {
                    ...comment,
                    content: text,
                    createdAt: new Date(),
                };
            }
            return comment;
        });
    } else {
        comments.unshift({
            id: createId(),
            author: '더미 작성자 1',
            content: text,
            createdAt: new Date(),
        });
    }

    renderComments();
    resetCommentForm();
}

function deleteComment(commentId) {
    comments = comments.filter((comment) => comment.id !== commentId);
    renderComments();
}

function handleModalButtons(dialog, callback) {
    dialog.querySelectorAll('[data-action]').forEach((button) => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            if (action === 'confirm') {
                callback();
            }
            closeModal(dialog);
        });
    });
}

backButton.addEventListener('click', () => {
    window.location.href = '../posts/posts.html';
});

if (editPostButton) {
    editPostButton.addEventListener('click', () => {
        console.log('editPostButton 클릭됨, currentPostId:', currentPostId);
        if (currentPostId !== null && currentPostId !== undefined) {
            sessionStorage.setItem('currentPostId', String(currentPostId));
            window.location.href = getPostEditUrl(currentPostId);
        } else {
            console.error('currentPostId가 없습니다:', currentPostId);
            alert('게시글 ID를 찾을 수 없습니다.');
        }
    });
} else {
    console.error('editPostButton 요소를 찾을 수 없습니다.');
}

deletePostButton.addEventListener('click', () => {
    openModal(deletePostModal);
});

handleModalButtons(deletePostModal, () => {
    alert('게시글이 삭제되었습니다.');
    window.location.href = 'posts.html';
});

handleModalButtons(deleteCommentModal, () => {
    if (pendingDeleteCommentId) {
        deleteComment(pendingDeleteCommentId);
        pendingDeleteCommentId = null;
    }
});

modalOverlay.addEventListener('click', () => {
    [deletePostModal, deleteCommentModal].forEach(closeModal);
});

likeButton.addEventListener('click', () => {
    likeEnabled = !likeEnabled;
    postState.likes += likeEnabled ? 1 : -1;
    if (postState.likes < 0) postState.likes = 0;
    likeCountEl.textContent = formatCount(postState.likes);
    updateLikeButton();
});

commentInput.addEventListener('input', () => {
    const hasText = commentInput.value.trim().length > 0;
    commentSubmitButton.disabled = !hasText;
    commentSubmitButton.classList.toggle('enabled', hasText);
});

commentSubmitButton.addEventListener('click', handleCommentSubmit);

clearCommentButton.addEventListener('click', () => {
    commentInput.value = '';
    commentInput.focus();
    commentSubmitButton.disabled = true;
    commentSubmitButton.classList.remove('enabled');
});

// 페이지 로드 시 게시물 데이터 가져오기
async function initPost() {
    if (postContainer) {
        postContainer.classList.add('is-loading');
    }
    let postId = getPostIdFromURL();
    
    if (postId === null) {
        postId = getStoredPostId();
        if (postId !== null) {
            console.log('URL에 ID가 없어 세션 값 사용:', postId);
            // 세션에서 가져온 ID를 URL에 반영
            const newUrl = `${window.location.pathname}?id=${postId}`;
            window.history.replaceState({}, '', newUrl);
        }
    }
    
    console.log('initPost 호출, postId:', postId);
    
    // ID 유효성 검사 (0도 유효한 ID이므로 null/NaN만 체크)
    if (postId === null || isNaN(postId)) {
        console.error('유효하지 않은 ID:', postId);
        alert('게시글 ID가 존재하지 않습니다.');
        window.location.href = 'posts.html';
        return;
    }
    
    console.log('유효한 ID 확인:', postId);
    
    currentPostId = postId;
    sessionStorage.setItem('currentPostId', String(postId));
    
    try {
        // Post API와 Comment API를 병렬로 호출
        // Promise.all을 사용하여 두 API를 동시에 요청
        const [postData, commentsData] = await Promise.all([
            fetchPost(postId),      // 게시물 데이터 조회
            fetchComments(postId)   // 댓글 목록 조회
        ]);

        const editedPost = getEditedPosts()[postId];
        if (editedPost) {
            console.log('세션에 저장된 수정본 적용:', editedPost);
            postData.title = editedPost.title || postData.title;
            postData.body = editedPost.body || postData.body;
            postData.content = editedPost.content || postData.content;
            if (editedPost.image) {
                postData.image = editedPost.image;
            }
        }
        
        // 게시물 데이터 렌더링
        renderPost(postData);
        
        // 초기 상태 설정
        postState.likes = postData.likes || 0;
        postState.views = postData.views || 0;
        
        // 댓글 데이터 렌더링
        comments = commentsData || [];
        renderComments();
        
        // 댓글 수 업데이트 (postData.comments도 고려)
        if (postData.comments !== undefined) {
            commentCountEl.textContent = formatCount(postData.comments);
        } else {
            updateCommentCount();
        }
        
        updateLikeButton();
        if (postContainer) {
            requestAnimationFrame(() => {
                postContainer.classList.remove('is-loading');
            });
        }
    } catch (error) {
        // 게시물 로딩 실패 시 에러 처리
        // (댓글 로딩 실패는 fetchComments 내부에서 처리되어 빈 배열 반환)
        alert('게시물을 불러올 수 없습니다.');
        console.error(error);
        if (postContainer) {
            postContainer.classList.remove('is-loading');
        }
        window.location.href = '../posts/posts.html';
    }
}

// 페이지 로드 시 초기화
initPost();
