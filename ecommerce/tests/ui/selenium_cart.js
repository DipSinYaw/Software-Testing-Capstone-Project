const { Builder, By, Key, until } = require("selenium-webdriver");

/**
 * This End-to-End (E2E) test script automates the login process.
 * It uses Selenium to open a browser, navigate to the login page,
 * fill in credentials, and submit the form.
 */

// We use an Immediately Invoked Function Expression (IIFE)
// to define and execute our async test logic in one step.
(async function loginE2ETest() {
  // Declare driver here so it's accessible in the finally block.
  let driver;
  let sleeptime = 1000; // 2 seconds sleep time for better visibility of actions

  try {
    console.log("Starting login E2E test...");
    // Initialize a new Chrome browser session. This is now inside the try block.
    driver = await new Builder().forBrowser("chrome").build();

    // 1. Navigate to the login page.
    await driver.get("http://localhost:3000/login");
    console.log("  - Navigated to the login page.");

    // 2. Find the email input field by its ID and type the email.
    await driver.wait(until.elementLocated(By.id("email")), 10000).sendKeys("sss@sss.com");
    console.log("  - Entered email 'sss@sss.com'.");

    // 3. Find the password input field by its ID and type the password.
    await driver.wait(until.elementLocated(By.id("password")), 10000).sendKeys("sss");
    console.log("  - Entered password.");

    // 4. Find the 'Sign In' button by its text and click it.
    await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Sign In']")), 10000).click();
    console.log("  - Clicked the 'Sign In' button (found by text).");

    // 5. Assert: Wait until the URL changes, indicating a successful login/redirect.
    await driver.wait(until.urlIs("http://localhost:3000/products"), 10000);
    console.log("  - Login successful, redirected to products page.");
    await driver.sleep(sleeptime); // Pause on products page

    // Helper function to create a robust XPath for the 'Add to Cart' button
    const getAddToCartButtonXPath = (productName) => {
      return `//div[.//h2[text()='${productName}']]//button[text()='Add to Cart']`;
    };

    // 6. Add "Hat" to cart. Wait for the button to be ready before clicking.
    console.log("  - Finding 'Add to Cart' for Hat...");
    const hatButton = await driver.wait(until.elementLocated(By.xpath(getAddToCartButtonXPath('Hat'))), 10000);
    await driver.sleep(sleeptime); // Pause before clicking
    await hatButton.click();
    console.log("  - Clicked 'Add to Cart' for Hat. Pausing to observe result...");
    await driver.sleep(sleeptime); // Pause after clicking

    // 7. Add "Shirt" to cart
    console.log("  - Finding 'Add to Cart' for Shirt...");
    const shirtButton = await driver.wait(until.elementLocated(By.xpath(getAddToCartButtonXPath('Shirt'))), 10000);
    await driver.sleep(sleeptime); // Pause before clicking
    await shirtButton.click();
    console.log("  - Clicked 'Add to Cart' for Shirt. Pausing to observe result...");
    await driver.sleep(sleeptime); // Pause after clicking

    // 8. Add "Apron" to cart
    console.log("  - Finding 'Add to Cart' for Apron...");
    const apronButton = await driver.wait(until.elementLocated(By.xpath(getAddToCartButtonXPath('Apron'))), 10000);
    await driver.sleep(sleeptime); // Pause before clicking
    await apronButton.click();
    console.log("  - Clicked 'Add to Cart' for Apron. Pausing to observe result...");
    await driver.sleep(sleeptime); // Pause after clicking

    // 9. Navigate to the cart page by clicking the 'Cart' link in the nav bar
    await driver.wait(until.elementLocated(By.css('a[href="/cart"]')), 10000).click();
    console.log("  - Clicked 'Cart' link in navigation (found by href).");

    // 10. Assert navigation to the cart page
    await driver.wait(until.urlIs("http://localhost:3000/cart"), 10000);
    console.log("  - Verified navigation to cart page.");
    await driver.sleep(sleeptime);

    console.log("\nTEST PASSED: Login and Add to Cart flow completed successfully!");
  } catch (error) {
    console.error("\nTEST FAILED: An error occurred.", error);
  } finally {
    // Ensure the driver was successfully created before trying to interact with it.
    if (driver) {
      // For debugging: Pause for 2 seconds before closing the browser.
      console.log("Pausing for 2 seconds before closing...");
      await driver.sleep(sleeptime);
      // 6. Always close the browser session.
      await driver.quit();
      console.log("Browser session closed.");
    }
  }
})();
