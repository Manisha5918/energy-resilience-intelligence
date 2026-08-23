$sourcePath = "C:\Dotnet Internship\Projects\energyshield"
$zipPath = "C:\Dotnet Internship\Projects\energyshield-project.zip"
$tempStage = Join-Path $env:TEMP "energyshield-zip-stage"

Write-Host "Creating clean staging directory at: $tempStage"
if (Test-Path $tempStage) {
    Remove-Item -Path $tempStage -Recurse -Force
}
if (Test-Path $zipPath) {
    Remove-Item -Path $zipPath -Force
}
New-Item -ItemType Directory -Path $tempStage | Out-Null

Write-Host "Copying files excluding node_modules, .next, .git..."
& robocopy $sourcePath $tempStage /E /XD node_modules .next .git .turbo /XF *.log energyshield.zip energyshield-project.zip

Write-Host "Compressing archive to: $zipPath"
[System.Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem") | Out-Null
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempStage, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

Write-Host "Cleaning up staging directory..."
Remove-Item -Path $tempStage -Recurse -Force

if (Test-Path $zipPath) {
    $fileItem = Get-Item $zipPath
    $sizeMb = [math]::Round($fileItem.Length / 1MB, 2)
    Write-Host "SUCCESS: Created $zipPath ($sizeMb MB)"
} else {
    Write-Host "ERROR: Failed to create zip file"
}
