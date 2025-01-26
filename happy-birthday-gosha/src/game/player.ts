import {
    GameObject,
    RenderService,
    Rigidbody,
    Sprite,
    Vector,
    InputService,
    Collider,
    PolygonShape
} from "kneekeetah-game-engine";

export default class Player {

    gameObject: GameObject = new GameObject();
    rigidbody: Rigidbody = new Rigidbody();
    collider: Collider = new Collider({
        shape: new PolygonShape({
            points: [
                new Vector(0, 0),
                new Vector(0, 200),
                new Vector(50, 200),
                new Vector(50, 0),
            ],
        })
    });
    sprite: Sprite = new Sprite();
    initialPosition = new Vector(200, innerHeight - 450);
    isOnGround: boolean = true

    async create() {
        this.gameObject.translate.setPosition(this.initialPosition);

        await this._initSprite();
        this._initBody();
        this._initControls();

        this.gameObject.instantiate();
    }
    private _initControls() {
        InputService.setListener({
            keyCode: 'Space',
            onDown: () => {
                if (!this.isOnGround) return;
                this.rigidbody.push(0, -60);
            }
        })
    }
    private _initBody() {
        this.rigidbody.velocity = new Vector(0, 0);
        this.rigidbody.friction = .15;
        this.gameObject.setComponent(this.rigidbody);
        this.gameObject.setComponent(this.collider);
    }
    private async _initSprite() {
        const { default: source } = await import('../assets/sprites/gosha.webp');

        this.sprite.spriteDrawConfig.width = 150;
        this.sprite.spriteDrawConfig.height = 150;
        this.sprite.spriteDrawConfig.cropHeight = 520;
        this.sprite.spriteDrawConfig.cropWidth = 520;

        await this.sprite.loadImage(source);

        this.sprite.translate = this.gameObject.translate;

        RenderService.drawables.add(this.sprite);
    }
}
