@echo off
echo =============================================================
echo   AETHERIA SMART HOME - PUBLIC WORLDWIDE ACCESS LAUNCHER
echo =============================================================
echo.
echo Starting 4 Services:
echo   1. Unified Backend API Server  (Port 5000)
echo   2. Aetheria SmartHome Store    (Port 3000)
echo   3. SmartHomes Admin Console    (Port 3001)
echo   4. Global Public Internet Tunnel (Works on ANY Wi-Fi / 4G / 5G)
echo.

start "SmartHomes Backend (:5000)" cmd /k "cd /d %~dp0smarthomes-backend && npm run dev"
timeout /t 3 /nobreak >nul

start "SmartHome Storefront (:3000)" cmd /k "cd /d %~dp0aetheria-smart-home && npm run dev"
timeout /t 2 /nobreak >nul

start "SmartHomes Admin Console (:3001)" cmd /k "cd /d %~dp0smarthomes-admin && npm run dev"
timeout /t 2 /nobreak >nul

start "Worldwide Public Tunnels" cmd /k "cd /d %~dp0smarthomes-backend && npm run tunnel"

echo.
echo All services and Public Tunnels launched!
echo Check the "Worldwide Public Tunnels" window to copy your public HTTPS links!
echo =============================================================
pause
