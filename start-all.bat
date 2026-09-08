@echo off
echo =============================================================
echo   AETHERIA SMART HOME - UNIFIED ECOSYSTEM LAUNCHER
echo =============================================================
echo.
echo Starting 3 Services:
echo   1. Unified Backend API Server  (Port 5000)
echo   2. Aetheria SmartHome Store    (Port 3000)
echo   3. SmartHomes Admin Console    (Port 3001)
echo.

start "SmartHomes Backend (:5000)" cmd /k "cd /d %~dp0smarthomes-backend && npm run dev"
timeout /t 3 /nobreak >nul

start "SmartHome Storefront (:3000)" cmd /k "cd /d %~dp0aetheria-smart-home && npm run dev"
timeout /t 2 /nobreak >nul

start "SmartHomes Admin Console (:3001)" cmd /k "cd /d %~dp0smarthomes-admin && npm run dev"

echo.
echo All services launched!
echo - Storefront:   http://localhost:3000
echo - Admin Panel:  http://localhost:3001
echo - Backend API:  http://localhost:5000
echo.
echo To open on mobile or other laptops, find your laptop IP in the Backend console!
echo =============================================================
pause
