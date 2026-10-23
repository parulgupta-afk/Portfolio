import { useCallback, useEffect, useRef, useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import type { SkillGroup } from '../types';

/** [accent, deep] per card (from the Stitch design) */
const PALETTES: [string, string][] = [
  ['#ff4d5e', '#3a0a1c'],
  ['#2fe0c8', '#06303a'],
  ['#b6f23c', '#1c3a0a'],
  ['#5b86ff', '#0b1650'],
  ['#e04bff', '#35094a'],
  ['#ffb347', '#40220a'],
];

type ThreeNS = typeof import('three');

const TREE_H = 14;
const STEP = 0.95; // radians between neighbouring cards
const DROP = 1.6; // vertical drop between neighbouring cards
const SCROLL_PER_CARD = 0.62; // viewport-heights of page scroll per card

const pad2 = (n: number) => String(n).padStart(2, '0');

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** Paints one glass card: tinted frosted panel, neon orbs, scanlines, glitchy title, chips. */
function paintCard(skill: SkillGroup, index: number, total: number, palette: [string, string]): HTMLCanvasElement {
  const W = 1024;
  const H = 640;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;
  const [accent, deep] = palette;
  const r = 36;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(6, 6, W - 12, H - 12, r);
  ctx.clip();

  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, accent + 'dd');
  g.addColorStop(0.55, deep + 'f2');
  g.addColorStop(1, '#050314');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 4; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, 300);
    rg.addColorStop(0, accent + '66');
    rg.addColorStop(1, accent + '00');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);
  }

  ctx.fillStyle = 'rgba(5, 3, 20, 0.4)';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
  ctx.restore();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.beginPath();
  ctx.roundRect(6, 6, W - 12, H - 12, r);
  ctx.stroke();

  const mono = '"DM Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '600 24px ' + mono;
  ctx.fillText(`SKILL ${pad2(index + 1)} / ${pad2(total)}`, 56, 76);
  ctx.textAlign = 'right';
  ctx.fillText(skill.code.replace('_', ' '), W - 56, 76);
  ctx.textAlign = 'left';

  // glitch chromatic-split title
  const title = skill.title.toUpperCase();
  ctx.font = '700 82px ' + mono;
  const lines = wrapText(ctx, title, W - 110);
  const top = 180;
  const lh = 92;
  lines.forEach((l, li) => {
    const y = top + li * lh;
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.fillText(l, 52, y);
    ctx.fillStyle = 'rgba(255, 0, 160, 0.6)';
    ctx.fillText(l, 60, y);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(l, 56, y);
  });

  // tag chips
  ctx.font = '500 22px ' + mono;
  let cx = 56;
  const cy = H - 68;
  const chips = skill.items.slice(0, 3).map((s) => s.toUpperCase());
  if (skill.items.length > 3) chips.push(`+${skill.items.length - 3} MORE`);
  for (const label of chips) {
    const tw = ctx.measureText(label).width + 36;
    if (cx + tw > W - 40) break;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.roundRect(cx, cy - 30, tw, 46, 23);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, cx + 18, cy + 2);
    cx += tw + 14;
  }
  return c;
}

/* ---------------------------------- shaders (from the design) ---------------------------------- */
const POINT_VERT = /* glsl */ `
attribute vec3 aColor;
attribute float aSeed;
attribute float aSize;
uniform float uTime;
uniform float uPixelRatio;
uniform float uScrollRev;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec3 p = position;
  float ang = uTime * 0.25 + p.y * 0.35 + uScrollRev * 1.2;
  float cs = cos(ang), sn = sin(ang);
  p.xz = mat2(cs, -sn, sn, cs) * p.xz;
  p += 0.07 * vec3(sin(uTime*1.3 + aSeed*20.0), cos(uTime*1.1 + aSeed*31.0), sin(uTime*0.9 + aSeed*17.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float tw = 0.8 + 0.4 * sin(uTime * 2.0 + aSeed * 40.0);
  gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z) * tw;
  gl_Position = projectionMatrix * mv;
  vColor = aColor;
  vAlpha = 0.65 + 0.35 * tw;
}`;

