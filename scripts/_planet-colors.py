from pathlib import Path
import re

p = Path(r"e:/Traveling-Partner-Website/components/Home-sections/ServicesOrbit3D.css")
text = p.read_text(encoding="utf-8").replace("\r\n", "\n")
lines = [l for l in text.split("\n") if l.strip() != ""]
text = "\n".join(lines)
text = re.sub(r"\n(/\* -{3,})", r"\n\n\1", text)
text = re.sub(r"\n(@media)", r"\n\n\1", text)
text = re.sub(r"\n(@keyframes)", r"\n\n\1", text)

# Orbit lines use per-planet ring color
text = text.replace(
    "border: 1px solid var(--tp-orbit-line);",
    "border: 1.5px solid var(--tp-p-ring, var(--tp-orbit-line));",
)

# Replace planet-sphere background to use CSS vars
old_sphere_bg = """background:
    radial-gradient(circle at 32% 28%, #ffffff 0%, #f4efe3 34%, #d9d0be 68%, #aea48f 100%);
  box-shadow:
    inset -0.18em -0.12em 0.28em rgba(0, 0, 0, 0.55),
    inset 0.14em 0.1em 0.2em rgba(255, 255, 255, 0.85),
    inset 0 0 0 0.03em rgba(252, 224, 1, 0.55),
    0 0.06em 0.16em rgba(0, 0, 0, 0.22);"""

new_sphere_bg = """background:
    radial-gradient(
      circle at 32% 28%,
      #ffffff 0%,
      var(--tp-p-hi, #f4efe3) 28%,
      var(--tp-p-mid, #d9d0be) 62%,
      var(--tp-p-deep, #aea48f) 100%
    );
  box-shadow:
    inset -0.18em -0.12em 0.28em rgba(0, 0, 0, 0.45),
    inset 0.14em 0.1em 0.2em rgba(255, 255, 255, 0.75),
    inset 0 0 0 0.04em var(--tp-p-ring, rgba(252, 224, 1, 0.55)),
    0 0 0.35em color-mix(in srgb, var(--tp-p-mid, #d9d0be) 45%, transparent),
    0 0.06em 0.16em rgba(0, 0, 0, 0.22);"""

if old_sphere_bg not in text:
    # try looser match
    print("sphere bg block not exact")
else:
    text = text.replace(old_sphere_bg, new_sphere_bg)

# Soften mask so colored sphere shows more around icons
text = text.replace(
    "mask-image: radial-gradient(circle at 50% 50%, #000 55%, transparent 78%);",
    "mask-image: radial-gradient(circle at 50% 50%, #000 48%, transparent 72%);",
)
text = text.replace(
    "-webkit-mask-image: radial-gradient(circle at 50% 50%, #000 55%, transparent 78%);",
    "-webkit-mask-image: radial-gradient(circle at 50% 50%, #000 48%, transparent 72%);",
)

# Label accent border matching planet
if ".tp-solar__label {" in text and "border: 1px solid" not in text[text.find(".tp-solar__label {") : text.find(".tp-solar__label {") + 400]:
    text = text.replace(
        """.tp-solar__label {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(11, 11, 11, 0.88);
  color: #fff;""",
        """.tp-solar__label {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(11, 11, 11, 0.9);
  border: 1px solid var(--tp-p-mid, #fce001);
  color: #fff;""",
    )

# Logistics ring tint
text = text.replace(
    "border: 0.16em solid rgba(160, 147, 130, 0.8);",
    "border: 0.16em solid color-mix(in srgb, var(--tp-p-mid, #8b5cf6) 75%, #a09382);",
)
text = text.replace(
    "border: 0.05em solid rgba(160, 147, 130, 0.4);",
    "border: 0.05em solid color-mix(in srgb, var(--tp-p-mid, #8b5cf6) 45%, transparent);",
)

# Append distinct orbit glow helpers if not present
if "/* Per-service planet color accents */" not in text:
    text += """

/* Per-service planet color accents */
.tp-solar__orbit {
  box-shadow: 0 0 0 0 transparent;
}

.tp-solar__orbit--daily-rides {
  border-color: rgba(252, 224, 1, 0.45);
}
.tp-solar__orbit--pool-ride {
  border-color: rgba(255, 138, 61, 0.45);
}
.tp-solar__orbit--delivery {
  border-color: rgba(139, 94, 60, 0.45);
}
.tp-solar__orbit--logistics {
  border-color: rgba(139, 92, 246, 0.45);
}
.tp-solar__orbit--tourism {
  border-color: rgba(20, 184, 166, 0.45);
}
.tp-solar__orbit--tracking {
  border-color: rgba(239, 68, 68, 0.45);
}

.tp-solar__planet--daily-rides .tp-solar__planet-sphere,
.tp-solar__planet--pool-ride .tp-solar__planet-sphere,
.tp-solar__planet--delivery .tp-solar__planet-sphere,
.tp-solar__planet--logistics .tp-solar__planet-sphere,
.tp-solar__planet--tourism .tp-solar__planet-sphere,
.tp-solar__planet--tracking .tp-solar__planet-sphere {
  /* color comes from CSS vars set inline */
}
"""

p.write_text(text.replace("\n", "\r\n") + "\r\n", encoding="utf-8")
print("ok", "tp-p-mid" in text, "orbit--tourism" in text)
