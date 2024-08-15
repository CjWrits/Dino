const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dino = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    color: '#ff6347',
    dy: 0,
    gravity: 0.85,
    jumpHeight: -25,
    isJumping: false,
};

const obstacles = [];
let score = 0;
let gameOver = false;

function drawDino() {
    ctx.fillStyle = '#228B22'; 
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height); 

    
    ctx.fillStyle = '#32CD32';
    ctx.fillRect(dino.x + 30, dino.y - 30, 40, 40);

   
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(dino.x + 50, dino.y - 20, 5, 0, Math.PI * 2);
    ctx.fill();

    
    ctx.fillStyle = '#006400';
    ctx.fillRect(dino.x + 10, dino.y + 40, 15, 30);
    ctx.fillRect(dino.x + 25, dino.y + 40, 15, 30);

    ctx.fillStyle = '#32CD32';
    ctx.beginPath();
    ctx.moveTo(dino.x, dino.y + 20);
    ctx.lineTo(dino.x - 20, dino.y + 30);
    ctx.lineTo(dino.x, dino.y + 40);
    ctx.closePath();
    ctx.fill();
}



function handleJump() {
    if (dino.isJumping) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;

        if (dino.y >= canvas.height - 150) {
            dino.y = canvas.height - 150;
            dino.isJumping = false;
            dino.dy = 0;
        }
    }
}

function spawnObstacle() {
    const size = Math.random() * (60 - 20) + 20;
    const obstacle = {
        x: canvas.width,
        y: canvas.height - 150,
        width: size,
        height: size,
        color: '#000000',
        speed: 10,
    };
    obstacles.push(obstacle);
}

function handleObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        obs.x -= obs.speed;

       
        if (
            dino.x < obs.x + obs.width &&
            dino.x + dino.width > obs.x &&
            dino.y < obs.y + obs.height &&
            dino.y + dino.height > obs.y
        ) {
            gameOver = true;
        }

        
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(obs.x + obs.width / 3, obs.y, obs.width / 3, obs.height / 2);

       
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x + obs.width / 2, obs.y - obs.height / 2);
        ctx.lineTo(obs.x + obs.width, obs.y);
        ctx.closePath();
        ctx.fill();

        
        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}
const clouds = [];

function spawnCloud() {
    const cloud = {
        x: canvas.width,
        y: Math.random() * (canvas.height / 2),
        width: Math.random() * (100 - 50) + 50,
        height: 20,
        speed: 2,
    };
    clouds.push(cloud);
}

function handleClouds() {
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        cloud.x -= cloud.speed;

       
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.ellipse(cloud.x, cloud.y, cloud.width, cloud.height, 0, 0, Math.PI * 2);
        ctx.fill();

       
        if (cloud.x + cloud.width < 0) {
            clouds.splice(i, 1);
        }
    }
}

function startClouds() {
    setInterval(spawnCloud, 3000);
}



    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        obs.x -= obs.speed;

        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
            score++;
        }

        if (
            dino.x < obs.x + obs.width &&
            dino.x + dino.width > obs.x &&
            dino.y < obs.y + obs.height &&
            dino.y + dino.height > obs.y
        ) {
            gameOver = true;
        }

        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }


    function updateGame() {
        if (gameOver) {
            ctx.fillStyle = '#000';
            ctx.font = '50px sans-serif';
            ctx.fillText('Welp! You Played Well', canvas.width / 2 - 200, canvas.height / 2);
            ctx.fillText(`Score: ${score}`, canvas.width / 2 - 10, canvas.height / 2 + 60);
            return;
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        handleClouds(); 
        drawDino();
        handleJump();
        handleObstacles();
    
        requestAnimationFrame(updateGame);
    }
    

function startGame() {
    setInterval(spawnObstacle, 2000);
    updateGame();
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !dino.isJumping) {
        dino.dy = dino.jumpHeight;
        dino.isJumping = true;
    }
});
startGame();
startClouds(); 



startGame();
