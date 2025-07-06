// Globe Visualization
function initGlobe() {
    // Check if container exists
    const container = document.getElementById('globe-container');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create globe
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        specular: 0x111111,
        shininess: 5,
        transparent: true,
        opacity: 0.8,
        wireframe: false
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.2
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Add points (data nodes)
    const points = [];
    const pointGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    
    for (let i = 0; i < 50; i++) {
        // Random points on sphere surface
        const phi = Math.acos(-1 + (2 * i) / 50);
        const theta = Math.sqrt(50 * Math.PI) * phi;
        
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.setFromSphericalCoords(2.1, phi, theta);
        scene.add(point);
        points.push(point);
        
        // Create connecting lines
        if (i > 0) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                points[i-1].position,
                point.position
            ]);
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x7b2cbf, 
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
        }
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate globe
        globe.rotation.y += 0.002;
        glow.rotation.y += 0.002;
        
        // Rotate points slightly differently for organic feel
        points.forEach((point, i) => {
            point.rotation.x += 0.001 * (i % 3);
            point.rotation.y += 0.001 * (i % 2);
        });
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    animate();
}

// Initialize globe when DOM is loaded
document.addEventListener('DOMContentLoaded', initGlobe);