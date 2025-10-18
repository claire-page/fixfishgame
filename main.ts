namespace SpriteKind {
    export const Crack = SpriteKind.create()
    export const Animation = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Armed == true) {
        FixFish.setImage(assets.image`fishyR_equipped`)
        if (controller.left.isPressed()) {
            FixFish.setImage(assets.image`fishyL_equipped`)
        }
    } else {
        FixFish.setImage(assets.image`fishyR`)
        if (controller.left.isPressed()) {
            FixFish.setImage(assets.image`fishyL`)
        }
    }
    Last_Dir = U
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let individual_crack of Array_of_Cracks) {
        if (Armed == true) {
            if (FixFish.overlapsWith(individual_crack)) {
                let myLocation = 0
                sprites.destroy(individual_crack, effects.bubbles, 200)
                info.changeScoreBy(1)
                crack_counter += -1
                Array_of_Cracks.removeAt(myLocation)
                Armed = false
                if (Last_Dir == U) {
                    FixFish.setImage(assets.image`fishyR`)
                }
                if (Last_Dir == D) {
                    FixFish.setImage(assets.image`fishyRD`)
                }
                if (Last_Dir == L) {
                    FixFish.setImage(assets.image`fishyL`)
                }
                if (Last_Dir == R) {
                    FixFish.setImage(assets.image`fishyR`)
                }
            }
        }
    }
})
function determine_game_speed (bool: boolean, num: number) {
    if (info.score() > 10 && info.score() % 5 == 0) {
        game_speed += -10 * info.score()
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Armed == true) {
        FixFish.setImage(assets.image`fishyL_equipped`)
    } else {
        FixFish.setImage(assets.image`fishyL`)
    }
    Last_Dir = L
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Armed == true) {
        FixFish.setImage(assets.image`fishyR_equipped`)
    } else {
        FixFish.setImage(assets.image`fishyR`)
    }
    Last_Dir = R
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Armed == true) {
        FixFish.setImage(assets.image`fishyRD_equipped`)
        if (controller.left.isPressed()) {
            FixFish.setImage(assets.image`fishyLD_equipped`)
        }
    } else {
        FixFish.setImage(assets.image`fishyRD`)
        if (controller.left.isPressed()) {
            FixFish.setImage(assets.image`fishyLD`)
        }
    }
    Last_Dir = D
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`seaweed`, function (sprite, undefined) {
    if (controller.B.isPressed()) {
        Armed = true
    }
})
let Crack_Y: number[] = []
let individual_crack: Sprite = null
let R = 0
let L = 0
let D = 0
let Array_of_Cracks: Sprite[] = []
let U = 0
let Last_Dir = 0
let Armed = false
let FixFish: Sprite = null
scene.setBackgroundImage(assets.image`Fixfish title`)
pauseUntil(() => controller.A.isPressed())
scene.setBackgroundImage(assets.image`2`)
pauseUntil(() => controller.B.isPressed())
tiles.setCurrentTilemap(tilemap`bkgrnd`)
let UpperBounds = 110
info.setScore(0)
let game_speed = 5000
FixFish = sprites.create(assets.image`fishyR`, SpriteKind.Player)
Armed = false
scene.cameraFollowSprite(FixFish)
FixFish.setPosition(139, 150)
controller.moveSprite(FixFish, 100, 100)
let Bubble_filter = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Animation)
let crack_counter = 0
tiles.placeOnTile(Bubble_filter, tiles.getTileLocation(12, 12))
animation.runImageAnimation(
Bubble_filter,
assets.animation`bubbles`,
200,
true
)
let BubbleTile = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    9 . . . . . . . . . . . . . . . 
    `, SpriteKind.Animation)
tiles.placeOnTile(BubbleTile, tiles.getTileLocation(12, 11))
animation.runImageAnimation(
BubbleTile,
assets.animation`Bubbles`,
200,
true
)
game.onUpdateInterval(game_speed, function () {
    individual_crack = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 1 . 1 . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
        . . . . . . 1 . 1 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Crack)
    individual_crack.setPosition(randint(40, 210), randint(188, UpperBounds))
    Array_of_Cracks.push(individual_crack)
    Crack_Y = [individual_crack.y, 0]
    crack_counter += 1
    determine_game_speed(true, 1)
    if (crack_counter == 5) {
        game.gameOver(false)
    }
})
game.onUpdateInterval(1, function () {
    if (FixFish.x <= 40) {
        FixFish.x += 1
    }
    if (FixFish.x >= 217) {
        FixFish.x += -1
    }
    if (FixFish.y >= 200) {
        FixFish.y = 199
    }
    if (FixFish.y >= 189) {
        controller.moveSprite(FixFish, 50, 50)
    } else {
        controller.moveSprite(FixFish, 100, 100)
    }
    if (FixFish.x == Math.constrain(FixFish.x, 187, 205)) {
        FixFish.setVelocity(0, -50)
    }
})
