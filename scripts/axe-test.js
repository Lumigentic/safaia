#!/usr/bin/env node

/**
 * Axe-core Accessibility Testing Script
 *
 * Uruchamia testy accessibility (a11y) dla wszystkich kluczowych stron
 * używając axe-core i generuje szczegółowe raporty.
 *
 * Użycie:
 *   node scripts/axe-test.js
 *   node scripts/axe-test.js --url=http://localhost:3000
 *   node scripts/axe-test.js --wcag=AA
 */

const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Konfiguracja
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../a11y-reports');
const WCAG_LEVEL = process.argv.find(arg => arg.startsWith('--wcag='))?.split('=')[1] || 'AA';

// Strony do testowania
const PAGES_TO_TEST = [
  { name: 'Homepage', path: '/' },
  { name: 'O Nas', path: '/o-nas' },
  { name: 'Katalog', path: '/katalog' },
  { name: 'Book Detail', path: '/katalog/japonska-sztuka-ikebany' },
  { name: 'Dla Autorow', path: '/dla-autorow' },
  { name: 'Aktualnosci', path: '/aktualnosci' },
  { name: 'Kontakt', path: '/kontakt' },
];

// Axe-core options
const AXE_OPTIONS = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      ...(WCAG_LEVEL === 'AAA' ? ['wcag2aaa'] : []),
      'best-practice',
    ],
  },
  rules: {
    // Custom rule configuration
    'color-contrast': { enabled: true },
    'image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'button-name': { enabled: true },
    'document-title': { enabled: true },
    'html-has-lang': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
  },
};

// Severity levels
const SEVERITY = {
  minor: { emoji: '⚠️ ', color: '\x1b[33m', priority: 1 },
  moderate: { emoji: '🟡', color: '\x1b[33m', priority: 2 },
  serious: { emoji: '🔴', color: '\x1b[31m', priority: 3 },
  critical: { emoji: '💥', color: '\x1b[35m', priority: 4 },
};

/**
 * Uruchom axe-core dla pojedynczej strony
 */
async function runAxeTest(page, url) {
  console.log(`\n🔍 Testing: ${url}`);

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000); // Wait for dynamic content

  const results = await new AxePuppeteer(page)
    .options(AXE_OPTIONS)
    .analyze();

  return results;
}

/**
 * Zapisz raport
 */
function saveReport(pageName, results) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${pageName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
  console.log(`✅ Raport zapisany: ${filepath}`);
  return filepath;
}

/**
 * Formatuj violation do konsoli
 */
function formatViolation(violation, index) {
  const severity = SEVERITY[violation.impact] || SEVERITY.minor;

  console.log(`\n${severity.emoji} ${index + 1}. ${violation.id}`);
  console.log(`   Severity: ${severity.color}${violation.impact.toUpperCase()}\x1b[0m`);
  console.log(`   WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}`);
  console.log(`   Description: ${violation.description}`);
  console.log(`   Help: ${violation.helpUrl}`);
  console.log(`   Affected elements: ${violation.nodes.length}`);

  // Pokaż pierwsze 3 problematyczne elementy
  violation.nodes.slice(0, 3).forEach((node, i) => {
    console.log(`\n   Element ${i + 1}:`);
    console.log(`     HTML: ${node.html.substring(0, 100)}...`);
    console.log(`     Target: ${node.target.join(' > ')}`);
    console.log(`     Fix: ${node.failureSummary}`);
  });

  if (violation.nodes.length > 3) {
    console.log(`\n   ... and ${violation.nodes.length - 3} more elements`);
  }
}

/**
 * Grupuj violations według severity
 */
function groupBySeverity(violations) {
  return violations.reduce((acc, violation) => {
    const severity = violation.impact || 'minor';
    if (!acc[severity]) {
      acc[severity] = [];
    }
    acc[severity].push(violation);
    return acc;
  }, {});
}

/**
 * Formatuj wyniki do konsoli
 */
