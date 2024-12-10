<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { createFloor } from '@/utils/createFloor';
import { createWalls } from '@/utils/createWalls';
import { createCeiling } from '@/utils/createCeiling';
import { addFrames } from '@/utils/addFrames';
import { setupRaycaster } from '@/utils/setupRaycaster';
import { setupMovement } from '@/utils/setupMovement';
import { setupRotation } from '@/utils/setupRotation';
import { setupCollision } from '@/utils/setupCollision';
import { setupScene } from '@/utils/setupScene';
import Modal from './Modal.vue';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();

onMounted(() => {
    const { scene, camera, renderer } = setupScene();

    createFloor(scene);
    createWalls(scene);
    createCeiling(scene);

    const framesGroup = new THREE.Group();
    scene.add(framesGroup);

    // Parede da frente
    addFrames(
        framesGroup,
        new THREE.Vector3(0, 5, -19.8),
        new THREE.Euler(0, 0, 0),
        0.1,
        [
            { src: 'src/nicce/1.jpeg', title: 'Apreciando a vista', collection: 'Morro Ferrabrás' },
            { src: 'src/nicce/2.jpeg', title: 'Segurando os céus', collection: 'Morro Ferrabrás' },
            { src: 'src/nicce/3.jpeg', title: 'Absorvendo a luz', collection: 'Morro Ferrabrás' },
        ],
        10 // Gap de 10 unidades entre as fotos
    );

    // Parede de trás
    addFrames(
        framesGroup,
        new THREE.Vector3(0, 5, 19.8),
        new THREE.Euler(0, Math.PI, 0),
        -0.1,
        [
            { src: 'src/nicce/13.jpeg', title: 'Mão na cintura', collection: 'Tarde de sol' },
            { src: 'src/nicce/14.jpeg', title: 'Arrumando o cabelo', collection: 'Tarde de sol' },
            { src: 'src/nicce/15.jpeg', title: 'Tapando o sol', collection: 'Tarde de sol' },
        ],
        10 // Gap de 8 unidades entre as fotos
    );

    // Parede esquerda
    addFrames(
        framesGroup,
        new THREE.Vector3(-19.8, 5, 0),
        new THREE.Euler(0, Math.PI / 2, 0),
        0.1,
        [
            { src: 'src/nicce/4.jpeg', title: 'Estacionamento', collection: '20 borboletas' },
            { src: 'src/nicce/5.jpeg', title: 'Bolo de aniversário', collection: '20 borboletas' },
            { src: 'src/nicce/6.jpeg', title: 'Look', collection: '20 borboletas' },
            { src: 'src/nicce/7.jpeg', title: 'Sorrindo', collection: '20 borboletas' },
        ],
        10
    );

    // Parede direita
    addFrames(
        framesGroup,
        new THREE.Vector3(19.8, 5, 0),
        new THREE.Euler(0, -Math.PI / 2, 0),
        -0.1,
        [
            { src: 'src/nicce/8.jpeg', title: 'Cadeira', collection: 'Calvin Klein' },
            // { src: 'src/nicce/9.jpeg', title: 'Aurora boreal', collection: 'Calvin Klein' },
            { src: 'src/nicce/10.jpeg', title: 'Olhar', collection: 'Calvin Klein' },
            { src: 'src/nicce/11.jpeg', title: 'Ligação', collection: 'Calvin Klein' },
        ],
        9 // Gap de 9 unidades entre as fotos
    );


    const wallBounds = setupCollision(scene);
    const removeRaycaster = setupRaycaster(scene, camera, framesGroup, (image, title, collection) => {
        modalStore.openModal(image, title, collection);
    });

    const removeMovement = setupMovement(camera, wallBounds);
    const removeRotation = setupRotation(camera);

    const handleContextMenu = (event) => {
        event.preventDefault(); // Impede o menu de contexto
    };

    document.addEventListener('contextmenu', handleContextMenu);

    const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    onUnmounted(() => {
        document.removeEventListener('contextmenu', handleContextMenu);
        removeRaycaster();
        removeMovement();
        removeRotation();
    });
});

</script>

<template>
    <div id="museum-container"></div>
    <Modal :show="modalStore.showModal" @close="modalStore.closeModal" :title="modalStore.selectedTitle"
        :collection="modalStore.selectedCollection">
        <img :src="modalStore.selectedImage" alt="Imagem ampliada" class="w-full h-auto" />
    </Modal>
    <div class="fixed bottom-0 left-1/2 transform -translate-x-1/2">
        <button class="text-red-500 p-4">
            TESTE
        </button>
    </div>

</template>
