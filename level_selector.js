import {detectCollision} from "./collision_detection.js";
import Brick from "./brick.js";

export default class Level_selector {


    constructor(WIDTH, HEIGHT, ball) {

        this.hitBrick_audio = document.getElementById("hit_brick");
        this.level_completed = document.getElementById("level_completed");
        this.level_tetx = document.getElementById("level");
        this.bricks_text = document.getElementById("bricks");

        this.ball = ball;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;

        this.game_map = [];
    }


    creating_level1(bricks) {

        this.game_map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];


        let t = 0;

        for (let i = 0; i < this.game_map.length; i++) {
            for (let j = 0; j < this.game_map[i].length; j++) {


                if (this.game_map[i][j] === 1) {

                    bricks[t] = new Brick(this.WIDTH, this.HEIGHT, (j * 70), (i * 30), this.ball);
                    t++;

                }
            }
        }
    }


    creating_level2(bricks) {

        this.game_map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];


        let t = 0;

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {

                if (this.game_map[i][j] === 1) {

                    bricks[t] = new Brick(this.WIDTH, this.HEIGHT, (j * 70), (i * 30), this.ball);
                    t++;

                }
            }
        }

    }


    play_level(bricks, ctx, level) {

        this.level_tetx.innerHTML = `Level: ${level}`;
        this.bricks_text.innerHTML = `Bricks: ${bricks.length}`;

        let t = 0;
        let num_ofBricks = bricks.length;


        if (num_ofBricks <= 0) {
            switch (level[0]) {
                case 1:
                    this.creating_level1(bricks);
                    break;

                case 2:
                    this.creating_level2(bricks);
                    break;

            }

            num_ofBricks = bricks.length;
        }

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++, t++) {

                if (bricks[t]) {
                    bricks[t].draw(ctx);
                    bricks[t].update();

                    if (detectCollision(this.ball, bricks[t])) {
                        this.hitBrick_audio.play();
                        this.hitBrick_audio.volume = 0.7;

                        bricks.splice(t, 1);
                        t--;
                        num_ofBricks = bricks.length;

                    }

                }
            }
        }

        if (num_ofBricks <= 0) {
            this.level_completed.play();
            this.level_completed.volume = 0.7;

            level[0]++;
        }

    }


}