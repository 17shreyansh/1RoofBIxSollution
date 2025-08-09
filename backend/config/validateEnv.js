const crypto = require('crypto');

const validateEnvironment = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'FRONTEND_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    process.exit(1);
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long');
    process.exit(1);
  }

  // Generate encryption key if not provided
  if (!process.env.ENCRYPTION_KEY) {
    console.warn('⚠️  ENCRYPTION_KEY not provided, generating random key (not recommended for production)');
    process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
  }

  // Validate MongoDB URI format
  if (!process.env.MONGODB_URI.startsWith('mongodb')) {
    console.error('❌ Invalid MONGODB_URI format');
    process.exit(1);
  }

  // Validate frontend URL
  try {
    new URL(process.env.FRONTEND_URL);
  } catch (error) {
    console.error('❌ Invalid FRONTEND_URL format');
    process.exit(1);
  }

  console.log('✅ Environment validation passed');
};

module.exports = validateEnvironment;