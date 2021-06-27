export const detectCollision = (ball, gameObject) => {
    const bottomOfBall = ball.position.y + ball.size;
    const topOfBall = ball.position.y;

    const topOfObject = gameObject.position.y;
    let objectLeftSide = gameObject.position.x;
    let objectRightSide = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if (bottomOfBall >= topOfObject &&
      topOfBall <= bottomOfObject &&
      ball.position.x >= objectLeftSide &&
      ball.position.x + ball.size <= objectRightSide
    ) {
      return true;
    } else {
      return false;
    }
};