Add-Type -AssemblyName System.Speech
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.Rate = 0
$voice.Volume = 100
$voice.SetOutputToWaveFile("C:\Users\mayan\Projects\SHELTRON\video_frames\test_voice.wav")
$voice.Speak("SHELTRON. Design Before You Build.")
$voice.Dispose()
Write-Host "Voice generated successfully!"
