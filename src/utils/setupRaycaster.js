import * as THREE from 'three';

export function setupRaycaster(scene, camera, framesGroup, onImageClick) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(framesGroup.children, true);
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;

      // Verifica se o clique foi na imagem ou moldura
      if (intersectedObject.userData && intersectedObject.userData.title) {
        // Clique diretamente na imagem
        const { title, collection } = intersectedObject.userData;
        onImageClick(
          intersectedObject.material.map.image.src,
          title,
          collection
        );
      } else {
        // Caso clique na moldura, tenta buscar a imagem do mesmo grupo
        const parentGroup = intersectedObject.parent;
        const imageMesh = parentGroup.children.find(
          (child) => child.userData && child.userData.title
        );

        if (imageMesh) {
          const { title, collection } = imageMesh.userData;
          onImageClick(
            imageMesh.material.map.image.src,
            title,
            collection
          );
        }
      }
    }
  };

  window.addEventListener('click', onMouseClick);

  return () => {
    window.removeEventListener('click', onMouseClick);
  };
}
