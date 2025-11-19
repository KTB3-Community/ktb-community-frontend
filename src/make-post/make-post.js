// 게시글 작성 페이지 폼 제어
const titleInput = document.getElementById('postTitle');
const bodyInput = document.getElementById('postBody');
const imageInput = document.getElementById('postImage');
const fileName = document.getElementById('fileName');
const submitBtn = document.getElementById('submitBtn');
const helper = document.getElementById('helper');

// 제목/본문 입력 상태에 따라 버튼 활성화
function updateState() {
  const hasTitle = titleInput.value.trim().length > 0;
  const hasBody = bodyInput.value.trim().length > 0;
  const valid = hasTitle && hasBody;
  submitBtn.disabled = !valid;
  submitBtn.classList.toggle('enabled', valid);
  if (valid) helper.textContent = '';
}

// 제목 입력 제한(26자) 및 즉시 검증
titleInput.addEventListener('input', () => {
  if (titleInput.value.length > 26) {
    titleInput.value = titleInput.value.slice(0, 26);
  }
  updateState();
});

// 본문 입력 시 버튼 상태 갱신
bodyInput.addEventListener('input', updateState);

// 파일 선택 시 파일명 표시
imageInput.addEventListener('change', (e) => {
  const [file] = e.target.files;
  if (file) {
    fileName.textContent = file.name;
  } else {
    fileName.textContent = '파일을 선택해주세요.';
  }
});

// Submit
const form = document.getElementById('makePostForm');
// 제출 시 유효성 확인 후 안내
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const hasTitle = titleInput.value.trim().length > 0;
  const hasBody = bodyInput.value.trim().length > 0;
  if (!hasTitle || !hasBody) {
    helper.textContent = '*제목, 내용을 모두 작성해주세요.';
    updateState();
    return;
  }
  // 성공 처리 (서버 연동 시 업로드 처리 및 해당 post 페이지로 리다이렉트)
  alert('게시글이 등록되었습니다.');
  window.location.href = 'posts.html';
});

updateState();
