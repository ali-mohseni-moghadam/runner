import {
  Color3,
  CreateBox,
  CreateGround,
  Mesh,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export default class Grounds {
  ground: Mesh;

  constructor(positionX: number) {
    this.ground = CreateGround("base_ground", {
      width: 50,
    });
    const material = new StandardMaterial("ground");
    material.diffuseColor = Color3.Random();
    this.ground.material = material;

    this.ground.position.x = positionX;

    for (let i = 0; i < 30; i++) {
      this.createRandomBoxes();
    }
  }

  createRandomBoxes() {
    const randomBox = CreateBox("randomBox", {
      width: Math.random() * 1,
      height: Math.random() * 1,
      depth: Math.random() * 1,
    });
    const material = new StandardMaterial("randomBoxMaterial");
    material.diffuseColor = Color3.Random();
    randomBox.material = material;
    randomBox.parent = this.ground;
    randomBox.position = new Vector3(
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
  }
}
