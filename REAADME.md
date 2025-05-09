# Netlify Website Automated Tests with Playwright

This project contains automated tests for the Netlify website (https://www.netlify.com/) using Playwright and TypeScript.

## Test Cases Implemented

1. **Lead Capture Form Validation**
   - Verify newsletter form presence and functionality
   - Test form submission with valid/invalid data
   - Verify user feedback

2. **Sitemap and Crawlability Verification**
   - Verify sitemap.xml existence
   - Check URL accessibility from sitemap
   - Verify noindex meta tags
   - Check crawlability of important pages

3. **404 Link Verification**
   - Check all page links for 404 errors
   - Verify navigation links

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/gabrielmustata85/netlify-playwright-tests.git

## Install dependecies
1. npm install
2. npm playwright install

## Run tests
1. Run all tests
npx playwright test

2. Run specific test file
npx playwright test tests/formValidation.spec.ts

3. Generate report
npx playwright show-report