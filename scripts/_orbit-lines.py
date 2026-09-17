from pathlib import Path
import re

p = Path(r"e:/Traveling-Partner-Website/components/Home-sections/ServicesOrbit3D.css")
text = p.read_text(encoding="utf-8").replace("\r\n", "\n")
lines = [l for l in text.split("\n") if l.strip() != ""]
text = "\n".join(lines)
text = re.sub(r"\n(/\* -{3,})", r"\n\n\1", text)
text = re.sub(r"\n(@media)", r"\n\n\1", text)
text = re.sub(r"\n(@keyframes)", r"\n\n\1", text)

# Soft shared orbit line color + 3D rim look
old_orbit = """.tp-solar__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1.5px solid var(--tp-p-ring, var(--tp-orbit-line));
  border-radius: 50%;
  transform-style: preserve-3d;
  animation-name: tp-solar-orbit;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition-property: width, height, margin-left, margin-top, border-color;
  transition-duration: 0.8s;
  transition-timing-function: ease-in-out;
}"""

new_orbit = """.tp-solar__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(90, 82, 68, 0.22);
  border-radius: 50%;
  transform-style: preserve-3d;
  animation-name: tp-solar-orbit;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition-property: width, height, margin-left, margin-top, border-color, box-shadow;
  transition-duration: 0.8s;
  transition-timing-function: ease-in-out;
  /* Soft 3D ring: outer glow + inner highlight */
  box-shadow:
    0 0 0 1px rgba(255, 252, 242, 0.55),
    inset 0 1px 1px rgba(255, 255, 255, 0.45),
    inset 0 -1px 1px rgba(11, 11, 11, 0.08),
    0 2px 8px rgba(11, 11, 11, 0.06);
}

.tp-solar__orbit::before {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid rgba(11, 11, 11, 0.08);
  pointer-events: none;
  box-sizing: border-box;
}"""

if old_orbit not in text:
    raise SystemExit("orbit block not found")
text = text.replace(old_orbit, new_orbit)

# Remove loud per-orbit color overrides at end
text = re.sub(
    r"\n/\* Per-service planet color accents \*/[\s\S]*$",
    "\n",
    text,
)

# Soften default orbit line var
text = text.replace(
    "--tp-orbit-line: rgba(11, 11, 11, 0.28);",
    "--tp-orbit-line: rgba(90, 82, 68, 0.22);",
)

# Slightly smaller system scale so wider outer orbits still fit
text = text.replace(
    """.tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {
  font-size: 64%;
}
.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {
  font-size: 72%;
}""",
    """.tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {
  font-size: 58%;
}
.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {
  font-size: 66%;
}""",
)

p.write_text(text.replace("\n", "\r\n") + "\r\n", encoding="utf-8")
print("orbit styles updated", "::before" in text and "Per-service" not in text)
