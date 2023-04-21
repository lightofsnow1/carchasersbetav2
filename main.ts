sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    pause(100)
    sprites.destroy(MyEnemy)
    scene.cameraShake(4, 500)
    pause(100)
    info.changeLifeBy(-1)
    wanted += 1
})
let wanted = 0
let MyEnemy: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
console.log("spawned")
let movement = 5
let mySprite = sprites.create(img`
    . . . 2 2 2 2 2 2 2 2 . . . . 
    . . 2 4 2 2 2 2 2 2 c 2 . . . 
    . 2 c 4 2 2 2 2 2 2 c c 2 . . 
    2 c c 4 4 4 4 4 4 2 c c 4 2 d 
    2 c 2 e e e e e e e b c 4 2 2 
    2 2 e b b e b b b e e b 4 2 2 
    2 e b b b e b b b b e 2 2 2 2 
    e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
    e e e e e e f e e e f e 2 d d 
    e e e e e e f e e f e e e 2 d 
    e e e e e e f f f e e e e e e 
    e f f f f e e e e f f f e e e 
    . f f f f f e e f f f f f e . 
    . . f f f . . . . f f f f . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, movement, movement)
mySprite.vy = 150
scene.cameraFollowSprite(mySprite)
info.setLife(6)
let playerfollower = sprites.create(img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let movementenemy = 9000
game.onUpdateInterval(5000, function () {
    movementenemy += -1000
})
game.onUpdateInterval(5000, function () {
    if (movementenemy == -1000) {
        movementenemy = 9000
    }
})
forever(function () {
    if (movement == 305) {
        movement = 300
    }
    if (movement == 0) {
        movement = 5
    }
    if (movement == -1) {
        movement = 1
    }
    MyEnemy.follow(mySprite, 80)
    if (wanted == 5) {
        MyEnemy = sprites.create(img`
            . . . 2 2 9 4 2 2 2 2 . . . . 
            . . 2 2 2 2 2 2 2 2 c 2 . . . 
            . 2 c 2 2 2 2 2 2 2 c c 2 . . 
            2 c c 2 2 2 2 2 2 2 c c 2 2 d 
            2 c 2 4 4 4 4 4 4 4 2 c 2 2 2 
            2 2 4 b b 4 b b b 4 4 b 2 2 2 
            2 4 b b b 4 b b b b 4 2 2 2 2 
            4 4 2 2 2 4 2 2 2 2 2 4 2 2 2 
            4 4 4 4 4 4 f 4 4 4 f 4 2 d d 
            4 4 4 4 4 4 f 4 4 f 4 4 4 2 d 
            4 4 4 4 4 4 f f f 4 4 4 4 4 4 
            4 f f f f 4 4 4 4 f f f 4 4 4 
            . f f f f f 4 4 f f f f f 4 . 
            . . f f f . . . . f f f f . . 
            `, SpriteKind.Player)
        MyEnemy.x = randint(100, 10)
        MyEnemy.setKind(SpriteKind.Enemy)
    }
})
game.onUpdateInterval(500, function () {
    if (controller.left.isPressed() || controller.right.isPressed()) {
        movement += 5
        controller.moveSprite(mySprite, movement, movement)
        info.setScore(movement)
    }
    if (!(controller.left.isPressed() || controller.right.isPressed())) {
        movement += -5
        controller.moveSprite(mySprite, movement, movement)
        info.setScore(movement)
    }
})
game.onUpdateInterval(movementenemy, function () {
    MyEnemy = sprites.create(img`
        . . . 9 9 9 9 9 9 9 9 . . . . 
        . . 9 8 9 9 9 9 9 9 c 9 . . . 
        . 9 c 8 9 9 9 9 9 9 c c 9 . . 
        9 c c 8 8 8 8 8 8 9 c c 8 9 d 
        9 c 9 6 6 6 6 6 6 6 9 c 8 9 9 
        9 9 6 b b 6 b b b 6 6 b 8 9 9 
        9 6 b b b 6 b b b b 6 9 9 9 9 
        6 6 9 9 9 6 9 9 9 9 9 6 9 9 9 
        6 6 6 6 6 6 f 6 6 6 f 6 9 d d 
        6 6 6 6 6 6 f 6 6 f 6 6 6 9 d 
        6 6 6 6 6 6 f f f 6 6 6 6 6 6 
        6 f f f f 6 6 6 6 f f f 6 6 6 
        . f f f f f 6 6 f f f f f 6 . 
        . . f f f . . . . f f f f . . 
        `, SpriteKind.Player)
    MyEnemy.x = randint(100, 10)
    MyEnemy.setKind(SpriteKind.Enemy)
})
