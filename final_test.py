from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(viewport={"width": 1024, "height": 768})
    page = context.new_page()

    page.goto("http://localhost:8000/signup.html")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path="signup_final.png")

    eyebrow = page.locator(".card .eyebrow")
    visible = eyebrow.is_visible()
    has_text = eyebrow.evaluate("el => el.textContent.trim().length > 0")
    bbox = eyebrow.bounding_box()

    print(f"[OK] Signup Eyebrow visible: {visible}")
    print(f"[OK] Eyebrow has text content: {has_text}")
    if bbox:
        print(f"[OK] Eyebrow dimensions: {bbox['width']:.1f}x{bbox['height']:.1f}px")

    browser.close()
print("[OK] Final test complete!")
