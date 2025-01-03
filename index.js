// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Go to Hacker News newest page
    await page.goto("https://news.ycombinator.com/newest");

    // Extract titles and timestamps of the first 100 articles
    const articles = await page.$$eval(".athing", rows => {
      return rows.slice(0, 100).map(row => {
        const title = row.querySelector(".titleline a")?.textContent.trim();
        const ageElement = row.nextElementSibling?.querySelector(".age a");
        const timestamp = ageElement ? ageElement.getAttribute("title") : null;
        return { title, timestamp };
      });
    });

    // Validate that articles are sorted from newest to oldest by timestamp
    let sorted = true;
    for (let i = 0; i < articles.length - 1; i++) {
      if (new Date(articles[i].timestamp) < new Date(articles[i + 1].timestamp)) {
        sorted = false;
        break;
      }
    }

    if (sorted) {
      console.log("✅ The first 100 articles are sorted from newest to oldest.");
    } else {
      console.log("❌ The first 100 articles are NOT sorted from newest to oldest.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}

(async () => {
  await sortHackerNewsArticles();
})();
