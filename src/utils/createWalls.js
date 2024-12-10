import * as THREE from 'three';

export function createWalls(scene) {
  const wallGeometry = new THREE.PlaneGeometry(40, 10);

  // Materiais com cores diferentes para cada parede
  const backWallMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide }); 
  const frontWallMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide });
  const leftWallMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide });
  const rightWallMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide });

  // Parede de trás
  const backWall = new THREE.Mesh(wallGeometry, backWallMaterial);
  backWall.position.set(0, 5, -20);
  scene.add(backWall);

  // Parede da frente
  const frontWall = new THREE.Mesh(wallGeometry, frontWallMaterial);
  frontWall.position.set(0, 5, 20);
  frontWall.rotation.y = Math.PI;
  scene.add(frontWall);

  // Parede esquerda
  const leftWall = new THREE.Mesh(wallGeometry, leftWallMaterial);
  leftWall.position.set(-20, 5, 0);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  // Parede direita
  const rightWall = new THREE.Mesh(wallGeometry, rightWallMaterial);
  rightWall.position.set(20, 5, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);
}
