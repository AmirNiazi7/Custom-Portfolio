/**
 * Portfolio Driving Experience
 * Interactive 3D miniature portfolio city powered by Three.js
 * Featuring:
 *  - 3 Authentic Bugatti Hypercars: Bugatti Chiron, Bugatti Bolide, Bugatti Divo
 *  - High-Octane Drift Mode with Momentum Physics & Power-Sliding
 *  - Real-time 3D Tire Smoke Particle System & Asphalt Skid Marks
 *  - Dynamic Drift Combo HUD & Variant Selector
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

  // 3 Bugatti Variants Configuration
  const CAR_VARIANTS = [
    {
      id: 'chiron',
      name: 'Chiron',
      fullName: 'Bugatti Chiron Super Sport',
      tagline: 'W16 Quad-Turbo • 1600 HP Grand Tourer',
      accentHex: '#0055ff',
      badgeColor: '#0047bb',
      maxSpeed: 1.04,
      maxReverseSpeed: -0.42,
      accel: 0.035,
      brake: 0.065,
      friction: 0.965,
      steerSpeed: 0.0068,
      maxSteerAngle: 0.048,
      driftMultiplier: 1.0,
      handlingLabel: 'Balanced Grand Tourer'
    },
    {
      id: 'bolide',
      name: 'Bolide',
      fullName: 'Bugatti Bolide Track Hypercar',
      tagline: 'Lightweight Track Monster • 1850 HP',
      accentHex: '#06b6d4',
      badgeColor: '#0891b2',
      maxSpeed: 1.16,
      maxReverseSpeed: -0.45,
      accel: 0.042,
      brake: 0.075,
      friction: 0.968,
      steerSpeed: 0.0078,
      maxSteerAngle: 0.052,
      driftMultiplier: 1.25,
      handlingLabel: 'Aggressive Track Oversteer'
    },
    {
      id: 'divo',
      name: 'Divo',
      fullName: 'Bugatti Divo Corner Carver',
      tagline: 'Aero Lateral-G Master • 1500 HP',
      accentHex: '#10b981',
      badgeColor: '#059669',
      maxSpeed: 1.00,
      maxReverseSpeed: -0.40,
      accel: 0.038,
      brake: 0.070,
      friction: 0.962,
      steerSpeed: 0.0074,
      maxSteerAngle: 0.050,
      driftMultiplier: 1.15,
      handlingLabel: 'High Lateral Grip & Heavy Smoke'
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

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(128, 120, 52, 0, Math.PI * 2);
      ctx.fill();
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
    ctx.fillRect(0, 432, 1024, 160);
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

    ctx.beginPath();
    ctx.moveTo(0, 512); ctx.lineTo(370, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(654, 512); ctx.lineTo(1024, 512);
    ctx.stroke();

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

  // Radial soft puff texture for drift smoke particles
  function createSmokeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(240, 246, 255, 0.85)');
    grad.addColorStop(0.25, 'rgba(200, 215, 235, 0.55)');
    grad.addColorStop(0.65, 'rgba(140, 160, 190, 0.2)');
    grad.addColorStop(1, 'rgba(100, 120, 150, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
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

    // New Drift & Car Selector HUD Elements
    const driftToggleBtn = document.getElementById('driveDriftToggleBtn');
    const driftMeter = document.getElementById('driveDriftMeter');
    const driftScoreVal = document.getElementById('driftScoreVal');
    const carTabBtns = [
      document.getElementById('carTab0'),
      document.getElementById('carTab1'),
      document.getElementById('carTab2')
    ];

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

    const nCurb = new THREE.Mesh(new THREE.BoxGeometry(curbSize, curbHeight, curbThick), curbMat);
    nCurb.position.set(0, curbHeight / 2, -48);
    scene.add(nCurb);

    const sCurb = new THREE.Mesh(new THREE.BoxGeometry(curbSize, curbHeight, curbThick), curbMat);
    sCurb.position.set(0, curbHeight / 2, 48);
    scene.add(sCurb);

    const wCurb = new THREE.Mesh(new THREE.BoxGeometry(curbThick, curbHeight, curbSize), curbMat);
    wCurb.position.set(-48, curbHeight / 2, 0);
    scene.add(wCurb);

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

      if (dest.id === 'linkedin') {
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
        const baseGeo = new THREE.BoxGeometry(8, 1, 8);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
        const galleryBase = new THREE.Mesh(baseGeo, baseMat);
        galleryBase.position.y = 0.5;
        stationGroup.add(galleryBase);

        const pillarGeo = new THREE.CylinderGeometry(0.35, 0.35, 6, 12);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1 });
        const offsets = [[-3, -3], [3, -3], [-3, 3], [3, 3]];
        offsets.forEach(([px, pz]) => {
          const pillar = new THREE.Mesh(pillarGeo, pillarMat);
          pillar.position.set(px, 3.5, pz);
          pillar.castShadow = true;
          stationGroup.add(pillar);
        });

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

        const poleGeo = new THREE.CylinderGeometry(0.18, 0.18, 5.5, 10);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(0, 3, -3.2);
        pole.castShadow = true;
        stationGroup.add(pole);

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

      const pLight = new THREE.PointLight(dest.color, 1.4, 25);
      pLight.position.y = 6;
      stationGroup.add(pLight);

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

      const sprite = createTextSprite(dest.shortName.toUpperCase(), dest.accentHex);
      sprite.position.set(0, 14.5, 0);
      stationGroup.add(sprite);

      scene.add(stationGroup);
    });

    // 5. Tire Skid Marks Pool System
    const MAX_SKID_MARKS = 120;
    const skidMarks = [];
    let skidIndex = 0;
    const skidGroup = new THREE.Group();
    scene.add(skidGroup);

    const skidGeo = new THREE.PlaneGeometry(0.38, 0.95);
    const skidBaseMat = new THREE.MeshBasicMaterial({
      color: 0x070b14,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });

    for (let i = 0; i < MAX_SKID_MARKS; i++) {
      const mesh = new THREE.Mesh(skidGeo, skidBaseMat.clone());
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      skidGroup.add(mesh);
      skidMarks.push({ mesh, life: 0, maxLife: 280 });
    }

    function addSkidMark(x, z, angle, opacity) {
      const mark = skidMarks[skidIndex];
      skidIndex = (skidIndex + 1) % MAX_SKID_MARKS;
      mark.mesh.position.set(x, 0.025, z);
      mark.mesh.rotation.z = angle;
      mark.mesh.material.opacity = Math.min(0.55, opacity);
      mark.mesh.visible = true;
      mark.life = mark.maxLife;
    }

    function updateSkidMarks() {
      for (let i = 0; i < MAX_SKID_MARKS; i++) {
        const mark = skidMarks[i];
        if (mark.life > 0) {
          mark.life--;
          if (mark.life < 70) {
            mark.mesh.material.opacity *= 0.96;
          }
          if (mark.life <= 0) {
            mark.mesh.visible = false;
          }
        }
      }
    }

    // 6. 3D Tire Smoke Particle Pool System
    const MAX_SMOKE = 65;
    const smokeParticles = [];
    let smokeIndex = 0;
    const smokeGroup = new THREE.Group();
    scene.add(smokeGroup);

    const smokeTex = createSmokeTexture();
    const smokeGeo = new THREE.PlaneGeometry(0.85, 0.85);

    for (let i = 0; i < MAX_SMOKE; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: smokeTex,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(smokeGeo, mat);
      mesh.visible = false;
      smokeGroup.add(mesh);
      smokeParticles.push({
        mesh,
        vx: 0,
        vy: 0,
        vz: 0,
        rotSpeed: 0,
        baseScale: 0.5,
        maxScale: 2.4,
        life: 0,
        maxLife: 35
      });
    }

    function emitTireSmoke(x, y, z, intensity) {
      const p = smokeParticles[smokeIndex];
      smokeIndex = (smokeIndex + 1) % MAX_SMOKE;
      p.mesh.position.set(x + (Math.random() - 0.5) * 0.25, y + 0.1, z + (Math.random() - 0.5) * 0.25);
      p.mesh.rotation.z = Math.random() * Math.PI * 2;
      p.rotSpeed = (Math.random() - 0.5) * 0.07;
      p.vx = (Math.random() - 0.5) * 0.04;
      p.vy = 0.022 + Math.random() * 0.035;
      p.vz = (Math.random() - 0.5) * 0.04;
      p.baseScale = 0.45 + Math.random() * 0.2;
      p.maxScale = 1.6 + intensity * 1.3;
      p.life = 30 + Math.floor(Math.random() * 20);
      p.maxLife = p.life;
      p.mesh.material.opacity = Math.min(0.7, 0.3 + intensity * 0.4);
      p.mesh.scale.set(p.baseScale, p.baseScale, 1);
      p.mesh.visible = true;
    }

    function updateTireSmoke(cameraQuat) {
      for (let i = 0; i < MAX_SMOKE; i++) {
        const p = smokeParticles[i];
        if (p.life > 0) {
          p.life--;
          const prog = 1 - (p.life / p.maxLife);
          p.mesh.position.x += p.vx;
          p.mesh.position.y += p.vy;
          p.mesh.position.z += p.vz;
          p.mesh.rotation.z += p.rotSpeed;
          const currentScale = p.baseScale + (p.maxScale - p.baseScale) * prog;
          p.mesh.scale.set(currentScale, currentScale, 1);
          p.mesh.quaternion.copy(cameraQuat);
          p.mesh.material.opacity = (1 - prog) * 0.65;
          if (p.life <= 0) {
            p.mesh.visible = false;
          }
        }
      }
    }

    // 7. Build 3 Authentic Bugatti 3D Models
    const carGroup = new THREE.Group();

    // Reusable Materials
    const carbonBlackMat = new THREE.MeshStandardMaterial({ color: 0x0b0f17, metalness: 0.85, roughness: 0.25 });
    const darkChromeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.1 });
    const silverChromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.08 });
    const glassTintMat = new THREE.MeshStandardMaterial({
      color: 0x050811,
      metalness: 0.92,
      roughness: 0.08,
      transparent: true,
      opacity: 0.82
    });

    // Variant Taillight Materials (for braking & drift intensity)
    const chironTailMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 2.2 });
    const bolideTailMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 3.0 });
    const divoTailMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 2.6 });

    // Variant Headlight Lenses
    const quadLensMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2.5 });
    const xHeadlightMat = new THREE.MeshStandardMaterial({ color: 0x67e8f9, emissive: 0x67e8f9, emissiveIntensity: 3.2 });
    const bladeLensMat = new THREE.MeshStandardMaterial({ color: 0xa5f3fc, emissive: 0xa5f3fc, emissiveIntensity: 2.8 });

    // === Model 1: Bugatti Chiron Super Sport ===
    const chironGroup = new THREE.Group();
    {
      const chironBlueMat = new THREE.MeshStandardMaterial({ color: 0x0047bb, metalness: 0.82, roughness: 0.16 });

      // Front blue body tub
      const frontBody = new THREE.Mesh(new THREE.BoxGeometry(2.36, 0.44, 2.3), chironBlueMat);
      frontBody.position.set(0, 0.46, -0.95);
      frontBody.castShadow = true;
      frontBody.receiveShadow = true;
      chironGroup.add(frontBody);

      // Sloped front hood
      const hood = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.32, 1.45), chironBlueMat);
      hood.position.set(0, 0.55, -1.82);
      hood.castShadow = true;
      chironGroup.add(hood);

      // Rear Nocturne Deep Carbon Body
      const rearBody = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.68, 2.05), carbonBlackMat);
      rearBody.position.set(0, 0.62, 1.15);
      rearBody.castShadow = true;
      rearBody.receiveShadow = true;
      chironGroup.add(rearBody);

      // The Iconic Bugatti "C-Line" Side Arches
      const cCurveGeo = new THREE.BoxGeometry(0.12, 0.88, 2.6);
      const leftC = new THREE.Mesh(cCurveGeo, silverChromeMat);
      leftC.position.set(-1.22, 0.88, 0.05);
      chironGroup.add(leftC);

      const rightC = new THREE.Mesh(cCurveGeo, silverChromeMat);
      rightC.position.set(1.22, 0.88, 0.05);
      chironGroup.add(rightC);

      // Signature Horseshoe Grille
      const horseshoeRim = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.55, 0.14), silverChromeMat);
      horseshoeRim.position.set(0, 0.48, -2.62);
      chironGroup.add(horseshoeRim);

      const grilleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.44, 0.16), carbonBlackMat);
      grilleMesh.position.set(0, 0.48, -2.63);
      chironGroup.add(grilleMesh);

      // Red Bugatti Oval Emblem
      const emblem = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.12, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xdc2626, emissiveIntensity: 0.6 })
      );
      emblem.position.set(0, 0.72, -2.66);
      chironGroup.add(emblem);

      // Cockpit Curved Glass & Dorsal Spine
      const glass = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.58, 2.05), glassTintMat);
      glass.position.set(0, 1.12, -0.05);
      glass.castShadow = true;
      chironGroup.add(glass);

      const roofSpine = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 2.1), silverChromeMat);
      roofSpine.position.set(0, 1.42, -0.05);
      chironGroup.add(roofSpine);

      // Quad horizontal LED Ice-Cube Headlights (4 per side)
      for (let i = 0; i < 4; i++) {
        const xOffset = 0.58 + i * 0.14;
        const leftCube = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.08), quadLensMat);
        leftCube.position.set(-xOffset, 0.52, -2.56);
        chironGroup.add(leftCube);

        const rightCube = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.08), quadLensMat);
        rightCube.position.set(xOffset, 0.52, -2.56);
        chironGroup.add(rightCube);
      }

      // Continuous Full-Width LED Light Bar Taillight
      const tailBar = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.09, 0.1), chironTailMat);
      tailBar.position.set(0, 0.66, 2.22);
      chironGroup.add(tailBar);

      // Active Rear Spoiler Wing
      const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.12, 0.56), carbonBlackMat);
      spoiler.position.set(0, 1.2, 1.95);
      spoiler.castShadow = true;
      chironGroup.add(spoiler);

      // Dual Center Oval Exhausts
      const exhausts = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.18, 0.22), darkChromeMat);
      exhausts.position.set(0, 0.34, 2.22);
      chironGroup.add(exhausts);
    }
    carGroup.add(chironGroup);

    // === Model 2: Bugatti Bolide Track Hypercar ===
    const bolideGroup = new THREE.Group();
    bolideGroup.visible = false;
    {
      const bolideCarbon = new THREE.MeshStandardMaterial({ color: 0x090d14, metalness: 0.9, roughness: 0.2 });
      const bolideBlue = new THREE.MeshStandardMaterial({ color: 0x0055ff, emissive: 0x0033aa, emissiveIntensity: 0.35, metalness: 0.7 });
      const bolideYellow = new THREE.MeshStandardMaterial({ color: 0xeab308, emissive: 0xca8a04, emissiveIntensity: 0.3, metalness: 0.5 });

      // Ultra-low track chassis
      const trackBody = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.52, 4.45), bolideCarbon);
      trackBody.position.set(0, 0.48, 0);
      trackBody.castShadow = true;
      trackBody.receiveShadow = true;
      bolideGroup.add(trackBody);

      // Front bonnet deep air extractors
      const extractor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 1.2), bolideBlue);
      extractor.position.set(0, 0.58, -1.75);
      bolideGroup.add(extractor);

      // Track front splitter with yellow aero endplates
      const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.9), carbonBlackMat);
      splitter.position.set(0, 0.18, -2.4);
      bolideGroup.add(splitter);

      const splitLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.6), bolideYellow);
      splitLeft.position.set(-1.28, 0.25, -2.35);
      bolideGroup.add(splitLeft);

      const splitRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.6), bolideYellow);
      splitRight.position.set(1.28, 0.25, -2.35);
      bolideGroup.add(splitRight);

      // Cockpit canopy
      const cockpit = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.58, 2.0), glassTintMat);
      cockpit.position.set(0, 1.08, -0.15);
      bolideGroup.add(cockpit);

      // Massive Dorsal Aerodynamic Shark Fin
      const sharkFin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.92, 2.6), bolideCarbon);
      sharkFin.position.set(0, 1.42, 0.85);
      sharkFin.castShadow = true;
      bolideGroup.add(sharkFin);

      const finTrim = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 2.62), bolideBlue);
      finTrim.position.set(0, 1.88, 0.85);
      bolideGroup.add(finTrim);

      // Iconic "X" Headlights (Two crossing LED bars per side)
      function makeXHeadlight(xPos) {
        const xGrp = new THREE.Group();
        xGrp.position.set(xPos, 0.5, -2.52);
        const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.09, 0.06), xHeadlightMat);
        bar1.rotation.z = Math.PI / 4;
        xGrp.add(bar1);
        const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.09, 0.06), xHeadlightMat);
        bar2.rotation.z = -Math.PI / 4;
        xGrp.add(bar2);
        return xGrp;
      }
      bolideGroup.add(makeXHeadlight(-0.86));
      bolideGroup.add(makeXHeadlight(0.86));

      // Giant Elevated GT Rear Wing
      const gtWing = new THREE.Mesh(new THREE.BoxGeometry(2.62, 0.12, 0.72), bolideCarbon);
      gtWing.position.set(0, 1.5, 2.08);
      gtWing.castShadow = true;
      bolideGroup.add(gtWing);

      // Dual wing endplates with Cyber Yellow accents
      const leftEndplate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.44, 0.8), bolideYellow);
      leftEndplate.position.set(-1.34, 1.5, 2.08);
      bolideGroup.add(leftEndplate);

      const rightEndplate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.44, 0.8), bolideYellow);
      rightEndplate.position.set(1.34, 1.5, 2.08);
      bolideGroup.add(rightEndplate);

      // Signature "X" Taillights across rear
      const xTailBar1 = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.1, 0.08), bolideTailMat);
      xTailBar1.position.set(0, 0.65, 2.26);
      xTailBar1.rotation.z = 0.22;
      bolideGroup.add(xTailBar1);

      const xTailBar2 = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.1, 0.08), bolideTailMat);
      xTailBar2.position.set(0, 0.65, 2.26);
      xTailBar2.rotation.z = -0.22;
      bolideGroup.add(xTailBar2);

      // Quad Rocket Cannon Exhaust Cluster (2x2 square in center)
      const quadPipes = [
        [-0.14, 0.58], [0.14, 0.58],
        [-0.14, 0.74], [0.14, 0.74]
      ];
      quadPipes.forEach(([qx, qy]) => {
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.24, 12), silverChromeMat);
        pipe.rotation.x = Math.PI / 2;
        pipe.position.set(qx, qy, 2.28);
        bolideGroup.add(pipe);
      });
    }
    carGroup.add(bolideGroup);

    // === Model 3: Bugatti Divo Corner Carver ===
    const divoGroup = new THREE.Group();
    divoGroup.visible = false;
    {
      const divoGrey = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.78, roughness: 0.28 });
      const divoCyan = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.45, metalness: 0.65 });

      // Sculpted Titanium Body
      const divoBody = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.58, 4.4), divoGrey);
      divoBody.position.set(0, 0.52, 0);
      divoBody.castShadow = true;
      divoBody.receiveShadow = true;
      divoGroup.add(divoBody);

      // Turquoise Side Skirts with Aero Fins
      const leftSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 3.4), divoCyan);
      leftSkirt.position.set(-1.26, 0.24, 0);
      divoGroup.add(leftSkirt);

      const rightSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 3.4), divoCyan);
      rightSkirt.position.set(1.26, 0.24, 0);
      divoGroup.add(rightSkirt);

      // Wide Horseshoe Grille with Turquoise Border
      const divoHorseshoe = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.54, 0.16), divoCyan);
      divoHorseshoe.position.set(0, 0.44, -2.6);
      divoGroup.add(divoHorseshoe);

      const divoGrilleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.42, 0.18), carbonBlackMat);
      divoGrilleMesh.position.set(0, 0.44, -2.61);
      divoGroup.add(divoGrilleMesh);

      // Bonnet Dual NACA Cooling Ducts
      const nacaL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.6), divoCyan);
      nacaL.position.set(-0.55, 0.66, -1.7);
      divoGroup.add(nacaL);

      const nacaR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.6), divoCyan);
      nacaR.position.set(0.55, 0.66, -1.7);
      divoGroup.add(nacaR);

      // Roof Air Scoop Channel
      const roofScoop = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.32, 1.1), divoGrey);
      roofScoop.position.set(0, 1.35, 0.28);
      divoGroup.add(roofScoop);

      const scoopMouth = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.1), divoCyan);
      scoopMouth.position.set(0, 1.35, -0.28);
      divoGroup.add(scoopMouth);

      // Curved Blade LED Headlights
      const bladeL = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.08), bladeLensMat);
      bladeL.position.set(-0.88, 0.54, -2.54);
      divoGroup.add(bladeL);

      const bladeR = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.08), bladeLensMat);
      bladeR.position.set(0.88, 0.54, -2.54);
      divoGroup.add(bladeR);

      // 3D Digital Finned Taillight Array (5 vertical OLED fins per side)
      for (let i = 0; i < 5; i++) {
        const fx = 0.52 + i * 0.14;
        const finL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.12), divoTailMat);
        finL.position.set(-fx, 0.68, 2.24);
        divoGroup.add(finL);

        const finR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.12), divoTailMat);
        finR.position.set(fx, 0.68, 2.24);
        divoGroup.add(finR);
      }

      // Fixed Curved High-Downforce Rear Wing with Turquoise Underside
      const divoWing = new THREE.Mesh(new THREE.BoxGeometry(2.48, 0.12, 0.64), carbonBlackMat);
      divoWing.position.set(0, 1.28, 2.0);
      divoWing.castShadow = true;
      divoGroup.add(divoWing);

      const wingEdge = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.06, 0.66), divoCyan);
      wingEdge.position.set(0, 1.23, 2.0);
      divoGroup.add(wingEdge);

      // Quad Rectangular Center Exhausts
      const divoExhaust = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.2), darkChromeMat);
      divoExhaust.position.set(0, 0.32, 2.24);
      divoGroup.add(divoExhaust);
    }
    carGroup.add(divoGroup);

    const variantModels = [chironGroup, bolideGroup, divoGroup];

    // Forward Spotlights (Dynamic beams cast on asphalt)
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

    // Brake Point Light
    const brakePoint = new THREE.PointLight(0xef4444, 0.8, 10);
    brakePoint.position.set(0, 0.65, 2.8);
    carGroup.add(brakePoint);

    // 4 Performance Wheels (with steerable front axle)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.65 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const wheelGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.35, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    function createWheelMesh() {
      const wGrp = new THREE.Group();
      const tire = new THREE.Mesh(wheelGeo, wheelMat);
      tire.castShadow = true;
      wGrp.add(tire);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.37, 12), rimMat);
      hub.rotateZ(Math.PI / 2);
      wGrp.add(hub);
      return { group: wGrp, tire: tire };
    }

    const frontLeftGroup = new THREE.Group();
    frontLeftGroup.position.set(-1.25, 0.44, -1.35);
    const flWheelObj = createWheelMesh();
    frontLeftGroup.add(flWheelObj.group);
    carGroup.add(frontLeftGroup);

    const frontRightGroup = new THREE.Group();
    frontRightGroup.position.set(1.25, 0.44, -1.35);
    const frWheelObj = createWheelMesh();
    frontRightGroup.add(frWheelObj.group);
    carGroup.add(frontRightGroup);

    const rlWheelObj = createWheelMesh();
    rlWheelObj.group.position.set(-1.25, 0.44, 1.35);
    carGroup.add(rlWheelObj.group);

    const rrWheelObj = createWheelMesh();
    rrWheelObj.group.position.set(1.25, 0.44, 1.35);
    carGroup.add(rrWheelObj.group);

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

    // 8. Driving Physics State
    let activeCarIndex = 0;

    const physics = {
      x: 0,
      z: 14,
      vx: 0,
      vz: 0,
      speed: 0,
      angle: 0,
      steerAngle: 0,
      slipAngle: 0,
      isDrifting: false,
      driftScore: 0,
      driftTime: 0,
      // Dynamic variant tuning:
      maxSpeed: CAR_VARIANTS[0].maxSpeed,
      maxReverseSpeed: CAR_VARIANTS[0].maxReverseSpeed,
      accel: CAR_VARIANTS[0].accel,
      brake: CAR_VARIANTS[0].brake,
      friction: CAR_VARIANTS[0].friction,
      steerSpeed: CAR_VARIANTS[0].steerSpeed,
      maxSteerAngle: CAR_VARIANTS[0].maxSteerAngle,
      driftMultiplier: CAR_VARIANTS[0].driftMultiplier
    };

    const keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      drift: false
    };

    let driftToggleMode = false;
    let activeDest = null;
    let isDrivingActive = false;
    let animId = 0;
    let isVisible = true;
    let lastSkidX = 0;
    let lastSkidZ = 0;

    // Switch Bugatti Variant Function
    function setCarVariant(index) {
      if (index < 0 || index >= CAR_VARIANTS.length) return;
      activeCarIndex = index;
      const v = CAR_VARIANTS[index];

      // Update 3D visibility
      variantModels.forEach((m, i) => {
        m.visible = (i === index);
      });

      // Update physics parameters
      physics.maxSpeed = v.maxSpeed;
      physics.maxReverseSpeed = v.maxReverseSpeed;
      physics.accel = v.accel;
      physics.brake = v.brake;
      physics.friction = v.friction;
      physics.steerSpeed = v.steerSpeed;
      physics.maxSteerAngle = v.maxSteerAngle;
      physics.driftMultiplier = v.driftMultiplier;

      // Update UI Tabs
      carTabBtns.forEach((btn, i) => {
        if (!btn) return;
        if (i === index) {
          btn.classList.add('is-active');
          btn.style.borderColor = v.accentHex;
        } else {
          btn.classList.remove('is-active');
          btn.style.borderColor = '';
        }
      });

      // Update Status Text with hypercar specs
      if (statusText) {
        statusText.innerHTML = `<strong>${v.fullName}</strong> — ${v.tagline}`;
      }

      // Quick suspension bounce sensation
      carGroup.position.y = 0.25;
      setTimeout(() => { carGroup.position.y = 0; }, 120);
    }

    // Set initial car variant
    setCarVariant(0);

    function resetCar() {
      physics.x = 0;
      physics.z = 14;
      physics.vx = 0;
      physics.vz = 0;
      physics.speed = 0;
      physics.angle = 0;
      physics.steerAngle = 0;
      physics.slipAngle = 0;
      physics.isDrifting = false;
      physics.driftScore = 0;
      carGroup.position.set(0, 0, 14);
      carGroup.rotation.set(0, 0, 0);
      hidePrompt();
      if (driftMeter) driftMeter.classList.remove('is-active');
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

    // 9. Input Event Listeners
    function onKeyDown(e) {
      // Reset car with 'R'
      if (e.key === 'r' || e.key === 'R') {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          resetCar();
          return;
        }
      }

      // Switch Car Variants with '1', '2', '3' or 'C'
      if (e.key === '1') {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          setCarVariant(0);
          return;
        }
      }
      if (e.key === '2') {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          setCarVariant(1);
          return;
        }
      }
      if (e.key === '3') {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          setCarVariant(2);
          return;
        }
      }
      if (e.key === 'c' || e.key === 'C') {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          setCarVariant((activeCarIndex + 1) % CAR_VARIANTS.length);
          return;
        }
      }

      // Launch destination with Enter
      if (e.key === 'Enter') {
        if (activeDest && (isDrivingActive || document.activeElement === container)) {
          e.preventDefault();
          openActiveDestination();
          return;
        }
      }

      // Drift Key: Shift, Space, or 'T' (case-insensitive)
      const isDriftKey = (
        e.code === 'ShiftLeft' || e.code === 'ShiftRight' ||
        e.code === 'Space' || e.key === ' ' ||
        e.key === 't' || e.key === 'T'
      );

      if (isDriftKey) {
        if (isDrivingActive || document.activeElement === container) {
          e.preventDefault();
          keys.drift = true;
          if (driftToggleBtn) driftToggleBtn.classList.add('is-active');
        }
      }

      // Arrow / WASD driving keys
      const isDriveKey = (
        e.key === 'ArrowUp' || e.key === 'KeyW' || e.key === 'w' || e.key === 'W' ||
        e.key === 'ArrowDown' || e.key === 'KeyS' || e.key === 's' || e.key === 'S' ||
        e.key === 'ArrowLeft' || e.key === 'KeyA' || e.key === 'a' || e.key === 'A' ||
        e.key === 'ArrowRight' || e.key === 'KeyD' || e.key === 'd' || e.key === 'D'
      );

      if (isDriveKey) {
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

      const isDriftKey = (
        e.code === 'ShiftLeft' || e.code === 'ShiftRight' ||
        e.code === 'Space' || e.key === ' ' ||
        e.key === 't' || e.key === 'T'
      );
      if (isDriftKey) {
        keys.drift = false;
        if (!driftToggleMode && driftToggleBtn) {
          driftToggleBtn.classList.remove('is-active');
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Focus / Active Drive handling
    container.addEventListener('focus', () => {
      isDrivingActive = true;
      container.classList.add('is-driving');
      const v = CAR_VARIANTS[activeCarIndex];
      statusText.textContent = `${v.fullName} Active — Use Keys or Drift (Shift/T)`;
    });

    container.addEventListener('blur', () => {
      isDrivingActive = false;
      container.classList.remove('is-driving');
      statusText.textContent = 'Click inside to drive';
      keys.forward = false;
      keys.backward = false;
      keys.left = false;
      keys.right = false;
      keys.drift = false;
      if (!driftToggleMode && driftToggleBtn) driftToggleBtn.classList.remove('is-active');
    });

    container.addEventListener('pointerdown', () => {
      container.focus();
    });

    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetCar();
      container.focus();
    });

    // Drift Mode Toggle Button
    if (driftToggleBtn) {
      driftToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        driftToggleMode = !driftToggleMode;
        keys.drift = driftToggleMode;
        if (driftToggleMode) {
          driftToggleBtn.classList.add('is-active');
        } else {
          driftToggleBtn.classList.remove('is-active');
        }
        container.focus();
      });
    }

    // Car Variant Tabs Click Handlers
    carTabBtns.forEach((btn, idx) => {
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setCarVariant(idx);
        container.focus();
      });
    });

    promptBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openActiveDestination();
    });

    promptEl.addEventListener('click', () => {
      openActiveDestination();
    });

    // Touch Virtual D-pad Setup
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
    setupTouchButton('btnDrift', 'drift');

    // Mobile Car Switcher Button
    const btnCarSwitch = document.getElementById('btnCarSwitch');
    if (btnCarSwitch) {
      btnCarSwitch.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCarVariant((activeCarIndex + 1) % CAR_VARIANTS.length);
      });
    }

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

    // 10. Animation & Physics Loop
    let clock = new THREE.Clock();

    function update() {
      const isDriftActive = keys.drift || driftToggleMode;

      // 1. Acceleration & Braking Dynamics
      const accelForce = isDriftActive ? physics.accel * 1.18 : physics.accel;
      const forwardDirX = -Math.sin(physics.angle);
      const forwardDirZ = -Math.cos(physics.angle);

      if (keys.forward) {
        physics.vx += forwardDirX * accelForce;
        physics.vz += forwardDirZ * accelForce;
      } else if (keys.backward) {
        const curSpd = Math.hypot(physics.vx, physics.vz);
        if (curSpd > 0.08) {
          // Strong braking deceleration
          physics.vx *= (1 - physics.brake);
          physics.vz *= (1 - physics.brake);
        } else {
          // Reverse acceleration
          physics.vx -= forwardDirX * (accelForce * 0.65);
          physics.vz -= forwardDirZ * (accelForce * 0.65);
        }
      } else {
        // Natural rolling friction
        physics.vx *= physics.friction;
        physics.vz *= physics.friction;
        if (Math.abs(physics.vx) < 0.0008) physics.vx = 0;
        if (Math.abs(physics.vz) < 0.0008) physics.vz = 0;
      }

      // 2. Lateral Traction vs Drift Momentum Slide
      // Decompose velocity into longitudinal and lateral components
      const rightDirX = Math.cos(physics.angle);
      const rightDirZ = -Math.sin(physics.angle);

      const forwardVel = physics.vx * forwardDirX + physics.vz * forwardDirZ;
      const lateralVel = physics.vx * rightDirX + physics.vz * rightDirZ;

      // In drift mode, tires slide sideways with much lower friction
      const lateralGrip = isDriftActive ? 0.945 : 0.76;
      const newLateralVel = lateralVel * lateralGrip;

      physics.vx = forwardDirX * forwardVel + rightDirX * newLateralVel;
      physics.vz = forwardDirZ * forwardVel + rightDirZ * newLateralVel;

      // Calculate speed and top speed clamp
      let currentSpeed = Math.hypot(physics.vx, physics.vz);
      const topSpeedLimit = isDriftActive ? physics.maxSpeed * 1.15 : physics.maxSpeed;
      if (currentSpeed > topSpeedLimit) {
        physics.vx = (physics.vx / currentSpeed) * topSpeedLimit;
        physics.vz = (physics.vz / currentSpeed) * topSpeedLimit;
        currentSpeed = topSpeedLimit;
      }
      physics.speed = currentSpeed;

      // 3. Steering & Oversteer Drift Yaw
      const steerRate = isDriftActive ? physics.steerSpeed * 1.55 : physics.steerSpeed;
      const maxSteer = isDriftActive ? physics.maxSteerAngle * 1.35 : physics.maxSteerAngle;

      if (keys.left) {
        physics.steerAngle = Math.min(maxSteer, physics.steerAngle + steerRate);
      } else if (keys.right) {
        physics.steerAngle = Math.max(-maxSteer, physics.steerAngle - steerRate);
      } else {
        physics.steerAngle *= 0.82;
        if (Math.abs(physics.steerAngle) < 0.0005) physics.steerAngle = 0;
      }

      // Turning yaw applied to car body
      if (currentSpeed > 0.02) {
        const turnDir = forwardVel >= 0 ? 1 : -1;
        const driftYawBoost = isDriftActive ? 1.85 * physics.driftMultiplier : 1.0;
        const speedRatio = Math.min(1, currentSpeed / (physics.maxSpeed * 0.45));
        physics.angle += physics.steerAngle * turnDir * speedRatio * 1.32 * driftYawBoost;
      }

      // Calculate Slip Angle (difference between car body heading and movement direction)
      const moveHeading = Math.atan2(-physics.vx, -physics.vz);
      let slipAngle = physics.angle - moveHeading;
      while (slipAngle > Math.PI) slipAngle -= Math.PI * 2;
      while (slipAngle < -Math.PI) slipAngle += Math.PI * 2;
      physics.slipAngle = slipAngle;

      // Active drift condition: drift key pressed, or sharp lateral power slide
      const isDrifting = (isDriftActive || Math.abs(slipAngle) > 0.22) && currentSpeed > 0.16;
      physics.isDrifting = isDrifting;

      // Burnout condition: holding drift + forward at low speed
      const isBurnout = isDriftActive && keys.forward && currentSpeed < 0.18;

      // World positions of rear wheels for skid marks and smoke
      const cosA = Math.cos(physics.angle);
      const sinA = Math.sin(physics.angle);
      // Rear left: local (-1.25, 0.44, 1.35)
      const rlWorldX = physics.x + (-1.25 * cosA - 1.35 * sinA);
      const rlWorldZ = physics.z + (1.25 * sinA - 1.35 * cosA);
      // Rear right: local (1.25, 0.44, 1.35)
      const rrWorldX = physics.x + (1.25 * cosA - 1.35 * sinA);
      const rrWorldZ = physics.z + (-1.25 * sinA - 1.35 * cosA);

      // 4. Drift Effects: Tire Smoke, Skid Marks & Scoring
      if (isDrifting || isBurnout) {
        physics.driftTime++;
        const driftIntensity = isBurnout ? 0.95 : Math.min(1, Math.abs(slipAngle) * 1.5 + currentSpeed * 0.4);

        // Emit realistic smoke puffs from rear tires
        emitTireSmoke(rlWorldX, 0.15, rlWorldZ, driftIntensity);
        emitTireSmoke(rrWorldX, 0.15, rrWorldZ, driftIntensity);

        // Lay skid marks on road surface
        const distFromLastSkid = Math.hypot(physics.x - lastSkidX, physics.z - lastSkidZ);
        if (distFromLastSkid > 0.65 || isBurnout) {
          addSkidMark(rlWorldX, rlWorldZ, physics.angle, driftIntensity);
          addSkidMark(rrWorldX, rrWorldZ, physics.angle, driftIntensity);
          lastSkidX = physics.x;
          lastSkidZ = physics.z;
        }

        // Tally Drift Points
        physics.driftScore += Math.floor(driftIntensity * 28 + 1);

        // Update Drift HUD Meter
        if (driftMeter && driftScoreVal) {
          driftMeter.classList.add('is-active');
          driftScoreVal.textContent = `+${physics.driftScore.toLocaleString()} PTS`;
        }
      } else {
        // Drift ended - give sweet mini-boost reward if drift was good!
        if (physics.driftScore > 280) {
          physics.vx *= 1.12;
          physics.vz *= 1.12;
          if (driftScoreVal) {
            driftScoreVal.textContent = `🔥 DRIFT +${physics.driftScore.toLocaleString()} PTS!`;
          }
        }
        physics.driftScore = 0;
        physics.driftTime = 0;
        if (driftMeter) {
          setTimeout(() => {
            if (!physics.isDrifting) driftMeter.classList.remove('is-active');
          }, 900);
        }
      }

      // Brake light intensification
      const isBraking = keys.backward && forwardVel > 0.04;
      const tailEmissive = (isBraking || isDrifting) ? 3.4 : 1.3;
      chironTailMat.emissiveIntensity = tailEmissive;
      bolideTailMat.emissiveIntensity = tailEmissive;
      divoTailMat.emissiveIntensity = tailEmissive;
      brakePoint.intensity = (isBraking || isDrifting) ? 2.6 : 0.8;

      // 5. Integrate Position
      physics.x += physics.vx;
      physics.z += physics.vz;

      // Soft Boundary Collision & Cushion Bounce
      const bound = 44;
      if (physics.x < -bound) { physics.x = -bound; physics.vx = -physics.vx * 0.35; }
      if (physics.x > bound) { physics.x = bound; physics.vx = -physics.vx * 0.35; }
      if (physics.z < -bound) { physics.z = -bound; physics.vz = -physics.vz * 0.35; }
      if (physics.z > bound) { physics.z = bound; physics.vz = -physics.vz * 0.35; }

      // 6. Update Car 3D Transform & Wheel Rotations
      carGroup.position.set(physics.x, 0, physics.z);
      carGroup.rotation.y = physics.angle;

      // Chassis roll into turn + lateral drift lean
      const chassisRoll = -physics.steerAngle * (currentSpeed / physics.maxSpeed) * 0.42;
      carGroup.rotation.z = chassisRoll;

      // Front Wheels Steering Angle
      frontLeftGroup.rotation.y = physics.steerAngle * 6.5;
      frontRightGroup.rotation.y = physics.steerAngle * 6.5;

      // Wheel Rolling Rotation (Spin fast during burnout!)
      const rollAmount = isBurnout ? 0.35 : currentSpeed * 1.6;
      flWheelObj.tire.rotation.x += rollAmount;
      frWheelObj.tire.rotation.x += rollAmount;
      rlWheelObj.tire.rotation.x += rollAmount;
      rrWheelObj.tire.rotation.x += rollAmount;

      // 7. Update Drift Systems
      updateSkidMarks();
      updateTireSmoke(camera.quaternion);

      // 8. Smooth Camera Chase
      const camTargetX = physics.x;
      const camTargetY = 32;
      const camTargetZ = physics.z + 36;

      camera.position.x += (camTargetX - camera.position.x) * 0.085;
      camera.position.y += (camTargetY - camera.position.y) * 0.085;
      camera.position.z += (camTargetZ - camera.position.z) * 0.085;
      camera.lookAt(physics.x, 1.2, physics.z);

      // 9. Destination Icons Rotation & Proximity Detection
      const time = clock.getElapsedTime();
      stationIcons.forEach(item => {
        item.mesh.rotation.y = time * 0.8;
        item.mesh.position.y = item.baseY + Math.sin(time * 2 + item.baseY) * 0.4;
      });

      let foundDest = null;
      DESTINATIONS.forEach(dest => {
        const dist = Math.hypot(physics.x - dest.pos.x, physics.z - dest.pos.z);
        if (dist <= dest.radius) {
          foundDest = dest;
        }
      });

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

    // 11. Resize Handling & Intersection Observer
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
