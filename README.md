# 🚀 Serverless NodeJS Setup

**⚠️ Under active development**

Ready-to-use template for building Serverless APIs with NodeJS, TypeScript and AWS. Copy and paste to quickly start your projects.

## ✨ What's included

- **Clean Architecture** with Dependency Injection
- **TypeScript** with path mapping
- **AWS Cognito** for authentication
- **Zod** for validation
- **ESBuild** for fast builds

## 🚀 How to use

1. **Clone and install**

```bash
git clone <your-repo>
cd serverless-setup
pnpm install
```

2. **Configure**

- Edit `sls/config/env.yml` with your variables
- Adjust `serverless.yml` with your organization

3. **Deploy**

```bash
sls deploy
```

## 📁 Structure

```
src/
├── application/     # Controllers, Use Cases, Entities
├── infra/          # Gateways, AWS Clients
├── kernel/         # DI, Decorators
├── main/           # Lambda adapters
└── shared/         # Config, Types
```

## 🔧 Development

**Adding new function:**

1. Create Use Case in `src/application/useCases/`
2. Create Controller in `src/application/controllers/`
3. Create Lambda function in `src/main/functions/`
4. Configure in `sls/functions/` file

**Patterns:**

- Use `@Injectable()` on all classes
- Controllers extend `Controller<auth, response>`
- Validate with Zod schemas using `@Schema()`

---

Production-ready serverless template 🎯
