export function setupRotation(camera) {
    let isRightMousePressed = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const maxVerticalAngle = Math.PI / 12; // Limite de aproximadamente 15 graus para cima/baixo
    const rotationSpeed = 0.01; // Velocidade de rotação com as teclas "Q" e "E"
    const keys = { rotateLeft: false, rotateRight: false };

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

    const handleKeyDown = (event) => {
        if (event.code === 'KeyQ') keys.rotateLeft = true;
        if (event.code === 'KeyE') keys.rotateRight = true;
    };

    const handleKeyUp = (event) => {
        if (event.code === 'KeyQ') keys.rotateLeft = false;
        if (event.code === 'KeyE') keys.rotateRight = false;
    };

    const animateRotation = () => {
        if (keys.rotateLeft) {
            camera.rotation.y += rotationSpeed;
        }
        if (keys.rotateRight) {
            camera.rotation.y -= rotationSpeed;
        }
        requestAnimationFrame(animateRotation); // Continua animando enquanto as teclas estiverem pressionadas
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    animateRotation();

    return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    };
}
