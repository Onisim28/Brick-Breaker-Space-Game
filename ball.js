import {detectCollision} from "./collision_detection.js";

export default class Ball {

    space_pressed = false;

    constructor(gameWidth, gameHeight, paddle) {

        this.paddle = paddle;
        this.ball_image = document.getElementById("image_ball");
        this.hitPaddle_audio = document.getElementById("hit_paddle");
        this.wall_bounce = document.getElementById("wall_bounce");
        this.lost_aLife = document.getElementById("lost_aLife");
        this.space_pressed_text = document.getElementById("press_space");

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.height = 20;
        this.width = 20;

        this.position = {

            x: this.paddle.position.x + 62,
            y: this.paddle.position.y - 13

        };

        this.speed_change = {

            x: 3,
            y: -5
        };


    }


    hit_right_or_left_wall() {
        this.speed_change.x = -this.speed_change.x;
        this.wall_bounce.play();
        this.wall_bounce.volume = 0.6;
    }

    hit_top_wall() {
        this.wall_bounce.play();
        this.wall_bounce.volume = 0.35;
        this.speed_change.y = -this.speed_change.y;
    }


    update() {

        if (this.space_pressed) {


            if (this.position.x + this.width > this.gameWidth) this.hit_right_or_left_wall();
            if (this.position.x < 0) this.hit_right_or_left_wall();
            if (this.position.y < 0) this.hit_top_wall();

            if (detectCollision(this, this.paddle)) {
                this.hitPaddle_audio.play();
                this.hitPaddle_audio.volume = 1;
                this.speed_change.y = -this.speed_change.y;
            } else if (this.position.y > this.paddle.position.y + 50) {

                this.lost_aLife.play();
                this.lost_aLife.volume = 0.4;

                this.space_pressed = false;
                this.paddle.lives--;
            }

            this.position.y += this.speed_change.y;
            this.position.x += this.speed_change.x;


        } else {

            this.space_pressed_text.innerHTML = `PRESS 'SPACE' TO RELEASE THE BALL`;
            this.position.y = this.paddle.position.y - 13;
            this.position.x = this.paddle.position.x + 62;

        }

    }


    draw(ctx) {

        ctx.drawImage(this.ball_image, this.position.x, this.position.y, this.width, this.height);

    }


}