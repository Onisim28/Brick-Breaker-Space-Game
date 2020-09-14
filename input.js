import {pause, pause_toggle, restart} from "./index.js";

export default class InputHandler {

    constructor(paddle, ball, index) {

        this.begin = document.getElementById("begin");

        document.addEventListener("keydown", event => {

            // alert(event.keyCode);

            switch (event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;

                case 39:
                    paddle.moveRight();
                    break;

                case 27:
                    // game.togglePause();
                    break;

                case 32:
                    //  game.start();
                    break;
            }

        });


        document.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 32:

                    if (paddle.lives <= 0) restart();

                    else {
                        if (pause) {
                            pause_toggle();

                        } else if (ball.space_pressed) {

                            pause_toggle();

                        } else {
                            ball.space_pressed = true;
                            this.begin.play();
                            this.begin.volume = 0.4;

                            ball.position.y = paddle.position.y - 25;
                        }
                    }

                    break;


                case 37:
                    if (paddle.speed_change < 0) paddle.stop();
                    break;

                case 39:
                    if (paddle.speed_change > 0) paddle.stop();
                    break;
            }
        });


    }


}
