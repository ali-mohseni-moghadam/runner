import {
  Color3,
  CreateBox,
  Engine,
  KeyboardInfo,
  Mesh,
  StandardMaterial,
} from "@babylonjs/core";

import Game from "../Game/Game";
import Grounds from "./Ground";

export default class Player {
  box: Mesh;
  engine!: Engine;

  groundIndex: number = 0;
  grounds: Grounds[] = [];

  constructor() {
    const scene = Game.getInstance().scene;
    const camera = Game.getInstance().camera;
    this.box = CreateBox("player", {
      width: 0.1,
      height: 0.1,
      depth: 0.1,
    });
    const material = new StandardMaterial("box");
    material.diffuseColor = new Color3(1.0, 0.0, 0.0);
    this.box.material = material;
    this.box.position.y = 0.06;

    camera.camera.parent = this.box;

    scene.onKeyboardObservable.add(this.onKeyboard.bind(this));
    scene.onBeforeRenderObservable.add(this.update.bind(this));

    this.grounds = [
      new Grounds(-50),
      new Grounds(0),
      new Grounds(50),
      new Grounds(100),
    ];
  }

  onKeyboard(event: KeyboardInfo) {
    const maxZ: number = -0.45;
    const minZ: number = 0.45;

    if (event.event.type !== "keydown") return;
    if (event.event.key === "d") {
      this.box.position.z -= 0.45;
      if (this.box.position.z < maxZ) {
        this.box.position.z = maxZ;
      }
    } else if (event.event.key === "a") {
      this.box.position.z += 0.45;
      if (this.box.position.z > minZ) {
        this.box.position.z = minZ;
      }
    }
  }

  update() {
    const engine = Game.getInstance().engine;
    const delta = engine.getDeltaTime();
    this.box.position.x += 0.01 * delta;

    if (this.box.position.x > 50 * this.groundIndex) {
      this.grounds.push(new Grounds(50 * this.groundIndex + 150));
      const removedGround = this.grounds.shift();
      removedGround?.ground.dispose();
      this.groundIndex++;
      return;
    }
  }
}
