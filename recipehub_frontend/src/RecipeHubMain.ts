/* eslint-env browser */
import "./style.css";

/**
 * RecipeHub Main Container.
 * Implements: Search bar, categories scroll, recipe grid, bottom nav bar.
 * Theme: Light | Primary: #FF7043 | Secondary: #FFF3E0 | Accent: #388E3C
 */

/**
 * PUBLIC_INTERFACE
 * Renders the main RecipeHub container.
 * Supports dynamic switching between light and dark themes.
 * @param targetSelector DOM selector string (defaults to "#app").
 */
export function renderRecipeHubMain(targetSelector: string = "#app") {
  const root = document.querySelector(targetSelector);
  if (!root) return;

  // Determine user's preferred theme from localStorage or system
  const getPreferredTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recipehub-theme");
      if (stored === "dark" || stored === "light") return stored as "dark" | "light";
      // Fallback to prefers-color-scheme
      return (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    return "light";
  };

  let theme: "light" | "dark" = getPreferredTheme();

  function updateRootThemeClass(theme: "light" | "dark") {
    document.documentElement.classList.remove("rh-theme-light", "rh-theme-dark");
    document.documentElement.classList.add(`rh-theme-${theme}`);
  }
  // Set theme class to root at load
  updateRootThemeClass(theme);

  // Theme Toggle Button markup
  function themeToggleMarkup() {
    // Uses aria-pressed for accessibility
    return `
      <button class="rh-theme-toggle" aria-label="Toggle dark/light mode" aria-pressed="${theme === "dark"}">
        <span class="material-symbols-outlined" aria-hidden="true">${theme === "dark" ? "light_mode" : "dark_mode"}</span>
        <span class="rh-theme-toggle-text">${theme === "dark" ? "Light" : "Dark"} Mode</span>
      </button>
    `;
  }

  root.innerHTML = `
    <div class="rh-container">
      <header class="rh-header">
        <h1>RecipeHub</h1>
        <div class="rh-theme-toggle-wrapper">${themeToggleMarkup()}</div>
      </header>
      <div class="rh-search-bar">
        <input type="text" placeholder="Search recipes, ingredients, or categories..." />
        <button class="rh-search-btn" aria-label="Search"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M14.7 13.3l3.7 3.7a1 1 0 1 1-1.4 1.4l-3.7-3.7a7 7 0 1 1 1.4-1.4zM9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg></button>
      </div>
      <div class="rh-categories">
        <div class="rh-categories-scroll">
          <button class="rh-category">All</button>
          <button class="rh-category">Breakfast</button>
          <button class="rh-category">Lunch</button>
          <button class="rh-category">Dinner</button>
          <button class="rh-category">Desserts</button>
          <button class="rh-category">Healthy</button>
          <button class="rh-category">Vegan</button>
          <button class="rh-category">Snacks</button>
        </div>
      </div>
      <main class="rh-recipe-grid">
        ${mockRecipeCards(8)}
      </main>
      <nav class="rh-bottom-nav">
        <button class="rh-nav-item rh-nav-active">
          <span class="material-symbols-outlined">home</span>
          <span>Home</span>
        </button>
        <button class="rh-nav-item">
          <span class="material-symbols-outlined">favorite</span>
          <span>Favorites</span>
        </button>
        <button class="rh-nav-item">
          <span class="material-symbols-outlined">person</span>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  `;

  // Theme toggle button logic
  const themeToggleBtn = root.querySelector(".rh-theme-toggle") as HTMLButtonElement;
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      theme = (theme === "light" ? "dark" : "light");
      themeToggleBtn.setAttribute("aria-pressed", String(theme === "dark"));
      // Persist selection
      localStorage.setItem("recipehub-theme", theme);
      // Update :root CSS class
      updateRootThemeClass(theme);
      // Swap toggle button icon/text visually
      themeToggleBtn.innerHTML = `
        <span class="material-symbols-outlined" aria-hidden="true">${theme === "dark" ? "light_mode" : "dark_mode"}</span>
        <span class="rh-theme-toggle-text">${theme === "dark" ? "Light" : "Dark"} Mode</span>
      `;
    });
  }

  // Add other (future) event listeners here...
}

/**
 * Helper to produce mock recipe cards for the grid, each with a prominent recipe image.
 * Uses Unsplash placeholders for demonstration.
 */
function mockRecipeCards(count: number): string {
  // Example recipe image URLs for visual variety (replace with real sources when available)
  const placeholderImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519864600265-abb2349b6cef?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1514512364185-4c2b678fa1de?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80"
  ];
  let grid = "";
  for (let i = 1; i <= count; i++) {
    const imgUrl = placeholderImages[(i - 1) % placeholderImages.length];
    grid += `
      <div class="rh-recipe-card" tabindex="0">
        <div class="rh-recipe-image-container">
          <img src="${imgUrl}" alt="Delicious recipe presentation" class="rh-recipe-img" />
        </div>
        <div class="rh-recipe-info">
          <h3>Recipe Title ${i}</h3>
          <div class="rh-meta">
            <span>⭐ 4.${i % 5}</span>
            <span class="rh-category-label">Category</span>
          </div>
        </div>
      </div>
    `;
  }
  return grid;
}
