<script setup>
import { createFloor } from '@/utils/createFloor';
import { createWalls } from '@/utils/createWalls';
import { addFrames } from '@/utils/addFrames';
import { createCeiling } from '@/utils/createCeiling';

const props = defineProps({
    frames: {
        type: Array,
        required: true,
    },
    roomPosition: {
        type: Object,
        default: () => ({ x: 0, y: 0, z: 0 }),
    },
});
</script>

<template>
    <div></div>
</template>

<script>
import * as THREE from 'three';

export function setupRoom(scene, roomPosition, frames) {
    const roomGroup = new THREE.Group();
    roomGroup.position.set(roomPosition.x, roomPosition.y, roomPosition.z);

    createFloor(roomGroup);
    createWalls(roomGroup);
    createCeiling(roomGroup);

    // Adicionar quadros às paredes
    addFrames(roomGroup, new THREE.Vector3(0, 5, -19.8), new THREE.Euler(0, 0, 0), 0.1, frames.front);
    addFrames(roomGroup, new THREE.Vector3(0, 5, 19.8), new THREE.Euler(0, Math.PI, 0), -0.1, frames.back);
    addFrames(roomGroup, new THREE.Vector3(-19.8, 5, 0), new THREE.Euler(0, Math.PI / 2, 0), 0.1, frames.left);
    addFrames(roomGroup, new THREE.Vector3(19.8, 5, 0), new THREE.Euler(0, -Math.PI / 2, 0), -0.1, frames.right);

    scene.add(roomGroup);
    return roomGroup;
}
</script>
