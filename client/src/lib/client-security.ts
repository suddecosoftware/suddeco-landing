let redirected = false;

function redirectToViolation(reason: string) {
  if (redirected || window.location.pathname === "/security-violation") return;
  redirected = true;
  try {
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.databases?.().then((databases) => {
      for (const database of databases) {
        if (database.name) indexedDB.deleteDatabase(database.name);
      }
    }).catch(() => {});
  } catch {
    /* storage may be unavailable */
  }
  window.location.assign("/security-violation");
}

export function initClientSecurity() {
  if (!import.meta.env.PROD || typeof window === "undefined") {
    return () => {};
  }

  console.log(
    "%cSTOP!",
    "color:#ef4444;font-size:48px;font-weight:900;text-shadow:0 2px 0 #111;",
  );
  console.log(
    "%cThis is a browser feature for developers. If someone told you to copy/paste here, it's a scam.",
    "color:#f59e0b;font-size:16px;font-weight:700;",
  );

  const preventContextMenu = (event: MouseEvent) => event.preventDefault();
  const preventDrag = (event: DragEvent) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest?.("[data-protect-image='true'], .brand-protected")) {
      event.preventDefault();
    }
  };
  const preventHotkeys = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const blocked =
      event.key === "F12" ||
      ((event.ctrlKey || event.metaKey) && ["u", "s"].includes(key)) ||
      ((event.ctrlKey || event.metaKey) && event.shiftKey && ["i", "j", "c"].includes(key)) ||
      (event.metaKey && event.altKey && ["i", "j", "c"].includes(key));

    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  document.addEventListener("contextmenu", preventContextMenu);
  document.addEventListener("dragstart", preventDrag);
  document.addEventListener("keydown", preventHotkeys, true);

  const interval = window.setInterval(() => {
    const widthGap = Math.abs(window.outerWidth - window.innerWidth);
    const heightGap = Math.abs(window.outerHeight - window.innerHeight);
    if (widthGap > 160 || heightGap > 160) {
      redirectToViolation("viewport_delta");
    }
  }, 1500);

  return () => {
    document.removeEventListener("contextmenu", preventContextMenu);
    document.removeEventListener("dragstart", preventDrag);
    document.removeEventListener("keydown", preventHotkeys, true);
    window.clearInterval(interval);
  };
}
