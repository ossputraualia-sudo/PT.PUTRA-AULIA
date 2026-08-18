```css
/* =====================================================
   PAG DOCS FIELD
   APP CSS
   MOBILE FIRST
   ===================================================== */

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  min-height: 100%;
  background: #dbeafe;
}

body {
  margin: 0;
  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #dbeafe 0%,
      #f0fdf4 38%,
      #f8fafc 100%
    );

  color: #0f172a;

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;

  -webkit-font-smoothing: antialiased;
}


/* =====================================================
   APP
   ===================================================== */

#app {
  position: relative;

  width: 100%;
  max-width: 480px;

  min-height: 100vh;

  margin: auto;

  background: #f8fafc;

  padding-bottom: 82px;

  overflow-x: hidden;
}


/* =====================================================
   HEADER
   ===================================================== */

#appHeader {
  position: sticky;

  top: 0;

  z-index: 1000;

  width: 100%;
  height: 64px;

  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background:
    linear-gradient(
      135deg,
      #063b4c,
      #075985
    );

  color: white;

  border-bottom:
    1px solid
    rgba(255,255,255,.08);

  box-shadow:
    0 4px 18px
    rgba(7,89,133,.18);
}


/* =====================================================
   BRAND
   ===================================================== */

.app-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-brand b {
  font-size: 16px;
  letter-spacing: .6px;
}

.app-brand small {
  padding: 4px 7px;

  border-radius: 6px;

  background:
    rgba(255,255,255,.12);

  color: #d1fae5;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}


/* =====================================================
   HEADER ACTIONS
   ===================================================== */

.app-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}


/* =====================================================
   CONNECTION STATUS
   ===================================================== */

.connection-status {
  display: flex;
  align-items: center;
  gap: 5px;

  padding: 6px 8px;

  border-radius: 10px;

  background:
    rgba(255,255,255,.08);

  color: #d1fae5;

  font-size: 10px;
  font-weight: 600;

  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #22c55e;

  box-shadow:
    0 0 0 3px
    rgba(34,197,94,.14);
}

.connection-status.offline {
  color: #fecaca;
}

.connection-status.offline .status-dot {
  background: #ef4444;

  box-shadow:
    0 0 0 3px
    rgba(239,68,68,.14);
}


/* =====================================================
   SYNC BUTTON
   ===================================================== */

#sync {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border:
    1px solid
    rgba(255,255,255,.10);

  border-radius: 11px;

  background:
    rgba(255,255,255,.09);

  color: white;

  font-size: 20px;

  cursor: pointer;

  transition: .15s ease;
}

#sync:active {
  transform: scale(.92);
}

#sync:disabled {
  opacity: .45;
  cursor: not-allowed;
}


/* =====================================================
   MAIN VIEW
   ===================================================== */

#view {
  width: 100%;

  padding: 16px;

  padding-bottom: 20px;
}


/* =====================================================
   HERO
   ===================================================== */

.hero {
  position: relative;

  overflow: hidden;

  padding: 20px;

  margin-bottom: 14px;

  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      #064e3b,
      #075985
    );

  color: white;

  border:
    1px solid
    rgba(255,255,255,.08);

  box-shadow:
    0 10px 26px
    rgba(7,89,133,.18);
}

.hero::after {
  content: "";

  position: absolute;

  width: 170px;
  height: 170px;

  right: -65px;
  top: -65px;

  border-radius: 50%;

  background:
    rgba(255,255,255,.06);
}

.hero small {
  position: relative;

  font-size: 10px;
  letter-spacing: 1.5px;

  color: #a7f3d0;
}

.hero h2 {
  position: relative;

  margin: 7px 0;

  font-size: 23px;
  letter-spacing: -.3px;
}

.hero div {
  position: relative;

  font-size: 13px;

  color: #dbeafe;
}


/* =====================================================
   GENERAL CARD
   ===================================================== */

.card {
  background: #ffffff;

  border-radius: 18px;

  padding: 17px;

  margin-bottom: 13px;

  border:
    1px solid
    #dbe7ef;

  box-shadow:
    0 7px 22px
    rgba(15,118,110,.08);

  transition:
    transform .15s ease,
    box-shadow .15s ease;
}

.card h2 {
  margin: 0 0 14px;

  font-size: 20px;
}

.card h3 {
  margin: 0 0 10px;

  font-size: 16px;
}


/* =====================================================
   SOP CARD
   ===================================================== */

.sop-card {
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 76px;

  margin: 0 0 14px;
  padding: 13px 14px;

  background: #ffffff;

  border:
    1px solid
    #dbe7ef;

  border-radius: 17px;

  text-decoration: none;

  color: #0f172a;

  box-shadow:
    0 6px 18px
    rgba(15,118,110,.07);

  transition:
    transform .15s ease,
    box-shadow .15s ease,
    background .15s ease;
}

.sop-card:active {
  transform: scale(.98);

  background: #f0fdf4;

  box-shadow:
    0 3px 10px
    rgba(15,118,110,.08);
}

.sop-card-icon {
  width: 46px;
  height: 46px;

  min-width: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 13px;

  background:
    linear-gradient(
      135deg,
      #e0f2fe,
      #ecfdf5
    );

  color: #075985;

  font-size: 22px;
}

.sop-card-content {
  min-width: 0;

  flex: 1;

  margin-left: 12px;
}

.sop-card-title {
  display: block;

  font-size: 14px;
  font-weight: 800;

  color: #0f172a;

  line-height: 1.25;
}

.sop-card-description {
  display: block;

  margin-top: 4px;

  font-size: 10px;
  font-weight: 500;

  color: #64748b;

  line-height: 1.3;
}

.sop-card-arrow {
  width: 28px;
  min-width: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #94a3b8;

  font-size: 24px;
  font-weight: 400;
}


/* =====================================================
   DASHBOARD SECTION
   ===================================================== */

.dashboard-section {
  margin-bottom: 17px;
}

.section-title {
  margin:
    0 3px 9px;

  font-size: 13px;
  font-weight: 800;

  color: #334155;

  letter-spacing: .1px;
}


/* =====================================================
   DASHBOARD GRID
   ===================================================== */

.grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 11px;

  margin-bottom: 14px;
}

.dashboard-grid {
  margin-bottom: 0;
}


/* =====================================================
   ACTION
   ===================================================== */

.action {
  position: relative;

  width: 100%;
  min-height: 105px;

  padding: 15px;

  text-align: left;

  background: #ffffff;

  border:
    1px solid
    #dbe7ef;

  border-radius: 17px;

  color: #0f172a;

  font-weight: 700;
  font-size: 14px;

  box-shadow:
    0 6px 18px
    rgba(15,118,110,.07);

  cursor: pointer;

  transition:
    transform .15s ease,
    box-shadow .15s ease,
    background .15s ease;
}

.action:active {
  transform: scale(.96);

  background: #f0fdf4;

  box-shadow:
    0 3px 10px
    rgba(15,118,110,.08);
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  margin-bottom: 9px;

  border-radius: 11px;

  background: #f0fdf4;

  font-size: 19px;
}

.action-label {
  display: block;

  font-size: 13px;
  font-weight: 800;

  line-height: 1.2;
}

.action small {
  display: block;

  margin-top: 4px;

  font-size: 10px;

  color: #64748b;

  font-weight: 500;

  line-height: 1.25;
}


/* =====================================================
   BUTTON
   ===================================================== */

.btn {
  width: 100%;

  min-height: 46px;

  padding: 12px 16px;

  margin-top: 10px;

  border: 0;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #047857,
      #075985
    );

  color: white;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 6px 16px
    rgba(4,120,87,.18);
}

.btn:active {
  transform: scale(.98);
}

.btn:disabled {
  opacity: .5;
}


/* =====================================================
   FORM
   ===================================================== */

.field {
  margin: 14px 0;
}

.field label {
  display: block;

  margin-bottom: 6px;

  font-size: 12px;
  font-weight: 700;

  color: #334155;
}

.field input,
.field textarea,
.field select {
  width: 100%;

  padding: 12px 13px;

  border:
    1px solid
    #cbd5e1;

  border-radius: 12px;

  background: #f8fafc;

  color: #0f172a;

  font-family: inherit;

  font-size: 14px;

  outline: none;

  transition: .15s ease;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  background: white;

  border-color: #0f766e;

  box-shadow:
    0 0 0 3px
    rgba(15,118,110,.10);
}

.field textarea {
  min-height: 100px;

  resize: vertical;
}


/* =====================================================
   BOTTOM NAVIGATION
   ===================================================== */

#bottomNav {
  position: fixed;

  z-index: 2000;

  bottom: 0;

  left: 50%;

  transform: translateX(-50%);

  width: min(480px, 100%);

  height: 76px;

  display: flex;

  align-items: stretch;

  padding:
    7px 8px
    env(safe-area-inset-bottom);

  background:
    rgba(255,255,255,.97);

  border-top:
    1px solid
    #dbe7ef;

  box-shadow:
    0 -7px 22px
    rgba(15,118,110,.10);

  backdrop-filter: blur(14px);

  -webkit-backdrop-filter: blur(14px);
}

#bottomNav button {
  flex: 1;

  min-width: 0;
  height: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 4px;

  margin: 0;
  padding: 4px;

  border: 0;

  background: transparent;

  color: #64748b;

  border-radius: 13px;

  cursor: pointer;

  transition: .15s ease;
}

#bottomNav button:active {
  transform: scale(.94);
}

#bottomNav .nav-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
}

#bottomNav .nav-icon svg {
  width: 21px;
  height: 21px;
}

#bottomNav button small {
  display: block;

  font-size: 10px;
  line-height: 12px;

  font-weight: 600;

  white-space: nowrap;
}

#bottomNav button.active {
  background: #ecfdf5;

  color: #047857;
}

#bottomNav button.active .nav-icon {
  color: #047857;
}


/* =====================================================
   TOAST
   ===================================================== */

#toast {
  display: none;

  position: fixed;

  z-index: 9999;

  bottom: 92px;

  left: 50%;

  transform: translateX(-50%);

  width: max-content;

  max-width: calc(100% - 40px);

  padding: 11px 16px;

  border-radius: 12px;

  background: #0f172a;

  color: white;

  font-size: 13px;
  font-weight: 600;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.20);
}


/* =====================================================
   CAMERA
   ===================================================== */

video {
  display: block;

  width: 100%;

  border-radius: 16px;

  background: #020617;

  object-fit: cover;
}


/* =====================================================
   PROFILE
   ===================================================== */

.profile-head {
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 20px;

  margin-bottom: 16px;

  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      #064e3b,
      #075985
    );

  color: white;

  box-shadow:
    0 10px 28px
    rgba(15,23,42,.14);
}

.profile-avatar {
  width: 58px;
  height: 58px;

  flex: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background:
    rgba(255,255,255,.14);

  border:
    1px solid
    rgba(255,255,255,.18);

  font-size: 20px;
  font-weight: 800;
}

.profile-name {
  font-size: 19px;
  font-weight: 800;
}

.profile-role {
  margin-top: 3px;

  color: #cbd5e1;

  font-size: 12px;
}

.profile-status {
  display: flex;
  align-items: center;

  gap: 5px;

  margin-top: 6px;

  font-size: 11px;
}

.profile-status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #4ade80;
}

.profile-section {
  margin-bottom: 16px;
}

.profile-section-title {
  display: flex;
  align-items: center;

  gap: 8px;

  margin: 0 3px 8px;

  font-size: 13px;
  font-weight: 800;

  color: #334155;
}

.profile-card {
  background: #fff;

  border:
    1px solid
    #dbe4ea;

  border-radius: 18px;

  padding: 15px;

  box-shadow:
    0 6px 20px
    rgba(15,23,42,.07);
}

.profile-row {
  display: flex;

  justify-content: space-between;

  gap: 15px;

  padding: 11px 0;

  border-bottom:
    1px solid
    #eef2f5;
}

.profile-row:last-child {
  border-bottom: 0;
}

.profile-row span {
  color: #64748b;

  font-size: 12px;
}

.profile-row b {
  text-align: right;

  font-size: 12px;

  color: #0f172a;
}

.package-title {
  font-size: 15px;
  font-weight: 800;

  color: #0f172a;
}

.package-info {
  margin-top: 5px;

  color: #64748b;

  font-size: 11px;
}

.package-badge {
  display: inline-block;

  margin-top: 10px;

  padding: 5px 9px;

  border-radius: 8px;

  background: #dcfce7;

  color: #166534;

  font-size: 10px;
  font-weight: 800;
}


/* =====================================================
   DOCUMENT
   ===================================================== */

.document-description {
  margin-bottom: 13px;

  color: #64748b;

  font-size: 11px;

  line-height: 1.5;
}

.document-tabs {
  display: flex;

  gap: 6px;

  overflow-x: auto;

  margin-bottom: 12px;

  scrollbar-width: none;
}

.document-tabs::-webkit-scrollbar {
  display: none;
}

.document-tab {
  flex: none;

  padding: 7px 11px;

  border:
    1px solid
    #dbe4ea;

  border-radius: 10px;

  background: #f8fafc;

  color: #64748b;

  font-size: 11px;
  font-weight: 700;
}

.document-tab.active {
  background: #0f766e;

  border-color: #0f766e;

  color: white;
}

.document-search input {
  width: 100%;

  padding: 11px 12px;

  border:
    1px solid
    #dbe4ea;

  border-radius: 11px;

  background: #f8fafc;

  outline: none;

  font-size: 12px;
}

.document-search input:focus {
  background: white;

  border-color: #0f766e;

  box-shadow:
    0 0 0 3px
    rgba(15,118,110,.1);
}

.document-item {
  position: relative;

  display: flex;
  align-items: center;

  gap: 10px;

  margin-top: 9px;

  padding: 12px;

  border:
    1px solid
    #e5e7eb;

  border-radius: 13px;

  background: #fff;

  box-shadow:
    0 3px 10px
    rgba(15,23,42,.04);
}

.document-icon {
  width: 38px;
  height: 38px;

  flex: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: #f0fdfa;

  font-size: 18px;
}

.document-content {
  min-width: 0;

  flex: 1;
}

.document-content b {
  display: block;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: 12px;
}

.document-content small {
  display: block;

  margin-top: 3px;

  color: #64748b;

  font-size: 10px;
}

.document-date {
  color: #94a3b8 !important;
}

.document-source {
  flex: none;

  padding: 4px 6px;

  border-radius: 6px;

  font-size: 8px;
  font-weight: 800;
}

.document-source.self {
  background: #ecfeff;

  color: #0e7490;
}

.document-source.se {
  background: #eff6ff;

  color: #1d4ed8;
}

.document-source.admin {
  background: #f5f3ff;

  color: #6d28d9;
}

.document-loading {
  padding: 20px;

  text-align: center;

  color: #64748b;

  font-size: 12px;
}

.empty-state {
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 5px;

  padding: 25px 10px;

  text-align: center;

  color: #64748b;
}

.empty-icon {
  margin-bottom: 4px;

  font-size: 28px;

  opacity: .65;
}

.empty-state b {
  color: #334155;

  font-size: 12px;
}

.empty-state span {
  font-size: 10px;
}


/* =====================================================
   SYNC STATUS
   ===================================================== */

.sync-status-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;
}

.sync-status-row b {
  display: block;

  font-size: 12px;
}

.sync-status-row small {
  display: block;

  margin-top: 3px;

  color: #64748b;

  font-size: 10px;
}

.sync-indicator {
  padding: 6px 9px;

  border-radius: 8px;

  font-size: 10px;

  font-weight: 800;
}

.sync-indicator.online {
  background: #dcfce7;

  color: #166534;
}

.sync-indicator.offline {
  background: #fee2e2;

  color: #991b1b;
}


/* =====================================================
   PROFILE MENU
   ===================================================== */

.profile-menu {
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 14px 2px;

  border: 0;

  border-bottom:
    1px solid
    #eef2f5;

  background: white;

  color: #0f172a;

  text-align: left;

  cursor: pointer;
}

.profile-menu:last-child {
  border-bottom: 0;
}

.profile-menu span:first-child {
  display: flex;

  align-items: center;

  gap: 10px;
}

.profile-menu b {
  font-size: 12px;
}

.profile-menu span:last-child {
  color: #94a3b8;

  font-size: 18px;
}

.profile-logout-section {
  padding-bottom: 10px;
}

.profile-logout {
  width: 100%;

  min-height: 45px;

  border:
    1px solid
    #fecaca;

  border-radius: 13px;

  background: #fff;

  color: #dc2626;

  font-size: 12px;

  font-weight: 800;

  cursor: pointer;
}


/* =====================================================
   TABLE
   ===================================================== */

table {
  max-width: 100%;
}

table input,
table textarea,
table select {
  max-width: 100%;
}


/* =====================================================
   MOBILE SMALL
   ===================================================== */

@media (max-width: 360px) {

  #view {
    padding: 12px;
  }

  #appHeader {
    padding: 0 12px;
  }

  .connection-status .status-text {
    display: none;
  }

  .hero {
    padding: 17px;
  }

  .hero h2 {
    font-size: 20px;
  }

  .action {
    min-height: 100px;

    padding: 13px;
  }

  .action-icon {
    width: 34px;
    height: 34px;

    font-size: 17px;
  }

  .action-label {
    font-size: 12px;
  }

  .sop-card {
    min-height: 72px;

    padding: 11px 12px;
  }

  .sop-card-icon {
    width: 42px;
    height: 42px;
    min-width: 42px;
  }

}


/* =====================================================
   DESKTOP
   ===================================================== */

@media (min-width: 700px) {

  body {
    padding: 20px 0;
  }

  #app {
    min-height:
      calc(100vh - 40px);

    border-radius: 24px;

    overflow: hidden;

    box-shadow:
      0 20px 50px
      rgba(15,23,42,.12);
  }

  #bottomNav {
    bottom: 0;

    border-radius: 0;
  }

  .sop-card:hover {
    transform: translateY(-1px);

    box-shadow:
      0 9px 24px
      rgba(15,118,110,.10);
  }

}
```
