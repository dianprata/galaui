from PIL import Image, ImageDraw
from PIL import ImageFont
import numpy as np
import os
import shutil

SOURCE_PATH = "/Users/dianpunya/Downloads/logo-galaui.png"
PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public"))
os.makedirs(PUBLIC_DIR, exist_ok=True)

print(f"Reading source image from {SOURCE_PATH}...")
img_src = Image.open(SOURCE_PATH).convert("L")
arr = np.array(img_src, dtype=np.float32)

alpha = np.clip((250.0 - arr) / (250.0 - 20.0) * 255.0, 0, 255).astype(np.uint8)

ys, xs = np.where(alpha > 15)
min_y, max_y = int(ys.min()), int(ys.max())
min_x, max_x = int(xs.min()), int(xs.max())
mark_w = max_x - min_x + 1
mark_h = max_y - min_y + 1
print(f"Mark bounding box: x=[{min_x}, {max_x}] (w={mark_w}), y=[{min_y}, {max_y}] (h={mark_h})")

cropped_alpha = alpha[min_y:max_y+1, min_x:max_x+1]

def make_square_logo(canvas_size=512, fill_ratio=0.82, color="black"):
    target_h = int(canvas_size * fill_ratio)
    target_w = int(mark_w * (target_h / mark_h))
    alpha_pil = Image.fromarray(cropped_alpha, mode="L")
    resized_alpha = alpha_pil.resize((target_w, target_h), Image.Resampling.LANCZOS)
    offset_x = (canvas_size - target_w) // 2
    offset_y = (canvas_size - target_h) // 2
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    if color == "black":
        rgb_color = (15, 15, 17)
    elif color == "white":
        rgb_color = (255, 255, 255)
    else:
        rgb_color = (0, 0, 0)
    fill_img = Image.new("RGBA", (target_w, target_h), (*rgb_color, 255))
    canvas.paste(fill_img, (offset_x, offset_y), resized_alpha)
    return canvas

# 1. Standard PNG logos (transparent background for navbar & documentation)
logo_black_512 = make_square_logo(512, fill_ratio=0.82, color="black")
logo_black_512.save(os.path.join(PUBLIC_DIR, "logo.png"), "PNG")
print("Saved public/logo.png (512x512)")

logo_white_512 = make_square_logo(512, fill_ratio=0.82, color="white")
logo_white_512.save(os.path.join(PUBLIC_DIR, "logo-white.png"), "PNG")
print("Saved public/logo-white.png (512x512)")

# 1b. Full Logo + Text Lockup (mark + GalaUI typography)
def make_logo_lockup(color='black', scale=3):
    canvas_h = 80 * scale
    target_mark_h = 58 * scale
    target_mark_w = int(mark_w * (target_mark_h / mark_h))
    alpha_pil = Image.fromarray(cropped_alpha, mode='L')
    resized_mark = alpha_pil.resize((target_mark_w, target_mark_h), Image.Resampling.LANCZOS)
    font_size = 48 * scale
    font = ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', font_size, index=1)
    text = 'GalaUI'
    dummy = Image.new('RGBA', (1, 1))
    d_draw = ImageDraw.Draw(dummy)
    bbox = d_draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    gap = 14 * scale
    pad_x = 8 * scale
    total_w = pad_x * 2 + target_mark_w + gap + text_w
    img = Image.new('RGBA', (total_w, canvas_h), (0, 0, 0, 0))
    rgb = (15, 15, 17) if color == 'black' else (255, 255, 255)
    mark_fill = Image.new('RGBA', (target_mark_w, target_mark_h), (*rgb, 255))
    mark_y = (canvas_h - target_mark_h) // 2
    img.paste(mark_fill, (pad_x, mark_y), resized_mark)
    mark_center_y = mark_y + target_mark_h / 2.0
    text_x = pad_x + target_mark_w + gap - bbox[0]
    text_draw_y = int(mark_center_y - (bbox[1] + bbox[3]) / 2.0)
    draw = ImageDraw.Draw(img)
    draw.text((text_x, text_draw_y), text, font=font, fill=(*rgb, 255))
    final_w = total_w // scale
    final_h = canvas_h // scale
    return img.resize((final_w * 2, final_h * 2), Image.Resampling.LANCZOS) # High-DPI 2x

