from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1024, "height": 768})
    page.goto("http://localhost:8000/signup.html")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1500)  # Wait for animations to complete
    page.screenshot(path="test_signup_fixed.png")

    # Check if eyebrow is visible
    eyebrow = page.locator(".eyebrow")
    print(f"Eyebrow visible: {eyebrow.is_visible()}")
    print(f"Eyebrow text: {eyebrow.text_content()}")

    browser.close()
print("[OK] Screenshot saved!")
