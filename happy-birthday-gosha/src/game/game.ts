import {
    EngineManager,
    Camera,
    RenderService,
    GameObject,
    MeshRenderer,
    SquareMesh,
    Vector,
    Sprite,
    minRandom, Collider, SquareShape, GameObjectsService, TickService, AudioService
} from "kneekeetah-game-engine";
import Player from "./player.ts";

export default class GameManager {
    player: Player | null = null;
    terrain: GameObject = new GameObject();
    camera: Camera | null = null;
    engineManager: EngineManager | null = null;
    score: number = 0;
    _onScoreChangeCallbacks: Array<Function> = [];
    _deathCallbacks: Array<Function> = [];
    _obstacleTimeout: number | null = null;
    hasGravity: boolean = false;
    rand: number = 0;
    isDead: booelan = false;
    async start() {
        this.rand = Math.random();
        console.log(TickService.updateCallbacks);
        TickService.updateCallbacks.clear();

        this.engineManager = new EngineManager();
        GameObjectsService.gameObjects.clear();
        RenderService.drawables.clear();
        await this._init();

        this.engineManager.start();
    }
    private async _init() {
        this.player = new Player();
        await this.player.create();

        this._initEnvironment();
        await this._initObstacleLoop();
        await this._initAudio();
        this._initCamera();
        this._initScoreCount();
    }
    private _initCamera() {
        const width = innerWidth;
        const height = innerHeight;
        const canvasSelector = 'canvas';
        const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
        if (!canvas) {
            console.error('No canvas found with selector', canvasSelector);
            return;
        }
        const context = canvas.getContext('2d');

        this.camera = new Camera({ width, height, canvas, context, backgroundColor: 'gray' });
        RenderService.cameras.add(this.camera);
    }
    private _initEnvironment() {
        this._createTerrain();
        this._initGravity();
    }
    private _createTerrain() {
        const terrainRenderer = new MeshRenderer();
        const squareMesh = new SquareMesh({ size: 2000, fillStyle: 'green', strokeStyle: 'transparent' });
        terrainRenderer.mesh = squareMesh;
        this.terrain.setComponent(terrainRenderer);
        this.terrain.translate.setPosition(new Vector(innerWidth / 2, innerHeight + 700));
        this.terrain.instantiate();
    }
    private _initGravity() {
        if (!this.player || this.hasGravity) return;
        const rb = this.player.rigidbody
        this.engineManager.onUpdate(() => {
            if (!this.player) return;
            const terrainHeight = innerHeight - 450;
            const position = this.player.gameObject.translate.getActualPosition();
            if (position.y < terrainHeight) {
                this.player.isOnGround = false;
                rb.push(0, 1);
                return;
            }
            if (position.y >= terrainHeight) {
                this.player.gameObject.translate.setPosition(new Vector(200, innerHeight - 450));
                this.player.isOnGround = true;
            }
        });
        this.hasGravity = true;
    }
    private async _initObstacleLoop() {
        const source = await this._getObstacleSpriteSource();

        const loopFunction = () => {
            const randTime = minRandom(1200, 2000);
            this._obstacleTimeout = setTimeout(async () => {
                await this._createObstacle(source);
                loopFunction();
            }, randTime);
        }
        loopFunction();
    }
    private async _initAudio() {
        AudioService.add({
            name: 'death-sound',
            resolvedSrc: (await import('../assets/sounds/death_is_cringe.ogg')).default,
        });
    }
    private async _createObstacle(spriteSource: string) {
        const sprite = new Sprite();

        sprite.spriteDrawConfig.width = 100;
        sprite.spriteDrawConfig.height = 100;
        sprite.spriteDrawConfig.cropHeight = 1020;
        sprite.spriteDrawConfig.cropWidth = 1020;

        await sprite.loadImage(spriteSource);
        const go = new GameObject();
        go.translate.setPosition(new Vector(innerWidth, innerHeight - 400));
        this.engineManager.onUpdate((deltaTime: number) => {
            const { x, y } = go.translate.getActualPosition();
            const speed = 10 + (this.score / 40);
            const movX = x - speed * deltaTime;
            go.translate.setPosition(new Vector(movX, y));
        });
        go.instantiate();
        sprite.translate = go.translate;
        RenderService.drawables.add(sprite);
        const colliderGo = new GameObject();
        go.translate.addChild(colliderGo.translate);
        colliderGo.translate.setPosition(new Vector(50, 35));
        const collider = new Collider({ shape: new SquareShape({ size: 20 })  });
        collider.onCollision(() => {
            if (this.isDead) return;
            this._deathCallbacks.forEach(cb => cb());
            clearTimeout(this._obstacleTimeout as number);
            this.isDead = true;
            AudioService.play('death-sound');
        })
        go.setComponent(collider);
    }
    private async _getObstacleSpriteSource() {
        const { default: source } = await import('../assets/sprites/holy_bible.png');
        return source as string;
    }
    private _initScoreCount() {
        setInterval(() => {
            this.score += 10;
            this._onScoreChangeCallbacks.forEach(cb => cb(this.score));
        }, 1000)
    }
    onScoreChange(cb: Function) {
        this._onScoreChangeCallbacks.push(cb);
    }
    onDeath(cb: Function) {
        this._deathCallbacks.push(cb);
    }
}


