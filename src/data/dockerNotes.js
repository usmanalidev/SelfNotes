// Docker Category Notes - Beginner to Advanced
export const dockerNotes = [
  {
    id: 400,
    category: 'Docker',
    question: 'What is Docker and why is it used?',
    answer: `**One-Sentence Definition:** Docker is a platform that uses containerization to package applications and their dependencies into lightweight, portable containers that can run consistently across different environments.

**The Core Concept:** Think of Docker like shipping containers. Just as shipping containers standardize how goods are transported (same container works on ship, truck, train), Docker containers standardize how applications run (same container works on your laptop, server, cloud). Everything needed is inside the container.

**Key Concepts:**

**1. Container:**
- Lightweight, standalone executable package
- Includes application code, runtime, libraries, dependencies
- Isolated from host and other containers
- Runs on any Docker-enabled machine

**2. Image:**
- Read-only template for creating containers
- Like a class (image) vs object (container)
- Built from Dockerfile
- Stored in registries (Docker Hub)

**3. Dockerfile:**
- Text file with instructions to build image
- Defines base image, dependencies, commands
- Each instruction creates a layer

**Why Use Docker:**
- **Consistency**: Works same everywhere ("works on my machine" solved)
- **Isolation**: Applications don't interfere with each other
- **Portability**: Run anywhere Docker runs
- **Efficiency**: Lightweight compared to VMs
- **Scalability**: Easy to scale containers
- **DevOps**: Simplifies CI/CD pipelines

**Docker vs Virtual Machines:**

| Feature | Docker | Virtual Machine |
|---------|--------|----------------|
| **Size** | MBs | GBs |
| **Startup** | Seconds | Minutes |
| **OS** | Shares host OS | Full OS per VM |
| **Isolation** | Process level | Hardware level |
| **Resource** | Lower overhead | Higher overhead |

**Example:**
\`\`\`dockerfile
# Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

**Why Interviewers Ask This:**
Docker is fundamental to modern software development and deployment, especially in microservices and cloud-native applications.`
  },
  {
    id: 401,
    category: 'Docker',
    question: 'What is the difference between Docker Image and Container?',
    answer: `**One-Sentence Definition:** A Docker image is a read-only template used to create containers, while a container is a running instance of an image with a writable layer on top.

**The Core Concept:** Think of image like a blueprint (read-only plan) and container like a house built from that blueprint (running instance). You can build multiple houses (containers) from one blueprint (image), and each house can have different furniture (data) but same structure.

**Key Differences:**

| Feature | Image | Container |
|---------|-------|-----------|
| **Nature** | Read-only template | Running instance |
| **State** | Immutable | Mutable (writable layer) |
| **Storage** | Stored in registry/disk | Running process |
| **Layers** | Multiple read-only layers | Image layers + writable layer |
| **Lifecycle** | Created once, reused | Created, started, stopped, deleted |

**Image:**
- Read-only template
- Built from Dockerfile
- Stored in layers
- Can't be modified (immutable)
- Shared across containers

**Container:**
- Running instance of image
- Has writable layer on top
- Can be started, stopped, deleted
- Changes in writable layer
- Isolated from other containers
- Example: Running web server, database

**Example:**
\`\`\`bash
# Pull image (template)
docker pull nginx:latest

# Create and run container (instance)
docker run -d -p 80:80 nginx:latest

# Create another container from same image
docker run -d -p 8080:80 nginx:latest
\`\`\`

**Layer Structure:**
\`\`\`
Container:
┌─────────────────┐
│ Writable Layer  │ ← Changes, logs, temp files
├─────────────────┤
│ Image Layers    │ ← Read-only (shared)
│ (Read-only)     │
└─────────────────┘
\`\`\`

**Important Notes:**
- Multiple containers can share same image
- Changes in container don't affect image
- To persist changes, commit container to new image
- Images are cached and reused efficiently

**Why Interviewers Ask This:**
Understanding the image-container relationship is fundamental to using Docker effectively and efficiently.`
  },
  {
    id: 402,
    category: 'Docker',
    question: 'What is a Dockerfile and how do you write one?',
    answer: `**One-Sentence Definition:** A Dockerfile is a text file containing instructions to build a Docker image, defining the base image, dependencies, environment, and commands needed to create a containerized application.

**The Core Concept:** Think of Dockerfile like a recipe. You list ingredients (base image, dependencies), steps (commands), and serving instructions (expose ports, run command). Docker follows this recipe to build your application image.

**Common Instructions:**

**1. FROM:**
- Sets base image
- Must be first instruction

**2. WORKDIR:**
- Sets working directory
- Creates directory if doesn't exist

**3. COPY/ADD:**
- Copies files from host to image
- COPY is preferred (simpler)

**4. RUN:**
- Executes commands during build
- Creates new layer

**5. EXPOSE:**
- Documents which ports app uses
- Doesn't actually publish ports

**6. CMD/ENTRYPOINT:**
- Defines command to run when container starts
- CMD can be overridden
- ENTRYPOINT cannot be overridden

**Example Dockerfile:**
\`\`\`dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js

# Run application
CMD ["node", "server.js"]
\`\`\`

**Best Practices:**
- Order instructions by change frequency
- Use multi-stage builds for smaller images
- Don't run as root
- Use .dockerignore
- Minimize layers
- Use cache effectively

**Why Interviewers Ask This:**
Writing efficient Dockerfiles is essential for creating optimized, secure, and maintainable container images.`
  },
  {
    id: 403,
    category: 'Docker',
    question: 'What are Docker Volumes and when to use them?',
    answer: `**One-Sentence Definition:** Docker volumes are persistent storage mechanisms that allow data to survive container lifecycle, enabling data sharing between containers and between containers and host.

**The Core Concept:** Think of volumes like external hard drives. When you delete a container (like formatting a computer), the data on volumes (external drive) remains safe. Volumes are separate from containers and persist independently.

**Types of Storage:**

**1. Volumes:**
- Managed by Docker
- Stored in Docker's directory
- Best for persistent data
- Can be shared between containers
- Example: Database data

**2. Bind Mounts:**
- Mount host directory into container
- Direct access to host filesystem
- Good for development
- Example: Mount source code

**3. tmpfs Mounts:**
- Stored in memory
- Fast but temporary
- Lost when container stops
- Example: Temporary files

**Volume Commands:**
\`\`\`bash
# Create volume
docker volume create myvolume

# List volumes
docker volume ls

# Inspect volume
docker volume inspect myvolume

# Remove volume
docker volume rm myvolume
\`\`\`

**Using Volumes:**
\`\`\`bash
# Named volume
docker run -v myvolume:/data nginx

# Bind mount
docker run -v /host/path:/container/path nginx

# Anonymous volume
docker run -v /data nginx
\`\`\`

**Example - Database with Volume:**
\`\`\`bash
# Create volume for database
docker volume create postgres-data

# Run PostgreSQL with volume
docker run -d \
  --name postgres \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres:14

# Data persists even if container is removed
docker rm postgres
docker run -d \
  --name postgres-new \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:14
# Data is still there!
\`\`\`

**When to Use:**
- **Volumes**: Production databases, persistent data
- **Bind Mounts**: Development, configuration files
- **tmpfs**: Temporary files, sensitive data

**Why Interviewers Ask This:**
Understanding volumes is crucial for managing data persistence and sharing in containerized applications.`
  },
  {
    id: 404,
    category: 'Docker',
    question: 'What is Docker Compose and how does it work?',
    answer: `**One-Sentence Definition:** Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file to configure services, networks, and volumes.

**The Core Concept:** Think of Docker Compose like a conductor's score. Instead of managing each musician (container) separately, the conductor (Compose) uses a score (YAML file) to orchestrate all musicians together, ensuring they play in harmony.

**Key Features:**
- Define multi-container applications
- Configure services, networks, volumes
- Single command to start/stop everything
- Service dependencies
- Environment variables
- Port mapping

**docker-compose.yml Example:**
\`\`\`yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/mydb
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/app
    networks:
      - app-network

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
\`\`\`

**Common Commands:**
\`\`\`bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# Rebuild images
docker-compose build

# Scale service
docker-compose up --scale web=3
\`\`\`

**Benefits:**
- Single file for entire application
- Easy to share and version control
- Consistent environments
- Simplified development setup
- Service orchestration

**Use Cases:**
- Local development environments
- Testing multi-service applications
- CI/CD pipelines
- Small production deployments

**Why Interviewers Ask This:**
Docker Compose is essential for managing complex multi-container applications, especially in development and testing.`
  },
  {
    id: 405,
    category: 'Docker',
    question: 'What is Docker Networking and what are the network types?',
    answer: `**One-Sentence Definition:** Docker networking enables containers to communicate with each other and external networks through various network drivers that provide isolation, connectivity, and routing capabilities.

**The Core Concept:** Think of Docker networks like different types of roads. Bridge network is like local streets (containers on same network), host network is like using main roads directly (no isolation), and overlay network is like highways connecting different cities (multi-host communication).

**Network Types:**

**1. Bridge Network (Default):**
- Default network for containers
- Containers can communicate by name
- Isolated from host network
- Good for single-host scenarios

**2. Host Network:**
- Container uses host's network directly
- No network isolation
- Better performance
- Linux only

**3. None Network:**
- Container has no network access
- Completely isolated
- Use for security-sensitive containers

**4. Overlay Network:**
- Connects multiple Docker hosts
- Used in Docker Swarm, Kubernetes
- Enables service discovery across hosts

**5. Macvlan Network:**
- Assigns MAC address to container
- Container appears as physical device
- Direct access to physical network
- Advanced use case

**Network Commands:**
\`\`\`bash
# List networks
docker network ls

# Create network
docker network create mynetwork

# Inspect network
docker network inspect mynetwork

# Connect container to network
docker network connect mynetwork container1

# Disconnect container
docker network disconnect mynetwork container1

# Remove network
docker network rm mynetwork
\`\`\`

**Example - Multi-Container Communication:**
\`\`\`bash
# Create custom network
docker network create app-network

# Run containers on same network
docker run -d --name web --network app-network nginx
docker run -d --name db --network app-network postgres

# Containers can communicate by name
# web can reach db at "db:5432"
\`\`\`

**Service Discovery:**
- Containers on same network can resolve each other by name
- Docker's built-in DNS
- Automatic name resolution
- No need for IP addresses

**Why Interviewers Ask This:**
Understanding Docker networking is crucial for building distributed applications and ensuring proper service communication.`
  },
  {
    id: 406,
    category: 'Docker',
    question: 'What are Docker Layers and how do they work?',
    answer: `**One-Sentence Definition:** Docker layers are read-only filesystem layers that stack on top of each other to form an image, with each instruction in a Dockerfile creating a new layer, enabling efficient caching and image reuse.

**The Core Concept:** Think of layers like a stack of transparent sheets. Each sheet (layer) has some content. When you stack them, you see the complete picture (image). If you change one sheet, you only need to replace that sheet and ones above it, not rebuild everything.

**How Layers Work:**
- Each Dockerfile instruction creates a layer
- Layers are read-only (immutable)
- Layers are cached and reused
- Only changed layers are rebuilt
- Layers are shared between images

**Example:**
\`\`\`dockerfile
FROM node:18          # Layer 1: Base image
WORKDIR /app          # Layer 2: Create directory
COPY package.json .   # Layer 3: Copy package.json
RUN npm install       # Layer 4: Install dependencies
COPY . .              # Layer 5: Copy source code
CMD ["node", "app.js"] # Layer 6: Set command
\`\`\`

**Layer Caching:**
\`\`\`
Build 1:
Layer 1 (FROM)        ← Cached
Layer 2 (WORKDIR)     ← Cached
Layer 3 (COPY)        ← Cached
Layer 4 (RUN)         ← Cached
Layer 5 (COPY)        ← Cached (if unchanged)
Layer 6 (CMD)         ← Cached

Build 2 (after code change):
Layer 1 (FROM)        ← Cached (reused)
Layer 2 (WORKDIR)     ← Cached (reused)
Layer 3 (COPY)        ← Cached (reused)
Layer 4 (RUN)         ← Cached (reused)
Layer 5 (COPY)        ← Rebuilt (changed)
Layer 6 (CMD)         ← Rebuilt (must rebuild after change)
\`\`\`

**Optimizing Layers:**
\`\`\`dockerfile
# Bad: Creates many layers
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2
RUN apt-get clean

# Good: Combines into one layer
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
\`\`\`

**Multi-Stage Builds:**
\`\`\`dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]
\`\`\`

**Benefits:**
- Faster builds (caching)
- Smaller images (shared layers)
- Efficient storage
- Faster pulls (only new layers)

**Why Interviewers Ask This:**
Understanding layers is key to writing efficient Dockerfiles and optimizing build times and image sizes.`
  },
  {
    id: 407,
    category: 'Docker',
    question: 'What is Docker Swarm and how does it differ from Kubernetes?',
    answer: `**One-Sentence Definition:** Docker Swarm is Docker's native clustering and orchestration tool that turns a group of Docker hosts into a single virtual Docker host, providing service deployment, scaling, and management capabilities.

**The Core Concept:** Think of Docker Swarm like a manager coordinating multiple workers. Instead of manually telling each worker (Docker host) what to do, the manager (Swarm) distributes work, handles failures, and scales up/down automatically. It's Docker's built-in way to manage clusters.

**Key Concepts:**

**1. Swarm:**
- Cluster of Docker hosts
- Managed as single system
- High availability
- Load balancing

**2. Nodes:**
- **Manager Nodes**: Control cluster, schedule services
- **Worker Nodes**: Run containers, execute tasks

**3. Services:**
- Definition of tasks to run
- Desired state (replicas, image, ports)
- Swarm maintains desired state

**4. Stack:**
- Collection of services
- Defined in compose file
- Deployed together

**Swarm vs Kubernetes:**

| Feature | Docker Swarm | Kubernetes |
|---------|--------------|------------|
| **Complexity** | Simple | Complex |
| **Learning Curve** | Easy | Steep |
| **Features** | Basic orchestration | Advanced features |
| **Scaling** | Good | Excellent |
| **Ecosystem** | Smaller | Large |
| **Use Case** | Small-medium deployments | Enterprise, complex apps |

**Swarm Commands:**
\`\`\`bash
# Initialize swarm
docker swarm init

# Join worker node
docker swarm join --token <token> <manager-ip>

# Create service
docker service create --replicas 3 --name web nginx

# Scale service
docker service scale web=5

# Update service
docker service update --image nginx:latest web

# View services
docker service ls

# View service logs
docker service logs web
\`\`\`

**docker-stack.yml:**
\`\`\`yaml
version: '3.8'

services:
  web:
    image: nginx
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    ports:
      - "80:80"
\`\`\`

**Deploy Stack:**
\`\`\`bash
docker stack deploy -c docker-stack.yml myapp
\`\`\`

**When to Use Swarm:**
- Simple orchestration needs
- Docker-native solution
- Small to medium deployments
- Teams familiar with Docker

**When to Use Kubernetes:**
- Complex applications
- Need advanced features
- Large scale deployments
- Enterprise requirements

**Why Interviewers Ask This:**
Understanding container orchestration tools shows you can manage production containerized applications at scale.`
  },
  {
    id: 408,
    category: 'Docker',
    question: 'What are Docker Health Checks and why are they important?',
    answer: `**One-Sentence Definition:** Docker health checks are mechanisms to verify that a container is running correctly by periodically executing a command inside the container, enabling automatic detection and handling of unhealthy containers.

**The Core Concept:** Think of health checks like a doctor's regular checkup. Instead of waiting for a patient (container) to collapse (crash), the doctor (Docker) periodically checks vital signs (health check command). If something's wrong, action can be taken before it's too late.

**Health Check States:**

**1. Starting:**
- Initial state when container starts
- Health check hasn't run yet

**2. Healthy:**
- Health check command succeeds
- Container is working correctly

**3. Unhealthy:**
- Health check command fails repeatedly
- Container may have issues
- Can trigger actions (restart, remove from load balancer)

**Ways to Define Health Checks:**

**1. Dockerfile (HEALTHCHECK):**
\`\`\`dockerfile
FROM nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
\`\`\`

**2. docker run:**
\`\`\`bash
docker run --health-cmd="curl -f http://localhost || exit 1" \
  --health-interval=30s \
  --health-timeout=3s \
  --health-retries=3 \
  nginx
\`\`\`

**3. docker-compose.yml:**
\`\`\`yaml
services:
  web:
    image: nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
\`\`\`

**Health Check Options:**
- **--interval**: Time between checks (default: 30s)
- **--timeout**: Time to wait for check (default: 30s)
- **--start-period**: Grace period at start (default: 0s)
- **--retries**: Consecutive failures before unhealthy (default: 3)

**Example - Node.js App:**
\`\`\`dockerfile
FROM node:18

# Health check script
COPY healthcheck.js ./

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node healthcheck.js
\`\`\`

\`\`\`javascript
// healthcheck.js
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', () => {
  process.exit(1);
});

request.end();
\`\`\`

**Benefits:**
- Automatic failure detection
- Better reliability
- Integration with orchestration (restart unhealthy)
- Load balancer integration
- Monitoring and alerting

**Why Interviewers Ask This:**
Health checks are essential for production applications to ensure reliability and automatic recovery from failures.`
  },
  {
    id: 409,
    category: 'Docker',
    question: 'What is Multi-Stage Build in Docker and why use it?',
    answer: `**One-Sentence Definition:** Multi-stage builds allow you to use multiple FROM statements in a Dockerfile, enabling you to build artifacts in one stage and copy only necessary files to a smaller final image, significantly reducing image size.

**The Core Concept:** Think of multi-stage builds like building a car. Stage 1 is the factory (build tools, compilers) where you build the car. Stage 2 is the showroom (runtime) where you only keep the finished car, not all the factory equipment. Result: smaller, cleaner final product.

**Problem Multi-Stage Solves:**
\`\`\`dockerfile
# Single-stage (BAD - large image)
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Image includes: Node.js, npm, source code, build tools, dependencies
# Size: ~900MB
\`\`\`

**Solution - Multi-Stage:**
\`\`\`dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# This stage has build tools, source, etc.

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]
# Final image only has: Node.js, production dependencies, built files
# Size: ~150MB
\`\`\`

**Benefits:**
- **Smaller Images**: Only final artifacts in image
- **Security**: No build tools in production image
- **Faster Deployments**: Smaller images = faster pulls
- **Cleaner**: No source code, build tools, or dev dependencies

**Advanced Example - Go Application:**
\`\`\`dockerfile
# Stage 1: Build
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o app

# Stage 2: Runtime
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/app .
CMD ["./app"]
# Final image: ~10MB (vs ~800MB with golang image)
\`\`\`

**Multiple Build Stages:**
\`\`\`dockerfile
# Stage 1: Dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
CMD ["node", "dist/server.js"]
\`\`\`

**Why Interviewers Ask This:**
Multi-stage builds are a best practice for creating production-ready, optimized Docker images with minimal size and attack surface.`
  },
  {
    id: 410,
    category: 'Docker',
    question: 'What is .dockerignore and why is it important?',
    answer: `**One-Sentence Definition:** .dockerignore is a file that specifies which files and directories should be excluded from the Docker build context, similar to .gitignore, improving build performance and security.

**The Core Concept:** Think of .dockerignore like a packing list for moving. You don't want to pack everything (node_modules, .git, logs) - you only pack what you need. This makes packing (building) faster and your boxes (images) smaller and cleaner.

**Why Use .dockerignore:**
- **Faster Builds**: Smaller build context = faster upload to Docker daemon
- **Smaller Images**: Exclude unnecessary files
- **Security**: Don't include secrets, credentials
- **Efficiency**: Don't send large files to Docker daemon

**Example .dockerignore:**
\`\`\`
# Dependencies (will be installed in container)
node_modules
npm-debug.log

# Git
.git
.gitignore
.gitattributes

# IDE
.vscode
.idea
*.swp
*.swo

# Environment files
.env
.env.local
.env.*.local

# Build outputs
dist
build
*.log

# Testing
coverage
.nyc_output
*.test.js

# Documentation
README.md
docs

# OS files
.DS_Store
Thumbs.db

# Docker files
Dockerfile
.dockerignore
docker-compose.yml
\`\`\`

**Impact Example:**
\`\`\`
Without .dockerignore:
Build context: 500MB
Upload time: 2 minutes
Image size: 800MB

With .dockerignore:
Build context: 50MB
Upload time: 10 seconds
Image size: 200MB
\`\`\`

**Best Practices:**
- Exclude node_modules, vendor directories
- Exclude .git directory
- Exclude test files
- Exclude documentation
- Exclude environment files
- Exclude IDE configuration
- Exclude build artifacts (if rebuilding)

**Why Interviewers Ask This:**
Using .dockerignore is a best practice that shows you understand Docker build optimization and security considerations.`
  },
  {
    id: 411,
    category: 'Docker',
    question: 'What are Docker Secrets and how do you manage them?',
    answer: `**One-Sentence Definition:** Docker Secrets is a secure way to manage sensitive data like passwords, API keys, and certificates in Docker Swarm, providing encrypted storage and transmission of secrets to services.

**The Core Concept:** Think of Docker Secrets like a secure vault. Instead of writing passwords on sticky notes (environment variables), you store them in a vault (secrets) with controlled access. Only authorized services can access the secrets, and they're encrypted at rest and in transit.

**Key Features:**
- Encrypted at rest
- Encrypted in transit
- Only accessible to services that need them
- Not stored in images or environment variables
- Managed by Docker Swarm

**Creating Secrets:**
\`\`\`bash
# From file
echo "mysecretpassword" | docker secret create db_password -

# From stdin
docker secret create api_key -
# (then type the secret, press Ctrl+D)

# From command
docker secret create db_password <(echo "mypassword")
\`\`\`

**Using Secrets in Services:**
\`\`\`bash
# Create service with secret
docker service create \
  --name web \
  --secret db_password \
  --secret api_key \
  nginx
\`\`\`

**Using Secrets in docker-compose.yml:**
\`\`\`yaml
version: '3.8'

services:
  web:
    image: nginx
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    external: true
  api_key:
    file: ./api_key.txt
\`\`\`

**Accessing Secrets in Container:**
- Read-only files
- Can be read by application
- Automatically removed when service stops

**Example - Application Reading Secret:**
\`\`\`javascript
// Read secret from file
const fs = require('fs');
const dbPassword = fs.readFileSync('/run/secrets/db_password', 'utf8').trim();

// Use in connection
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: dbPassword
});
\`\`\`

**Secret Management:**
\`\`\`bash
# List secrets
docker secret ls

# Inspect secret
docker secret inspect db_password

# Remove secret
docker secret rm db_password

# Update secret (create new, update service)
docker secret create db_password_v2 -
docker service update --secret-rm db_password --secret-add db_password_v2 web
\`\`\`

**Best Practices:**
- Never commit secrets to version control
- Use secrets for all sensitive data
- Rotate secrets regularly
- Limit access to secrets
- Use external secret managers for complex scenarios (Vault, AWS Secrets Manager)

**Why Interviewers Ask This:**
Managing secrets securely is critical for production applications, and Docker Secrets provides a built-in solution for Swarm deployments.`
  },
  {
    id: 412,
    category: 'Docker',
    question: 'What is Docker BuildKit and what are its advantages?',
    answer: `**One-Sentence Definition:** BuildKit is Docker's next-generation build engine that provides faster builds, better caching, parallel processing, and advanced features like secret mounting and cache mounts.

**The Core Concept:** Think of BuildKit like upgrading from a manual assembly line to an automated, optimized factory. The old builder (legacy) builds sequentially and is slower. BuildKit builds in parallel, caches smarter, and has advanced features for better performance.

**Key Advantages:**

**1. Performance:**
- Parallel build stages
- Better caching
- Faster layer creation
- Efficient dependency resolution

**2. Advanced Features:**
- Secret mounting (build-time secrets)
- Cache mounts (persistent cache)
- SSH agent forwarding
- Build-time secrets

**3. Better Output:**
- Cleaner build output
- Progress indicators
- Build summaries

**Enabling BuildKit:**
\`\`\`bash
# Environment variable
export DOCKER_BUILDKIT=1
docker build .

# Command flag
DOCKER_BUILDKIT=1 docker build .

# In docker-compose
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
\`\`\`

**Secret Mounting (Build-Time Secrets):**
\`\`\`dockerfile
# syntax=docker/dockerfile:1
FROM alpine

# Mount secret during build (not in final image)
RUN --mount=type=secret,id=mysecret \
    cat /run/secrets/mysecret
\`\`\`

\`\`\`bash
docker build --secret id=mysecret,src=./secret.txt .
\`\`\`

**Cache Mounts:**
\`\`\`dockerfile
# syntax=docker/dockerfile:1
FROM node:18

# Cache npm packages between builds
RUN --mount=type=cache,target=/root/.npm \
    npm install
\`\`\`

**SSH Agent Forwarding:**
\`\`\`dockerfile
# syntax=docker/dockerfile:1
FROM alpine

# Mount SSH agent for private repos
RUN --mount=type=ssh \
    git clone git@github.com:user/private-repo.git
\`\`\`

\`\`\`bash
docker build --ssh default .
\`\`\`

**Performance Comparison:**
\`\`\`
Legacy Builder:
- Sequential builds
- Basic caching
- Build time: 5 minutes

BuildKit:
- Parallel builds
- Advanced caching
- Build time: 2 minutes (60% faster)
\`\`\`

**Why Interviewers Ask This:**
BuildKit represents the future of Docker builds, and understanding it shows you're aware of modern Docker best practices and performance optimization.`
  },
  {
    id: 413,
    category: 'Docker',
    question: 'What is the difference between CMD and ENTRYPOINT in Dockerfile?',
    answer: `**One-Sentence Definition:** CMD sets the default command and arguments for a container but can be overridden, while ENTRYPOINT sets the main command that always runs and cannot be overridden, with CMD arguments appended to ENTRYPOINT.

**The Core Concept:** Think of ENTRYPOINT like a fixed program (like a calculator app) and CMD like default settings (like "calculate 2+2"). You can change the settings (CMD) but the program (ENTRYPOINT) always runs. Or use CMD alone for a default that can be completely replaced.

**Key Differences:**

| Feature | CMD | ENTRYPOINT |
|---------|-----|------------|
| **Override** | Can be overridden | Cannot be overridden |
| **Purpose** | Default command/args | Main executable |
| **Combination** | Replaced if ENTRYPOINT exists | Always runs, CMD becomes args |
| **Use Case** | Default behavior | Fixed executable |

**CMD Examples:**
\`\`\`dockerfile
# CMD as executable
CMD ["node", "server.js"]
# Can override: docker run image python app.py

# CMD as default arguments
ENTRYPOINT ["node"]
CMD ["server.js"]
# Can override args: docker run image app.js
\`\`\`

**ENTRYPOINT Examples:**
\`\`\`dockerfile
# ENTRYPOINT as executable
ENTRYPOINT ["node", "server.js"]
# Always runs node server.js
# Cannot override: docker run image python app.py (ignored)

# ENTRYPOINT with CMD args
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
# Always runs entrypoint script, CMD becomes arguments
\`\`\`

**Practical Examples:**

**1. CMD Only (Flexible):**
\`\`\`dockerfile
FROM node:18
COPY . .
CMD ["node", "server.js"]
\`\`\`
\`\`\`bash
# Default: runs node server.js
docker run myapp

# Override: runs python app.py instead
docker run myapp python app.py
\`\`\`

**2. ENTRYPOINT Only (Fixed):**
\`\`\`dockerfile
FROM node:18
COPY . .
ENTRYPOINT ["node", "server.js"]
\`\`\`
\`\`\`bash
# Always runs node server.js
docker run myapp

# Still runs node server.js (python ignored)
docker run myapp python app.py
\`\`\`

**3. ENTRYPOINT + CMD (Best of Both):**
\`\`\`dockerfile
FROM node:18
COPY . .
ENTRYPOINT ["node"]
CMD ["server.js"]
\`\`\`
\`\`\`bash
# Runs: node server.js
docker run myapp

# Runs: node app.js (CMD overridden)
docker run myapp app.js
\`\`\`

**When to Use:**
- **CMD**: When you want flexible default behavior
- **ENTRYPOINT**: When you want a fixed executable (wrapper scripts, utilities)
- **Both**: When you want fixed executable with flexible arguments

**Why Interviewers Ask This:**
Understanding CMD vs ENTRYPOINT is fundamental to writing effective Dockerfiles and controlling container behavior.`
  },
  {
    id: 414,
    category: 'Docker',
    question: 'What is Docker Registry and how does it work?',
    answer: `**One-Sentence Definition:** A Docker registry is a storage and distribution system for Docker images, allowing you to push, pull, and manage images, with Docker Hub being the default public registry.

**The Core Concept:** Think of a Docker registry like an app store. Developers publish apps (push images) to the store (registry), and users download apps (pull images) from the store. You can have public stores (Docker Hub) or private stores (your company's registry) for your own apps.

**Types of Registries:**

**1. Docker Hub (Public):**
- Default public registry
- Free for public images
- Paid plans for private images

**2. Private Registries:**
- Self-hosted or cloud-managed
- Control access and security
- Examples: AWS ECR, Google GCR, Azure ACR, Harbor

**3. Third-Party:**
- Quay.io, GitLab Registry
- Additional features
- Integration with CI/CD

**Registry Operations:**
\`\`\`bash
# Login to registry
docker login

# Tag image for registry
docker tag myapp:latest myregistry.com/myapp:1.0

# Push image
docker push myregistry.com/myapp:1.0

# Pull image
docker pull myregistry.com/myapp:1.0

# Logout
docker logout
\`\`\`

**Image Naming:**
\`\`\`
[registry/][username/]image[:tag]

Examples:
nginx                    # Docker Hub, official, latest tag
user/myapp:1.0          # Docker Hub, user namespace
registry.com/app:v2     # Private registry
localhost:5000/app      # Local registry
\`\`\`

**Running Private Registry:**
\`\`\`bash
# Run local registry
docker run -d -p 5000:5000 --name registry registry:2

# Tag and push to local registry
docker tag myapp:latest localhost:5000/myapp:1.0
docker push localhost:5000/myapp:1.0

# Pull from local registry
docker pull localhost:5000/myapp:1.0
\`\`\`

**Registry with Authentication:**
\`\`\`bash
# Create auth
docker run --entrypoint htpasswd httpd:2 -Bbn user password > auth/htpasswd

# Run registry with auth
docker run -d -p 5000:5000 \
  -v $(pwd)/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  --name registry registry:2
\`\`\`

**Best Practices:**
- Sign images for security
- Scan images for vulnerabilities
- Use private registries for production
- Implement access controls
- Regular cleanup of old images

**Why Interviewers Ask This:**
Understanding registries is essential for image distribution, CI/CD pipelines, and managing container images in production environments.`
  },
  {
    id: 415,
    category: 'Docker',
    question: 'What are Docker Best Practices for Production?',
    answer: `**One-Sentence Definition:** Docker production best practices include using specific image tags, running as non-root, implementing health checks, optimizing image size, securing images, and proper resource limits to ensure reliable, secure, and efficient containerized applications.

**The Core Concept:** Think of production best practices like safety rules for operating machinery. You follow specific procedures (best practices) to ensure everything runs safely (security), efficiently (performance), and reliably (stability). Skipping these can lead to problems.

**Security Best Practices:**

**1. Use Specific Tags:**
\`\`\`dockerfile
# Bad
FROM node:latest

# Good
FROM node:18.17.0-alpine
\`\`\`

**2. Run as Non-Root:**
\`\`\`dockerfile
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs
\`\`\`

**3. Scan for Vulnerabilities:**
\`\`\`bash
docker scan myimage
\`\`\`

**4. Use Multi-Stage Builds:**
- Smaller images
- No build tools in production
- Reduced attack surface

**5. Don't Store Secrets in Images:**
- Use Docker Secrets or environment variables
- Never commit credentials

**Performance Best Practices:**

**1. Optimize Layers:**
\`\`\`dockerfile
# Combine RUN commands
RUN apt-get update && \
    apt-get install -y package && \
    apt-get clean
\`\`\`

**2. Use .dockerignore:**
- Exclude unnecessary files
- Faster builds

**3. Leverage Build Cache:**
- Order instructions by change frequency
- Copy dependencies before code

**4. Set Resource Limits:**
\`\`\`yaml
services:
  web:
    image: nginx
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
\`\`\`

**Reliability Best Practices:**

**1. Implement Health Checks:**
\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/health || exit 1
\`\`\`

**2. Use Restart Policies:**
\`\`\`bash
docker run --restart=unless-stopped nginx
\`\`\`

**3. Logging:**
\`\`\`yaml
services:
  web:
    image: nginx
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

**4. Graceful Shutdowns:**
- Handle SIGTERM signals
- Complete in-flight requests
- Clean up resources

**Monitoring Best Practices:**
- Use centralized logging
- Implement metrics collection
- Set up alerts
- Monitor resource usage

**Why Interviewers Ask This:**
Production best practices demonstrate your understanding of running Docker in real-world scenarios with security, performance, and reliability considerations.`
  }
];

