import {loadGLTF} from "./libs/loader.js";
import { Math } from "./libs/three.js-r132/build/three.module.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './asset/target/nuen.mind',
      uiScanning: "#scanning",
      uiLoading: "no",
    });
    const {renderer, scene, camera} = mindarThree;

   const spotlight = new THREE.SpotLight(0xffffff,4);
  //  const directionlight = new THREE.dlight(0xffffff,4);
  //  directionlight.castShadow = true;
   spotlight.shadow.bias = -0.0001;
   spotlight.shadow.mapSize.width = 1024*4;
   spotlight.shadow.mapSize.height = 1024*4;
   const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
  scene.add(light);
    // scene.add( directionlight );

  // spotlight.position.set(-50,50,50);
  //  spotlight.castShadow = true;
  //  spotlight.shadow.bias = -0.0001;
  //  spotlight.shadow.mapSize.width = 1024*4;
  //  spotlight.shadow.mapSize.height = 1024*4;
  //   scene.add( spotlight );
  //   const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
  //   scene.add(light);
    
  


    const gltf = await loadGLTF('asset/NUEN5.glb');
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, -0.4, 0);
    gltf.scene.rotation.set(0,0,0);   
    
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(gltf.scene);
    anchor.onTargetFound = () => {
      console.log("on target found");
    }
    anchor.onTargetLost = () => {
      console.log("on target lost");
    }
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
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
