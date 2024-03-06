import { Vector3, ArcRotateCamera } from "@babylonjs/core";

export default class Camera {
  camera: ArcRotateCamera;

  constructor() {
    this.camera = new ArcRotateCamera(
      "camera",
      3.14,
      1.263,
      2.86,
      new Vector3()
    );
    this.camera.minZ = 0.01;
    this.camera.maxZ = 50;
  }
}