logo_text_black = make_logo_lockup('black')
logo_text_black.save(os.path.join(PUBLIC_DIR, 'logo-text.png'), 'PNG')
print('Saved public/logo-text.png')

logo_text_white = make_logo_lockup('white')
logo_text_white.save(os.path.join(PUBLIC_DIR, 'logo-text-white.png'), 'PNG')
print('Saved public/logo-text-white.png')

# 2. Favicons with rounded dark background tile so they NEVER disappear in light mode or dark mode
def make_favicon_with_bg(size=512, radius_ratio=0.22, mark_ratio=0.64, bg_color=(9, 9, 11), fg_color=(255, 255, 255)):
    radius = int(size * radius_ratio)
    ss = 4
    s_size = size * ss
    s_radius = radius * ss
    mask = Image.new('L', (s_size, s_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (s_size-1, s_size-1)], radius=s_radius, fill=255)
    tile = Image.new('RGBA', (s_size, s_size), (*bg_color, 255))
    target_h = int(s_size * mark_ratio)
    target_w = int(mark_w * (target_h / mark_h))
    alpha_pil = Image.fromarray(cropped_alpha, mode='L')
    resized_alpha = alpha_pil.resize((target_w, target_h), Image.Resampling.LANCZOS)
    fg_fill = Image.new('RGBA', (target_w, target_h), (*fg_color, 255))
    off_x = (s_size - target_w) // 2
    off_y = (s_size - target_h) // 2
    tile.paste(fg_fill, (off_x, off_y), resized_alpha)
    tile.putalpha(mask)
    return tile.resize((size, size), Image.Resampling.LANCZOS)

favicon_512 = make_favicon_with_bg(512)
favicon_512.save(os.path.join(PUBLIC_DIR, "favicon.png"), "PNG")
print("Saved public/favicon.png (512x512 with dark rounded bg)")

favicon_32 = make_favicon_with_bg(32, mark_ratio=0.68)
favicon_32.save(os.path.join(PUBLIC_DIR, "favicon-32x32.png"), "PNG")
print("Saved public/favicon-32x32.png (32x32 with dark rounded bg)")

favicon_16 = make_favicon_with_bg(16, mark_ratio=0.72)
favicon_16.save(os.path.join(PUBLIC_DIR, "favicon-16x16.png"), "PNG")
print("Saved public/favicon-16x16.png (16x16 with dark rounded bg)")

apple_icon = make_favicon_with_bg(180, radius_ratio=0.22, mark_ratio=0.64)
apple_icon.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
print("Saved public/apple-touch-icon.png (180x180 with dark rounded bg)")

ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = [make_favicon_with_bg(s[0], mark_ratio=0.68) for s in ico_sizes]
ico_images[0].save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO", sizes=ico_sizes, append_images=ico_images[1:])
print("Saved public/favicon.ico (multi-size with dark rounded bg)")

# Copy original
shutil.copyfile(SOURCE_PATH, os.path.join(PUBLIC_DIR, "logo-original.png"))
print("Copied public/logo-original.png")

# 3. SVG generation
mask = alpha > 100
labels = np.zeros_like(mask, dtype=int)
current_label = 1
for y in range(mask.shape[0]):
    for x in range(mask.shape[1]):
        if mask[y, x] and labels[y, x] == 0:
            q = [(y, x)]
            labels[y, x] = current_label
            cnt = 0
            while q:
                cy, cx = q.pop()
                cnt += 1
                for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < mask.shape[0] and 0 <= nx < mask.shape[1]:
                        if mask[ny, nx] and labels[ny, nx] == 0:
                            labels[ny, nx] = current_label
                            q.append((ny, nx))
            if cnt > 1000:
                current_label += 1

dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]

def rdp(points, epsilon=0.25):
    if len(points) < 3:
        return points
    start = points[0]
    end = points[-1]
    dx = end[0] - start[0]
    dy = end[1] - start[1]
    line_len = np.hypot(dx, dy)
    if line_len == 0:
        dists = np.hypot(points[:,0] - start[0], points[:,1] - start[1])
    else:
        dists = np.abs(dx * (start[1] - points[:,1]) - dy * (start[0] - points[:,0])) / line_len
    idx = np.argmax(dists)
    if dists[idx] > epsilon:
        left = rdp(points[:idx+1], epsilon)
        right = rdp(points[idx:], epsilon)
        return np.vstack((left[:-1], right))
    else:
        return np.vstack((start, end))

