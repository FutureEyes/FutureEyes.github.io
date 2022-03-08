import {loadGLTF} from "./libs/loader.js";
import { Math } from "./libs/three.js-r132/build/three.module.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './asset/target/triip.mind',
      uiScanning: "#scanning",
      uiLoading: "no",
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    const gltf = await loadGLTF('asset/box.gltf');
    gltf.scene.scale.set(1.04, 1.04, 1.04);
    gltf.scene.position.set(0, -0.4, 0);
    
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(gltf.scene);
    anchor.onTargetFound = () => {
      console.log("on target found");
    }
    anchor.onTargetLost = () => {
      console.log("on target lost");
    }

   
    //action.play();

    const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      gltf.scene.rotation.set(0, gltf.scene.rotation.y+delta, 0);
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  }
  start();
});
