#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Validates all required environment variables for DMARCEngine
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Environment variable definitions
const envVars = {
  // Core Application
  'NEXT_PUBLIC_SITE_URL': { required: true, type: 'url' },
  'NEXT_PUBLIC_PRODUCT_NAME': { required: true, type: 'string' },
  'NEXT_PUBLIC_SITE_TITLE': { required: true, type: 'string' },
  'NEXT_PUBLIC_SITE_DESCRIPTION': { required: true, type: 'string' },

  // Supabase
  'NEXT_PUBLIC_SUPABASE_URL': { required: true, type: 'url' },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': { required: true, type: 'string' },
  'SUPABASE_SERVICE_ROLE_KEY': { required: true, type: 'secret', env: ['production'] },
  'SUPABASE_DB_WEBHOOK_SECRET': { required: true, type: 'secret', env: ['production'] },

  // Billing
  'NEXT_PUBLIC_BILLING_PROVIDER': { required: true, type: 'enum', values: ['stripe', 'lemon-squeezy'] },
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': { required: false, type: 'string', condition: 'stripe' },
  'STRIPE_SECRET_KEY': { required: false, type: 'secret', condition: 'stripe', env: ['production'] },
  'STRIPE_WEBHOOK_SECRET': { required: false, type: 'secret', condition: 'stripe', env: ['production'] },

  // Email
  'MAILER_PROVIDER': { required: true, type: 'enum', values: ['nodemailer', 'resend'] },
  'EMAIL_SENDER': { required: true, type: 'email' },
  'EMAIL_HOST': { required: false, type: 'string', condition: 'nodemailer' },
  'EMAIL_PORT': { required: false, type: 'number', condition: 'nodemailer' },
  'EMAIL_USER': { required: false, type: 'string', condition: 'nodemailer' },
  'EMAIL_PASSWORD': { required: false, type: 'secret', condition: 'nodemailer', env: ['production'] },
  'EMAIL_TLS': { required: false, type: 'boolean', condition: 'nodemailer' },

  // Contact
  'CONTACT_EMAIL': { required: true, type: 'email' },

  // Theme
  'NEXT_PUBLIC_THEME_COLOR': { required: true, type: 'string' },
  'NEXT_PUBLIC_THEME_COLOR_DARK': { required: true, type: 'string' },
};

// Helper functions
function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function logBold(message, color = 'reset') {
  console.log(colors.bold + colors[color] + message + colors.reset);
}

function validateUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function loadEnvFiles() {
  const envFiles = ['.env', '.env.local', `.env.${process.env.NODE_ENV || 'development'}`];
  const envVars = {};

  for (const file of envFiles) {
    const filePath = path.join(process.cwd(), 'apps', 'web', file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          if (key && value) {
            envVars[key] = value;
          }
        }
      }
    }
  }

  // Add process.env variables (they override file variables)
  Object.keys(process.env).forEach(key => {
    envVars[key] = process.env[key];
  });

  return envVars;
}

function validateEnvironment() {
  const currentEnv = process.env.NODE_ENV || 'development';
  const env = loadEnvFiles();
  
  logBold(`🔍 DMARCEngine Environment Validation`, 'cyan');
  logBold(`📍 Environment: ${currentEnv}`, 'blue');
  log('');

  let errors = 0;
  let warnings = 0;
  let passed = 0;

  // Check each required variable
  for (const [varName, config] of Object.entries(envVars)) {
    const value = env[varName];
    const hasValue = value && value !== '';

    // Skip if not required for current environment
    if (config.env && !config.env.includes(currentEnv)) {
      continue;
    }

    // Check conditional requirements
    if (config.condition) {
      const conditionVar = config.condition === 'stripe' ? 'NEXT_PUBLIC_BILLING_PROVIDER' : 'MAILER_PROVIDER';
      const conditionValue = env[conditionVar];
      
      if (conditionValue !== config.condition) {
        continue; // Skip if condition not met
      }
    }

    // Check if required variable is missing
    if (config.required && !hasValue) {
      log(`❌ ${varName}: MISSING (required)`, 'red');
      errors++;
      continue;
    }

    // Skip validation if variable is not set and not required
    if (!hasValue) {
      continue;
    }

    // Validate value based on type
    let isValid = true;
    let errorMessage = '';

    switch (config.type) {
      case 'url':
        if (!validateUrl(value)) {
          isValid = false;
          errorMessage = 'Invalid URL format';
        }
        break;
      
      case 'email':
        if (!validateEmail(value)) {
          isValid = false;
          errorMessage = 'Invalid email format';
        }
        break;
      
      case 'number':
        if (isNaN(value) || isNaN(parseFloat(value))) {
          isValid = false;
          errorMessage = 'Must be a number';
        }
        break;
      
      case 'boolean':
        if (!['true', 'false'].includes(value.toLowerCase())) {
          isValid = false;
          errorMessage = 'Must be true or false';
        }
        break;
      
      case 'enum':
        if (!config.values.includes(value)) {
          isValid = false;
          errorMessage = `Must be one of: ${config.values.join(', ')}`;
        }
        break;
      
      case 'secret':
        if (value.length < 10) {
          isValid = false;
          errorMessage = 'Secret too short (minimum 10 characters)';
        } else if (value.includes('your_') || value.includes('example')) {
          isValid = false;
          errorMessage = 'Contains placeholder text';
        }
        break;
    }

    // Log result
    if (isValid) {
      const displayValue = config.type === 'secret' ? '*'.repeat(Math.min(value.length, 20)) : value;
      log(`✅ ${varName}: ${displayValue}`, 'green');
      passed++;
    } else {
      log(`❌ ${varName}: ${errorMessage}`, 'red');
      errors++;
    }
  }

  // Check for deprecated or extra variables
  const knownVars = new Set(Object.keys(envVars));
  const setVars = Object.keys(env).filter(key => key.startsWith('NEXT_PUBLIC_') || key.startsWith('SUPABASE_') || key.startsWith('STRIPE_') || key.startsWith('EMAIL_'));
  
  for (const varName of setVars) {
    if (!knownVars.has(varName)) {
      log(`⚠️  ${varName}: Unknown variable`, 'yellow');
      warnings++;
    }
  }

  // Summary
  log('');
  logBold('📊 Validation Summary:', 'cyan');
  log(`✅ Passed: ${passed}`, 'green');
  if (warnings > 0) log(`⚠️  Warnings: ${warnings}`, 'yellow');
  if (errors > 0) log(`❌ Errors: ${errors}`, 'red');

  log('');
  if (errors === 0) {
    logBold('🎉 Environment validation passed!', 'green');
    if (warnings > 0) {
      log('💡 Consider reviewing warnings above', 'yellow');
    }
  } else {
    logBold('❌ Environment validation failed!', 'red');
    log('🔧 Fix the errors above and run validation again', 'yellow');
    process.exit(1);
  }
}

// Run validation
validateEnvironment();