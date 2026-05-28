from playwright.sync_api import sync_playwright

sizes = [("mobile_375", 375, 667), ("mobile_390", 390, 844)]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, w, h in sizes:
        context = browser.new_context(viewport={"width": w, "height": h})
        page = context.new_page()
        page.goto("http://localhost:8000/signup.html")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)
        page.screenshot(path=f"fix_{name}.png")
        print(f"[OK] {name} saved")
        context.close()
    browser.close()
