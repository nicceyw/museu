import * as THREE from 'three';

export function setupMovement(camera, wallBounds) {
    const keys = { forward: false, backward: false, left: false, right: false };

    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const clock = new THREE.Clock();

    const handleKeyDown = (event) => {
        if (event.code === 'KeyW') keys.forward = true;
        if (event.code === 'KeyS') keys.backward = true;
        if (event.code === 'KeyA') keys.left = true;
        if (event.code === 'KeyD') keys.right = true;
    };

    const handleKeyUp = (event) => {
        if (event.code === 'KeyW') keys.forward = false;
        if (event.code === 'KeyS') keys.backward = false;
        if (event.code === 'KeyA') keys.left = false;
        if (event.code === 'KeyD') keys.right = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const animateMovement = () => {
        const delta = clock.getDelta();

        direction.set(0, 0, 0);
        if (keys.forward) direction.z += 1;
        if (keys.backward) direction.z -= 1;
        if (keys.left) direction.x += 1;
        if (keys.right) direction.x -= 1;

        direction.normalize();

        if (direction.length() > 0) {
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            cameraDirection.y = 0;

            const sidewaysDirection = new THREE.Vector3().crossVectors(camera.up, cameraDirection).normalize();

            const speedMultiplier = 20;
            const newPosition = camera.position.clone();

            newPosition.addScaledVector(cameraDirection, direction.z * delta * speedMultiplier);
            newPosition.addScaledVector(sidewaysDirection, direction.x * delta * speedMultiplier);

            if (!wallBounds.some((box) => box.containsPoint(newPosition))) {
                camera.position.copy(newPosition);
            }
        }

        requestAnimationFrame(animateMovement);
    };
    animateMovement();

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    };
}
