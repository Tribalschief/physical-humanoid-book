Write-Host "Starting all services locally..."

# Start Backend (Port 8000)
Write-Host "Launching Backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {cd backend; if (Test-Path venv) { .\venv\Scripts\Activate.ps1 } else { python -m venv venv; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt }; uvicorn main:app --reload --port 8000}"

# Start Auth Server (Port 4000)
Write-Host "Launching Auth Server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {cd auth-server; npm install; npm run dev}"

# Start Frontend (Port 3000)
Write-Host "Launching Frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {cd physical-ai-book; npm install; npm run start}"

Write-Host "All services launching in separate windows."
