rtec-backend/
├── .env # Environment variables
├── .env.example # Example environment variables
├── .gitignore # Git ignore rules
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── biome.json # Biome linting and formatting configuration
├── drizzle.config.ts # Drizzle ORM configuration
├── nodemon.json # Nodemon configuration for development
├── src/
│ ├── index.ts # Application entry point
│ ├── config/ # Configuration files
│ │ ├── env.ts # Environment variable validation
│ │ ├── database.ts # Database connection setup
│ │ └── server.ts # Express server configuration
│ │
│ ├── modules/ # Feature-based modules
│ │ ├── user/ # User management module
│ │ │ ├── models/ # Domain models
│ │ │ │ └── user.model.ts
│ │ │ ├── schemas/ # Database schemas
│ │ │ │ └── user.schema.ts
│ │ │ ├── controllers/
│ │ │ │ └── user.controller.ts
│ │ │ ├── services/
│ │ │ │ └── user.service.ts
│ │ │ ├── repositories/
│ │ │ │ └── user.repository.ts
│ │ │ ├── routes/
│ │ │ │ └── user.routes.ts
│ │ │ ├── validators/
│ │ │ │ └── user.validator.ts
│ │ │ ├── dto/
│ │ │ │ └── user.dto.ts
│ │ │ ├── types/
│ │ │ │ └── user.types.ts
│ │ │ └── index.ts # Module exports
│ │ │
│ │ ├── auth/ # Authentication module
│ │ │ ├── controllers/
│ │ │ │ └── auth.controller.ts
│ │ │ ├── services/
│ │ │ │ └── auth.service.ts
│ │ │ ├── middlewares/
│ │ │ │ └── auth.middleware.ts
│ │ │ ├── routes/
│ │ │ │ └── auth.routes.ts
│ │ │ ├── validators/
│ │ │ │ └── auth.validator.ts
│ │ │ ├── dto/
│ │ │ │ └── auth.dto.ts
│ │ │ └── index.ts
│ │ │
│ │ ├── student/ # Student module
│ │ │ ├── models/
│ │ │ ├── schemas/
│ │ │ ├── controllers/
│ │ │ ├── services/
│ │ │ ├── repositories/
│ │ │ ├── routes/
│ │ │ └── index.ts
│ │ │
│ │ ├── alumni/ # Alumni module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── faculty/ # Faculty module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── department/ # Department module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── course/ # Course module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── club/ # Club management module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── post/ # Social posts module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── event/ # Events module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── blood-donation/ # Blood donation module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ ├── study-material/ # Study materials module
│ │ │ └── [same structure as other modules]
│ │ │
│ │ └── resume/ # Resume builder module
│ │ └── [same structure as other modules]
│ │
│ ├── common/ # Shared code across modules
│ │ ├── middlewares/ # Global middlewares
│ │ │ ├── error.middleware.ts
│ │ │ └── validation.middleware.ts
│ │ ├── utils/ # Utility functions
│ │ │ ├── logger.ts
│ │ │ ├── crypto.utils.ts
│ │ │ ├── jwt.utils.ts
│ │ │ └── helpers.ts
│ │ ├── types/ # Shared type definitions
│ │ │ └── common.types.ts
│ │ └── constants/ # Application constants
│ │ └── app.constants.ts
│ │
│ ├── api/ # API layer
│ │ └── routes/ # Root API routes
│ │ └── index.ts # Route aggregation
│ │
│ └── db/ # Database setup
│ ├── migrations/ # Generated migrations
│ ├── schema/ # Schema registry
│ │ └── index.ts # Exports all schemas
│ └── index.ts # DB client export
│
├── logs/ # Application logs
│ ├── error.log
│ └── combined.log
│
└── scripts/ # Utility scripts
├── generate-types.ts
└── seed-db.ts
