import os
import sys
import wave
from PIL import Image, ImageDraw, ImageFont
from moviepy import ImageClip, AudioFileClip, concatenate_videoclips

BASE_DIR = r"C:\Users\mayan\Projects\SHELTRON"
FRAMES_DIR = os.path.join(BASE_DIR, "video_frames")
AUDIO_DIR = os.path.join(FRAMES_DIR, "audio")
BRAIN_DIR = r"C:\Users\mayan\.gemini\antigravity\brain\40c8ea18-74b4-4ec9-8c65-8494bded7e51"

WIDTH, HEIGHT = 1920, 1080

def get_font(size, bold=False):
    font_names = [
        "seguiemb.ttf" if bold else "segoeui.ttf",
        "arialbd.ttf" if bold else "arial.ttf",
        "calibrib.ttf" if bold else "calibri.ttf"
    ]
    for fn in font_names:
        font_path = os.path.join(r"C:\Windows\Fonts", fn)
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except Exception:
                pass
    return ImageFont.load_default()

def create_title_cards():
    # 1. Intro Title Card
    img_intro = Image.new("RGB", (WIDTH, HEIGHT), color="#123B2A")
    draw = ImageDraw.Draw(img_intro)
    
    # Subtle background gradient rect
    draw.rectangle([0, 0, WIDTH, HEIGHT], fill="#123B2A")
    # Soft sage horizontal accent line
    draw.rectangle([0, HEIGHT//2 - 200, WIDTH, HEIGHT//2 + 200], fill="#1A4A35")
    draw.rectangle([0, HEIGHT//2 - 2, WIDTH, HEIGHT//2 + 2], fill="#4D8A58")

    # Brand Pill Badge
    pill_w, pill_h = 580, 70
    px = (WIDTH - pill_w) // 2
    py = HEIGHT // 2 - 160
    draw.rounded_rectangle([px, py, px + pill_w, py + pill_h], radius=35, fill="#EDF5EB", outline="#C2DCB3", width=2)
    font_badge = get_font(24, bold=True)
    draw.text((px + 45, py + 18), "🌱 CLIMATE-TECH ARCHITECTURE", fill="#123B2A", font=font_badge)

    # Main Brand Name
    font_title = get_font(84, bold=True)
    draw.text(((WIDTH - 500) // 2, HEIGHT // 2 - 60), "SHELTRON", fill="#FFFFFF", font=font_title)

    # Tagline
    font_tag = get_font(38, bold=True)
    draw.text(((WIDTH - 580) // 2, HEIGHT // 2 + 50), "DESIGN BEFORE YOU BUILD", fill="#709C53", font=font_tag)

    font_sub = get_font(24, bold=False)
    draw.text(((WIDTH - 920) // 2, HEIGHT // 2 + 130), 
              "Climate-Adaptive Shelter Design & Thermal Comfort Optimization Platform", 
              fill="#C2DCB3", font=font_sub)

    intro_path = os.path.join(FRAMES_DIR, "00_intro_title.png")
    img_intro.save(intro_path)
    print(f"Saved: {intro_path}")

    # 2. Outro Title Card
    img_outro = Image.new("RGB", (WIDTH, HEIGHT), color="#123B2A")
    draw_out = ImageDraw.Draw(img_outro)
    draw_out.rectangle([0, 0, WIDTH, HEIGHT], fill="#123B2A")
    draw_out.rectangle([0, HEIGHT//2 - 220, WIDTH, HEIGHT//2 + 220], fill="#164330")

    # Emblem Circle
    cx, cy = WIDTH // 2, HEIGHT // 2 - 120
    draw_out.ellipse([cx - 65, cy - 65, cx + 65, cy + 65], fill="#EDF5EB", outline="#709C53", width=3)
    font_icon = get_font(48, bold=True)
    draw_out.text((cx - 24, cy - 35), "🌱", fill="#123B2A", font=font_icon)

    draw_out.text(((WIDTH - 480) // 2, HEIGHT // 2 - 20), "SHELTRON", fill="#FFFFFF", font=font_title)
    draw_out.text(((WIDTH - 580) // 2, HEIGHT // 2 + 80), "DESIGN BEFORE YOU BUILD", fill="#709C53", font=font_tag)

    font_outro_sub = get_font(22, bold=False)
    draw_out.text(((WIDTH - 840) // 2, HEIGHT // 2 + 160),
                  "Empowering Climate-Resilient Shelters Before Breaking Ground",
                  fill="#C2DCB3", font=font_outro_sub)
    draw_out.text(((WIDTH - 360) // 2, HEIGHT // 2 + 210),
                  "Smart India Hackathon 2026",
                  fill="#82A57E", font=get_font(20, bold=True))

    outro_path = os.path.join(FRAMES_DIR, "99_outro_end.png")
    img_outro.save(outro_path)
    print(f"Saved: {outro_path}")

def overlay_lower_third(image_path, stage_tag, title_text, output_path):
    img = Image.open(image_path).convert("RGB")
    if img.size != (WIDTH, HEIGHT):
        img = img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)

    # Sleek bottom gradient bar
    bar_h = 100
    overlay = Image.new("RGBA", (WIDTH, bar_h), (18, 59, 42, 235))
    img.paste(overlay, (0, HEIGHT - bar_h), overlay)

    # Accent green line
    draw.rectangle([0, HEIGHT - bar_h, WIDTH, HEIGHT - bar_h + 4], fill="#709C53")

    # Text
    font_tag = get_font(18, bold=True)
    font_title = get_font(26, bold=True)

    draw.text((60, HEIGHT - bar_h + 18), stage_tag.upper(), fill="#82A57E", font=font_tag)
    draw.text((60, HEIGHT - bar_h + 48), title_text, fill="#FFFFFF", font=font_title)

    # Right branding stamp
    font_brand = get_font(20, bold=True)
    draw.text((WIDTH - 280, HEIGHT - bar_h + 38), "SHELTRON Live Demo", fill="#C2DCB3", font=font_brand)

    img.save(output_path)

def get_audio_duration(wav_path):
    with wave.open(wav_path, "r") as w:
        return w.getnframes() / float(w.getframerate())

def build_video():
    print("Preparing title cards...")
    create_title_cards()

    # AI Images paths
    ai_heat = os.path.join(BRAIN_DIR, "intro_heat_climate_1791191362178.jpg")
    ai_tin = os.path.join(BRAIN_DIR, "intro_tin_shelter_1791191477152.jpg")
    ai_realized = os.path.join(BRAIN_DIR, "outro_realized_home_1791191497104.jpg")

    # Live Website Overlays
    annotated_dir = os.path.join(FRAMES_DIR, "annotated")
    os.makedirs(annotated_dir, exist_ok=True)

    live_stages = [
        ("01_landing.png", "Platform Overview", "Interactive Bioclimatic Digital Twin & Architecture"),
        ("02_create_site.png", "Stage 1: Site Ingestion", "Location, Dimensions & Household Metabolic Load"),
        ("03_climate.png", "Stage 2: Climate Analysis", "30-Year IMD Weather Normals & Solar Insolation"),
        ("04_materials.png", "Stage 3: Materials & Comfort", "U-Values, Thermal Phase Lag & Biophilic Cooling"),
        ("05_3d_twin.png", "Stage 4: 3D Twin Studio", "Parametric Geometry, Chajja Overhangs & Orientation"),
        ("06_simulation.png", "Stage 5: Thermal Simulation", "24-Hour Diurnal Operative Curves (-8.7°C Drop)"),
        ("07_heatmap.png", "Stage 5: Spatial Heatmap", "9-Point Plan Grid Hotspots & Sol-Air Radiation"),
        ("08_what_if.png", "Stage 6: What-If Sandbox", "Multi-Objective Parametric Mutation Deliberation"),
        ("09_compare.png", "Stage 7: Design Comparison", "Side-by-Side Baseline (38.2°C) vs Optimized (29.8°C)"),
        ("10_result.png", "Stage 8: Optimized Result", "Complete Executive Scorecard & Engineering Dossier"),
        ("11_suppliers_modal.png", "Stage 8: Material-to-Market", "Verified Nearby Suppliers with Direct Google Maps Routing")
    ]

    for src_name, tag, title in live_stages:
        src_p = os.path.join(FRAMES_DIR, src_name)
        dst_p = os.path.join(annotated_dir, src_name)
        if os.path.exists(src_p):
            overlay_lower_third(src_p, tag, title, dst_p)

    # Audio files
    aud_01 = os.path.join(AUDIO_DIR, "01_intro_climate.wav")
    aud_02 = os.path.join(AUDIO_DIR, "02_intro_problem.wav")
    aud_03 = os.path.join(AUDIO_DIR, "03_intro_title.wav")
    aud_04 = os.path.join(AUDIO_DIR, "04_live_walkthrough.wav")
    aud_05 = os.path.join(AUDIO_DIR, "05_live_3d_twin.wav")
    aud_06 = os.path.join(AUDIO_DIR, "06_live_compare.wav")
    aud_07 = os.path.join(AUDIO_DIR, "07_live_suppliers.wav")
    aud_08 = os.path.join(AUDIO_DIR, "08_outro_impact.wav")
    aud_09 = os.path.join(AUDIO_DIR, "09_outro_end.wav")

    dur_01 = get_audio_duration(aud_01)
    dur_02 = get_audio_duration(aud_02)
    dur_03 = get_audio_duration(aud_03)
    dur_04 = get_audio_duration(aud_04)
    dur_05 = get_audio_duration(aud_05)
    dur_06 = get_audio_duration(aud_06)
    dur_07 = get_audio_duration(aud_07)
    dur_08 = get_audio_duration(aud_08)
    dur_09 = get_audio_duration(aud_09)

    print("Building Timeline Clips...")
    clips = []

    # Helper to add image clip with audio
    def add_clip(img_path, audio_path, duration):
        img = Image.open(img_path).convert("RGB")
        if img.size != (WIDTH, HEIGHT):
            img = img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
            temp_path = img_path + "_resized.png"
            img.save(temp_path)
            clip = ImageClip(temp_path).with_duration(duration)
        else:
            clip = ImageClip(img_path).with_duration(duration)
            
        if audio_path and os.path.exists(audio_path):
            audio = AudioFileClip(audio_path)
            clip = clip.with_audio(audio)
        return clip

    # 1. INTRO
    clips.append(add_clip(ai_heat, aud_01, dur_01))
    clips.append(add_clip(ai_tin, aud_02, dur_02))
    clips.append(add_clip(os.path.join(FRAMES_DIR, "00_intro_title.png"), aud_03, dur_03))

    # 2. LIVE WEBSITE SECTION
    # Group 1: Overview to Materials (4 frames over dur_04)
    g1_frames = ["01_landing.png", "02_create_site.png", "03_climate.png", "04_materials.png"]
    g1_dur = dur_04 / len(g1_frames)
    audio_04 = AudioFileClip(aud_04)
    g1_clips = []
    for f in g1_frames:
        g1_clips.append(ImageClip(os.path.join(annotated_dir, f)).with_duration(g1_dur))
    group1 = concatenate_videoclips(g1_clips).with_audio(audio_04)
    clips.append(group1)

    # Group 2: 3D Twin & Simulation & Heatmap (3 frames over dur_05)
    g2_frames = ["05_3d_twin.png", "06_simulation.png", "07_heatmap.png"]
    g2_dur = dur_05 / len(g2_frames)
    audio_05 = AudioFileClip(aud_05)
    g2_clips = []
    for f in g2_frames:
        g2_clips.append(ImageClip(os.path.join(annotated_dir, f)).with_duration(g2_dur))
    group2 = concatenate_videoclips(g2_clips).with_audio(audio_05)
    clips.append(group2)

    # Group 3: What-If & Compare (2 frames over dur_06)
    g3_frames = ["08_what_if.png", "09_compare.png"]
    g3_dur = dur_06 / len(g3_frames)
    audio_06 = AudioFileClip(aud_06)
    g3_clips = []
    for f in g3_frames:
        g3_clips.append(ImageClip(os.path.join(annotated_dir, f)).with_duration(g3_dur))
    group3 = concatenate_videoclips(g3_clips).with_audio(audio_06)
    clips.append(group3)

    # Group 4: Result & Suppliers Modal (2 frames over dur_07)
    g4_frames = ["10_result.png", "11_suppliers_modal.png"]
    g4_dur = dur_07 / len(g4_frames)
    audio_07 = AudioFileClip(aud_07)
    g4_clips = []
    for f in g4_frames:
        g4_clips.append(ImageClip(os.path.join(annotated_dir, f)).with_duration(g4_dur))
    group4 = concatenate_videoclips(g4_clips).with_audio(audio_07)
    clips.append(group4)

    # 3. OUTRO
    clips.append(add_clip(ai_realized, aud_08, dur_08))
    clips.append(add_clip(os.path.join(FRAMES_DIR, "99_outro_end.png"), aud_09, dur_09))

    print("Concatenating complete video timeline...")
    final_video = concatenate_videoclips(clips, method="compose")
    output_mp4 = os.path.join(BASE_DIR, "SHELTRON_Hackathon_Demo_Video.mp4")

    print(f"Rendering final MP4 to {output_mp4} at 30 FPS...")
    final_video.write_videofile(
        output_mp4,
        fps=30,
        codec="libx264",
        audio_codec="aac",
        preset="fast",
        threads=4
    )
    print("DEMO VIDEO RENDER COMPLETE!")

if __name__ == "__main__":
    build_video()
