class ZuploBanner extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const toolsData = {
      zudoku: {
        name: "Zudoku",
        logo: "https://cdn.zuplo.com/uploads/zudoku-logo-only.svg",
        description: "API documentation should be free.",
        url: "https://zudoku.dev?utm_source=uuidnew&utm_medium=web&utm_campaign=header&ref=uuidnew",
      },
      ratemyopenapi: {
        name: "Rate My OpenAPI",
        logo: "https://cdn.zuplo.com/uploads/rmoa-logo-only.svg",
        description: "Get feedback and a rating on your OpenAPI spec",
        url: "https://ratemyopenapi.com?utm_source=uuidnew&utm_medium=web&utm_campaign=header&ref=uuidnew",
      },
      mockbin: {
        name: "Mockbin",
        logo: "https://cdn.zuplo.com/uploads/mockbin-logo-only.svg",
        description: "Mock an API from OpenAPI in seconds",
        url: "https://mockbin.io",
      },
      uuid: {
        name: "UUID.new",
        logo: "https://cdn.zuplo.com/uploads/uuidnew-logo-only.svg",
        description: "Generate UUIDs in your browser",
        url: "https://uuid.new",
      },
    };

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "zuplo-banner");

    // Left: "Open source by" + Zuplo wordmark
    const leftDiv = document.createElement("div");
    leftDiv.setAttribute("class", "left");

    const openSourceText = document.createElement("span");
    openSourceText.setAttribute("class", "tagline");
    openSourceText.textContent = "Open source by";

    const zuploLogoContainer = document.createElement("a");
    zuploLogoContainer.setAttribute("class", "zuplo-logo");
    zuploLogoContainer.setAttribute("href", "https://zuplo.com?utm_source=uuid-new&utm_campaign=opensource&utm_medium=web");
    zuploLogoContainer.setAttribute("target", "_blank");
    zuploLogoContainer.setAttribute("rel", "noopener noreferrer");
    zuploLogoContainer.setAttribute("aria-label", "Zuplo");
    zuploLogoContainer.innerHTML = this.getZuploLogoSVG();

    leftDiv.appendChild(openSourceText);
    leftDiv.appendChild(zuploLogoContainer);

    // Right: "View Tools" outlined button
    const rightDiv = document.createElement("div");
    rightDiv.setAttribute("class", "right");

    const menuButton = document.createElement("button");
    menuButton.setAttribute("class", "menu-button");
    menuButton.setAttribute("type", "button");
    menuButton.setAttribute("aria-haspopup", "true");
    menuButton.setAttribute("aria-expanded", "false");

    // Phosphor DotsNine icon (3x3 grid)
    const gripIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           viewBox="0 0 256 256" fill="currentColor" fill-rule="evenodd"
           aria-hidden="true">
        <path d="M76,64A12,12,0,1,1,64,52,12,12,0,0,1,76,64Zm52-12a12,12,0,1,0,12,12A12,12,0,0,0,128,52Zm64,24a12,12,0,1,0-12-12A12,12,0,0,0,192,76ZM64,116a12,12,0,1,0,12,12A12,12,0,0,0,64,116Zm64,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm64,0a12,12,0,1,0,12,12A12,12,0,0,0,192,116ZM64,180a12,12,0,1,0,12,12A12,12,0,0,0,64,180Zm64,0a12,12,0,1,0,12,12A12,12,0,0,0,128,180Zm64,0a12,12,0,1,0,12,12A12,12,0,0,0,192,180Z"></path>
      </svg>
    `;

    menuButton.innerHTML = `${gripIconSVG}<span class="button-text">View Tools</span>`;

    rightDiv.appendChild(menuButton);

    wrapper.appendChild(leftDiv);
    wrapper.appendChild(rightDiv);

    shadow.appendChild(wrapper);

    // Dropdown menu card
    const menu = document.createElement("div");
    menu.setAttribute("class", "menu");
    menu.setAttribute("role", "menu");

    for (const key in toolsData) {
      const tool = toolsData[key];

      const menuItem = document.createElement("a");
      menuItem.setAttribute("href", tool.url);
      menuItem.setAttribute("class", "menu-item");
      menuItem.setAttribute("target", "_blank");
      menuItem.setAttribute("rel", "noopener noreferrer");
      menuItem.setAttribute("role", "menuitem");

      const logoWrap = document.createElement("div");
      logoWrap.setAttribute("class", "menu-item-logo");
      const logo = document.createElement("img");
      logo.setAttribute("src", tool.logo);
      logo.setAttribute("alt", "");
      logo.setAttribute("aria-hidden", "true");
      logoWrap.appendChild(logo);

      const textContainer = document.createElement("div");
      textContainer.setAttribute("class", "text-container");

      const name = document.createElement("div");
      name.setAttribute("class", "tool-name");
      name.textContent = tool.name;

      const description = document.createElement("div");
      description.setAttribute("class", "tool-description");
      description.textContent = tool.description;

      textContainer.appendChild(name);
      textContainer.appendChild(description);
      menuItem.appendChild(logoWrap);
      menuItem.appendChild(textContainer);

      menu.appendChild(menuItem);
    }

    rightDiv.appendChild(menu);

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.toggle("visible");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", (event) => {
      if (!this.contains(event.target)) {
        menu.classList.remove("visible");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.classList.remove("visible");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        --fg: #111827;
        --fg-secondary: #374151;
        --fg-muted: #6b7280;
        --bg: #ffffff;
        --bg-muted: #f3f4f6;
        --border: #e5e7eb;
        --accent: #FF00BD;
        --shadow-lg: 0 6px 24px rgba(0,0,0,0.10);
        --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      .zuplo-banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--bg);
        color: var(--fg);
        padding: 10px 20px;
        width: 100%;
        flex-wrap: nowrap;
        border-bottom: 1px solid var(--border);
      }

      .left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .tagline {
        font-size: 13px;
        font-weight: 500;
        color: var(--fg-muted);
        line-height: 1;
      }

      .zuplo-logo {
        display: inline-flex;
        align-items: center;
        height: 24px;
        text-decoration: none;
        color: var(--fg);
      }

      .zuplo-logo svg {
        height: 100%;
        width: auto;
        display: block;
      }

      .right {
        position: relative;
        display: flex;
        align-items: center;
      }

      .menu-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background-color: var(--bg);
        color: var(--fg-secondary);
        border: 1px solid var(--border);
        height: 36px;
        padding: 0 14px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
      }

      .menu-button:hover {
        background-color: var(--bg-muted);
        color: var(--fg);
      }

      .menu-button:focus-visible {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(255, 0, 189, 0.08);
      }

      .menu-button svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }

      .menu {
        display: none;
        position: absolute;
        right: 0;
        top: calc(100% + 8px);
        background-color: var(--bg);
        color: var(--fg);
        border: 1px solid var(--border);
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        min-width: 340px;
        padding: 8px;
        animation: fadeSlideIn 0.18s ease-out;
      }

      .menu.visible {
        display: block;
      }

      @keyframes fadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .menu-item {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        text-decoration: none;
        color: var(--fg);
        padding: 12px;
        border-radius: 8px;
        transition: background-color 0.15s ease;
      }

      .menu-item:hover {
        background-color: var(--bg-muted);
      }

      .menu-item-logo {
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .menu-item-logo img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        display: block;
      }

      .text-container {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .tool-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--fg);
        line-height: 1.3;
      }

      .tool-description {
        font-size: 13px;
        font-weight: 400;
        color: var(--fg-muted);
        line-height: 1.4;
      }

      /* Responsive */
      @media (max-width: 600px) {
        .zuplo-banner {
          padding: 10px 14px;
        }
        .tagline {
          display: none;
        }
        .menu {
          min-width: 280px;
        }
      }
    `;

    const mode = this.getAttribute("mode") || "light";

    if (mode === "dark") {
      style.textContent += `
        :host {
          --fg: #f8fafc;
          --fg-secondary: #e2e8f0;
          --fg-muted: #94a3b8;
          --bg: #111827;
          --bg-muted: #1f2937;
          --border: #1f2937;
        }
      `;
    }

    shadow.appendChild(style);
  }

  getZuploLogoSVG() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 39" fill="none" aria-hidden="true" class="zuplo-wordmark">
        <path d="M26.5769 23.3789H16.2723L27.2516 12.4273C27.3551 12.324 27.4256 12.1924 27.4541 12.0492C27.4826 11.9059 27.4681 11.7575 27.412 11.6225C27.356 11.4876 27.2611 11.3723 27.1394 11.2911C27.0177 11.2099 26.8746 11.1666 26.7281 11.1666H9.29082V3.90057H28.4171C29.8212 3.88352 31.2013 4.26394 32.3974 4.99771C33.5934 5.73149 34.5564 6.78853 35.1745 8.04617C35.8127 9.39123 36.0178 10.9004 35.7616 12.3664C35.5055 13.8324 34.8006 15.1833 33.7438 16.2337L26.5769 23.3789Z" fill="currentColor"/>
        <path d="M9.29089 14.6662H19.596L8.63877 25.5957C8.53351 25.7009 8.46186 25.8348 8.43284 25.9805C8.40382 26.1262 8.41878 26.2772 8.47577 26.4145C8.53275 26.5518 8.62915 26.6691 8.75295 26.7517C8.87675 26.8343 9.02237 26.8785 9.17131 26.8786H26.5595V34.1446H7.45164C6.04759 34.1615 4.66759 33.781 3.47154 33.0473C2.2755 32.3135 1.31246 31.2565 0.694269 29.9989C0.0561353 28.6538 -0.148879 27.1446 0.107392 25.6786C0.363663 24.2126 1.06871 22.8617 2.12559 21.8114L9.29089 14.6662Z" fill="currentColor"/>
        <path d="M81.0615 20.2506C81.0615 22.8413 80.0489 24.427 77.6735 24.3883C75.4927 24.3497 74.3634 22.764 74.3634 20.2125V10.4287H68.9901V20.5983C68.9901 25.5097 72.0664 28.9901 77.6735 29.0288C82.8139 29.0674 86.4353 25.3166 86.4353 20.6374V10.4287H81.0615V20.2506Z" fill="currentColor"/>
        <path d="M133.257 10.0017C127.455 10.0017 123.369 14.1007 123.369 19.5145C123.369 24.9282 127.458 29.0272 133.257 29.0272C139.057 29.0272 143.145 24.9282 143.145 19.5145C143.145 14.1007 139.059 10.0017 133.257 10.0017ZM133.257 24.4254C130.57 24.4254 128.664 22.4148 128.664 19.5145C128.664 16.6142 130.572 14.603 133.257 14.603C135.942 14.603 137.85 16.6142 137.85 19.5145C137.85 22.4148 135.944 24.4254 133.257 24.4254Z" fill="currentColor" fill-rule="evenodd"/>
        <path d="M99.8417 10.0016C94.0394 10.0016 89.9533 14.1007 89.9533 19.5144C89.9533 19.5863 89.9618 19.6555 89.9629 19.729H89.9533V35.1068H95.2487V28.0313C96.6861 28.6982 98.2552 29.038 99.8417 29.0261C105.644 29.0261 109.73 24.927 109.73 19.5133C109.73 14.0996 105.644 10.0016 99.8417 10.0016ZM99.8417 24.4253C97.1545 24.4253 95.2487 22.4147 95.2487 19.5144C95.2487 16.6141 97.1567 14.6029 99.8417 14.6029C102.527 14.6029 104.435 16.6141 104.435 19.5144C104.435 22.4147 102.529 24.4253 99.8417 24.4253Z" fill="currentColor" fill-rule="evenodd"/>
        <path d="M48.8292 15.0252H59.4179L48.8292 23.2652V28.6017H65.9783V24.0036H55.3642L65.9783 15.7427V10.4271H48.8292V15.0252Z" fill="currentColor"/>
        <path d="M121.778 28.6016H119.985C118.052 28.5995 116.199 27.8361 114.832 26.479C113.466 25.1218 112.697 23.2817 112.695 21.3624V3.90527H118.098V21.3624C118.1 21.8589 118.299 22.3345 118.652 22.6856C119.006 23.0366 119.485 23.2344 119.985 23.2357H121.778V28.6016Z" fill="currentColor"/>
      </svg>
    `;
  }
}

customElements.define("zuplo-banner", ZuploBanner);