function formatResults(pageName, results) {
  const { violations, passes, incomplete } = results;

  console.log('\n' + '='.repeat(80));
  console.log(`📄 ${pageName}`);
  console.log('='.repeat(80));

  // Summary
  console.log('\n📊 Summary:');
  console.log(`  ✅ Passed: ${passes.length} rules`);
  console.log(`  ❌ Violations: ${violations.length} issues`);
  console.log(`  ⚠️  Incomplete: ${incomplete.length} issues (need manual review)`);
  console.log(`  Total elements tested: ${results.testEngine.name} v${results.testEngine.version}`);

  // Violations by severity
  if (violations.length > 0) {
    const grouped = groupBySeverity(violations);

    console.log('\n❌ Violations by Severity:');
    ['critical', 'serious', 'moderate', 'minor'].forEach(severity => {
      if (grouped[severity]) {
        const sev = SEVERITY[severity];
        console.log(`  ${sev.emoji} ${severity.toUpperCase()}: ${grouped[severity].length}`);
      }
    });

    // Detailed violations
    console.log('\n📋 Detailed Violations:');
    const sortedViolations = violations.sort((a, b) => {
      const aSev = SEVERITY[a.impact]?.priority || 0;
      const bSev = SEVERITY[b.impact]?.priority || 0;
      return bSev - aSev; // Highest priority first
    });

    sortedViolations.forEach((violation, index) => {
      formatViolation(violation, index);
    });
  }

  // Incomplete tests
  if (incomplete.length > 0) {
    console.log('\n⚠️  Incomplete Tests (require manual verification):');
    incomplete.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.id}`);
      console.log(`     ${item.description}`);
      console.log(`     Affected: ${item.nodes.length} elements`);
    });
  }

  // Top issues summary
  if (violations.length > 0) {
    console.log('\n🔝 Top Issues to Fix:');
    const topIssues = violations
      .sort((a, b) => b.nodes.length - a.nodes.length)
      .slice(0, 5);

    topIssues.forEach((violation, index) => {
      const severity = SEVERITY[violation.impact] || SEVERITY.minor;
      console.log(`  ${index + 1}. [${violation.impact}] ${violation.id}`);
      console.log(`     Affects ${violation.nodes.length} elements`);
      console.log(`     Fix: ${violation.help}`);
    });
  }
}

/**
 * Generuj HTML raport
 */
function generateHTMLReport(allResults) {
  const htmlPath = path.join(OUTPUT_DIR, 'accessibility-report.html');

  const totalViolations = allResults.reduce((sum, r) => sum + r.results.violations.length, 0);
  const totalPasses = allResults.reduce((sum, r) => sum + r.results.passes.length, 0);

  const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Test Report - Safaia</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #334782; margin-bottom: 10px; }
    .meta { color: #666; margin-bottom: 30px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
    .summary-card h3 { font-size: 14px; text-transform: uppercase; color: #666; margin-bottom: 10px; }
    .summary-card .number { font-size: 36px; font-weight: bold; }
    .passed { background: #d4edda; color: #155724; }
    .violations { background: #f8d7da; color: #721c24; }
    .incomplete { background: #fff3cd; color: #856404; }
    .page-results { margin-bottom: 40px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
    .page-header { background: #334782; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
    .page-header h2 { font-size: 18px; }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
    .badge.critical { background: #dc3545; }
    .badge.serious { background: #fd7e14; }
    .badge.moderate { background: #ffc107; color: #000; }
    .badge.minor { background: #17a2b8; }
    .violation-list { padding: 20px; }
    .violation-item { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #dc3545; }
    .violation-item h4 { margin-bottom: 10px; color: #333; }
    .violation-meta { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
    .violation-item p { color: #666; margin-bottom: 10px; }
    .violation-item code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
    .no-violations { padding: 40px; text-align: center; color: #28a745; font-size: 18px; }
    a { color: #334782; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛡️ Accessibility Test Report</h1>
    <p class="meta">
      Generated: ${new Date().toLocaleString('pl-PL')}<br>
      Base URL: ${BASE_URL}<br>
      WCAG Level: ${WCAG_LEVEL}
    </p>

    <div class="summary">
      <div class="summary-card passed">
        <h3>Passed</h3>
        <div class="number">${totalPasses}</div>
      </div>
      <div class="summary-card violations">
        <h3>Violations</h3>
        <div class="number">${totalViolations}</div>
      </div>
      <div class="summary-card">
        <h3>Pages Tested</h3>
        <div class="number">${allResults.length}</div>
      </div>
    </div>

    ${allResults.map(({ pageName, url, results }) => `
      <div class="page-results">
        <div class="page-header">
          <h2>${pageName}</h2>
          <div>
            <span class="badge" style="background: ${results.violations.length === 0 ? '#28a745' : '#dc3545'}">
              ${results.violations.length} violations
            </span>
          </div>
        </div>

        ${results.violations.length === 0
          ? '<div class="no-violations">✅ No accessibility violations found!</div>'
          : `
            <div class="violation-list">
              ${results.violations.map(v => `
                <div class="violation-item">
                  <h4>${v.id}</h4>
                  <div class="violation-meta">
                    <span class="badge ${v.impact}">${v.impact}</span>
                    <span style="font-size: 12px; color: #666;">${v.nodes.length} affected element(s)</span>
                  </div>
                  <p>${v.description}</p>
                  <p><strong>Help:</strong> ${v.help}</p>
                  <p><a href="${v.helpUrl}" target="_blank">Learn more →</a></p>
                  <details>
                    <summary style="cursor: pointer; margin-top: 10px;">Show affected elements</summary>
                    <ul style="margin-top: 10px;">
                      ${v.nodes.slice(0, 5).map(node => `
                        <li style="margin: 10px 0;">
                          <code>${node.html.substring(0, 100)}...</code><br>
                          <small style="color: #666;">Target: ${node.target.join(' > ')}</small>
                        </li>
                      `).join('')}
                    </ul>
                  </details>
                </div>
              `).join('')}
            </div>
          `
        }
      </div>
    `).join('')}

  </div>
</body>
</html>
  `;

  fs.writeFileSync(htmlPath, html);
  console.log(`\n📄 HTML Report: ${htmlPath}`);
  return htmlPath;
}

