from playwright.sync_api import sync_playwright
import sys

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1024, "height": 768})
    page.goto("http://localhost:8000/signup.html")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1500)

    # Get eyebrow element
    eyebrow = page.locator(".card .eyebrow")

    # Check properties
    visible = eyebrow.is_visible()
    bbox = eyebrow.bounding_box()

    print(f"[OK] Eyebrow visible: {visible}")
    print(f"[OK] Eyebrow bounding box: x={bbox['x']}, y={bbox['y']}, w={bbox['width']}, h={bbox['height']}")

    # Check computed styles (avoiding Unicode in print)
    font_size = eyebrow.evaluate("el => window.getComputedStyle(el).fontSize")
    color = eyebrow.evaluate("el => window.getComputedStyle(el).color")
    opacity = eyebrow.evaluate("el => window.getComputedStyle(el).opacity")
    visibility = eyebrow.evaluate("el => window.getComputedStyle(el).visibility")
    display = eyebrow.evaluate("el => window.getComputedStyle(el).display")
    hasText = eyebrow.evaluate("el => el.textContent.length > 0")

    print(f"[OK] Font size: {font_size}")
    print(f"[OK] Color: {color}")
    print(f"[OK] Opacity: {opacity}")
    print(f"[OK] Visibility: {visibility}")
    print(f"[OK] Display: {display}")
    print(f"[OK] Has text content: {hasText}")

    browser.close()
print("[OK] Debug complete!")
