<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Modal from './Modal.vue';

const showModal = ref(false);
const selectedImage = ref('');

onMounted(() => {
  // Criação da Cena
  const scene = new THREE.Scene();

  // Configuração da Câmera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10); // Posiciona a câmera um pouco para trás e para cima

  // Renderizador
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('museum-container').appendChild(renderer.domElement);

  // Controles de Orbitação
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Controle mais fluido

  // Adicionando Luz
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Criando o Chão
  const floorGeometry = new THREE.PlaneGeometry(40, 40); // Tamanho do chão
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide }); // Cor inicial
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // Rotaciona para ficar horizontal
  floor.position.y = 0; // Posiciona no nível do chão
  scene.add(floor);

  // Substituir a cor por uma textura de madeira
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    'assets/woodtexture.jpg', // Substitua pelo caminho da sua imagem de madeira
    (texture) => {
      floor.material.map = texture; // Aplica a textura ao material
      floor.material.needsUpdate = true; // Atualiza o material
    },
    undefined,
    (error) => {
      console.error('Erro ao carregar a textura:', error);
    }
  );


  // Criando Paredes
  const wallGeometry = new THREE.PlaneGeometry(40, 10);
  const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });

  const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
  backWall.position.set(0, 5, -20); // Parede de trás
  scene.add(backWall);

  const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
  frontWall.position.set(0, 5, 20); // Parede da frente
  frontWall.rotation.y = Math.PI; // Gira 180 graus
  scene.add(frontWall);

  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.position.set(-20, 5, 0); // Parede esquerda
  leftWall.rotation.y = Math.PI / 2; // Gira 90 graus
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.set(20, 5, 0); // Parede direita
  rightWall.rotation.y = -Math.PI / 2; // Gira -90 graus
  scene.add(rightWall);

  // Função para adicionar quadros em uma parede
  // Função para adicionar quadros em uma parede

  const addFramesToWall = (wall, wallPosition, wallRotation, depthOffset, images) => {
    const frameGeometry = new THREE.PlaneGeometry(4, 4); // Tamanho dos quadros
    const textureLoader = new THREE.TextureLoader();

    // Posições horizontais ajustadas para 2 quadros
    const xOffsets = [-5, 5]; // Dois quadros com espaçamento horizontal

    xOffsets.forEach((x, index) => {
      // Carregar a textura correspondente
      const frameMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(images[index], undefined, undefined, (error) => {
          console.error('Erro ao carregar a textura:', error);
        }),
      });

      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(x, 0, depthOffset); // Centralizado verticalmente no eixo Y
      wall.add(frame);
    });

    wall.position.copy(wallPosition);
    wall.rotation.copy(wallRotation);
    scene.add(wall);
  };

  // Ajustando paredes com os quadros e imagens específicas
  addFramesToWall(
    new THREE.Group(),
    new THREE.Vector3(0, 5, -19.8),
    new THREE.Euler(0, 0, 0),
    0.1,
    ['nicce/1.jpeg', 'nicce/2.jpeg'] // Imagens para a parede de trás
  );

  addFramesToWall(
    new THREE.Group(),
    new THREE.Vector3(0, 5, 19.8),
    new THREE.Euler(0, Math.PI, 0),
    -0.1,
    ['nicce/3.jpeg', 'nicce/4.jpeg'] // Imagens para a parede da frente
  );

  addFramesToWall(
    new THREE.Group(),
    new THREE.Vector3(-19.8, 5, 0),
    new THREE.Euler(0, Math.PI / 2, 0),
    0.1,
    ['nicce/5.jpeg', 'nicce/6.jpeg'] // Imagens para a parede esquerda
  );

  addFramesToWall(
    new THREE.Group(),
    new THREE.Vector3(19.8, 5, 0),
    new THREE.Euler(0, -Math.PI / 2, 0),
    -0.1,
    ['nicce/7.jpeg', 'nicce/8.jpeg'] // Imagens para a parede direita
  );

  // Animação e Renderização
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // Ajuste de Tela Responsiva
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (event) => {
    // Calcula a posição do mouse em coordenadas normalizadas
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Verifica se o clique intersectou algum quadro
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      if (intersectedObject.material && intersectedObject.material.map) {
        selectedImage.value = intersectedObject.material.map.image.src; // Define a imagem no modal
        showModal.value = true; // Exibe o modal
      }
    }
  };

  window.addEventListener('click', onMouseClick);

  // Remove o evento quando o componente é desmontado
  onUnmounted(() => {
    window.removeEventListener('click', onMouseClick);
  });
});
</script>

<template>
  <div id="museum-container"></div>
  <Modal :show="showModal" @close="showModal = false">
    <img :src="selectedImage" alt="Imagem ampliada" class="w-full h-auto" />
  </Modal>
</template>