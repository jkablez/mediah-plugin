this.sideBarEdit("Side Bar Tweaks", [
  {
    label: "Toggle Handle",
    button: true,
    id: "toggle-handle",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 -mt-[1px]"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`
  },
  {
    label: "Config",
    href: "/dashboard/plugin/jkablez/mediah-plugin/config",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 -mt-[1px]"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>`
  }
]);

if (location.pathname === "/dashboard") {
  this.showAlert("Injected Side Bar Tweaks!", "success");
}

const sideBarWidth = 280;

class Handle {
  constructor(site) {
    this.site = site;
    this.elements = {};
    this.elements.root = this.createRoot();

    this.sidebar = document.querySelector(".sidebar");
    this.isHandleGrab = getStorage("isHandleGrab") || false;

    this.elements.root.addEventListener("click", () => {
      this.isHandleGrab = !this.isHandleGrab;
      this.setWidth();
      saveStorage("isHandleGrab", this.isHandleGrab);
    });

    this.setWidth();

    if (this.sidebar) {
      this.sidebar.appendChild(this.elements.root);
    }
  }

  createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);

    return range.createContextualFragment(`
          <button class="h-6 cursor-pointer hover:text-foreground transition-all text-muted-foreground rounded-md bg-background border flex items-center justify-center absolute -right-2 top-0 bottom-0 my-auto ${this.site.handleHidden ? 'opacity-0' : ''}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          </button>
      `).firstElementChild;
  }

  setWidth() {
    const collapseWidth = parseFloat(getStorage("collapseWidth")) || 10;
    const marginLeft = 0 - (sideBarWidth - collapseWidth);
    if (this.isHandleGrab) {
      this.sidebar.style.left = `${marginLeft}px`;
      this.sidebar.style.position = "absolute";
      document.body.querySelector(".content").style.marginLeft = `${collapseWidth}px`;
    } else {
      this.sidebar.style.left = "0px";
      this.sidebar.style.position = "relative";
      document.body.querySelector(".content").style.marginLeft = "0px";
    }
  }
}

const handleButton = new Handle({ handleHidden: getStorage("handleHidden") || false });
let handleHidden = getStorage("handleHidden") || false;

document.querySelector("#toggle-handle").addEventListener("click", () => {
  handleHidden = !handleHidden;

  if (handleHidden) {
    handleButton.elements.root.classList.add("opacity-0");
  } else {
    handleButton.elements.root.classList.remove("opacity-0");
  }

  saveStorage("handleHidden", handleHidden);
});

class Page {
  constructor() {
    this.elements = {};
    this.elements.root = this.createRoot();

    this.form = this.elements.root.querySelector("form");
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const collapseWidth = this.form.querySelector("#collapseWidth");
      saveStorage("collapseWidth", parseFloat(collapseWidth.value) || 10);
      showAlert("Saved Collapsed Width!", "success");

      if (getStorage("isHandleGrab")) {
        const marginLeft = 0 - (sideBarWidth - parseFloat(collapseWidth.value) || 10);
        document.querySelector(".sidebar").style.left = `${marginLeft}px`;
        document.body.querySelector(".content").style.marginLeft = `${collapseWidth.value}px`;
      }
    })
  }

  createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="flex p-4 flex-col w-full gap-4"> 
        <header class="flex sm:flex-row flex-col sm:items-center gap-2 justify-between">
            <h2 class="text-xl font-medium">Config</h2>
        </header>
        <div class="w-full bg-background border border-border p-4 rounded-lg shadow-sm space-y-4">
          <form class="space-y-4">
              <div class="space-y-2">
                  <label for="collapseWidth" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Collapse Width (PX)</label>
                  <input value="${parseFloat(getStorage("collapseWidth")) || 10}" id="collapseWidth" type="number" min="10" max="280" class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              </div>
              <button type="submit" class="dark:bg-muted dark:disabled:bg-muted/90 bg-primary disabled:bg-primary/90 transition-all sm:w-fit w-full text-sm text-white font-medium h-9 inline-flex px-4 text-center justify-center rounded-md items-center">Save</button>
          </form>
        </div>
      </div>
    `);
  }
}

newPage("/config", "Side Bar Tweaks - Config", Page);