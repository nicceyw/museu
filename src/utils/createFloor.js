import * as THREE from 'three';

export function createFloor(scene) {
  const floorGeometry = new THREE.PlaneGeometry(40, 40);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;

  // Adicionando textura
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    'src/assets/woodtexture.jpg',
    (texture) => {
      floor.material.map = texture;
      floor.material.needsUpdate = true;
    },
    undefined,
    (error) => console.error('Erro ao carregar textura do chão:', error)
  );

  scene.add(floor);
}