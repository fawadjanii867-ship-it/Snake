 const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let score = 0;

    let snake = [{ x: 200, y: 200 }];
    let food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

    let dx = box;
    let dy = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -box; dy = 0;
      }
      else if (e.key === 'ArrowRight' && dx === 0) {
        dx = box; dy = 0;
      }
      else if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0; dy = -box;
      }
      else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0; dy = box;
      }
    });

    function draw() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      ctx.fillStyle = 'lime';
      snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, box, box);

      // Move snake
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Game over conditions
      if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)
      ) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
        food = {
          x: Math.floor(Math.random() * 20) * box,
          y: Math.floor(Math.random() * 20) * box
        };
      } else {
        snake.pop();
      }
    }

    setInterval(draw, 150);