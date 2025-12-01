#!/usr/bin/env node

/**
 * Lighthouse Performance Testing Script
 *
 * Uruchamia Lighthouse testy dla wszystkich kluczowych stron
 * i generuje raport z wynikami.
 *
 * Użycie:
 *   node scripts/lighthouse.js
 *   node scripts/lighthouse.js --url=http://localhost:3000
 *   node scripts/lighthouse.js --output=json
 */

const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Konfiguracja
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../lighthouse-reports');
const OUTPUT_FORMAT = process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1] || 'html';

// Strony do testowania
const PAGES_TO_TEST = [
  { name: 'Homepage', path: '/' },
  { name: 'Katalog', path: '/katalog' },
  { name: 'Book Detail', path: '/katalog/japonska-sztuka-ikebany' },
  { name: 'Dla Autorow', path: '/dla-autorow' },
  { name: 'O Nas', path: '/o-nas' },
  { name: 'Kontakt', path: '/kontakt' },
];

// Lighthouse config
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
};

// Mobile config
const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  },
};

// Budżet wydajności
const PERFORMANCE_BUDGET = {
  performance: 90,
  accessibility: 95,
  'best-practices': 90,
  seo: 95,
};

// Core Web Vitals thresholds
const WEB_VITALS_THRESHOLDS = {
  'largest-contentful-paint': 2500, // 2.5s
  'first-contentful-paint': 1800, // 1.8s
  'cumulative-layout-shift': 0.1,
  'total-blocking-time': 200, // 200ms
  'speed-index': 3400,
};

/**
 * Uruchom Chrome headless
 */
async function launchChrome() {
  return await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });
}

/**
 * Uruchom Lighthouse dla pojedynczej strony
 */
async function runLighthouse(url, chrome, config) {
  const options = {
    logLevel: 'info',
    output: OUTPUT_FORMAT,
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options, config);
  return runnerResult;
}

/**
 * Zapisz raport
 */
