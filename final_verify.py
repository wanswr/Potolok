import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Enable console logging
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        await page.goto("http://localhost:3000", wait_until="networkidle")
        await asyncio.sleep(2) # Wait for isLoaded

        # Check if pin-spacers exist
        pins = await page.query_selector_all(".pin-spacer")
        print(f"Found {len(pins)} pin-spacers")

        # Take screenshots at various scroll positions

        # 1. Hero
        await page.screenshot(path="verify_1_hero.png")

        # 2. Material (pinned)
        await page.evaluate("window.scrollTo(0, 1500)")
        await asyncio.sleep(1)
        await page.screenshot(path="verify_2_material.png")

        # 3. CeilingTypes (pinned)
        await page.evaluate("window.scrollTo(0, 3000)")
        await asyncio.sleep(1)
        await page.screenshot(path="verify_3_ceilings.png")

        # 4. Portfolio (horizontal scroll)
        await page.evaluate("window.scrollTo(0, 7000)")
        await asyncio.sleep(1)
        await page.screenshot(path="verify_4_portfolio_start.png")

        await page.evaluate("window.scrollTo(0, 8000)")
        await asyncio.sleep(1)
        await page.screenshot(path="verify_5_portfolio_mid.png")

        await browser.close()

asyncio.run(run())