/**
 * Generuj CSV dla łatwego importu
 */
function generateCSV(allResults) {
  const csvPath = path.join(OUTPUT_DIR, 'violations.csv');

  const rows = [
    ['Page', 'URL', 'Violation ID', 'Impact', 'Description', 'Help', 'Affected Elements', 'WCAG Tags']
  ];

  allResults.forEach(({ pageName, url, results }) => {
    results.violations.forEach(v => {
      rows.push([
        pageName,
        url,
        v.id,
        v.impact,
        v.description.replace(/"/g, '""'),
        v.help.replace(/"/g, '""'),
        v.nodes.length,
        v.tags.filter(t => t.startsWith('wcag')).join('; ')
      ]);
    });
  });

  const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  fs.writeFileSync(csvPath, csv);
  console.log(`📊 CSV Report: ${csvPath}`);
  return csvPath;
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Rozpoczynam testy accessibility (axe-core)...\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`WCAG Level: ${WCAG_LEVEL}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const allResults = [];

  try {
    const page = await browser.newPage();
    await page.setBypassCSP(true);

    for (const testPage of PAGES_TO_TEST) {
      const url = `${BASE_URL}${testPage.path}`;

      try {
        const results = await runAxeTest(page, url);
        saveReport(testPage.name, results);
        formatResults(testPage.name, results);

        allResults.push({
          pageName: testPage.name,
          url,
          results,
        });

      } catch (error) {
        console.error(`❌ Error testing ${testPage.name}:`, error.message);
      }
    }

    // Generate reports
    generateHTMLReport(allResults);
    generateCSV(allResults);

    // Final summary
    const totalViolations = allResults.reduce((sum, r) => sum + r.results.violations.length, 0);
    const totalPasses = allResults.reduce((sum, r) => sum + r.results.passes.length, 0);
    const criticalIssues = allResults.reduce((sum, r) =>
      sum + r.results.violations.filter(v => v.impact === 'critical').length, 0
    );

    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL SUMMARY');
    console.log('='.repeat(80));
    console.log(`Pages tested: ${allResults.length}`);
    console.log(`Total passed rules: ${totalPasses} ✅`);
    console.log(`Total violations: ${totalViolations} ${totalViolations === 0 ? '✅' : '❌'}`);
    console.log(`Critical issues: ${criticalIssues} ${criticalIssues === 0 ? '✅' : '💥'}`);
    console.log('\nReports saved in:', OUTPUT_DIR);

    // Exit code
    if (criticalIssues > 0) {
      console.log('\n💥 CRITICAL accessibility issues found!');
      process.exit(1);
    } else if (totalViolations > 0) {
      console.log('\n⚠️  Some accessibility violations found (non-critical)');
      process.exit(1);
    } else {
      console.log('\n✅ No accessibility violations found!');
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Uruchom
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { runAxeTest, formatResults };
