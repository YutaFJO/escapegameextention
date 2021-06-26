namespace SpriteKind {
    export const Object = SpriteKind.create()
    export const Equip = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Equip, function (sprite, otherSprite) {
    music.powerUp.play()
    if (MakeEquipment == 1) {
        Sword.setPosition(mySprite.x, mySprite.y)
    }
    if (MakeEquipment == 2) {
        Barrier.setPosition(mySprite.x, mySprite.y)
    }
})
function MakeNewEquipment () {
    for (let index = 0; index < 1; index++) {
        MakeEquipment = randint(1, 2)
        if (MakeEquipment == 1) {
            for (let index = 0; index < 1; index++) {
                Sword = sprites.create(assets.image`Sword`, SpriteKind.Equip)
                Sword.setPosition(randint(0, 160), randint(0, 120))
            }
        }
        if (MakeEquipment == 2) {
            for (let index = 0; index < 1; index++) {
                Barrier = sprites.create(assets.image`Barrier`, SpriteKind.Equip)
                Barrier.setPosition(randint(0, 160), randint(0, 120))
            }
        }
    }
}
function MakeNewItem () {
    items = sprites.create(assets.image`ScoreItem`, SpriteKind.Food)
    items.setPosition(randint(0, 160), randint(0, 120))
}
sprites.onOverlap(SpriteKind.Equip, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (MakeEquipment == 1 && (Sword.x == mySprite.x && Sword.y == mySprite.y)) {
        music.zapped.play()
        otherSprite.destroy(effects.disintegrate, 500)
        sprite.destroy(effects.disintegrate, 500)
    }
    if (MakeEquipment == 2 && (Barrier.x == mySprite.x && Barrier.y == mySprite.y)) {
        music.knock.play()
        otherSprite.setVelocity(SpriteKind.Enemy * -1, SpriteKind.Enemy * -1)
        sprite.destroy(effects.disintegrate, 500)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 500)
    music.baDing.play()
    info.changeScoreBy(1)
    MakeNewItem()
})
function CountDown () {
    Ready = sprites.create(assets.image`CountDown3`, SpriteKind.Object)
    pause(1000)
    Ready.destroy()
    Ready = sprites.create(assets.image`CountDown2`, SpriteKind.Object)
    pause(1000)
    Ready.destroy()
    Ready = sprites.create(assets.image`CountDown1`, SpriteKind.Object)
    pause(1000)
    Ready.destroy()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mySprite.startEffect(effects.fountain, 500)
    music.powerDown.play()
    info.changeLifeBy(-1)
    pause(1000)
})
let Enemy3: Sprite = null
let Enemy2: Sprite = null
let EnemyFlag = 0
let Ready: Sprite = null
let items: Sprite = null
let Barrier: Sprite = null
let Sword: Sprite = null
let MakeEquipment = 0
let mySprite: Sprite = null
CountDown()
mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
mySprite.setPosition(0, 0)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
MakeNewItem()
let Enemy1 = sprites.create(img`
    . . . . . . . . . . . . . . 
    e e e . . . . e e e . . . . 
    c 9 9 c . . c 9 9 c . . . . 
    c b 9 9 f f 9 9 b c . . . . 
    c 3 b 9 9 b 9 b 3 c . . . . 
    f b 3 9 9 9 9 3 b f . . . . 
    e 9 9 9 9 9 9 9 9 e . . . . 
    e 9 f 9 9 9 9 f 9 e . b f b 
    f 9 9 f 9 9 f 9 9 f . f 9 f 
    f b 9 9 b b 9 9 2 b f f 9 f 
    . f 2 2 2 2 2 2 9 b b 9 b f 
    . f 9 9 9 9 9 9 9 f f f f . 
    . . f 9 b 9 f 9 f . . . . . 
    . . . f f f f f f . . . . . 
    `, SpriteKind.Enemy)
Enemy1.setVelocity(30, 30)
Enemy1.setFlag(SpriteFlag.BounceOnWall, true)
let ElapsedTime = -3
MakeEquipment = 0
info.setLife(5)
info.setScore(0)
forever(function () {
    if (info.score() > 10) {
        if (EnemyFlag == 0) {
            Enemy2 = sprites.create(img`
                . . . . . . . . . . . . 
                . . . f f f f f f . . . 
                . f f f e e e e f f f . 
                f f f e e e e e e f f f 
                f f f f 4 e e e f f f f 
                f f f 4 4 4 e e f f f f 
                f f f 4 4 4 4 e e f f f 
                f 4 e 4 4 4 4 4 4 e 4 f 
                f 4 4 f f 4 4 f f 4 4 f 
                f e 4 d d d d d d 4 e f 
                . f e d d b b d 4 e f e 
                f f f e 4 4 4 4 d d 4 e 
                e 4 f b 1 1 1 e d d e . 
                . . f 6 6 6 6 f e e . . 
                . . f f f f f f f . . . 
                . . f f f . . . . . . . 
                `, SpriteKind.Enemy)
            Enemy2.setPosition(0, 0)
            Enemy2.setVelocity(50, 0)
            Enemy2.setFlag(SpriteFlag.BounceOnWall, true)
            EnemyFlag = 1
        }
    }
})
forever(function () {
    if (info.score() > 20) {
        if (EnemyFlag == 1) {
            Enemy3 = sprites.create(assets.image`3rdEnemy`, SpriteKind.Enemy)
            Enemy3.follow(mySprite, 20)
            Enemy3.setFlag(SpriteFlag.BounceOnWall, true)
            EnemyFlag = 2
        }
    }
})
forever(function () {
    ElapsedTime += 1
    pause(1000)
})
forever(function () {
    if (ElapsedTime == 5 || (ElapsedTime == 40 || (ElapsedTime == 60 || (ElapsedTime == 80 || ElapsedTime == 100)))) {
        MakeNewEquipment()
        pause(2000)
    }
})
