from playwright.sync_api import sync_playwright

# Viewport sizes to test: mobile, tablet, desktop
test_sizes = [
    ("Mobile_320", 320, 568),
    ("Mobile_375", 375, 812),
    ("Tablet_768", 768, 1024),
    ("Desktop_1024", 1024, 768),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Test login page
    page.goto("http://localhost:8000/index.html")

    for name, width, height in test_sizes:
        page.set_viewport_size({"width": width, "height": height})
        page.wait_for_load_state("networkidle")

        screenshot_path = f"screenshot_{name}_login.png"
        page.screenshot(path=screenshot_path)
        print(f"[OK] {name}: Login page screenshot saved - {screenshot_path}")

        # Check if content is visible
        card_visible = page.locator(".card").is_visible()
        form_visible = page.locator("form").is_visible()
        print(f"  - Card visible: {card_visible}, Form visible: {form_visible}")

    # Test signup page
    page.goto("http://localhost:8000/signup.html")

    for name, width, height in test_sizes:
        page.set_viewport_size({"width": width, "height": height})
        page.wait_for_load_state("networkidle")

        screenshot_path = f"screenshot_{name}_signup.png"
        page.screenshot(path=screenshot_path)
        print(f"[OK] {name}: Signup page screenshot saved - {screenshot_path}")

        # Check if content is visible
        card_visible = page.locator(".card").is_visible()
        form_visible = page.locator("form").is_visible()
        print(f"  - Card visible: {card_visible}, Form visible: {form_visible}")

    browser.close()

print("\n[OK] All screenshots captured successfully!")
