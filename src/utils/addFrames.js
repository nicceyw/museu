import * as THREE from 'three';

export function addFrames(scene, wallPosition, wallRotation, depthOffset, frames, gap = 10) {
  const textureLoader = new THREE.TextureLoader();

  const framesGroup = new THREE.Group(); // Grupo específico para esta parede

  const frameCount = frames.length;
  const firstFrameCenter = -((frameCount - 1) * gap) / 2;

  frames.forEach((frame, index) => {
    // Textura do quadro (imagem principal)
    const imageTexture = textureLoader.load(frame.src, undefined, undefined, (error) => {
      console.error('Erro ao carregar a textura:', error);
    });

    // Textura da moldura
    const frameTexture = textureLoader.load('src/assets/moldura.png', undefined, undefined, (error) => {
      console.error('Erro ao carregar a textura da moldura:', error);
    });

    // Geometria maior para a moldura
    const frameGeometry = new THREE.PlaneGeometry(8, 8); // Moldura maior
    const frameMaterial = new THREE.MeshBasicMaterial({
      map: frameTexture,
      transparent: true, // Ativa a transparência
    });

    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

    // Geometria menor para a imagem dentro da moldura
    const imageGeometry = new THREE.PlaneGeometry(5, 5); // Imagem menor
    const imageMaterial = new THREE.MeshBasicMaterial({
      map: imageTexture,
      transparent: true, // Ativa a transparência
    });

    const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    imageMesh.position.set(0, 0, 0.01); // Ligeiramente para frente, para evitar sobreposição

    // Armazena os dados do quadro para a imagem
    imageMesh.userData = { title: frame.title, collection: frame.collection };

    // Adiciona a moldura e a imagem como um grupo
    const group = new THREE.Group();
    group.add(frameMesh); // Moldura
    group.add(imageMesh); // Imagem

    // Calcula a posição horizontal do grupo
    const x = firstFrameCenter + index * gap;
    group.position.set(x, 0, depthOffset);

    framesGroup.add(group);
  });

  // Posiciona o grupo completo da parede
  framesGroup.position.copy(wallPosition);
  framesGroup.rotation.copy(wallRotation);

  // Adiciona o grupo à cena
  scene.add(framesGroup);
}

