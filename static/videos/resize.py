import subprocess
import glob
import os

def get_video_height(filename):
    """Uses ffprobe to get the height of the video."""
    try:
        result = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-select_streams", "v:0",
                "-show_entries", "stream=height",
                "-of", "csv=p=0", filename
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        height_str = result.stdout.strip()
        return int(height_str)
    except Exception as e:
        print(f"Error obtaining height for '{filename}': {e}")
        return None

def resize_video(input_file, target_height):
    """Uses ffmpeg to resize the video while keeping the aspect ratio."""
    base, ext = os.path.splitext(input_file)
    output_file = f"{base}_resized{ext}"
    
    command = [
        "ffmpeg", "-i", input_file,
        "-vf", f"scale=-2:{target_height}",
        "-c:a", "copy",  # Copy audio without re-encoding.
        output_file
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"Saved resized video as '{output_file}'")
    except subprocess.CalledProcessError as e:
        print(f"Error resizing '{input_file}': {e}")

def process_videos():
    # Get all mp4 files in the current directory.
    mp4_files = glob.glob("*.mp4")
    if not mp4_files:
        print("No MP4 files found in the current directory.")
        return

    for file in mp4_files:
        print(f"\nProcessing '{file}'...")
        height = get_video_height(file)
        if height is None:
            continue

        # Decide the target height based on the original video's height.
        if height > 720:
            target_height = 720
        else:
            target_height = 320

        print(f"Original height: {height} pixels. Resizing to height: {target_height} pixels.")
        resize_video(file, target_height)

if __name__ == '__main__':
    process_videos()
