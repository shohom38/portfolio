const items = document.querySelectorAll('.drag-item');
const zones = document.querySelectorAll('.drop-zone');
const feedBackWrap = document.getElementById('feedbackWrap');
const feedback = document.getElementById('feedback');
const itemContainer = document.getElementById('items');

let dragged;

items.forEach(item => {
    item.addEventListener('dragstart', e => {
    dragged = e.target;
    });
});

zones.forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', e => {
        e.preventDefault();
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
            <div class="drag-item" draggable="true" id="correct">Apple</div>
            <div class="drag-item" draggable="true">Banana</div>
            <div class="drag-item" draggable="true">Pear</div>
            `;
            resetDragListeners();
        }, 2000, function() {
            feedback.textContent = '';
        });
    });
});

function resetDragListeners() {
    const newItems = document.querySelectorAll('.drag-item');
    newItems.forEach(item => {
        item.addEventListener('dragstart', e => {
            dragged = e.target;
        });
    });
}