import re

file_path = "style.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

color_map = {
    "#00ffcc": "#b2f5ea",
    "#fff200": "#fefcbf",
    "#ff8ad8": "#fed7e2",
    "#20004f": "#2d3748",
    "#003d82": "#4a5568",
    "#111111": "#a0aec0",
    "#ff00aa": "#fbb6ce",
    "#00a000": "#9ae6b4",
    "#001eff": "#90cdf4",
    "#ff5a00": "#fbd38d",
    "#ff0000": "#feb2b2",
    "#00aaff": "#bee3f8",
    "#b9ff00": "#d4efdf",
    "#f8c4ff": "#e9d8fd",
    "#a7fffb": "#e6fffa",
    "#0000ff": "#a3bffa",
    "#00ff00": "#c6f6d5",
    "#d10000": "#fc8181",
    "#ffb000": "#fbd38d",
    "#f7ff72": "#fefcbf",
    "#5b008e": "#805ad5",
    "#808080": "#cbd5e0",
    "#eaffff": "#ebf8ff",
    "#c6ff00": "#d4efdf",
    "rgba(255, 0, 170, 0.28)": "rgba(251, 182, 206, 0.4)",
    "rgba(0, 30, 255, 0.45)": "rgba(144, 205, 244, 0.6)"
}

def replace_color(match):
    hex_color = match.group(0).lower()
    return color_map.get(hex_color, match.group(0))

for old_color, new_color in color_map.items():
    if old_color.startswith("#"):
        content = re.sub(old_color, new_color, content, flags=re.IGNORECASE)
    else:
        content = content.replace(old_color, new_color)

# Also reduce shadow intensity
content = content.replace("12px 12px 0", "6px 6px 0")
content = content.replace("20px 20px 0", "10px 10px 0")
content = content.replace("9px 9px 0", "4px 4px 0")
content = content.replace("3px 3px 0", "1px 1px 0")
content = content.replace("6px 6px 0", "3px 3px 0")
content = content.replace("5px 5px 0", "2px 2px 0")
content = content.replace("4px 4px 0", "2px 2px 0")
content = content.replace("7px 7px 0", "3px 3px 0")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Colors and shadows updated successfully.")
