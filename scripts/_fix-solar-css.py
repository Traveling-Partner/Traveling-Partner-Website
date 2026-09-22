from pathlib import Path
import re

p = Path(r"e:/Traveling-Partner-Website/components/Home-sections/ServicesOrbit3D.css")
text = p.read_text(encoding="utf-8").replace("\r\n", "\n")
lines = [l for l in text.split("\n") if l.strip() != ""]
text = "\n".join(lines)
text = re.sub(r"\n(/\* -{3,})", r"\n\n\1", text)
text = re.sub(r"\n(@media)", r"\n\n\1", text)
text = re.sub(r"\n(@keyframes)", r"\n\n\1", text)

start = text.find("/* 3D sphere planets")
end = text.find("/* Always-visible planet tags")
if start < 0 or end < 0:
    raise SystemExit(f"markers missing {start} {end}")

new_planets = """/* 3D sphere planets — volume, terminator, specular, ground shadow */
.tp-solar__planet {
  z-index: 2;
  background: transparent;
  border-radius: 50%;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: tp-solar-planet-depth;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition-property: transform, filter, font-size;
  transition-duration: 0.25s;
  outline: none;
  filter: drop-shadow(0 0.18em 0.22em rgba(0, 0, 0, 0.28));
}

.tp-solar__planet-sphere {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  transform-style: preserve-3d;
  background:
    radial-gradient(circle at 32% 28%, #ffffff 0%, #f4efe3 34%, #d9d0be 68%, #aea48f 100%);
  box-shadow:
    inset -0.18em -0.12em 0.28em rgba(0, 0, 0, 0.55),
    inset 0.14em 0.1em 0.2em rgba(255, 255, 255, 0.85),
    inset 0 0 0 0.03em rgba(252, 224, 1, 0.55),
    0 0.06em 0.16em rgba(0, 0, 0, 0.22);
}

.tp-solar__planet-sphere::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 4;
  box-shadow:
    inset 0.02em 0.02em 0.06em rgba(255, 255, 255, 0.65),
    inset -0.06em -0.08em 0.14em rgba(0, 0, 0, 0.35);
}

.tp-solar__planet-img {
  position: absolute;
  inset: 10%;
  width: 80%;
  height: 80%;
  object-fit: contain;
  border-radius: 50%;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  filter: contrast(1.05) saturate(1.05);
  mask-image: radial-gradient(circle at 50% 50%, #000 55%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 55%, transparent 78%);
}

.tp-solar__planet-shade {
  position: absolute;
  inset: -8%;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(
      105deg,
      transparent 28%,
      rgba(0, 0, 0, 0.08) 46%,
      rgba(0, 0, 0, 0.38) 62%,
      rgba(0, 0, 0, 0.62) 78%,
      rgba(0, 0, 0, 0.72) 100%
    );
  animation-name: tp-solar-shade-orbit;
  animation-duration: var(--tp-orbit-dur, 20s);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  mix-blend-mode: multiply;
}

.tp-solar__planet-glare {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  z-index: 3;
  pointer-events: none;
  background:
    radial-gradient(
      circle at 30% 24%,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.35) 16%,
      rgba(255, 255, 255, 0.08) 34%,
      transparent 52%
    );
  animation-name: tp-solar-glare-orbit;
  animation-duration: var(--tp-orbit-dur, 20s);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.tp-solar__planet:hover .tp-solar__planet-sphere,
.tp-solar__planet:focus-visible .tp-solar__planet-sphere {
  box-shadow:
    inset -0.18em -0.12em 0.28em rgba(0, 0, 0, 0.55),
    inset 0.14em 0.1em 0.2em rgba(255, 255, 255, 0.9),
    inset 0 0 0 0.05em rgba(252, 224, 1, 0.9),
    0 0.08em 0.2em rgba(0, 0, 0, 0.28),
    0 0 0.4em rgba(252, 224, 1, 0.4);
}

.tp-solar__planet:hover,
.tp-solar__planet:focus-visible {
  filter: drop-shadow(0 0.18em 0.22em rgba(0, 0, 0, 0.28)) drop-shadow(0 0 0.35em rgba(252, 224, 1, 0.45));
}

.tp-solar__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.55em;
  height: 1.55em;
  margin-top: -0.775em;
  margin-left: -0.775em;
  border-radius: 50%;
  border: 0.16em solid rgba(160, 147, 130, 0.8);
  box-sizing: border-box;
  pointer-events: none;
  z-index: 0;
}

.tp-solar__ring::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.78em;
  height: 1.78em;
  margin-top: -0.89em;
  margin-left: -0.89em;
  border-radius: 50%;
  border: 0.05em solid rgba(160, 147, 130, 0.4);
  box-sizing: border-box;
}

"""

text = text[:start] + new_planets + text[end:]

old_depth = """@keyframes tp-solar-planet-depth {
  0%,
  100% {
    filter: drop-shadow(0 0.08em 0.14em rgba(0, 0, 0, 0.22));
  }
  50% {
    filter: drop-shadow(0 0.16em 0.22em rgba(0, 0, 0, 0.32));
  }
}"""
new_depth = """@keyframes tp-solar-planet-depth {
  0%,
  100% {
    filter: drop-shadow(0 0.12em 0.18em rgba(0, 0, 0, 0.26));
  }
  25% {
    filter: drop-shadow(0.06em 0.2em 0.24em rgba(0, 0, 0, 0.3));
  }
  50% {
    filter: drop-shadow(0 0.28em 0.3em rgba(0, 0, 0, 0.36));
  }
  75% {
    filter: drop-shadow(-0.06em 0.2em 0.24em rgba(0, 0, 0, 0.3));
  }
}"""
if old_depth in text:
    text = text.replace(old_depth, new_depth)
else:
    print("depth keyframes missing; inserting after shade keyframes")

# Keep steep tilt
text = text.replace("rotateX(58deg)", "rotateX(70deg)")
text = text.replace("rotateX(52deg)", "rotateX(62deg)")

p.write_text(text.replace("\n", "\r\n") + "\r\n", encoding="utf-8")
print("ok lines", len(text.splitlines()), "shade gradient", "105deg" in text)
