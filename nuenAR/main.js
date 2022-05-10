import {mockWithVideo, mockWithImage} from './libs/camera-mock.js';
import {loadGLTF, loadTexture, loadTextures, loadVideo} from './libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: './assets/targets/nuen.mind',
      uiScanning: "#scanning",
      uiLoading: "no",
    });
    const {renderer, scene, camera} = mindarThree;

    

    const anchor = mindarThree.addAnchor(0);
    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const nuenone = await loadGLTF('./assets/models/nuen/NUEN.glb');
    nuenone.scene.scale.set(5, 5, 5);
    nuenone.scene.position.set(0, 0, 0);
    nuenone.scene.rotation.set( Math.PI/2, 0,0);


    
    anchor.group.add(nuenone.scene);


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
