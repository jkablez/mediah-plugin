console.log("Side Bar Tweaks")

this.addSideBarGroup("Side Bar Tweaks", [
  {
    label: "Toggle Handle",
    button: true,
    id: "toggle-handle",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 -mt-[1px]"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`
  }
])

if (location.pathname === "/dashboard") {
  this.showAlert("Injected Side Bar Tweaks!", "success")
}

var toggled = false;
this.elements.root.querySelector("#toggle-handle").addEventListener("click", () => {
  toggled = ! toggled;
  console.log(`Handle Toggled => ${toggled}`)
})
