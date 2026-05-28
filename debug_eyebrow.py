from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1024, "height": 768})
    page.goto("http://localhost:8000/signup.html")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1500)

    # Get eyebrow element
    eyebrow = page.locator(".card .eyebrow")

    # Check properties
    print(f"Eyebrow visible: {eyebrow.is_visible()}")
    print(f"Eyebrow bounding box: {eyebrow.bounding_box()}")
    print(f"Eyebrow inner text: {eyebrow.inner_text()}")

    # Check computed styles
    font_size = eyebrow.evaluate("el => window.getComputedStyle(el).fontSize")
    color = eyebrow.evaluate("el => window.getComputedStyle(el).color")
    opacity = eyebrow.evaluate("el => window.getComputedStyle(el).opacity")
    visibility = eyebrow.evaluate("el => window.getComputedStyle(el).visibility")
    display = eyebrow.evaluate("el => window.getComputedStyle(el).display")

    print(f"Font size: {font_size}")
    print(f"Color: {color}")
    print(f"Opacity: {opacity}")
    print(f"Visibility: {visibility}")
    print(f"Display: {display}")

    browser.close()
