import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    //mockWithVideo('../../assets/mock-videos/musicband1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './asset/targets/musicband.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const raccoon = await loadGLTF('./asset/models/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);
    raccoon.scene.rotation.set(0,Math.PI/2,0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
