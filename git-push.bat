@echo off
cd /d "C:\Users\vansh\OneDrive\Documents\Bussiness-website-main"
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Redesign: new Home.tsx modern UI - hero, services, about, testimonials, CTA"
"C:\Program Files\Git\bin\git.exe" push origin main
echo.
echo === DONE ===
pause
