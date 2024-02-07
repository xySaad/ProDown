document.addEventListener("DOMContentLoaded", () => {
    const mobileNavBar = document.getElementById("mobile-navbar");
    const bartgl = document.getElementById("barToggle");
    const navBarCloser = document.getElementById("navBarCloser");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
  
    // NavBar
    bartgl.addEventListener("click", () => {
      mobileNavBar.classList.toggle("active");
      navBarCloser.classList.remove("hide");
    });
  
    navBarCloser.addEventListener("click", () => {
      mobileNavBar.classList.remove("active");
      navBarCloser.classList.add("hide");
    });
  
    const toggleDarkMode = () => {
      body.classList.toggle("dark-mode");
      const isDarkModeEnabled = body.classList.contains("dark-mode");
      localStorage.setItem("darkModePreference", isDarkModeEnabled);
    };
  
    const savedDarkModePreference = localStorage.getItem("darkModePreference");
    if (savedDarkModePreference === "true") {
      body.classList.add("dark-mode");
      darkModeToggle.checked = true;
    }
  
    darkModeToggle.addEventListener("click", toggleDarkMode);
  
    const menuToggle = document.querySelector(".menu-toggle");
    const leftMenu = document.querySelector(".history-menu");
  
    const closeMenu = () => {
      leftMenu.classList.remove("active");
    };
  
    const handleClickOutsideMenu = (event) => {
      if (
        !leftMenu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        !darkModeToggle.contains(event.target)
      ) {
        closeMenu();
      }
    };
  
    menuToggle.addEventListener("click", () => {
      mobileNavBar.classList.remove("active");
      leftMenu.classList.toggle("active");
      renderVideoHistory();
    });
  
    document.addEventListener("click", handleClickOutsideMenu);
  
    window.addEventListener("scroll", () => {
      if (leftMenu.classList.contains("active")) {
        closeMenu();
      }
    });
  });
  