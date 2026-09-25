from playwright.sync_api import sync_playwright

errors = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width":1280,"height":900})
    page = context.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto("http://127.0.0.1:8765/index.html?test=1", wait_until="domcontentloaded")
    page.wait_for_selector("#gridBody .day-col")
    assert page.locator("#tabSchedule").get_attribute("aria-selected") == "true"
    page.click("#tabAssignments")
    page.wait_for_selector(".assignment-card")
    assert page.locator(".assignment-card").count() == 4
    assert page.locator(".assignment-card.done").count() == 1
    assert "4 条结果 · 3 条未完成" in page.locator("#assignmentSummary").inner_text()
    assert "Proposal for the final project" in page.locator(".assignment-title").all_inner_texts()
    page.select_option("#assignmentStatusFilter", "done")
    assert page.locator(".assignment-card").count() == 1
    page.select_option("#assignmentStatusFilter", "all")
    page.select_option("#assignmentCourseFilter", "c1")
    assert page.locator(".assignment-card").count() == 1
    page.select_option("#assignmentCourseFilter", "all")

    page.click("#btnAdd")
    assert page.locator("#asTitle").is_visible()
    page.click("#modal .btn.primary")
    assert "请填写标题" in page.locator("#assignmentErrors").inner_text()
    page.fill("#asTitle", "E2E 临时任务")
    page.select_option("#asCourse", "c2")
    page.fill("#asDue", "2026-11-01T23:59")
    page.click("#modal .btn.primary")
    page.wait_for_timeout(100)
    assert page.locator(".assignment-card").count() == 5
    temp = page.locator(".assignment-card", has_text="E2E 临时任务")
    assert temp.count() == 1
    temp.locator("button", has_text="编辑").click()
    page.fill("#asTitle", "E2E 已编辑")
    page.click("#modal .btn.primary")
    assert page.locator(".assignment-title", has_text="E2E 已编辑").count() == 1
    edited = page.locator(".assignment-card", has_text="E2E 已编辑")
    edited.locator(".status-select").select_option("done")
    assert edited.get_attribute("class").find("done") >= 0
    edited.locator("button", has_text="编辑").click()
    page.once("dialog", lambda dialog: dialog.accept())
    page.click("#modal .btn.danger")
    assert page.locator(".assignment-card").count() == 4
    assert errors == [], errors

    # Existing schedule still renders after switching back.
    page.click("#tabSchedule")
    assert page.locator("#gridBody .day-col").count() == 7

    # Old JSON without assignments migrates to the four current seed tasks.
    legacy = {"semester":{"start":"2026-09-01","end":"2026-12-19"}, "courses":[], "events":[]}
    page.evaluate("obj => { localStorage.setItem('hkust-schedule-v1', JSON.stringify(obj)); location.reload(); }", legacy)
    page.wait_for_load_state("domcontentloaded")
    page.click("#tabAssignments")
    page.wait_for_selector(".assignment-card")
    assert page.locator(".assignment-card").count() == 4

    mobile = browser.new_context(viewport={"width":390,"height":844}).new_page()
    mobile.on("pageerror", lambda e: errors.append(str(e)))
    mobile.goto("http://127.0.0.1:8765/index.html?test=1", wait_until="domcontentloaded")
    mobile.click("#tabAssignments")
    mobile.wait_for_selector(".assignment-card")
    assert mobile.locator(".assignment-card").count() == 4
    overflow = mobile.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    assert overflow is False
    assert errors == [], errors
    browser.close()
print("E2E_OK CRUD+filters+migration schedule-regression desktop+mobile no-overflow no-pageerror")
