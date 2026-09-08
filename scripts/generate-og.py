import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SOURCE_PATH = "/Users/dianpunya/Downloads/logo-galaui.png"
PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public"))

# 2x Retina Canvas (2400 x 1260) - crystal sharp on all displays, zero pixelation
W, H = 2400, 1260

# Fonts (San Francisco Pro - ultra crisp)
HN_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"
SF_PATH = "/System/Library/Fonts/SFNS.ttf"

def get_font(size, bold=False):
    if bold:
        try:
            return ImageFont.truetype(HN_PATH, size, index=1) # Helvetica Neue Bold
        except:
            pass
    return ImageFont.truetype(SF_PATH, size)

# 1. Clean Deep Black / Obsidian Background (#09090b)
# NO borders, NO gradients, 100% pure minimalist aesthetic
canvas = Image.new('RGBA', (W, H), (9, 9, 11, 255))
draw = ImageDraw.Draw(canvas)

# 2. Razor-Sharp Logo Mark from High-Res Source
img_src = Image.open(SOURCE_PATH).convert('L')
arr = np.array(img_src, dtype=np.float32)
alpha = np.clip((250.0 - arr) / (250.0 - 20.0) * 255.0, 0, 255).astype(np.uint8)

ys, xs = np.where(alpha > 15)
min_y, max_y = int(ys.min()), int(ys.max())
min_x, max_x = int(xs.min()), int(xs.max())
mark_w = max_x - min_x + 1
mark_h = max_y - min_y + 1
cropped_alpha = alpha[min_y:max_y+1, min_x:max_x+1]

# Scale mark to 260px height (sharp downsampling with Lanczos)
target_h = 260
target_w = int(mark_w * (target_h / mark_h))
alpha_pil = Image.fromarray(cropped_alpha, mode='L')
resized_alpha = alpha_pil.resize((target_w, target_h), Image.Resampling.LANCZOS)

mark_white = Image.new('RGBA', (target_w, target_h), (255, 255, 255, 255))
mark_x = (W - target_w) // 2
mark_y = 200
canvas.paste(mark_white, (mark_x, mark_y), resized_alpha)

# 3. Crystal-Clear Typography
# Brand Title: 'GalaUI' in BOLD
font_title = get_font(136, bold=True)
title_text = "GalaUI"
t_box = draw.textbbox((0, 0), title_text, font=font_title, stroke_width=2)
tw = t_box[2] - t_box[0]
title_x = (W - tw) // 2
title_y = 490
draw.text((title_x, title_y), title_text, font=font_title, fill=(255, 255, 255, 255), stroke_width=2, stroke_fill=(255, 255, 255, 255))

# Headline: 'Accessible, modern React components.'
font_head = get_font(48)
head_text = "Accessible, modern React components."
h_box = draw.textbbox((0, 0), head_text, font=font_head)
hw = h_box[2] - h_box[0]
head_x = (W - hw) // 2
head_y = 660
draw.text((head_x, head_y), head_text, font=font_head, fill=(228, 228, 231, 255)) # zinc-200

# Subtitle: 'A clean design system powered by Base UI and Tailwind CSS v4.'
font_sub = get_font(34)
sub_text = "A clean design system powered by Base UI and Tailwind CSS v4."
s_box = draw.textbbox((0, 0), sub_text, font=font_sub)
sw = s_box[2] - s_box[0]
sub_x = (W - sw) // 2
sub_y = 730
draw.text((sub_x, sub_y), sub_text, font=font_sub, fill=(161, 161, 170, 255)) # zinc-400

# 4. Minimalist Install Command Capsule
font_mono = get_font(30)
cmd_text = "$  pnpm add @galaui/react"
c_box = draw.textbbox((0, 0), cmd_text, font=font_mono)
cw = c_box[2] - c_box[0]
pill_w = cw + 80
pill_h = 76
pill_x = (W - pill_w) // 2
pill_y = 830

# Capsule pill with dark fill and subtle zinc-800 border
draw.rounded_rectangle([(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)], radius=38, fill=(18, 18, 22, 255), outline=(39, 39, 42, 255), width=2)
draw.text((pill_x + 40, pill_y + 19), cmd_text, font=font_mono, fill=(244, 244, 245, 255))

# 5. Feature Badges Row
font_feat = get_font(26)
feat_text = "Base UI Primitives   •   Tailwind CSS v4   •   100% Accessible"
f_box = draw.textbbox((0, 0), feat_text, font=font_feat)
fw = f_box[2] - f_box[0]
feat_x = (W - fw) // 2
feat_y = 960
draw.text((feat_x, feat_y), feat_text, font=font_feat, fill=(113, 113, 122, 255)) # zinc-500

# Save public/og.png at 2400x1260 (2x Retina)
canvas.save(os.path.join(PUBLIC_DIR, "og.png"), "PNG")
print("Successfully generated ultra-sharp minimalist public/og.png (2400x1260)")
