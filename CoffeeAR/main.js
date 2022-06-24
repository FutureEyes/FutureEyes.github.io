import {mockWithVideo, mockWithImage} from './libs/camera-mock.js';
import {loadGLTF, loadTexture, loadTextures, loadVideo} from './libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: './assets/targets/austrade.mind',
      uiScanning: "#scanning",
      uiLoading: "no",
    });
    
    const {renderer, scene, camera} = mindarThree;



    const anchor = mindarThree.addAnchor(0);
    // const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    // scene.add(light);
    const  light =  new THREE.DirectionalLight( 0xffffff, 2 );
  //const  light = new THREE.SpotLight(0x404040 ,4);
  light.position.set( 100, 1000, 100 );
  light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024*4;
        light.shadow.mapSize.height = 1024*4;
        light.shadow.camera.near = 500;
        light.shadow.camera.far = 4000;
        light.shadow.camera.fov = 30;
        scene.add( light );

       const  hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
        scene.add(hemiLight);

        // renderer = new THREE.WebGLRenderer();
        // renderer.toneMapping = THREE.ReinhardToneMapping;
        // renderer.toneMappingExposure = 2.3;
        // renderer.setSize(window.innerWidth,window.innerHeight);
        // renderer.shadowMap.enabled = true;
        // document.body.appendChild(renderer.domElement);
    //---------particle smoke----------

   
    
//---------end particle smoke
    const nuenone = await loadGLTF('./assets/models/coffee/scene.glb');
    nuenone.scene.scale.set(1, 1, 1);
    nuenone.scene.position.set(-0.3, 0, 0);
    nuenone.scene.rotation.set( Math.PI/4, 0,0);
    nuenone.castShadow = true;
    nuenone.receiveShadow = true;
   

    
    anchor.group.add(nuenone.scene);


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  
  start();
});