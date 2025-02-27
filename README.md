# Studio Sonterra - Monorepo

Welcome to **Studio Sonterra**! This is a **Monorepo** that contains multiple applications and services, including an admin dashboard, an API backend, a storefront, background workers, and shared utilities.

## 📌 Project Structure

```
studio-sonterra
├── 📂 admin       # Admin Dashboard (Next.js + ShadCN UI + i18n)
│
├── 📂 api         # Backend Server (NestJS + GraphQL + REST)
│
├── 📂 shop        # Storefront (Next.js + Tailwind + Apollo + i18n)
│
├── 📂 worker      # Background Tasks (OTP, Emails, Notifications, Queues)
│ ├── 📂 jobs      # RabbitMQ, BullMQ, Kafka jobs
│ ├── 📂 services  # Email sending, mobile notifications, reports
│ ├── 📂 config    # Redis and queue settings
│ ├── 📄 package.json
│
├── 📂 shared      # Shared Code (Used across all apps)
│ ├── 📂 types     # TypeScript Interfaces & Types
│ ├── 📂 utils     # Common utility functions
│ ├── 📂 hooks     # Shared React Hooks
│ ├── 📂 config    # Common environment settings
│ ├── 📄 package.json
│
├── 📂 packages    # Reusable Packages
│ ├── 📂 i18n      # Shared translation system
│ ├── 📂 ui        # UI Component Library (ShadCN + Tailwind)
│ ├── 📂 hooks     # Custom React Hooks (Auth, Cart, Filters, etc.)
│ ├── 📂 utils     # Shared helper functions
│
├── 📂 infra       # Infrastructure (CI/CD, DevOps, Docker, Nginx)
│ ├── 📂 docker    # Docker files for databases, Redis, API
│ ├── 📂 scripts   # Automation scripts for deployment
│ ├── 📂 nginx     # Nginx config for load balancing & caching
│
├── 📂 deployments # Cloud Deployment Files
│ ├── 📂 vercel    # Vercel deployment for Next.js
│ ├── 📂 railway   # Railway deployment for NestJS
│ ├── 📂 kubernetes # Kubernetes configuration
│
├── 📄 .gitignore
├── 📄 .prettierignore
├── 📄 DOCUMENTATION.md   # Detailed documentation & setup guide
├── 📄 lerna.json         # Lerna config for managing Monorepo
├── 📄 turbo.json         # Turborepo config for optimizing Monorepo builds
├── 📄 docker-compose.yml # Docker Compose for local development
├── 📄 package.json       # Root package file
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed on your system:

- **Node.js** (v18+ recommended)
- **pnpm** (package manager) → `npm install -g pnpm`
- **TurboRepo** → `pnpm add -g turbo`
- **Docker** (for local development with services like Redis, MongoDB)

---

### 📦 Install Dependencies

Run the following command in the root directory:
```sh
pnpm install
```

This will install all dependencies across the Monorepo.

---

### 🏃 Running the Project

#### 1️⃣ Start Development Mode
```sh
pnpm run dev
```
This will start all applications inside the Monorepo, including:
- **Admin Dashboard** (`admin` - Next.js)
- **API Server** (`api` - NestJS)
- **Shop Frontend** (`shop` - Next.js)
- **Background Workers** (`worker` - for queues & notifications)

You can also start a specific app using Turbo's `--filter` flag:
```sh
pnpm run dev --filter=admin
pnpm run dev --filter=api
pnpm run dev --filter=shop
```

---

### 🏗 Building the Project

To build all applications:
```sh
pnpm run build
```
To build a specific app:
```sh
pnpm run build --filter=api
```

---

### 🛠 Linting & Formatting

To check for lint errors:
```sh
pnpm run lint
```
To auto-fix lint issues:
```sh
pnpm run lint --fix
```

To format the code with Prettier:
```sh
pnpm run format
```

---

### 🐳 Running with Docker

If you want to run the project with **Docker Compose**:
```sh
docker-compose up --build
```
This will start all services, including MongoDB, Redis, and the API.

To stop the containers:
```sh
docker-compose down
```

---

## 🔗 API Endpoints (NestJS)

| Method | Endpoint              | Description                     |
|--------|----------------------|---------------------------------|
| `GET`  | `/api/health`        | Check if API is running        |
| `POST` | `/api/auth/login`    | User login                     |
| `POST` | `/api/auth/register` | User registration              |
| `GET`  | `/api/products`      | Fetch list of products         |
| `GET`  | `/api/orders`        | Fetch user orders              |

The API also supports **GraphQL** at:
```
http://localhost:4000/graphql
```
You can use **Apollo Sandbox** or **GraphQL Playground** to explore the API.

---

## 🌍 Environment Variables

You need to create a `.env` file in each project (e.g., `api/.env`, `admin/.env`, `shop/.env`). Example:

```env
# API Config
PORT=4000
MONGO_URI=mongodb://localhost:27017/studio-sonterra
JWT_SECRET=my_super_secret_key

# Next.js Config
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🚀 Deployment

Each service can be deployed separately:

- **Admin Dashboard** → **Vercel** (`pnpm run deploy --filter=admin`)
- **API Server** → **Railway, AWS, or DigitalOcean** (`pnpm run deploy --filter=api`)
- **Shop Frontend** → **Vercel** (`pnpm run deploy --filter=shop`)
- **Workers** → **Cloud Functions or Kubernetes** (`pnpm run deploy --filter=worker`)

---

## 🤝 Contributing

1. **Fork** the repository.
2. **Clone** your fork: `git clone https://github.com/your-username/studio-sonterra.git`
3. **Create a branch**: `git checkout -b feature-branch`
4. **Make your changes** and commit: `git commit -m 'Add new feature'`
5. **Push** to your branch: `git push origin feature-branch`
6. Submit a **Pull Request** 🚀

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For any questions or support, feel free to reach out:
- ✉️ Email: `contact@studio-sonterra.com`
- 🌐 Website: [studio-sonterra.com](https://studio-sonterra.com)
- 🐦 Twitter: [@StudioSonterra](https://twitter.com/StudioSonterra)

---

Enjoy building with **Studio Sonterra**! 🚀✨