const POINT_FRAG = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, a * a * vAlpha);
}`;

const TORNADO_VERT = /* glsl */ `
attribute float aT;
attribute float aAng;
attribute float aRad;
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform float uY0;
uniform float uY1;
uniform float uScrollRev;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float t = fract(aT - uTime * 0.05 - uScrollRev * 0.15);
  float y = mix(uY0, uY1, t);
  float r = (1.8 + t * 5.8) * (0.55 + 0.9 * aRad);
  float ang = aAng + uTime * (0.4 + (1.0 - t) * 1.3) + t * 5.2 + uScrollRev * 1.4;
  vec3 p = vec3(cos(ang) * r, y, sin(ang) * r * 0.65);
  vec3 top = vec3(0.45, 0.85, 1.0);
  vec3 bot = vec3(1.0, 0.35, 0.75);
  vColor = mix(bot, top, t);
  float streak = step(0.97, aSeed);
  vColor = mix(vColor, vec3(1.0), streak * 0.7);
  float fade = smoothstep(0.0, 0.05, t) * smoothstep(1.0, 0.95, t);
  vAlpha = fade * (0.35 + 0.5 * aSeed) * (0.8 + 0.2 * sin(uTime * 2.0 + aSeed * 50.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.5 + aSeed * 2.2 + streak * 2.5) * uPixelRatio * (9.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const PANEL_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const PANEL_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D map;
uniform float uTime;
uniform float uActive;
uniform float uFade;
uniform vec3 uTint;
varying vec2 vUv;
void main(){
  vec2 uv = vUv;
  if(!gl_FrontFacing) uv.x = 1.0 - uv.x;
  float ca = 0.002 + 0.005 * (1.0 - uActive);
  float r = texture2D(map, uv + vec2(ca, 0.0)).r;
  vec4 mid = texture2D(map, uv);
  float b = texture2D(map, uv - vec2(ca, 0.0)).b;
  vec3 col = vec3(r, mid.g, b);
  vec2 e = min(uv, 1.0 - uv);
  float edge = smoothstep(0.045, 0.0, min(e.x * 1.5, e.y * 2.4));
  col += uTint * edge * 0.65;
  float sweep = smoothstep(0.0, 0.5, 1.0 - abs(fract(uv.x * 0.7 - uTime * 0.07 + uv.y * 0.3) - 0.5) * 2.0);
  col += vec3(0.08) * sweep * uActive;
  float shade = mix(0.5, 1.0, uActive);
  float a = mid.a * mix(0.65, 0.92, uActive) * uFade;
  gl_FragColor = vec4(col * shade, a);
}`;

export function SkillsOrbit() {
  const skills = SKILL_GROUPS;
  const total = skills.length;
  const outerRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0); // 0..1 through the spiral, driven by page scroll
  const [active, setActive] = useState(0);
  const [glFailed, setGlFailed] = useState(false);
  const [compact, setCompact] = useState(false); // header folds away once scrolling begins

  /** scroll the page so card `i` sits front and centre */
  const goTo = useCallback(
    (i: number) => {
      const outer = outerRef.current;
      if (!outer) return;
      const n = Math.min(total - 1, Math.max(0, i));
      const top = window.scrollY + outer.getBoundingClientRect().top;
      const span = outer.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (n / (total - 1)) * span, behavior: 'smooth' });
    },
    [total]
  );
  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  // page scroll -> progress through the spiral
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const update = () => {
      const r = outer.getBoundingClientRect();
      const span = Math.max(1, outer.offsetHeight - window.innerHeight);
      progress.current = Math.min(1, Math.max(0, -r.top / span));
      const idx = Math.round(progress.current * (total - 1));
      setActive((a) => (a === idx ? a : idx));
      const c = progress.current > 0.015;
      setCompact((v) => (v === c ? v : c));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [total]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const boot = async () => {
      let THREE: ThreeNS;
      try {
        THREE = await import('three');
      } catch {
        setGlFailed(true);
        return;
      }
      if (disposed) return;

      let renderer: InstanceType<ThreeNS['WebGLRenderer']>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        setGlFailed(true);
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);

      try {
        await document.fonts.load('700 64px "DM Mono"');
        await document.fonts.load('600 24px "DM Mono"');
        await document.fonts.load('500 24px "DM Mono"');
      } catch {
        /* fall back to system mono */
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      const disposables: { dispose: () => void }[] = [];
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0.9, 11.5);

      /* ---------- tree of light: 42 spiralling branches of coloured particles ---------- */
      const treeGroup = new THREE.Group();
      scene.add(treeGroup);
      const pos: number[] = [];
      const col: number[] = [];
      const seed: number[] = [];
      const size: number[] = [];
      const colorPalette = ['#ff4fa3', '#c44bff', '#6f6bff', '#38d6ff', '#ffe3f7', '#8dffc4'].map((h) => new THREE.Color(h));
      const tmpColor = new THREE.Color();
      const pushParticle = (x: number, y: number, z: number, c: InstanceType<ThreeNS['Color']>, s: number) => {
        pos.push(x, y, z);
        col.push(c.r, c.g, c.b);
        seed.push(Math.random());
        size.push(s);
      };
      const BR = 42;
      for (let b = 0; b < BR; b++) {
        const t0 = 0.02 + (b / BR) * 0.96;
        const y0 = -TREE_H + t0 * (TREE_H * 2);
        const th = b * 2.39996;
        const reach = 1.0 + Math.random() * 1.4;
        const lift = 0.5 + Math.random() * 0.8;
        const hue = colorPalette[b % colorPalette.length];
        const segs = 220;
        for (let i = 0; i < segs; i++) {
          const s = i / (segs - 1);
          const r = 0.38 + s * reach;
          const ang = th + s * 1.15;
          const x = Math.cos(ang) * r;
          const z = Math.sin(ang) * r;
          const y = y0 + lift * Math.sin(s * Math.PI * 0.5);
          tmpColor.copy(colorPalette[0]).lerp(hue, s);
          pushParticle(x, y, z, tmpColor, 3.4 * (1 - s * 0.35) + 0.8);
          if (i % 2 === 0)
            pushParticle(x + (Math.random() - 0.5) * 0.07, y + (Math.random() - 0.5) * 0.07, z + (Math.random() - 0.5) * 0.07, tmpColor, 2.0);
        }
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      pGeo.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3));
      pGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
      pGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1));
      const pMat = new THREE.ShaderMaterial({
        vertexShader: POINT_VERT,
        fragmentShader: POINT_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPixelRatio: { value: dpr }, uScrollRev: { value: 0 } },
      });
      const branchPoints = new THREE.Points(pGeo, pMat);
      branchPoints.frustumCulled = false;
      treeGroup.add(branchPoints);
      disposables.push(pGeo, pMat);

      /* ---------- tornado vortex dust ---------- */
      const TN = 7000;
      const tT = new Float32Array(TN);
      const tA = new Float32Array(TN);
      const tR = new Float32Array(TN);
      const tS = new Float32Array(TN);
      for (let i = 0; i < TN; i++) {
        tT[i] = Math.random();
        tA[i] = Math.random() * Math.PI * 2;
        tR[i] = Math.random();
        tS[i] = Math.random();
      }
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(TN * 3), 3));
      tGeo.setAttribute('aT', new THREE.BufferAttribute(tT, 1));
      tGeo.setAttribute('aAng', new THREE.BufferAttribute(tA, 1));
      tGeo.setAttribute('aRad', new THREE.BufferAttribute(tR, 1));
      tGeo.setAttribute('aSeed', new THREE.BufferAttribute(tS, 1));
      const tMat = new THREE.ShaderMaterial({
        vertexShader: TORNADO_VERT,
        fragmentShader: POINT_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
          uY0: { value: -7.0 },
          uY1: { value: 7.0 },
          uScrollRev: { value: 0 },
        },
      });
      const tornado = new THREE.Points(tGeo, tMat);
      tornado.frustumCulled = false;
      scene.add(tornado);
      disposables.push(tGeo, tMat);

      /* ---------- glass cards ---------- */
      const panelGeo = new THREE.PlaneGeometry(3.6, 2.25);
      disposables.push(panelGeo);
      const panels = skills.map((skill, i) => {
        const pal = PALETTES[i % PALETTES.length];
        const tex = new THREE.CanvasTexture(paintCard(skill, i, total, pal));
        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        const mat = new THREE.ShaderMaterial({
          vertexShader: PANEL_VERT,
          fragmentShader: PANEL_FRAG,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: {
            map: { value: tex },
            uTime: { value: 0 },
            uActive: { value: 0 },
            uFade: { value: 1 },
            uTint: { value: new THREE.Color(pal[0]) },
          },
        });
        disposables.push(mat, tex);
        const mesh = new THREE.Mesh(panelGeo, mat);
        mesh.userData.index = i;
        mesh.renderOrder = 2;
        scene.add(mesh);
        return { mesh, mat };
      });
      treeGroup.renderOrder = 3;
      tornado.renderOrder = 3;

      /* ---------- sizing ---------- */
      let camDist = 11.5;
      const resize = () => {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // short stages (laptops) sit a little closer so the cards stay big enough to read
        camDist = 11.5 * Math.min(1, Math.max(0.76, h / 820));
        if (camera.aspect < 1.3) camDist = camera.aspect < 0.8 ? 16 : 13.5;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      /* ---------- pointer: parallax + click a card ---------- */
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const pick = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -(((clientY - rect.top) / rect.height) * 2 - 1));
        ray.setFromCamera(ndc, camera);
        return ray.intersectObjects(panels.map((p) => p.mesh), false)[0];
      };
      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        canvas.style.cursor = pick(e.clientX, e.clientY) ? 'pointer' : 'default';
      };
      const onClick = (e: MouseEvent) => {
        const hit = pick(e.clientX, e.clientY);
        if (hit) goToRef.current(hit.object.userData.index as number);
      };
      const onLeave = () => {
        mouse.tx = 0;
        mouse.ty = 0;
      };
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('click', onClick);
      canvas.addEventListener('pointerleave', onLeave);

      let visible = false;
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: '120px' }
      );
      io.observe(wrap);

      /* ---------- loop ---------- */
      const clock = new THREE.Clock();
      let time = 0;
      let curPos = progress.current * (total - 1);
      let scrollVelocity = 0;
      let raf = 0;
      const smooth = (a: number, b: number, x: number) => {
        const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) {
          clock.getDelta();
          return;
        }
        const dt = Math.min(0.05, clock.getDelta());
        if (!reduced) time += dt;

        const target = progress.current * (total - 1);
        const before = curPos;
        curPos += (target - curPos) * (1 - Math.exp(-dt * 6.5));
        // how fast we are travelling down the spiral nudges the camera (spring feel)
        scrollVelocity += (Math.max(-0.5, Math.min(0.5, (curPos - before) * 9)) - scrollVelocity) * 0.12;

        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        camera.position.set(mouse.x * 0.85, 0.85 - mouse.y * 0.4 - scrollVelocity * 0.2, camDist);
        camera.lookAt(0, -scrollVelocity * 0.1, 0);

        panels.forEach((p, i) => {
          const d = i - curPos;
          const a = d * STEP;
          const funnel = Math.max(-1.2, Math.min(1.2, d * 0.08));
          const rx = 5.6 * (1 - funnel * 0.35);
          const rz = 3.8 * (1 - funnel * 0.35);
          const bob = Math.sin(time * 0.8 + i * 1.5) * 0.08;
          p.mesh.position.set(Math.sin(a) * rx - 0.3, -d * DROP + bob + 0.35, Math.cos(a) * rz);
          p.mesh.rotation.set(-0.05 + scrollVelocity * 0.08, Math.sin(a) * 0.65, Math.sin(time * 0.5 + i) * 0.02 + Math.sin(a) * 0.06);
          const f = Math.pow((Math.cos(a) + 1) / 2, 3) * (1 - smooth(1.3, 3.2, Math.abs(d)) * 0.6);
          const fade = 1 - smooth(2.6, 4.4, Math.abs(d));
          p.mesh.visible = fade > 0.01;
          p.mesh.scale.setScalar(0.86 + 0.18 * f);
          p.mat.uniforms.uActive.value = f;
          p.mat.uniforms.uFade.value = fade;
          p.mat.uniforms.uTime.value = time;
        });

        pMat.uniforms.uTime.value = time;
        pMat.uniforms.uScrollRev.value = curPos;
        tMat.uniforms.uTime.value = time;
        tMat.uniforms.uScrollRev.value = curPos;

        treeGroup.rotation.y = time * 0.09 + curPos * 0.85;
        treeGroup.position.y = -(curPos - (total - 1) / 2) * DROP * 0.75 + 0.35;
        tornado.rotation.y = -time * 0.12 - curPos * 0.75;
        tornado.position.y = -(curPos - (total - 1) / 2) * DROP * 0.65 + 0.35;

        renderer.render(scene, camera);
      };
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('click', onClick);
        canvas.removeEventListener('pointerleave', onLeave);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
      };
    };

    // Don't touch WebGL until the section is about to scroll into view, so the intro and
    // portrait animation at the top of the page are never slowed down by this scene.
    const starter = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          starter.disconnect();
          boot();
        }
      },
      { rootMargin: '900px 0px' }
    );
    starter.observe(wrap);
    return () => {
      disposed = true;
      starter.disconnect();
      cleanup?.();
    };
  }, [skills, total]);

  const cur = skills[active] ?? skills[0];
  const pal = PALETTES[active % PALETTES.length];
  const counter = `${pad2(active + 1)} / ${pad2(total)}`;

  // WebGL unavailable (or failed to initialise): show every category as a plain, readable grid instead of an empty stage
  if (glFailed) {
    return (
      <section id="skills" className="relative border-t border-white/10 bg-[#04020d] px-4 py-24 text-slate-100 sm:px-8 md:px-12" aria-labelledby="skills-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 inline-flex items-center gap-2.5 font-mono text-xs tracking-wider text-rose-400">
            <span className="rounded border border-rose-500/20 bg-rose-500/10 px-2 py-0.5">03 // CAPABILITIES</span>
          </div>
          <h2 id="skills-title" className="text-4xl font-light leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
            What I{' '}
            <em className="bg-gradient-to-r from-rose-400 via-fuchsia-300 to-cyan-300 bg-clip-text font-serif font-normal italic text-transparent">build with</em>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g) => (
              <li key={g.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{g.code}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{g.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] text-slate-200">{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      ref={outerRef}
      className="orbit-root relative border-t border-white/10"
      style={{ height: `calc(100svh + ${total * SCROLL_PER_CARD * 100}svh)` }}
      aria-labelledby="skills-title"
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-[#04020d] pt-[68px] text-slate-100 selection:bg-rose-500/30 selection:text-white">
        {/* ambient light gradients & grain */}
        <div className="noise-bg pointer-events-none absolute inset-0 z-0 opacity-40" aria-hidden />
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] rounded-full bg-cyan-600/15 blur-[160px]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-rose-600/15 blur-[170px]" aria-hidden />

        {/* header above the 3D scene */}
        <div
          className={`relative z-20 overflow-hidden bg-gradient-to-b from-[#070414] via-[#04020d] to-transparent px-4 transition-all duration-500 ease-out sm:px-8 md:px-12 ${
            compact ? 'max-h-0 border-b border-transparent py-0 opacity-0' : 'max-h-80 border-b border-white/[0.06] pb-4 pt-5 opacity-100 md:pb-6 md:pt-8'
          }`}
          aria-hidden={compact}
        >
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2.5 font-mono text-xs tracking-wider text-rose-400">
                <span className="rounded border border-rose-500/20 bg-rose-500/10 px-2 py-0.5">03 // CAPABILITIES</span>
                <span className="inline-block h-[1px] w-8 bg-rose-400/40" />
                <span className="text-white/70">{counter}</span>
              </div>
              <h2 id="skills-title" className="text-4xl font-light leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
                What I{' '}
                <em className="bg-gradient-to-r from-rose-400 via-fuchsia-300 to-cyan-300 bg-clip-text font-serif font-normal italic text-transparent">
                  build with
                </em>
              </h2>
            </div>
            <div className="hidden flex-col gap-1.5 font-mono text-xs text-white/50 md:flex md:items-end">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                <span className="text-slate-300">INTERACTIVE 3D ORBITAL MATRIX</span>
              </div>
              <p className="max-w-sm text-[11px] text-white/40 md:text-right">Helical tree of light spiral with descending spring physics</p>
            </div>
          </div>
        </div>

        {/* 3D scene + overlays */}
        <div className="pointer-events-none relative min-h-0 w-full flex-1 overflow-hidden">
          <div ref={wrapRef} className="pointer-events-auto absolute inset-0 z-0 h-full w-full bg-transparent">
            <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
          </div>

          {/* left category nav */}
          <nav className="pointer-events-auto absolute bottom-12 left-8 z-20 hidden max-w-xs md:left-12 md:block" aria-label="Skill categories">
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/40">SKILL CATEGORIES</div>
            <ul className="space-y-0 font-mono text-xs">
              {skills.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`group flex w-full min-h-[24px] items-center gap-2 py-[5px] text-left transition duration-300 ${
                        on ? 'translate-x-2 font-semibold text-cyan-400' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span className={`w-3 font-mono transition-all ${on ? 'text-cyan-400' : 'text-transparent group-hover:text-cyan-400'}`}>→</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* right HUD glass panel */}
          <aside
            className="glass-hud pointer-events-auto absolute bottom-3 left-4 right-4 z-20 max-h-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border bg-slate-950/80 p-5 backdrop-blur-md transition-all duration-500 sm:left-auto sm:right-8 sm:w-full sm:max-w-[420px] md:right-12 md:p-6 [scrollbar-width:none]"
            style={{ borderColor: pal[0], boxShadow: `0 0 35px ${pal[0]}33` }}
            aria-live="polite"
          >
            <div className="mb-3.5 flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-xs">
              <span className="font-semibold uppercase tracking-widest text-white/80">{cur.code.replace('_', ' ')}</span>
              <span className="font-bold tracking-wider text-rose-400">{counter}</span>
            </div>
            <h3 className="mb-2 font-sans text-xl font-bold tracking-tight text-white md:text-2xl">{cur.title}</h3>
            <p className="mb-4 hidden text-xs font-normal sm:block leading-relaxed text-slate-300 md:text-sm">{cur.description}</p>
            <div className="mb-4">
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">CORE STACK &amp; TOOLING</div>
              <div className="flex flex-wrap gap-1.5">
                {cur.items.map((m) => (
                  <span key={m} className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white/90 transition-all">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous skill"
                  onClick={() => goTo(active - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/15 active:scale-95"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next skill"
                  onClick={() => goTo(active + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/15 active:scale-95"
                >
                  →
                </button>
                <span className="ml-1 hidden text-[11px] text-white/40 sm:inline">Scroll or click cards</span>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden>
                {skills.map((s, i) => (
                  <span
                    key={s.id}
                    className={`transition-all duration-300 ${
                      i === active
                        ? 'h-5 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#2fe0c8]'
                        : i < active
                          ? 'h-2 w-2 rounded-full bg-pink-500/80'
                          : 'h-2 w-2 rounded-full bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* bottom hint */}
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-white/50 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#2fe0c8]" />
            <span>{glFailed ? 'WebGL unavailable' : 'SCROLL DOWN TO REVOLVE SPIRAL DOWNWARDS · DRAG OR CLICK 3D CARDS TO ORBIT'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
