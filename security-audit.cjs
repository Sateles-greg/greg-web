#!/usr/bin/env node

/**
 * Security Audit Script
 * Scans for potential sensitive data exposure in the codebase
 */

const fs = require('fs');
const path = require('path');

// Patterns that might indicate security issues
const SECURITY_PATTERNS = [
  { pattern: /console\.log.*process\.env/gi, severity: 'HIGH', description: 'Environment variable logged to console' },
  { pattern: /console\.log.*sk-/gi, severity: 'CRITICAL', description: 'Potential API key in console log' },
  { pattern: /console\.log.*Bearer/gi, severity: 'HIGH', description: 'Bearer token in console log' },
  { pattern: /process\.env\.OPENAI_API_KEY/g, severity: 'HIGH', description: 'Direct OpenAI API key access' },
  { pattern: /process\.env\.JWT_SECRET/g, severity: 'HIGH', description: 'Direct JWT secret access' },
  { pattern: /console\.error.*err/gi, severity: 'MEDIUM', description: 'Raw error logging (might expose sensitive data)' },
  { pattern: /fetch.*openai\.com.*process\.env/gi, severity: 'CRITICAL', description: 'Direct OpenAI API call from frontend' },
  { pattern: /\.env\./gi, severity: 'LOW', description: 'Environment variable access (review needed)' }
];

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /test-security-logger\.cjs/,
  /secureLogger\.(ts|js)/,
  /security\.test\.ts/,
  /SECURITY_FIXES\.md/,
  /security-audit\.cjs/
];

function shouldIgnoreFile(filePath) {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filePath));
}

function scanFile(filePath) {
  if (shouldIgnoreFile(filePath)) return [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    SECURITY_PATTERNS.forEach(({ pattern, severity, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        const lines = content.split('\n');
        matches.forEach(match => {
          const lineNumber = lines.findIndex(line => line.includes(match)) + 1;
          issues.push({
            file: filePath,
            line: lineNumber,
            severity,
            description,
            match: match.trim(),
            context: lines[lineNumber - 1]?.trim() || ''
          });
        });
      }
    });
    
    return issues;
  } catch (error) {
    return [];
  }
}

function scanDirectory(dirPath) {
  const issues = [];
  
  function scanRecursive(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanRecursive(itemPath);
      } else if (stat.isFile() && /\.(js|ts|tsx|jsx)$/.test(item)) {
        const fileIssues = scanFile(itemPath);
        issues.push(...fileIssues);
      }
    });
  }
  
  scanRecursive(dirPath);
  return issues;
}

function generateReport(issues) {
  console.log('🔍 Security Audit Report\n');
  
  if (issues.length === 0) {
    console.log('✅ No security issues found!');
    return;
  }
  
  const severityCounts = {};
  issues.forEach(issue => {
    severityCounts[issue.severity] = (severityCounts[issue.severity] || 0) + 1;
  });
  
  console.log('📊 Summary:');
  Object.entries(severityCounts).forEach(([severity, count]) => {
    const emoji = severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : severity === 'MEDIUM' ? '⚡' : 'ℹ️';
    console.log(`  ${emoji} ${severity}: ${count} issues`);
  });
  console.log();
  
  // Group by severity
  const groupedIssues = {};
  issues.forEach(issue => {
    if (!groupedIssues[issue.severity]) {
      groupedIssues[issue.severity] = [];
    }
    groupedIssues[issue.severity].push(issue);
  });
  
  // Report by severity
  ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].forEach(severity => {
    if (groupedIssues[severity]) {
      console.log(`\n${severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : severity === 'MEDIUM' ? '⚡' : 'ℹ️'} ${severity} ISSUES:`);
      groupedIssues[severity].forEach((issue, index) => {
        console.log(`\n  ${index + 1}. ${issue.description}`);
        console.log(`     File: ${issue.file}:${issue.line}`);
        console.log(`     Match: ${issue.match}`);
        console.log(`     Context: ${issue.context}`);
      });
    }
  });
  
  console.log('\n🔧 Recommendations:');
  console.log('  - Replace console.log with secure logger from secureLogger.ts');
  console.log('  - Move API calls to backend endpoints');
  console.log('  - Use secureGregAI service for frontend AI operations');
  console.log('  - Review environment variable access patterns');
}

function main() {
  const projectDir = process.cwd();
  console.log(`Scanning project: ${projectDir}\n`);
  
  const issues = scanDirectory(projectDir);
  generateReport(issues);
  
  // Exit with error code if critical issues found
  const criticalIssues = issues.filter(issue => issue.severity === 'CRITICAL');
  if (criticalIssues.length > 0) {
    console.log('\n❌ Critical security issues found! Please address before deployment.');
    process.exit(1);
  } else {
    console.log('\n✅ No critical security issues detected.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { scanDirectory, generateReport };