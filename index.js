import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Level_selector from "./level_selector.js";


let canvas = document.getElementById("gameScreen");
let pause_text = document.getElementById("press_space");
let game_over_audio = document.getElementById("game_over");
let music = document.getElementById("music");
let ctx = canvas.getContext("2d");


const WIDTH = 800;
const HEIGHT = 600;

let paddle = new Paddle(WIDTH, HEIGHT);
let ball = new Ball(WIDTH, HEIGHT, paddle);
let inputH = new InputHandler(paddle, ball, this);
let a = this;

let level = [1];
let levelSelector = new Level_selector(WIDTH, HEIGHT, ball);

let bricks = [];

let lastTime = 0;

let ball_image = document.getElementById("image_ball");

let game_over = false;
export let pause = false;


function game_loop(timeStamp) {

    if ((!pause) && (!game_over)) {

        pause_text.innerHTML = `press 'Space' to pause`;

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        music.play();
        music.volume = 0.2;

        paddle.update(deltaTime);
        paddle.draw(ctx);

        ball.draw(ctx);
        ball.update();

        levelSelector.play_level(bricks, ctx, level);

        if (paddle.lives <= 0) {

            game_over = true;
            game_over_audio.play();
            game_over_audio.volume = 0.8;

            ctx.rect(0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2);

            pause_text.innerHTML = `press 'Space' to RESTART the game`;


        } else if (level > 2) {

            ctx.rect(0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Congratulations! YOU WON!", WIDTH / 2, HEIGHT / 2);

            return;
        }


    } else if (pause) {

        pause_text.innerHTML = `press 'Space' to resume the game`;
    }


    requestAnimationFrame(game_loop);

}


requestAnimationFrame(game_loop);


export function pause_toggle() {
    if (pause === false)
        pause = true;
    else pause = false;
}

export function restart() {
    ball.space_pressed = false;
    paddle.lives = 3;
    level[0] = 1;
    bricks = [];
    game_over = false;
    pause = false;
}



