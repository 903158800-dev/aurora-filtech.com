from PIL import Image, ImageDraw, ImageFont, ImageColor
import os
import math

# Configuration
OUTPUT_DIR = r"D:\TRAE的程序\阿罗拉网站改版\design_light\assets"
FONTS_DIR = r"C:\Windows\Fonts"

# Light Theme Colors
COLORS = {
    "text_main": "#0f172a",  # Slate 900
    "primary": "#0284c7",    # Sky 600
    "bg_start": "#f8fafc",   # Slate 50
    "bg_end": "#e2e8f0"      # Slate 200
}

def get_font(name, size):
    try:
        path = os.path.join(FONTS_DIR, name)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
        else:
            return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

def create_logo():
    print("Generating Logo...")
    W, H = 600, 150
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    font = get_font("arialbd.ttf", 80) 

    text1 = "Arora"
    text2 = "Filters"
    
    # Draw "Arora" in Dark Slate
    draw.text((20, 20), text1, font=font, fill=COLORS["text_main"])
    
    # Measure
    bbox1 = draw.textbbox((20, 20), text1, font=font)
    width1 = bbox1[2] - bbox1[0]
    
    # Draw "Filters" in Primary Blue
    draw.text((20 + width1, 20), text2, font=font, fill=COLORS["primary"])
    
    # Crop
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        final_img = Image.new('RGBA', (img.width + 20, img.height + 20), (0,0,0,0))
        final_img.paste(img, (10, 10))
        final_img.save(os.path.join(OUTPUT_DIR, "logo.png"))
        print("logo.png saved.")

def create_hero_bg():
    print("Generating Hero Background...")
    W, H = 1920, 1080
    img = Image.new('RGB', (W, H))
    
    c1 = ImageColor.getrgb(COLORS["bg_start"]) 
    c2 = ImageColor.getrgb(COLORS["bg_end"])   
    
    grad_w, grad_h = 200, 200
    grad_img = Image.new('RGB', (grad_w, grad_h))
    grad_pixels = grad_img.load()
    
    for y in range(grad_h):
        for x in range(grad_w):
            ratio = (x + y) / (grad_w + grad_h)
            r = int(c1[0] + (c2[0] - c1[0]) * ratio)
            g = int(c1[1] + (c2[1] - c1[1]) * ratio)
            b = int(c1[2] + (c2[2] - c1[2]) * ratio)
            grad_pixels[x, y] = (r, g, b)
            
    final_bg = grad_img.resize((W, H), resample=Image.Resampling.BICUBIC)
    final_bg.save(os.path.join(OUTPUT_DIR, "hero_bg.png"))
    print("hero_bg.png saved.")

def create_tech_overlay():
    print("Generating Tech Overlay...")
    W, H = 800, 800
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Use primary color but very low opacity
    color = (2, 132, 199, 30) # Sky 600 with low alpha
    
    cx, cy = W//2, H//2
    r = 200
    draw.ellipse((cx-r, cy-r, cx+r, cy+r), outline=color, width=4)
    
    r2 = 140
    draw.ellipse((cx-r2, cy-r2, cx+r2, cy+r2), outline=color, width=2)
    
    draw.line((cx-r-50, cy, cx+r+50, cy), fill=color, width=2)
    draw.line((cx, cy-r-50, cx, cy+r+50), fill=color, width=2)
    
    for x in range(0, W, 100):
        for y in range(0, H, 100):
            draw.ellipse((x-2, y-2, x+2, y+2), fill=color)
            
    draw.line((0, 0, 200, 200), fill=color, width=1)
    draw.line((W, 0, W-200, 200), fill=color, width=1)
    draw.line((0, H, 200, H-200), fill=color, width=1)
    draw.line((W, H, W-200, H-200), fill=color, width=1)
    
    img.save(os.path.join(OUTPUT_DIR, "tech_overlay.png"))
    print("tech_overlay.png saved.")

if __name__ == "__main__":
    create_logo()
    create_hero_bg()
    create_tech_overlay()
