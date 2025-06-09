        const canvas = document.getElementById('board');
        const ctx = canvas.getContext('2d');
        const colorPicker = document.getElementById('colorPicker');
        const brushSize = document.getElementById('brushSize');
        const toggleEraseBtn = document.getElementById('toggleEraseBtn');
        let drawing = false;
        let erasing = false;

        canvas.addEventListener('mousedown', () => {
          drawing = true;
          ctx.beginPath();
        });

        canvas.addEventListener('mouseup', () => {
          drawing = false;
          ctx.beginPath();
        });

        canvas.addEventListener('mousemove', draw);

        function draw(e) {
          if (!drawing) return;
          ctx.lineWidth = brushSize.value;
          ctx.lineCap = 'round';
          ctx.strokeStyle = erasing ? '#ffffff' : colorPicker.value;
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(e.offsetX, e.offsetY);
        }

        function useEraser() {
          erasing = !erasing;
          toggleEraseBtn.classList.remove('on');
          toggleEraseBtn.classList.add(erasing ? 'on' : '');
        }

        function clearCanvas() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }