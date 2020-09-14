export function detectCollision(gameObject1, gameObject2) {

    let topOfObject1 = gameObject1.position.y;
    let left_side_ofObject1 = gameObject1.position.x;
    let right_side_ofObject1 = gameObject1.position.x + gameObject1.width;
    let bottomOfObject1 = gameObject1.position.y + gameObject1.height;

    let topOfObject2 = gameObject2.position.y;
    let leftSideOfObject2 = gameObject2.position.x;
    let rightSideOfObject2 = gameObject2.position.x + gameObject2.width;
    let bottomOfObject2 = gameObject2.position.y + gameObject2.height;

    if (
        bottomOfObject1 >= topOfObject2 &&
        topOfObject1 <= bottomOfObject2 &&
        gameObject1.position.x >= leftSideOfObject2 - 15 &&
        gameObject1.position.x + gameObject1.width <= rightSideOfObject2 + 15
    ) {
        return true;
    } else {
        return false;
    }


}
