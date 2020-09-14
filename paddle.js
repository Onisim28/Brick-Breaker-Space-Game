export default class Paddle {

    lives = 3;

    constructor(gameWidth, gameHeight) {

        this.paddle_image = document.getElementById("image_paddle");
        this.lifes_text = document.getElementById("lives");
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.height = 20;
        this.width = 150;
        this.speed_change = 0;

        this.position = {

            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10

        };
    }

    moveLeft() {

        this.speed_change = -5;

    }

    moveRight() {

        this.speed_change = +5;

    }

    stop() {
        this.speed_change = 0;
    }

    update(deltaTime) {

        this.lifes_text.innerHTML = `lives: ${this.lives}`;

        this.position.x = this.position.x + this.speed_change;

        if (this.position.x <= 0) this.position.x = 0;

        else if (this.position.x + this.width >= this.gameWidth) this.position.x = this.gameWidth - this.width;


    }


    draw(ctx) {

        // ctx.fillStyle = 'rgb(35,56,160)';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.paddle_image, this.position.x, this.position.y, this.width, this.height);

    }


}
