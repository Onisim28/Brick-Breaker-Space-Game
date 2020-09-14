import {detectCollision} from "./collision_detection.js";


export default class Brick {


    constructor(gameWidth, gameHeight, x, y, ball) {

        this.number_ofImages = 10;
        this.ball = ball;
        this.blue_brick_image = document.getElementById("blue_brick");
        this.brown_brick_image = document.getElementById("brown_brick");
        this.dark_green_brick_image = document.getElementById("dark_green_brick");
        this.gray_brick_image = document.getElementById("gray_brick");
        this.green_brick_image = document.getElementById("green_brick");
        this.lightBlue_brick_image = document.getElementById("lightBlue");
        this.orange_brick_image = document.getElementById("orange_brick");
        this.purple_brick_image = document.getElementById("purple_brick");
        this.red_brick_image = document.getElementById("red_brick");
        this.yellow_brick_image = document.getElementById("yellow_brick");

        this.chosen_image = this.random_collor();


        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.height = 30;
        this.width = 70;

        this.position = {

            x: x,
            y: y

        };
    }


    random_collor() {

        const random = Math.floor(Math.random() * this.number_ofImages) + 1;
        let image;

        switch (random) {
            case 1:
                image = this.blue_brick_image;
                break;
            case 2:
                image = this.brown_brick_image;
                break;
            case 3:
                image = this.dark_green_brick_image;
                break;
            case 4:
                image = this.yellow_brick_image;
                break;
            case 5:
                image = this.gray_brick_image;
                break;
            case 6:
                image = this.green_brick_image;
                break;
            case 7:
                image = this.lightBlue_brick_image;
                break;
            case 8:
                image = this.orange_brick_image;
                break;
            case 9:
                image = this.purple_brick_image;
                break;
            case 10:
                image = this.red_brick_image;
                break;

        }

        return image;

    }


    update() {

        if (detectCollision(this.ball, this)) {
            this.ball.speed_change.y = -this.ball.speed_change.y;
        }

    }


    draw(ctx) {

        ctx.drawImage(this.chosen_image, this.position.x, this.position.y, this.width, this.height);

    }


}