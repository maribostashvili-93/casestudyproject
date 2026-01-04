document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Snowfall Logic (თოვლის ეფექტი) ---
  const snowContainer = document.getElementById("snow-container");
  const snowSymbol = "•";
  let snowInterval = null;

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = snowSymbol;
    snowflake.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 10 + 5;
    snowflake.style.fontSize = size + "px";
    snowflake.style.opacity = Math.random() * 0.4 + 0.1;
    const duration = Math.random() * 10 + 5;
    snowflake.style.animationDuration = duration + "s";

    if (size < 8) snowflake.style.filter = "blur(1px)";

    snowContainer.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), duration * 1000);
  }

  // Easter Egg (S ღილაკზე თოვა)
  document.addEventListener("keydown", (event) => {
    if (event.key === "s" || event.key === "S") {
      if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
        console.log("Snow stopped");
      } else {
        snowInterval = setInterval(createSnowflake, 100);
        console.log("Let it snow!");
      }
    }
  });

  // --- 2. ახალი სისტემა (ღილაკები: Analyze & Miscommunication) ---
  // ეს ნაწილი მართავს შენს მიერ დამატებულ ღილაკებს
  const buttons = document.querySelectorAll(".trigger-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // ხელს უშლის ბაბლზე კლიკის გადაცემას

      // 1. ვიგებთ რომელ პანელს უყურებს ეს ღილაკი
      const targetSelector = btn.getAttribute("data-target");
      const wrapper = btn.closest(".content-wrapper");

      // თუ wrapper ან selector ვერ იპოვა, ვჩერდებით
      if (!wrapper || !targetSelector) return;

      const targetPanel = wrapper.querySelector("." + targetSelector);

      // 2. ვიპოვოთ ყველა ღილაკი და პანელი ამ მესიჯში (რომ სხვები დავხუროთ)
      const allPanels = wrapper.querySelectorAll(".analysis-panel");
      const allButtons = wrapper.querySelectorAll(".trigger-btn");

      // 3. ლოგიკა: გავხსნათ თუ დავხუროთ?
      if (targetPanel.style.maxHeight) {
        // თუ ღიაა -> ვხურავთ
        targetPanel.style.maxHeight = null;
        btn.classList.remove("active");
      } else {
        // თუ დახურულია -> ჯერ ვხურავთ ყველას
        allPanels.forEach((p) => (p.style.maxHeight = null));
        allButtons.forEach((b) => b.classList.remove("active"));

        // მერე ვხსნით სასურველს
        targetPanel.style.maxHeight = targetPanel.scrollHeight + "px";
        btn.classList.add("active");
      }
    });
  });

  // --- 3. ძველი სისტემა (მთლიანი ბაბლი) ---
  const oldTriggers = document.querySelectorAll(".message.analysis");

  oldTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      if (e.target.closest(".trigger-btn")) return;

      this.classList.toggle("active");
      const wrapper = this.closest(".content-wrapper");
      const panel = wrapper.querySelector(".analysis-panel");

      if (panel) {
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    });
  });

  // --- 4. Universal Simulation Logic ---
  window.toggleScenario = function (showId, hideId) {
    const showEl = document.getElementById(showId);
    const hideEl = document.getElementById(hideId);

    if (showEl) showEl.classList.remove("hidden");
    if (hideEl) hideEl.classList.add("hidden");
  };
});
