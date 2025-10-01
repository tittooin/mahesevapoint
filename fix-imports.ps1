$directory = "c:\Users\tittoo\Downloads\mahesevapoint-main (1)\mahesevapoint-main\client\src\components\ui"
$files = Get-ChildItem -Path $directory -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $updatedContent = $content -replace 'import \{ cn \} from "@/lib/utils"', 'import { cn } from "../../lib/utils"'
    
    if ($content -ne $updatedContent) {
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "All imports have been fixed!"