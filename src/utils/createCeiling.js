import * as THREE from 'three';

export function createCeiling(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Carregar a textura do teto
    const ceilingTexture = textureLoader.load(
        'assets/woodtexture.jpg', // Caminho da imagem
        undefined,
        undefined,
        (error) => {
            console.error('Erro ao carregar a textura do teto:', error);
        }
    );

    const ceilingGeometry = new THREE.PlaneGeometry(40, 40); // Tamanho do teto
    const ceilingMaterial = new THREE.MeshBasicMaterial({
        map: ceilingTexture, // Adiciona a textura
        side: THREE.DoubleSide, // Visível de ambos os lados
    });

    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

    // Posicionar o teto acima das paredes
    ceiling.rotation.x = Math.PI / 2; // Rotacionar para ficar horizontal
    ceiling.position.set(0, 10, 0); // Posicionar no topo das paredes (altura 10)

    // Adicionar o teto à cena
    scene.add(ceiling);
}
