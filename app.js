this.addSideBarGroup("Side Bar Tweaks", [
  {
    label: "Toggle Handle",
    button: true,
    id: "toggle-handle",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 -mt-[1px]"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`
  }
]);

if (location.pathname === "/dashboard") {
  this.showAlert("Injected Side Bar Tweaks!", "success");
}

class Handle {
  constructor(site) {
    this.site = site;
    this.elements = {};
    this.elements.root = this.createRoot();

    this.sidebar = document.querySelector(".sidebar");
    this.isHandleGrab = getStorage("isHandleGrab") || false;

    console.log(this.isHandleGrab);

    this.elements.root.addEventListener("click", () => {
      this.isHandleGrab = !this.isHandleGrab;
      this.setWidth();
      saveStorage("isHandleGrab", this.isHandleGrab);
    });

    this.setWidth();

    this.sidebar.appendChild(this.elements.root);
  }

  createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);

    return range.createContextualFragment(`
          <button class="h-6 cursor-pointer text-muted-foreground rounded-md bg-background border flex items-center justify-center absolute -right-2 top-0 bottom-0 my-auto ${this.site.handleHidden ? 'hidden' : ''}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          </button>
      `).firstElementChild;
  }

  setWidth() {
    if (this.isHandleGrab) {
      this.sidebar.style.left = "-270px";
      this.sidebar.style.position = "absolute";
    } else {
      this.sidebar.style.left = "";
      this.sidebar.style.position = "";
    }
  }
}

const handleButton = new Handle({ handleHidden: getStorage("handleHidden") || false });
let handleHidden = getStorage("handleHidden") || false;

document.querySelector("#toggle-handle").addEventListener("click", () => {
  handleHidden = !handleHidden;
  console.log(handleHidden);

  if (handleHidden) {
    handleButton.elements.root.classList.add("hidden");
  } else {
    handleButton.elements.root.classList.remove("hidden");
  }

  saveStorage("handleHidden", handleHidden);
});