function saveReport(pageName, report, format, device) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${pageName.toLowerCase().replace(/\s+/g, '-')}-${device}-${timestamp}.${format}`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, report);
  console.log(`✅ Raport zapisany: ${filepath}`);
  return filepath;
}

/**
 * Wyciągnij kluczowe metryki
 */
function extractMetrics(lhr) {
  const categories = lhr.categories;
  const audits = lhr.audits;

  return {
    scores: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
    },
    metrics: {
      fcp: audits['first-contentful-paint'].numericValue,
      lcp: audits['largest-contentful-paint'].numericValue,
      cls: audits['cumulative-layout-shift'].numericValue,
      tbt: audits['total-blocking-time'].numericValue,
      si: audits['speed-index'].numericValue,
      tti: audits['interactive'].numericValue,
    },
    diagnostics: {
      totalByteWeight: audits['total-byte-weight'].numericValue,
      domSize: audits['dom-size'].numericValue,
      bootupTime: audits['bootup-time'].numericValue,
      mainThreadWork: audits['mainthread-work-breakdown'].numericValue,
    },
  };
}

/**
 * Sprawdź czy wyniki spełniają budżet
 */
function checkBudget(metrics) {
  const failures = [];

  // Sprawdź scores
  Object.entries(PERFORMANCE_BUDGET).forEach(([category, threshold]) => {
    const score = metrics.scores[category.replace('-', '')];
    if (score < threshold) {
      failures.push({
        type: 'score',
        category,
        expected: threshold,
        actual: score,
        message: `${category} score (${score}) poniżej budżetu (${threshold})`,
      });
    }
  });

  // Sprawdź Web Vitals
  Object.entries(WEB_VITALS_THRESHOLDS).forEach(([metric, threshold]) => {
    const metricKey = metric.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const value = metrics.metrics[metricKey];

    if (value && value > threshold) {
      failures.push({
        type: 'web-vital',
        metric,
        expected: threshold,
        actual: Math.round(value),
        message: `${metric} (${Math.round(value)}ms) przekracza próg (${threshold}ms)`,
      });
    }
  });

  return failures;
}

/**
 * Formatuj wyniki do konsoli
 */
function formatResults(pageName, device, metrics, failures) {
  console.log('\n' + '='.repeat(80));
  console.log(`📊 ${pageName} (${device})`);
  console.log('='.repeat(80));

  // Scores
  console.log('\n📈 Scores:');
  Object.entries(metrics.scores).forEach(([category, score]) => {
    const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
    console.log(`  ${emoji} ${category.padEnd(20)} ${score}/100`);
  });

  // Core Web Vitals
  console.log('\n⚡ Core Web Vitals:');
  console.log(`  FCP: ${Math.round(metrics.metrics.fcp)}ms`);
  console.log(`  LCP: ${Math.round(metrics.metrics.lcp)}ms ${metrics.metrics.lcp <= 2500 ? '✅' : '❌'}`);
  console.log(`  CLS: ${metrics.metrics.cls.toFixed(3)} ${metrics.metrics.cls <= 0.1 ? '✅' : '❌'}`);
  console.log(`  TBT: ${Math.round(metrics.metrics.tbt)}ms ${metrics.metrics.tbt <= 200 ? '✅' : '❌'}`);
  console.log(`  SI: ${Math.round(metrics.metrics.si)}ms`);

  // Diagnostics
  console.log('\n🔍 Diagnostics:');
  console.log(`  Total Byte Weight: ${Math.round(metrics.diagnostics.totalByteWeight / 1024)}KB`);
  console.log(`  DOM Size: ${metrics.diagnostics.domSize} elements`);
  console.log(`  Main Thread Work: ${Math.round(metrics.diagnostics.mainThreadWork)}ms`);

  // Failures
  if (failures.length > 0) {
    console.log('\n❌ Budget Failures:');
    failures.forEach(failure => {
      console.log(`  - ${failure.message}`);
    });
  } else {
    console.log('\n✅ Wszystkie metryki w budżecie!');
  }
}

/**
 * Generuj summary JSON
 */
function generateSummary(results) {
  const summaryPath = path.join(OUTPUT_DIR, 'summary.json');

  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    results: results.map(r => ({
      page: r.pageName,
      device: r.device,
      scores: r.metrics.scores,
      webVitals: {
        fcp: Math.round(r.metrics.metrics.fcp),
        lcp: Math.round(r.metrics.metrics.lcp),
        cls: r.metrics.metrics.cls,
        tbt: Math.round(r.metrics.metrics.tbt),
      },
      passed: r.failures.length === 0,
      failures: r.failures,
    })),
    summary: {
      totalTests: results.length,
      passed: results.filter(r => r.failures.length === 0).length,
      failed: results.filter(r => r.failures.length > 0).length,
    },
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\n📄 Summary zapisane: ${summaryPath}`);

  return summary;
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Rozpoczynam testy Lighthouse...\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output format: ${OUTPUT_FORMAT}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  const chrome = await launchChrome();
  const results = [];

  try {
    for (const page of PAGES_TO_TEST) {
      const url = `${BASE_URL}${page.path}`;

      // Test desktop
      console.log(`\n🖥️  Testing ${page.name} (Desktop): ${url}`);
      const desktopResult = await runLighthouse(url, chrome, lighthouseConfig);
      const desktopMetrics = extractMetrics(desktopResult.lhr);
      const desktopFailures = checkBudget(desktopMetrics);

      saveReport(page.name, desktopResult.report, OUTPUT_FORMAT, 'desktop');
      formatResults(page.name, 'Desktop', desktopMetrics, desktopFailures);

      results.push({
        pageName: page.name,
        device: 'desktop',
        url,
        metrics: desktopMetrics,
        failures: desktopFailures,
      });

      // Test mobile
      console.log(`\n📱 Testing ${page.name} (Mobile): ${url}`);
      const mobileResult = await runLighthouse(url, chrome, mobileConfig);
      const mobileMetrics = extractMetrics(mobileResult.lhr);
      const mobileFailures = checkBudget(mobileMetrics);

      saveReport(page.name, mobileResult.report, OUTPUT_FORMAT, 'mobile');
      formatResults(page.name, 'Mobile', mobileMetrics, mobileFailures);

      results.push({
        pageName: page.name,
        device: 'mobile',
        url,
        metrics: mobileMetrics,
        failures: mobileFailures,
      });
    }

    // Generuj summary
    const summary = generateSummary(results);

    // Final report
    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total tests: ${summary.summary.totalTests}`);
    console.log(`Passed: ${summary.summary.passed} ✅`);
    console.log(`Failed: ${summary.summary.failed} ❌`);
    console.log('\nRaporty zapisane w:', OUTPUT_DIR);

    // Exit code
    if (summary.summary.failed > 0) {
      console.log('\n⚠️  Niektóre testy nie spełniły budżetu wydajności');
      process.exit(1);
    } else {
      console.log('\n✅ Wszystkie testy przeszły pomyślnie!');
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Błąd podczas testów:', error);
    process.exit(1);
  } finally {
    await chrome.kill();
  }
}

// Uruchom
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { runLighthouse, extractMetrics, checkBudget };
