from pathlib import Path
import re

p = Path(r"e:/Traveling-Partner-Website/components/Home-sections/ServicesOrbit3D.css")
text = p.read_text(encoding="utf-8").replace("\r\n", "\n")
lines = [l for l in text.split("\n") if l.strip() != ""]
text = "\n".join(lines)
text = re.sub(r"\n(/\* -{3,})", r"\n\n\1", text)
text = re.sub(r"\n(@media)", r"\n\n\1", text)
text = re.sub(r"\n(@keyframes)", r"\n\n\1", text)

# Slightly bigger than current (not huge)
repls = [
    ("font-size: clamp(5.5px, 1.15vw, 11px);", "font-size: clamp(6px, 1.25vw, 12px);"),
    ("min-height: clamp(240px, 58vw, 620px);", "min-height: clamp(260px, 62vw, 660px);"),
    ("min-height: clamp(260px, 64vw, 680px);", "min-height: clamp(280px, 68vw, 720px);"),
    ("min-height: clamp(230px, 54vw, 580px);", "min-height: clamp(250px, 58vw, 620px);"),
    # base zoom scales
    (
        ".tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {\n  font-size: 64%;\n}\n.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {\n  font-size: 74%;\n}",
        ".tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {\n  font-size: 68%;\n}\n.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {\n  font-size: 80%;\n}",
    ),
    # media bumps
    ("font-size: clamp(5px, 2.2vw, 7px);", "font-size: clamp(5.5px, 2.35vw, 8px);"),
    ("min-height: clamp(220px, 82vw, 320px);", "min-height: clamp(240px, 86vw, 340px);"),
    ("min-height: clamp(240px, 88vw, 360px);", "min-height: clamp(260px, 92vw, 380px);"),
    ("min-height: clamp(210px, 78vw, 300px);", "min-height: clamp(230px, 82vw, 320px);"),
    ("font-size: clamp(5.5px, 2.1vw, 8.5px);", "font-size: clamp(6px, 2.25vw, 9px);"),
    ("min-height: clamp(250px, 78vw, 380px);", "min-height: clamp(270px, 82vw, 400px);"),
    ("min-height: clamp(270px, 86vw, 420px);", "min-height: clamp(290px, 90vw, 440px);"),
    ("min-height: clamp(240px, 74vw, 360px);", "min-height: clamp(260px, 78vw, 380px);"),
    ("font-size: clamp(6px, 1.25vw, 10px);", "font-size: clamp(6.5px, 1.35vw, 10.5px);"),
    ("min-height: clamp(320px, 52vw, 480px);", "min-height: clamp(340px, 55vw, 510px);"),
    ("min-height: clamp(340px, 56vw, 520px);", "min-height: clamp(360px, 58vw, 550px);"),
    ("min-height: clamp(300px, 48vw, 450px);", "min-height: clamp(320px, 50vw, 480px);"),
    ("font-size: clamp(7px, 0.9vw, 11px);", "font-size: clamp(7.5px, 0.95vw, 11.5px);"),
    ("min-height: clamp(360px, 38vw, 560px);", "min-height: clamp(380px, 40vw, 590px);"),
    ("min-height: clamp(390px, 42vw, 620px);", "min-height: clamp(410px, 44vw, 650px);"),
    ("min-height: clamp(340px, 36vw, 520px);", "min-height: clamp(360px, 38vw, 550px);"),
    ("font-size: clamp(8px, 0.8vw, 12px);", "font-size: clamp(8.5px, 0.85vw, 12.5px);"),
    ("min-height: clamp(400px, 34vw, 600px);", "min-height: clamp(420px, 36vw, 640px);"),
    ("min-height: clamp(440px, 38vw, 680px);", "min-height: clamp(460px, 40vw, 720px);"),
    ("min-height: clamp(380px, 32vw, 560px);", "min-height: clamp(400px, 34vw, 590px);"),
    ("font-size: clamp(9px, 0.72vw, 12.5px);", "font-size: clamp(9.5px, 0.78vw, 13px);"),
    ("min-height: clamp(440px, 30vw, 640px);", "min-height: clamp(460px, 32vw, 680px);"),
    ("min-height: clamp(480px, 34vw, 720px);", "min-height: clamp(500px, 36vw, 760px);"),
    ("min-height: clamp(420px, 28vw, 600px);", "min-height: clamp(440px, 30vw, 640px);"),
]

for a, b in repls:
    text = text.replace(a, b)

# Bump media system scales a bit (only zoom-large lines)
# Replace sequences carefully via regex for media blocks
def bump_media_scales(t: str) -> str:
    # 3d scales in media
    mapping = {
        "70%": "76%",
        "58%": "64%",
        "72%": "78%",
        "60%": "66%",
        "74%": "80%",
        "64%": "70%",
        "76%": "82%",
        "66%": "72%",
        "78%": "84%",
        "68%": "74%",
    }
    # Only bump inside zoom-large system rules in media queries - do line-based
    out = []
    in_zoom = False
    for line in t.split("\n"):
        if ".tp-solar--zoom-large.tp-solar--view-" in line and ".tp-solar__system" in line:
            in_zoom = True
            out.append(line)
            continue
        if in_zoom and "font-size:" in line:
            for old, new in mapping.items():
                if f"font-size: {old}" in line:
                    line = line.replace(f"font-size: {old}", f"font-size: {new}")
                    break
            in_zoom = False
        elif in_zoom and line.strip().startswith("}"):
            in_zoom = False
        out.append(line)
    return "\n".join(out)

text = bump_media_scales(text)

# Ensure no crop + hide scrollbars on solar
text = re.sub(
    r"(\.tp-solar \{[^}]*?)overflow:\s*hidden;",
    r"\1overflow: visible;",
    text,
    count=1,
    flags=re.S,
)
text = re.sub(
    r"(\.tp-solar__stage \{[^}]*?)overflow:\s*hidden;",
    r"\1overflow: visible;",
    text,
    count=1,
    flags=re.S,
)
text = re.sub(
    r"(\.tp-solar__universe \{[^}]*?)overflow:\s*hidden;",
    r"\1overflow: visible;",
    text,
    count=1,
    flags=re.S,
)

# Stronger scrollbar kill on .tp-solar
if "scrollbar-width: none" not in text[text.find(".tp-solar {") : text.find(".tp-solar {") + 500]:
    text = text.replace(
        "overflow: visible;\n  display: flex;",
        "overflow: visible;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  display: flex;",
        1,
    )

# Stage padding: enough room so planets don't force page scroll
text = text.replace(
    ".tp-solar--view-2d .tp-solar__stage {\n  padding: 8% 5%;\n}",
    ".tp-solar--view-2d .tp-solar__stage {\n  padding: 9% 6%;\n}",
)
text = text.replace(
    ".tp-solar--view-3d .tp-solar__stage {\n  padding: 2.5% 8%;\n}",
    ".tp-solar--view-3d .tp-solar__stage {\n  padding: 3% 9%;\n}",
)

p.write_text(text.replace("\n", "\r\n") + "\r\n", encoding="utf-8")
print("done")
print("base font", "1.25vw" in text)
print("3d scale base", "font-size: 80%" in text or "font-size: 82%" in text)
