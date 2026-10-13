/**
 * Portfolio Driving Experience
 * Interactive 3D miniature portfolio city powered by Three.js
 * Author: Amir Niazi Portfolio
 */
(function () {
  'use strict';

  // Wait for Three.js and DOM
  function checkReady() {
    if (typeof THREE === 'undefined') {
      setTimeout(checkReady, 50);
      return;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  const DESTINATIONS = [
    {
      id: 'linkedin',
      name: 'LinkedIn Profile',
      shortName: 'LinkedIn',
      tagline: 'Professional experience, client work & network',
      url: 'https://www.linkedin.com/in/amirniaziuiux',
      color: 0x0a66c2,
      colorHex: '#0a66c2',
      accentHex: '#38bdf8',
      pos: { x: -26, z: -22 },
      radius: 11,
      type: 'Corporate Tech Pavilion'
    },
    {
      id: 'github',
      name: 'GitHub Repository',
      shortName: 'GitHub',
      tagline: 'Source code, dev experiments & tools',
      url: 'https://github.com/AmirNiazi7',
      color: 0x8b5cf6,
      colorHex: '#8b5cf6',
      accentHex: '#a855f7',
      pos: { x: 26, z: -22 },
      radius: 11,
      type: 'Developer Code Lab'
    },
    {
      id: 'behance',
      name: 'Behance Portfolio',
      shortName: 'Behance',
      tagline: 'In-depth UI/UX case studies & design systems',
      url: 'https://www.behance.net/amirniazi5',
      color: 0x0057ff,
      colorHex: '#0057ff',
      accentHex: '#60a5fa',
      pos: { x: -26, z: 22 },
      radius: 11,
      type: 'Design Art Gallery'
    },
    {
      id: 'dribbble',
      name: 'Dribbble Shots',
      shortName: 'Dribbble',
      tagline: 'Visual explorations & mobile UI shots',
      url: 'https://dribbble.com/amirniazi',
      color: 0xea4c89,
      colorHex: '#ea4c89',
      accentHex: '#f43f5e',
      pos: { x: 26, z: 22 },
      radius: 11,
      type: 'Design Arena'
    }
  ];

  function createIconTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 256, 256);

    if (type === 'linkedin') {
      ctx.fillStyle = '#0a66c2';
      ctx.beginPath();
      ctx.roundRect(16, 16, 224, 224, 48);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 130px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('in', 128, 128);
    } else if (type === 'github') {
      ctx.fillStyle = '#161b22';
      ctx.beginPath();
      ctx.arc(128, 128, 112, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#8b5cf6';
      ctx.stroke();

      // GitHub Octocat shape silhouette
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(128, 120, 52, 0, Math.PI * 2);
      ctx.fill();
      // Ears
      ctx.beginPath();
      ctx.moveTo(96, 76);
      ctx.lineTo(82, 44);
      ctx.lineTo(112, 68);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(160, 76);
      ctx.lineTo(174, 44);
      ctx.lineTo(144, 68);
      ctx.fill();
      // Body
      ctx.beginPath();
      ctx.ellipse(128, 185, 46, 32, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'behance') {
      ctx.fillStyle = '#0057ff';
      ctx.beginPath();
      ctx.roundRect(16, 16, 224, 224, 48);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Bē', 128, 124);
    } else if (type === 'dribbble') {
      ctx.fillStyle = '#ea4c89';
      ctx.beginPath();
      ctx.arc(128, 128, 112, 0, Math.PI * 2);
      ctx.fill();

      // Basketball arcs
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(128, 128, 70, 0.4, 2.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(128, 128, 70, 3.5, 5.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(40, 128);
      ctx.lineTo(216, 128);
      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createGroundTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Dark cyber asphalt background
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle isometric road grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 1024);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Main crossroad avenues
    ctx.fillStyle = '#101626';
    // Horizontal main avenue
    ctx.fillRect(0, 432, 1024, 160);
    // Vertical main avenue
    ctx.fillRect(432, 0, 160, 1024);

    // Center Roundabout circle
    ctx.beginPath();
    ctx.arc(512, 512, 140, 0, Math.PI * 2);
    ctx.fillStyle = '#101626';
    ctx.fill();

    // Road dashed white centerlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 4;
    ctx.setLineDash([16, 20]);

    // Horizontal dashes
    ctx.beginPath();
    ctx.moveTo(0, 512); ctx.lineTo(370, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(654, 512); ctx.lineTo(1024, 512);
    ctx.stroke();

    // Vertical dashes
    ctx.beginPath();
    ctx.moveTo(512, 0); ctx.lineTo(512, 370);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(512, 654); ctx.lineTo(512, 1024);
    ctx.stroke();

    // Roundabout outer ring
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(512, 512, 138, 0, Math.PI * 2);
    ctx.stroke();

    // Inner island
    ctx.fillStyle = '#080b12';
    ctx.beginPath();
    ctx.arc(512, 512, 64, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  function createTextSprite(text, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 380;
    canvas.height = 84;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(10, 14, 24, 0.82)';
    ctx.strokeStyle = colorHex || 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(6, 6, 368, 72, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "JetBrains Mono", Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 190, 42);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(7.5, 1.65, 1);
    return sprite;
  }

  function init() {
    const container = document.getElementById('driveContainer');
    const canvasWrap = document.getElementById('driveCanvasWrap');
    const canvas = document.getElementById('driveCanvas');
    if (!container || !canvasWrap || !canvas) return;

    // HUD Elements
    const promptEl = document.getElementById('drivePrompt');
    const promptTitle = document.getElementById('promptTitle');
    const promptAction = document.getElementById('promptAction');
    const promptBadge = document.getElementById('promptBadge');
    const promptIcon = document.getElementById('promptIcon');
    const promptBtn = document.getElementById('promptBtn');
    const statusText = document.getElementById('driveStatusText');
    const resetBtn = document.getElementById('driveResetBtn');

    let width = canvasWrap.clientWidth || 800;
    let height = canvasWrap.clientHeight || 520;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b12);
    scene.fog = new THREE.FogExp2(0x080b12, 0.0095);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 400);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x232b3e, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xdbeafe, 1.25);
    dirLight.position.set(30, 60, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 160;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // 3. Ground & Road Surface
    const groundGeo = new THREE.PlaneGeometry(120, 120);
    const groundTex = createGroundTexture();
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      roughness: 0.88,
      metalness: 0.08
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Perimeter Cyber Curbs / Boundaries
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.4
    });
    const curbSize = 96;
    const curbThick = 1.2;
    const curbHeight = 0.6;

    // North curb
    const nCurb = new THREE.Mesh(new THREE.BoxGeometry(curbSize, curbHeight, curbThick), curbMat);
    nCurb.position.set(0, curbHeight / 2, -48);
    scene.add(nCurb);
    // South curb
    const sCurb = new THREE.Mesh(new THREE.BoxGeometry(curbSize, curbHeight, curbThick), curbMat);
    sCurb.position.set(0, curbHeight / 2, 48);
    scene.add(sCurb);
    // West curb
    const wCurb = new THREE.Mesh(new THREE.BoxGeometry(curbThick, curbHeight, curbSize), curbMat);
    wCurb.position.set(-48, curbHeight / 2, 0);
    scene.add(wCurb);
    // East curb
    const eCurb = new THREE.Mesh(new THREE.BoxGeometry(curbThick, curbHeight, curbSize), curbMat);
    eCurb.position.set(48, curbHeight / 2, 0);
    scene.add(eCurb);

    // Center Roundabout Obelisk / Monogram
    const centerGroup = new THREE.Group();
    const obeliskGeo = new THREE.CylinderGeometry(1.6, 2.2, 5, 8);
    const obeliskMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2
    });
    const obelisk = new THREE.Mesh(obeliskGeo, obeliskMat);
    obelisk.position.y = 2.5;
    obelisk.castShadow = true;
    centerGroup.add(obelisk);

    const beaconLight = new THREE.PointLight(0x38bdf8, 1.2, 28);
    beaconLight.position.y = 6;
    centerGroup.add(beaconLight);
    scene.add(centerGroup);

    // 4. Stations & Platforms
    const stationRings = [];
    const stationIcons = [];

    DESTINATIONS.forEach(dest => {
      const stationGroup = new THREE.Group();
      stationGroup.position.set(dest.pos.x, 0, dest.pos.z);

      // Concrete pad
      const padGeo = new THREE.CylinderGeometry(dest.radius, dest.radius + 0.6, 0.4, 32);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.8,
        metalness: 0.2
      });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.y = 0.2;
      pad.receiveShadow = true;
      stationGroup.add(pad);

      // Pulsing Neon Boundary Ring
      const ringGeo = new THREE.RingGeometry(dest.radius - 0.7, dest.radius, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dest.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.42;
      stationGroup.add(ring);
      stationRings.push({ mesh: ring, baseOpacity: 0.65, destId: dest.id });

      // Stylized Architecture
      if (dest.id === 'linkedin') {
        // High-rise tech pavilion
        const towerGeo = new THREE.BoxGeometry(6, 12, 6);
        const towerMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          emissive: 0x0284c7,
          emissiveIntensity: 0.25,
          roughness: 0.2,
          metalness: 0.8
        });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.y = 6;
        tower.castShadow = true;
        tower.receiveShadow = true;
        stationGroup.add(tower);

        // Glass tier
        const glassGeo = new THREE.BoxGeometry(4.8, 4, 4.8);
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.75,
          roughness: 0.1
        });
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.y = 13.5;
        stationGroup.add(glass);
      } else if (dest.id === 'github') {
        // Dev server bunker
        const bunkerGeo = new THREE.BoxGeometry(8, 6, 7);
        const bunkerMat = new THREE.MeshStandardMaterial({
          color: 0x161b22,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.2,
          roughness: 0.3,
          metalness: 0.7
        });
        const bunker = new THREE.Mesh(bunkerGeo, bunkerMat);
        bunker.position.y = 3;
        bunker.castShadow = true;
        bunker.receiveShadow = true;
        stationGroup.add(bunker);

        // Terminal screen roof
        const screenGeo = new THREE.BoxGeometry(6, 3, 5);
        const screenMat = new THREE.MeshStandardMaterial({
          color: 0x090d16,
          emissive: 0x22c55e,
          emissiveIntensity: 0.35,
          roughness: 0.2
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.y = 7;
        stationGroup.add(screen);
      } else if (dest.id === 'behance') {
        // Minimalist art gallery pavilion with pillars
        const baseGeo = new THREE.BoxGeometry(8, 1, 8);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
        const galleryBase = new THREE.Mesh(baseGeo, baseMat);
        galleryBase.position.y = 0.5;
        stationGroup.add(galleryBase);

        // 4 sleek pillars
        const pillarGeo = new THREE.CylinderGeometry(0.35, 0.35, 6, 12);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1 });
        const offsets = [[-3, -3], [3, -3], [-3, 3], [3, 3]];
        offsets.forEach(([px, pz]) => {
          const pillar = new THREE.Mesh(pillarGeo, pillarMat);
          pillar.position.set(px, 3.5, pz);
          pillar.castShadow = true;
          stationGroup.add(pillar);
        });

        // Floating cantilever roof
        const roofGeo = new THREE.BoxGeometry(8.5, 0.8, 8.5);
        const roofMat = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          emissive: 0x0057ff,
          emissiveIntensity: 0.35,
          roughness: 0.2
        });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 6.8;
        roof.castShadow = true;
        stationGroup.add(roof);
      } else if (dest.id === 'dribbble') {
        // Basketball Court & Arena Hoop
        const courtGeo = new THREE.BoxGeometry(9, 0.3, 7);
        const courtMat = new THREE.MeshStandardMaterial({
          color: 0x18181b,
          emissive: 0xea4c89,
          emissiveIntensity: 0.25,
          roughness: 0.4
        });
        const court = new THREE.Mesh(courtGeo, courtMat);
        court.position.y = 0.3;
        stationGroup.add(court);

        // Hoop pole
        const poleGeo = new THREE.CylinderGeometry(0.18, 0.18, 5.5, 10);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(0, 3, -3.2);
        pole.castShadow = true;
        stationGroup.add(pole);

        // Backboard
        const boardGeo = new THREE.BoxGeometry(3, 2, 0.2);
        const boardMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xea4c89,
          emissiveIntensity: 0.4
        });
        const board = new THREE.Mesh(boardGeo, boardMat);
        board.position.set(0, 5.5, -3.1);
        stationGroup.add(board);
      }

      // Station Point Light
      const pLight = new THREE.PointLight(dest.color, 1.4, 25);
      pLight.position.y = 6;
      stationGroup.add(pLight);

      // Hovering Rotating 3D Platform Emblem
      const iconTex = createIconTexture(dest.id);
      const iconGeo = new THREE.BoxGeometry(3.2, 3.2, 3.2);
      const iconMat = new THREE.MeshStandardMaterial({
        map: iconTex,
        roughness: 0.1,
        metalness: 0.5,
        emissive: dest.color,
        emissiveIntensity: 0.2
      });
      const iconMesh = new THREE.Mesh(iconGeo, iconMat);
      iconMesh.position.y = 11;
      iconMesh.castShadow = true;
      stationGroup.add(iconMesh);
      stationIcons.push({ mesh: iconMesh, destId: dest.id, baseY: 11 });

      // Overhead Text Billboard Sprite
      const sprite = createTextSprite(dest.shortName.toUpperCase(), dest.accentHex);
      sprite.position.set(0, 14.5, 0);
      stationGroup.add(sprite);

      scene.add(stationGroup);
    });

    // 5. Build 3D Car Model
    const carGroup = new THREE.Group();

    // Car Body / Chassis (Cyber low-poly sports car)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.25,
      metalness: 0.65
    });
    const bodyGeo = new THREE.BoxGeometry(2.4, 0.75, 4.4);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.55;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    carGroup.add(bodyMesh);

    // Front wedge hood
    const hoodGeo = new THREE.BoxGeometry(2.2, 0.4, 1.6);
    const hoodMesh = new THREE.Mesh(hoodGeo, bodyMat);
    hoodMesh.position.set(0, 0.45, -1.8);
    hoodMesh.castShadow = true;
    carGroup.add(hoodMesh);

    // Cockpit Roof
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.1,
      metalness: 0.9
    });
    const roofGeo = new THREE.BoxGeometry(1.85, 0.65, 2.2);
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.set(0, 1.15, -0.1);
    roofMesh.castShadow = true;
    carGroup.add(roofMesh);

    // Rear Spoiler
    const spoilerMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
    const spoilerWing = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 0.6), spoilerMat);
    spoilerWing.position.set(0, 1.25, 2.0);
    spoilerWing.castShadow = true;
    carGroup.add(spoilerWing);

    // Front Headlights (Lenses + Dynamic Spotlight Cones)
    const headLensMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2.0
    });
    const leftHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.1), headLensMat);
    leftHeadlight.position.set(-0.8, 0.52, -2.55);
    carGroup.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.1), headLensMat);
    rightHeadlight.position.set(0.8, 0.52, -2.55);
    carGroup.add(rightHeadlight);

    // Forward Spotlights (shines onto road ahead!)
    const leftSpot = new THREE.SpotLight(0xffffff, 2.2, 35, Math.PI / 6, 0.4, 1.2);
    leftSpot.position.set(-0.8, 0.55, -2.5);
    const leftTarget = new THREE.Object3D();
    leftTarget.position.set(-1.2, 0, -25);
    carGroup.add(leftTarget);
    leftSpot.target = leftTarget;
    carGroup.add(leftSpot);

    const rightSpot = new THREE.SpotLight(0xffffff, 2.2, 35, Math.PI / 6, 0.4, 1.2);
    rightSpot.position.set(0.8, 0.55, -2.5);
    const rightTarget = new THREE.Object3D();
    rightTarget.position.set(1.2, 0, -25);
    carGroup.add(rightTarget);
    rightSpot.target = rightTarget;
    carGroup.add(rightSpot);

    // Taillights (Red lenses + Brake Points)
    const tailLensMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 1.2
    });
    const leftTail = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.18, 0.1), tailLensMat);
    leftTail.position.set(-0.85, 0.65, 2.22);
    carGroup.add(leftTail);

    const rightTail = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.18, 0.1), tailLensMat);
    rightTail.position.set(0.85, 0.65, 2.22);
    carGroup.add(rightTail);

    const brakePoint = new THREE.PointLight(0xef4444, 0.8, 10);
    brakePoint.position.set(0, 0.65, 2.8);
    carGroup.add(brakePoint);

    // 4 Wheels (with steerable front wheels)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
    const wheelGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.35, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    const frontLeftGroup = new THREE.Group();
    frontLeftGroup.position.set(-1.25, 0.44, -1.35);
    const flWheel = new THREE.Mesh(wheelGeo, wheelMat);
    flWheel.castShadow = true;
    frontLeftGroup.add(flWheel);
    carGroup.add(frontLeftGroup);

    const frontRightGroup = new THREE.Group();
    frontRightGroup.position.set(1.25, 0.44, -1.35);
    const frWheel = new THREE.Mesh(wheelGeo, wheelMat);
    frWheel.castShadow = true;
    frontRightGroup.add(frWheel);
    carGroup.add(frontRightGroup);

    const rlWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rlWheel.position.set(-1.25, 0.44, 1.35);
    rlWheel.castShadow = true;
    carGroup.add(rlWheel);

    const rrWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rrWheel.position.set(1.25, 0.44, 1.35);
    rrWheel.castShadow = true;
    carGroup.add(rrWheel);

    // Soft Shadow disc under car
    const shadowGeo = new THREE.PlaneGeometry(3.6, 5.4);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 64; shadowCanvas.height = 64;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 10, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.05;
    carGroup.add(shadowMesh);

    scene.add(carGroup);

    // 6. Driving State & Vehicle Physics
    const physics = {
      x: 0,
      z: 14, // Spawn south of roundabout facing north
      speed: 0,
      maxSpeed: 0.96,
      maxReverseSpeed: -0.42,
      accel: 0.032,
      brake: 0.055,
      friction: 0.962,
      angle: 0, // facing north (-z)
      steerAngle: 0,
      maxSteerAngle: 0.046,
      steerSpeed: 0.006,
      steerReturn: 0.012
    };

    const keys = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };

    let activeDest = null;
    let isDrivingActive = false;
    let animId = 0;
    let isVisible = true;

    function resetCar() {
      physics.x = 0;
      physics.z = 14;
      physics.speed = 0;
      physics.angle = 0;
      physics.steerAngle = 0;
      carGroup.position.set(0, 0, 14);
      carGroup.rotation.set(0, 0, 0);
      hidePrompt();
    }

    function showPrompt(dest) {
      if (activeDest === dest) return;
      activeDest = dest;

      promptTitle.textContent = dest.name;
      promptBadge.textContent = dest.type;
      promptAction.innerHTML = 'Press <kbd>ENTER</kbd> or click to visit &nearr;';
      promptEl.style.borderColor = dest.accentHex;
      promptBtn.style.backgroundColor = dest.colorHex;

      promptIcon.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${dest.accentHex};box-shadow:0 0 10px ${dest.accentHex};margin-right:4px;"></span>`;
      promptEl.classList.add('is-active');
    }

    function hidePrompt() {
      if (!activeDest) return;
      activeDest = null;
      promptEl.classList.remove('is-active');
    }

    function openActiveDestination() {
      if (!activeDest) return;
      window.open(activeDest.url, '_blank', 'noopener,noreferrer');
      promptAction.innerHTML = '<strong>Opening ' + activeDest.shortName + '...</strong>';
      setTimeout(() => {
        if (activeDest) {
          promptAction.innerHTML = 'Press <kbd>ENTER</kbd> or click to visit &nearr;';
        }
      }, 1800);
    }

    // 7. Input Event Listeners
    function onKeyDown(e) {
      // If pressing 'R', reset car anywhere in container or window if focused
      if (e.key === 'r' || e.key === 'R') {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          resetCar();
          return;
        }
      }

      // If active destination and press Enter
      if (e.key === 'Enter') {
        if (activeDest && (isDrivingActive || document.activeElement === container)) {
          e.preventDefault();
          openActiveDestination();
          return;
        }
      }

      // Check arrow / WASD driving keys
      const isDriveKey = (
        e.key === 'ArrowUp' || e.key === 'KeyW' || e.key === 'w' || e.key === 'W' ||
        e.key === 'ArrowDown' || e.key === 'KeyS' || e.key === 's' || e.key === 'S' ||
        e.key === 'ArrowLeft' || e.key === 'KeyA' || e.key === 'a' || e.key === 'A' ||
        e.key === 'ArrowRight' || e.key === 'KeyD' || e.key === 'd' || e.key === 'D'
      );

      if (isDriveKey) {
        // Prevent window scrolling only when driving is active or container focused
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
        }

        if (e.key === 'ArrowUp' || e.key === 'KeyW' || e.key === 'w' || e.key === 'W') {
          keys.forward = true;
        }
        if (e.key === 'ArrowDown' || e.key === 'KeyS' || e.key === 's' || e.key === 'S') {
          keys.backward = true;
        }
        if (e.key === 'ArrowLeft' || e.key === 'KeyA' || e.key === 'a' || e.key === 'A') {
          keys.left = true;
        }
        if (e.key === 'ArrowRight' || e.key === 'KeyD' || e.key === 'd' || e.key === 'D') {
          keys.right = true;
        }
      }
    }

    function onKeyUp(e) {
      if (e.key === 'ArrowUp' || e.key === 'KeyW' || e.key === 'w' || e.key === 'W') {
        keys.forward = false;
      }
      if (e.key === 'ArrowDown' || e.key === 'KeyS' || e.key === 's' || e.key === 'S') {
        keys.backward = false;
      }
      if (e.key === 'ArrowLeft' || e.key === 'KeyA' || e.key === 'a' || e.key === 'A') {
        keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'KeyD' || e.key === 'd' || e.key === 'D') {
        keys.right = false;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Focus / Active Drive handling
    container.addEventListener('focus', () => {
      isDrivingActive = true;
      container.classList.add('is-driving');
      statusText.textContent = 'Drive Mode Active — Use Keys';
    });

    container.addEventListener('blur', () => {
      isDrivingActive = false;
      container.classList.remove('is-driving');
      statusText.textContent = 'Click inside to drive';
      keys.forward = false;
      keys.backward = false;
      keys.left = false;
      keys.right = false;
    });

    container.addEventListener('pointerdown', () => {
      container.focus();
    });

    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetCar();
      container.focus();
    });

    promptBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openActiveDestination();
    });

    promptEl.addEventListener('click', () => {
      openActiveDestination();
    });

    // Touch Virtual D-pad
    function setupTouchButton(id, keyProp) {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDrivingActive = true;
        keys[keyProp] = true;
        btn.classList.add('is-pressed');
      });
      const endFn = (e) => {
        e.preventDefault();
        keys[keyProp] = false;
        btn.classList.remove('is-pressed');
      };
      btn.addEventListener('pointerup', endFn);
      btn.addEventListener('pointercancel', endFn);
      btn.addEventListener('pointerleave', endFn);
    }

    setupTouchButton('btnUp', 'forward');
    setupTouchButton('btnDown', 'backward');
    setupTouchButton('btnLeft', 'left');
    setupTouchButton('btnRight', 'right');

    const btnAction = document.getElementById('btnAction');
    if (btnAction) {
      btnAction.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (activeDest) {
          openActiveDestination();
        } else {
          btnAction.classList.add('is-disabled');
          setTimeout(() => btnAction.classList.remove('is-disabled'), 500);
        }
      });
    }

    // 8. Animation & Physics Loop
    let clock = new THREE.Clock();

    function update() {
      // 1. Acceleration / Braking
      if (keys.forward) {
        physics.speed = Math.min(physics.maxSpeed, physics.speed + physics.accel);
      } else if (keys.backward) {
        if (physics.speed > 0.05) {
          physics.speed = Math.max(0, physics.speed - physics.brake);
        } else {
          physics.speed = Math.max(physics.maxReverseSpeed, physics.speed - physics.accel * 0.7);
        }
      } else {
        physics.speed *= physics.friction;
        if (Math.abs(physics.speed) < 0.001) physics.speed = 0;
      }

      // Brake light intensification
      const isBraking = keys.backward && physics.speed > 0.02;
      tailLensMat.emissiveIntensity = isBraking ? 3.0 : 1.2;
      brakePoint.intensity = isBraking ? 2.5 : 0.8;

      // 2. Steering
      if (keys.left) {
        physics.steerAngle = Math.min(physics.maxSteerAngle, physics.steerAngle + physics.steerSpeed);
      } else if (keys.right) {
        physics.steerAngle = Math.max(-physics.maxSteerAngle, physics.steerAngle - physics.steerSpeed);
      } else {
        physics.steerAngle *= 0.82;
        if (Math.abs(physics.steerAngle) < 0.0005) physics.steerAngle = 0;
      }

      // 3. Turning & Position
      if (Math.abs(physics.speed) > 0.005) {
        const turnFactor = physics.speed > 0 ? 1 : -1;
        physics.angle += physics.steerAngle * turnFactor * (Math.abs(physics.speed) / physics.maxSpeed) * 1.35;
      }

      physics.x -= Math.sin(physics.angle) * physics.speed;
      physics.z -= Math.cos(physics.angle) * physics.speed;

      // 4. Soft Boundary Collision
      const bound = 44;
      if (physics.x < -bound) { physics.x = -bound; physics.speed = -physics.speed * 0.35; }
      if (physics.x > bound) { physics.x = bound; physics.speed = -physics.speed * 0.35; }
      if (physics.z < -bound) { physics.z = -bound; physics.speed = -physics.speed * 0.35; }
      if (physics.z > bound) { physics.z = bound; physics.speed = -physics.speed * 0.35; }

      // 5. Update Car Model
      carGroup.position.set(physics.x, 0, physics.z);
      carGroup.rotation.y = physics.angle;

      // Chassis roll into turn
      const roll = -physics.steerAngle * (physics.speed / physics.maxSpeed) * 0.38;
      carGroup.rotation.z = roll;

      // Wheel turn & roll
      frontLeftGroup.rotation.y = physics.steerAngle * 6.5;
      frontRightGroup.rotation.y = physics.steerAngle * 6.5;

      const rollDist = physics.speed * 1.6;
      flWheel.rotation.x += rollDist;
      frWheel.rotation.x += rollDist;
      rlWheel.rotation.x += rollDist;
      rrWheel.rotation.x += rollDist;

      // 6. Camera Smooth Chase
      const camTargetX = physics.x;
      const camTargetY = 32;
      const camTargetZ = physics.z + 36;

      camera.position.x += (camTargetX - camera.position.x) * 0.085;
      camera.position.y += (camTargetY - camera.position.y) * 0.085;
      camera.position.z += (camTargetZ - camera.position.z) * 0.085;
      camera.lookAt(physics.x, 1.2, physics.z);

      // 7. Rotating Destination Icons & Proximity Check
      const time = clock.getElapsedTime();
      stationIcons.forEach(item => {
        item.mesh.rotation.y = time * 0.8;
        item.mesh.position.y = item.baseY + Math.sin(time * 2 + item.baseY) * 0.4;
      });

      // Destination Proximity Detection
      let foundDest = null;
      DESTINATIONS.forEach(dest => {
        const dist = Math.hypot(physics.x - dest.pos.x, physics.z - dest.pos.z);
        if (dist <= dest.radius) {
          foundDest = dest;
        }
      });

      // Animate Beacon Rings
      stationRings.forEach(ring => {
        if (foundDest && ring.destId === foundDest.id) {
          ring.mesh.material.opacity = 0.85 + Math.sin(time * 6) * 0.15;
          const s = 1.0 + Math.sin(time * 5) * 0.04;
          ring.mesh.scale.set(s, s, 1);
        } else {
          ring.mesh.material.opacity = ring.baseOpacity + Math.sin(time * 2) * 0.15;
          ring.mesh.scale.set(1, 1, 1);
        }
      });

      if (foundDest) {
        showPrompt(foundDest);
      } else {
        hidePrompt();
      }
    }

    function render() {
      if (!isVisible) return;
      update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    }

    // 9. Resize Handling & Intersection Observer
    function onResize() {
      width = canvasWrap.clientWidth || 800;
      height = canvasWrap.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);

    const resizeObs = new ResizeObserver(() => {
      onResize();
    });
    resizeObs.observe(canvasWrap);

    // Pause rendering when scrolled out of view to save GPU / CPU
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animId = requestAnimationFrame(render);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      }, { threshold: 0.05 });
      io.observe(container);
    }

    // Kickoff
    resetCar();
    render();
  }

  checkReady();
})();
