export function setupRotation(camera) {
    let isRightMousePressed = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const maxVerticalAngle = Math.PI / 12; // Limite de aproximadamente 15 graus para cima/baixo

    const handleMouseDown = (event) => {
        if (event.button === 2) { // Botão direito do mouse
            isRightMousePressed = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    };

    const handleMouseUp = (event) => {
        if (event.button === 2) {
            isRightMousePressed = false;
        }
    };

    const handleMouseMove = (event) => {
        if (isRightMousePressed) {
            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            // Ajusta a rotação horizontal
            camera.rotation.y -= deltaX * 0.002;

            // Ajusta a rotação vertical dentro dos limites
            const newRotationX = camera.rotation.x - deltaY * 0.002;
            camera.rotation.x = Math.max(-maxVerticalAngle, Math.min(maxVerticalAngle, newRotationX));
        }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    };
}
