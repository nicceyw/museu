import * as THREE from 'three';

export function setupCollision(scene) {
    // Definir os limites (Box3) para as paredes
    const wallBounds = [
        new THREE.Box3(new THREE.Vector3(-20, 0, -20.5), new THREE.Vector3(20, 10, -19.5)), // Parede de trás
        new THREE.Box3(new THREE.Vector3(-20, 0, 19.5), new THREE.Vector3(20, 10, 20.5)), // Parede da frente
        new THREE.Box3(new THREE.Vector3(-20.5, 0, -20), new THREE.Vector3(-19.5, 10, 20)), // Parede esquerda
        new THREE.Box3(new THREE.Vector3(19.5, 0, -20), new THREE.Vector3(20.5, 10, 20)), // Parede direita
    ];

    // Opcional: Visualizar limites para depuração
    // if (process.env.NODE_ENV === 'development') {
    //     wallBounds.forEach((box) => {
    //         const helper = new THREE.Box3Helper(box, 0xff0000); // Cor vermelha para visualização
    //         scene.add(helper);
    //     });
    // }

    return wallBounds;
}