canvas_size = 100.0
fill_ratio = 0.82
scale = (canvas_size * fill_ratio) / mark_h
offset_x = (canvas_size - (mark_w * scale)) / 2.0
offset_y = (canvas_size - (mark_h * scale)) / 2.0

fav_scale = (canvas_size * 0.64) / mark_h
fav_off_x = (canvas_size - (mark_w * fav_scale)) / 2.0
fav_off_y = (canvas_size - (mark_h * fav_scale)) / 2.0

logo_svg_paths = []
fav_svg_paths = []

for lab in range(1, current_label):
    comp_mask = (labels == lab)
    padded = np.pad(comp_mask, 1, mode='constant', constant_values=False)
    ys, xs = np.where(padded)
    p = (ys[0], xs[0])
    b = (ys[0], xs[0] - 1)
    start_pt, backtrack = p, b
    boundary = []
    for step in range(100000):
        dy, dx = b[0] - p[0], b[1] - p[1]
        b_idx = dirs.index((dy, dx))
        next_p, next_b = None, None
        for i in range(1, 9):
            idx = (b_idx + i) % 8
            ny, nx = p[0] + dirs[idx][0], p[1] + dirs[idx][1]
            if padded[ny, nx]:
                next_p = (ny, nx)
                prev_idx = (idx - 1) % 8
                next_b = (p[0] + dirs[prev_idx][0], p[1] + dirs[prev_idx][1])
                break
        if next_p is None:
            break
        boundary.append([float(p[1]-1), float(p[0]-1)])
        if step > 0 and next_p == start_pt and next_b == backtrack:
            break
        p, b = next_p, next_b
    pts = np.array(boundary, dtype=np.float32)
    
    # Logo SVG points (82% scale)
    pts_logo = pts.copy()
    pts_logo[:, 0] = (pts_logo[:, 0] - min_x) * scale + offset_x
    pts_logo[:, 1] = (pts_logo[:, 1] - min_y) * scale + offset_y
    simp_logo = rdp(pts_logo, epsilon=0.25)
    d_logo = "M " + " L ".join([f"{x:0.2f} {y:0.2f}" for x, y in simp_logo]) + " Z"
    logo_svg_paths.append(d_logo)
    
    # Favicon SVG points (64% scale)
    pts_fav = pts.copy()
    pts_fav[:, 0] = (pts_fav[:, 0] - min_x) * fav_scale + fav_off_x
    pts_fav[:, 1] = (pts_fav[:, 1] - min_y) * fav_scale + fav_off_y
    simp_fav = rdp(pts_fav, epsilon=0.25)
    d_fav = "M " + " L ".join([f"{x:0.2f} {y:0.2f}" for x, y in simp_fav]) + " Z"
    fav_svg_paths.append(d_fav)

print(f"Extracted {len(logo_svg_paths)} SVG paths")
logo_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">\n'
for p in logo_svg_paths:
    logo_svg += f'  <path d="{p}" />\n'
logo_svg += '</svg>\n'
with open(os.path.join(PUBLIC_DIR, "logo.svg"), "w") as f:
    f.write(logo_svg)
print("Saved public/logo.svg")

# Save public/logo-text.svg with currentColor
logo_text_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234 80" fill="currentColor">
  <g transform="translate(8, 11) scale(0.58)">
'''
for p in logo_svg_paths:
    logo_text_svg += f'    <path d="{p}" />\n'
logo_text_svg += '''  </g>
  <text x="74" y="54" font-family="Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="700" letter-spacing="-0.03em">GalaUI</text>
</svg>
'''
with open(os.path.join(PUBLIC_DIR, "logo-text.svg"), "w") as f:
    f.write(logo_text_svg)
print("Saved public/logo-text.svg")

# Favicon SVG with rounded background so it never disappears on any tab theme
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#09090b" />
  <g fill="#fafafa">
'''
for p in fav_svg_paths:
    favicon_svg += f'    <path d="{p}" />\n'
favicon_svg += '  </g>\n</svg>\n'
with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w") as f:
    f.write(favicon_svg)
print("Saved public/favicon.svg (with rounded background)")

print("All assets generated successfully!")
