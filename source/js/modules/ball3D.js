import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export default () => {
  const scene = new THREE.Scene();
  const geometry = new THREE.TorusKnotGeometry(3, 1, 20, 8);
  const material = new THREE.MeshStandardMaterial({
    // color: `#7df9ff`
    color: ` #d5d5d5`,
    roughness: 0.2
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);


  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 10, 10);
  light.intensity = 1.25;
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
  camera.position.z = 15;
  scene.add(camera);

  const canvas = document.querySelector(`canvas.webgl`);
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;

  window.addEventListener(`resize`, () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
  });

  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };
  loop();
};
