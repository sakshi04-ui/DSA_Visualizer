import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add Responsive Algorithms (Cubes, Spheres)
    const geometryTypes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.ConeGeometry(0.5, 1, 32),
    ];

    const materials = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: true });
    const algorithms = [];

    // Add Multiple Algorithm Shapes to Scene
    for (let i = 0; i < 50; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const algorithm = new THREE.Mesh(geometry, materials);
      algorithm.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      algorithm.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(algorithm);
      algorithms.push(algorithm);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Set Camera Position
    camera.position.z = 5;

    // Mouse Interaction for Rotation
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      algorithms.forEach((algorithm) => {
        algorithm.rotation.x += 0.01;
        algorithm.rotation.y += 0.01;
        algorithm.position.x += mouse.x * 0.01;
        algorithm.position.y += mouse.y * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Ensure mountRef is valid before removing child
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} />;
};

export default ThreeJSBackground;
