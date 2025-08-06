const feedBackWrap = document.getElementById('feedbackWrap');
const feedback = document.getElementById('feedback');
const itemContainer = document.getElementById('items');

let dragged = null;
let offsetX = 0;
let offsetY = 0;

// 드래그 이벤트 등록
function setDragListeners() {
    const items = document.querySelectorAll('.drag-item');
    const zones = document.querySelectorAll('.drop-zone');

    items.forEach(item => {
    // PC용 dragstart
    item.addEventListener('dragstart', e => {
        dragged = e.target;
    });

    // 모바일용 touchstart
    item.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        const rect = item.getBoundingClientRect();

        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;

        dragged = item;
        dragged.classList.add('dragging');
        dragged.style.position = 'absolute';
        dragged.style.zIndex = '1000';

        moveAt(touch.clientX, touch.clientY);
    }, { passive: false });

    // 모바일 touchmove
    item.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        moveAt(touch.clientX, touch.clientY);
        e.preventDefault(); // ✅ 중요: 스크롤 방지
    }, { passive: false });

    // 모바일 touchend
    item.addEventListener('touchend', e => {
        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

        if (dropTarget && dropTarget.classList.contains('drop-zone')) {
        handleDrop(dropTarget);
        }

        resetDragged();
    });
    });

    function moveAt(x, y) {
        dragged.style.left = (x - offsetX) + 'px';
        dragged.style.top = (y - offsetY) + 'px';
    }

    zones.forEach(zone => {
        // PC용 dragover & drop
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', e => {
            e.preventDefault();
            handleDrop(zone);
        });
    });
}

// 드롭 처리 함수 (공통)
function handleDrop(zone) {
  const expected = zone.dataset.answer;
  const actual = dragged.textContent.trim();

  feedBackWrap.classList.add('on');
  if (expected === actual) {
    feedback.textContent = '정답입니다!';
    feedback.style.color = 'green';
    zone.style.backgroundColor = '#d4edda';
  } else {
    feedback.textContent = '오답입니다. 다시 시도해보세요.';
    feedback.style.color = 'red';
    zone.style.backgroundColor = '#f8d7da';
  }

  setTimeout(() => {
    feedBackWrap.classList.remove('on');
    zone.style.backgroundColor = '#fff';
    itemContainer.innerHTML = `
      <div class="drag-item" draggable="true">Apple</div>
      <div class="drag-item" draggable="true">Banana</div>
      <div class="drag-item" draggable="true">Pear</div>
    `;
    setDragListeners();
  }, 2000);
}

function resetDragged() {
    if (!dragged) return;
    dragged.style.position = '';
    dragged.style.left = '';
    dragged.style.top = '';
    dragged.style.zIndex = '';
    dragged.classList.remove('dragging');
    dragged = null;
}

setDragListeners();