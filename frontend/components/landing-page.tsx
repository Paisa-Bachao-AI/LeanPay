'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';

export function LandingPage() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLUListElement>(null);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Inter:wght@400;600;800&display=swap');
      :root {
        --bg: #F8FAFC;
        --fg: #0F172A;
        --grid-line: #E2E8F0;
        --font-sans: 'Inter', sans-serif;
        --font-body: 'DM Sans', sans-serif;
      }
      .grid-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr 2fr 1fr;
        pointer-events: none;
        z-index: 10;
      }
      .grid-cell {
        border-right: 1px solid #E2E8F0;
        border-bottom: 1px solid #E2E8F0;
        position: relative;
      }
      .grid-cell:nth-child(3n) { border-right: none; }
      .grid-cell:nth-child(n+7) { border-bottom: none; }
      .ui-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        pointer-events: none;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr 2fr 1fr;
      }
      .meta-text {
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        color: #0F172A;
        opacity: 0.8;
      }
      .top-left-meta {
        grid-column: 1;
        grid-row: 1;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      .top-right-meta {
        grid-column: 3;
        grid-row: 1;
        padding: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .bottom-left-meta {
        grid-column: 1;
        grid-row: 3;
        padding: 3rem;
        display: flex;
        align-items: flex-end;
      }
      .bottom-right-meta {
        grid-column: 3;
        grid-row: 3;
        padding: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        text-align: right;
      }
      .center-content {
        grid-column: 2;
        grid-row: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      .counter-number {
        font-family: 'Inter', sans-serif;
        font-size: 10vw;
        font-weight: 800;
        line-height: 0.9;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
      }
      .counter-label {
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-top: 1rem;
        opacity: 0.5;
      }
      .progress-container {
        position: absolute;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        width: 240px;
        height: 2px;
        background: #E2E8F0;
        border-radius: 4px;
        overflow: hidden;
      }
      .progress-bar {
        width: 0%;
        height: 100%;
        background: #0F172A;
        transform-origin: left;
      }
      .log-list {
        list-style: none;
        overflow: hidden;
        height: 1.4em;
      }
      .log-list li {
        line-height: 1.4em;
        font-family: 'Inter', sans-serif;
      }
      #canvas-container canvas {
        display: block;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let currentProgress = 0;
    let targetProgress = 0;
    let animFrameId: number;

    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const d = 5;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const noiseVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const noiseFragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      void main() {
        vec2 center = vec2(0.5, 0.5);
        center += vec2(-0.02, -0.02);
        float dist = distance(vUv, center);
        float angle = atan(vUv.y - center.y, vUv.x - center.x);
        float radius = 0.25 + 0.05 * sin(angle * 4.0 + uTime * 0.3);
        float mask = smoothstep(radius, 0.0, dist);
        vec2 noiseUv = vUv * min(uResolution.x, uResolution.y) * 0.4;
        float noiseVal = random(noiseUv + uTime * 0.05);
        float stipple = step(noiseVal, mask * 1.2);
        gl_FragColor = vec4(vec3(0.06, 0.09, 0.16), stipple * 0.4);
      }
    `;

    const noiseGeometry = new THREE.PlaneGeometry(15, 15);
    const noiseMaterial = new THREE.ShaderMaterial({
      vertexShader: noiseVertexShader,
      fragmentShader: noiseFragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      }
    });
    const noisePlane = new THREE.Mesh(noiseGeometry, noiseMaterial);
    noisePlane.lookAt(camera.position);
    noisePlane.position.set(-0.5, -0.5, -2);
    scene.add(noisePlane);

    const group = new THREE.Group();
    group.position.y = -1.5;
    scene.add(group);

    const geometry = new THREE.CylinderGeometry(2.4, 2.4, 0.4, 64);
    const boxGeo = new THREE.BoxGeometry(6.2, 6.2, 6.2);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xCBD5E1, linewidth: 1 });
    const wireframeBox = new THREE.LineSegments(edges, lineMaterial);
    group.add(wireframeBox);

    const gradientVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const gradientFragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uProgress;
      void main() {
        vec3 start = vec3(0.06, 0.09, 0.16);
        vec3 end = vec3(0.23, 0.41, 0.96);
        float mixFactor = (vPosition.x + vPosition.y + 4.0) / 8.0;
        vec3 finalColor = mix(start, end, mixFactor);
        float wipe = step(vPosition.y + 2.0, uProgress * 4.0);
        if (wipe < 0.5) discard;
        float edge = smoothstep(0.0, 0.02, vUv.x) * smoothstep(1.0, 0.98, vUv.x) *
                     smoothstep(0.0, 0.02, vUv.y) * smoothstep(1.0, 0.98, vUv.y);
        if (edge < 0.8) {
          gl_FragColor = vec4(vec3(0.06, 0.09, 0.16), 1.0);
        } else {
          gl_FragColor = vec4(finalColor, 1.0);
        }
      }
    `;

    const solidMaterial = new THREE.ShaderMaterial({
      vertexShader: gradientVertexShader,
      fragmentShader: gradientFragmentShader,
      side: THREE.DoubleSide,
      uniforms: { uProgress: { value: 0.0 } }
    });

    const innerMesh = new THREE.Mesh(geometry, solidMaterial);
    innerMesh.rotation.x = Math.PI / 2;
    group.add(innerMesh);

    const cylEdges = new THREE.EdgesGeometry(geometry);
    const cylWireframe = new THREE.LineSegments(cylEdges, new THREE.LineBasicMaterial({ color: 0x0F172A }));
    innerMesh.add(cylWireframe);

    const clock = new THREE.Clock();
    let logIndex = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      noiseMaterial.uniforms.uTime.value = time;
      currentProgress += (targetProgress - currentProgress) * 0.05;

      if (counterRef.current) {
        counterRef.current.innerText = String(Math.floor(currentProgress * 12.5));
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${currentProgress}%`;
      }
      solidMaterial.uniforms.uProgress.value = currentProgress / 100;

      const rotSpeed = 0.15 + (currentProgress / 100) * 0.8;
      group.rotation.y = time * rotSpeed;
      group.rotation.x = Math.sin(time * 0.1) * 0.1;
      renderer.render(scene, camera);
    };

    const simulateLoad = () => {
      const steps = [
        { target: 12, duration: 800 },
        { target: 35, duration: 1200 },
        { target: 58, duration: 1000 },
        { target: 82, duration: 1400 },
        { target: 100, duration: 800 }
      ];
      let delayAcc = 0;
      steps.forEach((step, i) => {
        setTimeout(() => {
          targetProgress = step.target;
          if (i < steps.length - 1 && logContainerRef.current) {
            logIndex++;
            logContainerRef.current.style.transition = 'scroll-top 0.6s';
            logContainerRef.current.scrollTop = logIndex * 1.4 * 16;
          }
        }, delayAcc);
        delayAcc += step.duration;
      });
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newAspect = width / height;
      camera.left = -d * newAspect;
      camera.right = d * newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      noiseMaterial.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();
    setTimeout(simulateLoad, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#F8FAFC', color: '#0F172A', overflow: 'hidden', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'default', fontFamily: "'DM Sans', sans-serif", position: 'relative' }}>

      <div className="grid-container">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="grid-cell"></div>
        ))}
      </div>

      <div id="canvas-container" ref={canvasContainerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}></div>

      <div className="ui-layer">
        <div className="top-left-meta">
          <span className="meta-text">Smart Validation</span>
          <span className="meta-text" style={{ marginTop: '0.5rem', opacity: 0.4, fontWeight: 400 }}>Verification in progress...</span>
        </div>

        <div className="top-right-meta">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <span className="meta-text" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', opacity: 1 }}>LeanPay</span>
            <div style={{ display: 'flex', gap: '12px', opacity: 0.6 }}>
              {[0, 1, 2].map((i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="center-content">
          <div style={{ position: 'absolute', top: '-8rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', maxWidth: '540px', width: '100%' }}>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem', color: '#0F172A', textShadow: '0px 0px 60px rgba(248, 250, 252, 0.95), 0px 0px 100px rgba(255, 255, 255, 0.7)' }}>
              Invoice intelligence meets compliance
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.55, color: '#0F172A', opacity: 0.85, textShadow: '0px 0px 40px rgba(248, 250, 252, 0.9), 0px 0px 60px rgba(255, 255, 255, 0.6)' }}>
              Automatically validate invoices, catch compliance issues, and streamline your payment process with AI-powered accuracy and trust.
            </p>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', color: '#0F172A', marginTop: '9rem' }}>
            <span className="counter-number" ref={counterRef} style={{ color: '#0F172A', textShadow: '0px 0px 40px rgba(248, 250, 252, 0.9), 0px 0px 80px rgba(248, 250, 252, 0.6)' }}>0</span>
          </div>
          <span className="counter-label">Invoices Processed</span>
        </div>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
          <Link
            href="/upload"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              padding: '0.9rem 2rem',
              background: '#0F172A',
              color: '#F8FAFC',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              pointerEvents: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              display: 'inline-block',
              textDecoration: 'none',
              transform: isHoveringButton ? 'scale(1.02)' : 'scale(1)',
              opacity: isHoveringButton ? 0.9 : 1
            }}
            onMouseOver={() => setIsHoveringButton(true)}
            onMouseOut={() => setIsHoveringButton(false)}
          >
            Start Processing
          </Link>
        </div>

        <div className="bottom-left-meta">
          <ul className="meta-text log-list" ref={logContainerRef}>
            <li>Risk Detection</li>
            <li>Data Normalization</li>
            <li>Merchant Matching</li>
            <li>Entity Resolution</li>
            <li>Actionable Insights</li>
          </ul>
        </div>

        <div className="bottom-right-meta">
          <div className="meta-text">
            Batch<br />
            <span style={{ fontSize: '1.25rem', color: '#0F172A', opacity: 1, fontWeight: 700 }}>01-A</span>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar" ref={progressBarRef}></div>
        </div>
      </div>
    </div>
  );
}
