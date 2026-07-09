from playwright.sync_api import sync_playwright
import time

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            page.goto("http://localhost:3000")
            page.wait_for_timeout(3000)

            # Check for pin-spacer which is injected by GSAP ScrollTrigger
            pin_spacer_exists = page.locator(".pin-spacer").count() > 0
            print(f"Pin-spacer exists (ScrollTrigger active): {pin_spacer_exists}")

            # Take screenshots of transitions
            page.screenshot(path="0_hero.png")

            # Scroll to Material
            page.evaluate("window.scrollTo(0, 1500)")
            page.wait_for_timeout(1000)
            page.screenshot(path="1_material.png")

            # Scroll to Light
            page.evaluate("window.scrollTo(0, 4500)")
            page.wait_for_timeout(1000)
            page.screenshot(path="2_light.png")

            # Check if background color changes as expected in Graphite/Black sections
            body_color = page.evaluate("window.getComputedStyle(document.body).backgroundColor")
            print(f"Body BG Color: {body_color}")

        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    run_verification()
