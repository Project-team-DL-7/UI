
# Dockerfile for Task Manager UI

This Dockerfile provides the configuration to containerize the Task Manager UI (frontend) using Node.js and React.


## Prerequisites
- Docker: Install from [Docker.com](https://www.docker.com/products/docker-desktop/).

- Docker Compose: Usually comes with Docker Desktop for Windows/Mac, may need to be installed separately for Linux.


## Overview of the Dockerfile

-  **Base Image:** Uses the official Node.js runtime as the base image (Node.js 16).

-  **Working Directory:** All operations occur in the `/usr/src/app` directory within the container.

-  **Dependencies Installation:** Copies over `package.json` and `package-lock.json` to the working directory in the container and runs `npm install`.

-  **Application Code:** Copies the rest of the application code into the container.

-  **React Build:** Executes `npm run build` to compile the React app into static assets.

-  **Starting the Application:** By default, the container serves the built React app using the `serve` module on port 8080.

## Building & Running the Docker Container

Using Docker Compose simplifies the process of building and running the containerized application. Execute the following command in the directory containing `docker-compose.yml` to build the container:

```powershell
docker-compose up --build
```
to run the container:
```powershell
docker-compose up
```
## Troubleshooting
### Port Conflicts

If you encounter errors related to ports (e.g., port 3000 is already in use), you can identify and stop the process occupying the port:
1. **Check the process using port 3000  in Powershell:**
```powershell
Get-Process  -Id (Get-NetTCPConnection  -LocalPort 3000).OwningProcess
```
Example response:
```powershell
Handles NPM(K) PM(K) WS(K) CPU(s) Id SI ProcessName

-------  ------  -----  -----  ------  --  --  -----------

965  42  67204  86040  20.14  18076  6 com.docker.backend

138  10  1504  7676  0.00  17044  6 wslrelay

Stop the process using its Id, replace 18706 with the correct ID from the output above:

Stop-Process  -Id 18706  -Force
```