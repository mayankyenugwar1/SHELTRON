Add-Type -AssemblyName System.Speech
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.Rate = 0
$voice.Volume = 100

$outDir = "C:\Users\mayan\Projects\SHELTRON\video_frames\audio"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

function Make-Audio($filename, $text) {
    $path = Join-Path $outDir $filename
    $voice.SetOutputToWaveFile($path)
    $voice.Speak($text)
    Write-Host "Created $filename"
}

Make-Audio "01_intro_climate.wav" "One shelter design cannot fit every climate. Temperature, sunlight, humidity and wind vary from place to place."
Make-Audio "02_intro_problem.wav" "Yet shelters are often designed without fully adapting to these conditions. What if we could test the shelter before building it?"
Make-Audio "03_intro_title.wav" "SHELTRON. Design Before You Build."
Make-Audio "04_live_walkthrough.wav" "SHELTRON analyzes the local climate, creates a suitable shelter design, simulates its thermal performance, and allows users to change design elements and compare the results before construction."
Make-Audio "05_live_3d_twin.wav" "In the 3D Digital Twin, users customize orientation, roof forms, and shading overhangs with real-time physical feedback."
Make-Audio "06_live_compare.wav" "Design. Simulate. Compare. Optimize."
Make-Audio "07_live_suppliers.wav" "Find Suppliers connects recommended materials directly to verified local vendors with Google Maps routing, turning digital optimization into physical reality."
Make-Audio "08_outro_impact.wav" "SHELTRON goes beyond designing a shelter. It helps us design the right shelter for the right climate, before it is built."
Make-Audio "09_outro_end.wav" "SHELTRON. Design Before You Build."

$voice.Dispose()
Write-Host "All voice tracks generated!"
