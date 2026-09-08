@echo off
echo =============================================================
echo   AETHERIA SMART HOME - AUTOMATIC DEPENDENCY INSTALLER
echo =============================================================
echo.
echo Installing dependencies for all 3 project modules...
echo Please ensure Node.js is installed on your computer.
echo.

echo -------------------------------------------------------------
echo [1/3] Installing Backend Dependencies (Port 5000)...
echo -------------------------------------------------------------
cd /d "%~dp0smarthomes-backend"
call npm install

echo.
echo -------------------------------------------------------------
echo [2/3] Installing Storefront Customer App (Port 3000)...
echo -------------------------------------------------------------
cd /d "%~dp0aetheria-smart-home"
call npm install

echo.
echo -------------------------------------------------------------
echo [3/3] Installing Admin Management Console (Port 3001)...
echo -------------------------------------------------------------
cd /d "%~dp0smarthomes-admin"
call npm install

echo.
echo =============================================================
echo   SUCCESS: ALL DEPENDENCIES INSTALLED AND READY!
echo =============================================================
echo.
echo Next step:
echo   - Run "start-all.bat" to launch on Localhost / Wi-Fi
echo   - Or run "start-with-public-internet.bat" for Worldwide Access on ANY Network
echo.
echo =============================================================
pause
