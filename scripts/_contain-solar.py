from pathlib import Path
import re

p = Path(r"e:/Traveling-Partner-Website/components/Home-sections/ServicesOrbit3D.css")
text = p.read_text(encoding="utf-8").replace("\r\n", "\n")
lines = [l for l in text.split("\n") if l.strip() != ""]
text = "\n".join(lines)
text = re.sub(r"\n(/\* -{3,})", r"\n\n\1", text)
text = re.sub(r"\n(@media)", r"\n\n\1", text)
text = re.sub(r"\n(@keyframes)", r"\n\n\1", text)

# Contain inside section — no page spill
text = re.sub(
    r"(\.tp-solar \{[^}]*?)overflow:\s*visible;",
    r"\1overflow: hidden;",
    text,
    count=1,
    flags=re.S,
)
text = re.sub(
    r"(\.tp-solar__stage \{[^}]*?)overflow:\s*visible;",
    r"\1overflow: hidden;",
    text,
    count=1,
    flags=re.S,
)
text = re.sub(
    r"(\.tp-solar__universe \{[^}]*?)overflow:\s*visible;",
    r"\1overflow: hidden;",
    text,
    count=1,
    flags=re.S,
)
text = re.sub(
    r"(\.tp-solar__galaxy \{[^}]*?)overflow:\s*visible;",
    r"\1overflow: hidden;",
    text,
    count=1,
    flags=re.S,
)

# Fit scales — outer orbit must stay inside box
text = text.replace(
    """.tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {
  font-size: 58%;
}
.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {
  font-size: 66%;
}""",
    """.tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {
  font-size: 52%;
}
.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {
  font-size: 58%;
}""",
)

# Also replace if still at older values
text = text.replace(
    """.tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {
  font-size: 64%;
}
.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {
  font-size: 72%;
}""",
    """.tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system {
  font-size: 52%;
}
.tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system {
  font-size: 58%;
}""",
)

# Base font + height — fluid but capped so it never blows past column
text = text.replace(
    "font-size: clamp(6px, 1.25vw, 12px);",
    "font-size: clamp(5px, 1.1cqw + 0.4vw, 10px);",
)
text = text.replace(
    "min-height: clamp(260px, 62vw, 660px);",
    "min-height: clamp(240px, 55vw, 560px);",
)
text = text.replace(
    "min-height: clamp(280px, 68vw, 720px);",
    "min-height: clamp(260px, 60vw, 600px);",
)
text = text.replace(
    "min-height: clamp(250px, 58vw, 620px);",
    "min-height: clamp(230px, 52vw, 520px);",
)

# Stage padding for labels inside clip
text = text.replace(
    ".tp-solar--view-2d .tp-solar__stage {\n  padding: 9% 6%;\n}",
    ".tp-solar--view-2d .tp-solar__stage {\n  padding: 10% 8%;\n}",
)
text = text.replace(
    ".tp-solar--view-3d .tp-solar__stage {\n  padding: 3% 9%;\n}",
    ".tp-solar--view-3d .tp-solar__stage {\n  padding: 4% 10%;\n}",
)
text = text.replace(
    ".tp-solar--view-2d .tp-solar__stage {\n  padding: 8% 5%;\n}",
    ".tp-solar--view-2d .tp-solar__stage {\n  padding: 10% 8%;\n}",
)
text = text.replace(
    ".tp-solar--view-3d .tp-solar__stage {\n  padding: 2.5% 8%;\n}",
    ".tp-solar--view-3d .tp-solar__stage {\n  padding: 4% 10%;\n}",
)

# Media query system scales — keep contained
def fix_media_scales(t: str) -> str:
    out = []
    in_3d = False
    in_2d = False
    for line in t.split("\n"):
        if ".tp-solar--zoom-large.tp-solar--view-3d .tp-solar__system" in line:
            in_3d = True
            in_2d = False
            out.append(line)
            continue
        if ".tp-solar--zoom-large.tp-solar--view-2d .tp-solar__system" in line:
            in_2d = True
            in_3d = False
            out.append(line)
            continue
        if (in_3d or in_2d) and "font-size:" in line:
            if in_3d:
                line = re.sub(r"font-size:\s*[\d.]+%;", "font-size: 56%;", line)
            else:
                line = re.sub(r"font-size:\s*[\d.]+%;", "font-size: 50%;", line)
            in_3d = in_2d = False
        elif line.strip().startswith("}"):
            in_3d = in_2d = False
        out.append(line)
    return "\n".join(out)

text = fix_media_scales(text)

# Desktop can be a bit larger
text = re.sub(
    r"(@media \(min-width: 1024px\) \{[\s\S]*?\.tp-solar--zoom-large\.tp-solar--view-3d \.tp-solar__system \{\n\s*)font-size: 56%;",
    r"\1font-size: 60%;",
    text,
    count=1,
)
text = re.sub(
    r"(@media \(min-width: 1024px\) \{[\s\S]*?\.tp-solar--zoom-large\.tp-solar--view-2d \.tp-solar__system \{\n\s*)font-size: 50%;",
    r"\1font-size: 54%;",
    text,
    count=1,
)
text = re.sub(
    r"(@media \(min-width: 1400px\) \{[\s\S]*?\.tp-solar--zoom-large\.tp-solar--view-3d \.tp-solar__system \{\n\s*)font-size: 56%;",
    r"\1font-size: 62%;",
    text,
    count=1,
)
text = re.sub(
    r"(@media \(min-width: 1400px\) \{[\s\S]*?\.tp-solar--zoom-large\.tp-solar--view-2d \.tp-solar__system \{\n\s*)font-size: 50%;",
    r"\1font-size: 56%;",
    text,
    count=1,
)

# Sun a bit smaller so first ring stays clear but system fits
text = text.replace("font-size: 19em;", "font-size: 16em;")

p.write_text(text.replace("\n", "\r\n") + "\r\n", encoding="utf-8")
print("contained")
print("overflow hidden", text.count("overflow: hidden"))
print("3d base", "font-size: 58%" in text or "font-size: 60%" in text)
