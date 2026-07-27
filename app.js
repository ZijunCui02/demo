/* AV-Phys Bench rebuttal demo — original vs implicit prompts, Seedance 2.0.
 * Static build: data.json + videos_old/ + videos_new/, no backend.
 * Left column verdicts are the released human-majority labels (immutable).
 * Right column verdicts are editable, pre-filled from the left as placeholders,
 * persisted in localStorage and exportable as a single JSON file. */
(function () {
    "use strict";

    var STORE_KEY = "avphys_rebuttal_verdicts_v1";
    var SAVE_ENDPOINTS = ["https://demo.zijuncui.com/api/verdicts", "api/verdicts", "https://eve.tail5cf4e4.ts.net/api/verdicts", "http://localhost:8321/save"];
    var saveEndpointIdx = null;
    var autosaveTimer = null;
    var lastAutosave = null;
    var ASPECT_LABELS = {
        video_sa: "Video — Semantic Adherence",
        audio_sa: "Audio — Semantic Adherence",
        video_pc: "Video — Physical Commonsense",
        audio_pc: "Audio — Physical Commonsense",
        av_pc: "Audio-Visual — Physical Commonsense"
    };

    var DATA = null;
    var entries = [];
    var filtered = [];
    var cur = 0;
    var store = loadStore();

    /* ---------------- persistence ---------------- */
    function loadStore() {
        try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
        catch (e) { return {}; }
    }
    function saveStore() {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
        catch (e) { toast("localStorage unavailable — edits will not persist!", "error"); }
        scheduleAutosave();
    }
    function exportPayload() {
        var out = { exported_at: new Date().toISOString(), model: DATA ? DATA.model : "", autosave: true, verdicts: {} };
        entries.forEach(function (e) {
            var full = {};
            e.statements.forEach(function (st) { full[st.key] = verdictFor(e, st.key); });
            out.verdicts[e.index] = { edited: isEdited(e), scores: full };
        });
        return out;
    }
    function setAutosaveStatus(ok, detail) {
        var el = document.getElementById("autosave-status");
        if (!el) return;
        if (ok === null) { el.textContent = "autosave: connecting…"; el.className = "badge"; el.style.display = ""; return; }
        if (ok) { el.textContent = "saved to eve " + detail; el.className = "badge autosave-ok"; el.style.display = ""; }
        else if (ok === false && saveEndpointIdx !== null) { el.textContent = "eve UNREACHABLE — use Export!"; el.className = "badge autosave-bad"; el.style.display = ""; }
        else { el.style.display = "none"; } /* viewer mode: no save backend, chip hidden */
    }
    function trySave(idx, body, done) {
        if (idx >= SAVE_ENDPOINTS.length) { done(false); return; }
        fetch(SAVE_ENDPOINTS[idx], { method: "POST", headers: { "Content-Type": "application/json" }, body: body })
        .then(function (r) { if (!r.ok) throw new Error(r.status); saveEndpointIdx = idx; done(true); })
        .catch(function () { trySave(idx + 1, body, done); });
    }
    function pushAutosave() {
        if (!entries.length) return;
        var body = JSON.stringify(exportPayload());
        var start = saveEndpointIdx === null ? 0 : saveEndpointIdx;
        trySave(start, body, function (ok) {
            if (ok) { lastAutosave = new Date(); setAutosaveStatus(true, lastAutosave.toLocaleTimeString()); }
            else { var had = saveEndpointIdx !== null; saveEndpointIdx = null; setAutosaveStatus(had ? false : undefined); }
        });
    }
    function scheduleAutosave() {
        if (autosaveTimer) clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(pushAutosave, 1500);
    }
    function verdictFor(entry, key) {
        var rec = store[entry.index];
        if (rec && Object.prototype.hasOwnProperty.call(rec, key)) return rec[key];
        var st = entry.statements.find(function (s) { return s.key === key; });
        return st ? st.old : null; /* placeholder = original majority */
    }
    function isEdited(entry) {
        return !!store[entry.index] && Object.keys(store[entry.index]).length > 0;
    }
    function setVerdict(entry, key, val) {
        if (!store[entry.index]) store[entry.index] = {};
        var st = entry.statements.find(function (s) { return s.key === key; });
        if (st && st.old === val) { delete store[entry.index][key]; }
        else { store[entry.index][key] = val; }
        if (Object.keys(store[entry.index]).length === 0) delete store[entry.index];
        saveStore();
    }

    /* ---------------- helpers ---------------- */
    function $(id) { return document.getElementById(id); }
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }
    function toast(msg, type) {
        var el = document.createElement("div");
        el.className = "toast " + (type || "info");
        el.textContent = msg;
        $("toast-container").appendChild(el);
        setTimeout(function () { el.remove(); }, 3200);
    }

    /* ---------------- rendering ---------------- */
    function chip(val, locked) {
        var v = val === "yes" ? "yes" : val === "no" ? "no" : "na";
        var label = v === "na" ? "—" : v.toUpperCase();
        return '<span class="verdict-chip chip-' + v + (locked ? " chip-locked" : "") + '">' + label + "</span>";
    }
    function toggleHtml(entry, st) {
        var v = verdictFor(entry, st.key);
        var changed = store[entry.index] && Object.prototype.hasOwnProperty.call(store[entry.index], st.key);
        return '<div class="verdict-toggle' + (changed ? " toggle-changed" : "") + '" data-key="' + st.key + '">' +
            '<button class="tbtn tbtn-yes' + (v === "yes" ? " on" : "") + '" data-val="yes">YES</button>' +
            '<button class="tbtn tbtn-no' + (v === "no" ? " on" : "") + '" data-val="no">NO</button>' +
            (changed ? '<span class="edited-mark" title="differs from original placeholder">edited</span>' : "") +
            "</div>";
    }
    function videoPanel(kind, entry) {
        var isOld = kind === "old";
        var src = (isOld ? "videos_old/" : "videos_new/") + entry.index + ".mp4";
        var promptText = isOld ? entry.old_prompt : entry.new_prompt;
        var head = isOld ? "Original prompt (released video, physics outcome stated)"
                         : "Implicit prompt (new video, physics outcome removed)";
        return '<div class="cmp-col cmp-' + kind + '">' +
            '<div class="cmp-head">' + head + "</div>" +
            '<video class="cmp-video" controls preload="metadata" src="' + src + '"' +
            ' onerror="this.outerHTML=\'<div class=&quot;video-missing&quot;>video not yet generated</div>\'"></video>' +
            '<div class="cmp-prompt">' + escapeHtml(promptText) + "</div>" +
            "</div>";
    }
    function render() {
        var entry = filtered[cur];
        if (!entry) { $("main-content").innerHTML = '<div class="loading">No prompts match the filter.</div>'; return; }
        $("header-prompt-id").textContent = entry.index;
        $("header-category").textContent = entry.subcategory_id + " · " + entry.subcategory_name + " · " + entry.principle;
        var reviewed = entries.filter(isEdited).length;
        $("header-progress").textContent = reviewed + " / " + entries.length + " edited";
        $("nav-progress").textContent = (cur + 1) + " / " + filtered.length;
        $("select-prompt").value = entry.index;

        var rows = "";
        var lastAspect = "";
        entry.statements.forEach(function (st) {
            if (st.aspect !== lastAspect) {
                rows += '<tr class="aspect-row"><td colspan="3">' + ASPECT_LABELS[st.aspect] + "</td></tr>";
                lastAspect = st.aspect;
            }
            rows += "<tr>" +
                '<td class="stmt-text">' + escapeHtml(st.text) + "</td>" +
                '<td class="cell-old">' + chip(st.old, true) + "</td>" +
                '<td class="cell-new">' + toggleHtml(entry, st) + "</td>" +
                "</tr>";
        });

        $("main-content").innerHTML =
            '<div class="cmp-grid">' + videoPanel("old", entry) + videoPanel("new", entry) + "</div>" +
            '<table class="rubric-table"><thead><tr>' +
            "<th>Rubric statement</th><th>Original (human majority, locked)</th><th>Implicit (editable)</th>" +
            "</tr></thead><tbody>" + rows + "</tbody></table>";

        Array.prototype.forEach.call(document.querySelectorAll(".verdict-toggle .tbtn"), function (btn) {
            btn.addEventListener("click", function () {
                var key = btn.parentElement.getAttribute("data-key");
                setVerdict(entry, key, btn.getAttribute("data-val"));
                render();
            });
        });
    }

    /* ---------------- navigation ---------------- */
    function go(i) {
        cur = Math.max(0, Math.min(filtered.length - 1, i));
        render();
        window.scrollTo(0, 0);
    }
    function nextUnreviewed() {
        for (var k = 1; k <= filtered.length; k++) {
            var j = (cur + k) % filtered.length;
            if (!isEdited(filtered[j])) { go(j); return; }
        }
        toast("All prompts in this filter have edits.", "info");
    }
    function applyFilter() {
        var sub = $("filter-subcategory").value;
        filtered = entries.filter(function (e) { return !sub || e.subcategory_id === sub; });
        var sel = $("select-prompt");
        sel.innerHTML = filtered.map(function (e) {
            return '<option value="' + e.index + '">' + e.index + "</option>";
        }).join("");
        go(0);
    }

    /* ---------------- export / import ---------------- */
    function doExport() {
        var out = {
            exported_at: new Date().toISOString(),
            model: DATA.model,
            note: "implicit-side verdicts; scores include placeholders, 'edited' marks prompts with deviations",
            verdicts: {}
        };
        entries.forEach(function (e) {
            var full = {};
            e.statements.forEach(function (st) { full[st.key] = verdictFor(e, st.key); });
            out.verdicts[e.index] = { edited: isEdited(e), scores: full };
        });
        var blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "implicit_verdicts_" + new Date().toISOString().slice(0, 10) + ".json";
        a.click();
        toast("Exported " + entries.length + " prompts.", "success");
    }
    function doImport(file) {
        var reader = new FileReader();
        reader.onload = function () {
            try {
                var data = JSON.parse(reader.result);
                var n = 0;
                entries.forEach(function (e) {
                    var rec = data.verdicts && data.verdicts[e.index];
                    if (!rec || !rec.scores) return;
                    e.statements.forEach(function (st) {
                        var v = rec.scores[st.key];
                        if (v === "yes" || v === "no") {
                            if (v !== st.old) {
                                if (!store[e.index]) store[e.index] = {};
                                store[e.index][st.key] = v; n++;
                            } else if (store[e.index]) {
                                delete store[e.index][st.key];
                            }
                        }
                    });
                    if (store[e.index] && Object.keys(store[e.index]).length === 0) delete store[e.index];
                });
                saveStore(); render();
                toast("Imported (" + n + " deviations from placeholders).", "success");
            } catch (err) { toast("Import failed: " + err.message, "error"); }
        };
        reader.readAsText(file);
    }

    /* ---------------- boot ---------------- */
    function hydrateFromServer(done) {
        var GETS = ["https://demo.zijuncui.com/api/verdicts", "api/verdicts", "https://eve.tail5cf4e4.ts.net/api/verdicts"];
        function tryGet(i) {
            if (i >= GETS.length) return Promise.resolve(null);
            return fetch(GETS[i]).then(function (r) { return r.ok ? r.json() : tryGet(i + 1); })
                .catch(function () { return tryGet(i + 1); });
        }
        tryGet(0)
        .then(function (saved) {
            if (saved && saved.verdicts) {
                var added = 0;
                entries.forEach(function (e) {
                    if (store[e.index]) return; /* local edits win — never overwritten */
                    var rec = saved.verdicts[e.index];
                    if (!rec || !rec.scores) return;
                    e.statements.forEach(function (st) {
                        var v = rec.scores[st.key];
                        if ((v === "yes" || v === "no") && v !== st.old) {
                            if (!store[e.index]) store[e.index] = {};
                            store[e.index][st.key] = v; added++;
                        }
                    });
                });
                if (added > 0) {
                    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (err) { /* ignore */ }
                    toast("Merged " + added + " saved verdicts from eve.", "success");
                }
            }
            done();
        }).catch(function () { done(); });
    }
    function boot() {
        fetch("data.json").then(function (r) { return r.json(); }).then(function (d) {
            DATA = d;
            entries = d.entries;
            var subs = [];
            entries.forEach(function (e) { if (subs.indexOf(e.subcategory_id) < 0) subs.push(e.subcategory_id); });
            $("filter-subcategory").innerHTML = '<option value="">All subcategories</option>' +
                subs.map(function (s) { return '<option value="' + s + '">' + s + "</option>"; }).join("");
            hydrateFromServer(applyFilter);
        }).catch(function (e) {
            $("main-content").innerHTML = '<div class="loading">Failed to load data.json: ' + escapeHtml(e.message) + "</div>";
        });
        setAutosaveStatus(null);
        setInterval(pushAutosave, 60000);
        setTimeout(pushAutosave, 3000);
        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "hidden") pushAutosave();
        });

        $("btn-prev").addEventListener("click", function () { go(cur - 1); });
        $("btn-next").addEventListener("click", function () { go(cur + 1); });
        $("btn-next-unreviewed").addEventListener("click", nextUnreviewed);
        $("select-prompt").addEventListener("change", function () {
            var self = this;
            var i = filtered.findIndex(function (e) { return e.index === self.value; });
            if (i >= 0) go(i);
        });
        $("filter-subcategory").addEventListener("change", applyFilter);
        $("btn-export").addEventListener("click", doExport);
        $("input-import").addEventListener("change", function () {
            if (this.files[0]) doImport(this.files[0]);
            this.value = "";
        });
        $("btn-toggle-theme").addEventListener("click", function () {
            var dark = document.documentElement.getAttribute("data-theme") === "dark";
            if (dark) document.documentElement.removeAttribute("data-theme");
            else document.documentElement.setAttribute("data-theme", "dark");
            try { localStorage.setItem("phyomnibench_theme", dark ? "light" : "dark"); } catch (e) { /* ignore */ }
        });
        document.addEventListener("keydown", function (ev) {
            if (ev.target.tagName === "INPUT" || ev.target.tagName === "SELECT" || ev.target.tagName === "TEXTAREA") return;
            if (ev.key === "ArrowLeft") go(cur - 1);
            else if (ev.key === "ArrowRight") go(cur + 1);
            else if (ev.key === "u" || ev.key === "U") nextUnreviewed();
            else if (ev.key === "p" || ev.key === "P") {
                Array.prototype.forEach.call(document.querySelectorAll("video"), function (v) { v.play(); });
            }
        });
    }
    boot();
})();
