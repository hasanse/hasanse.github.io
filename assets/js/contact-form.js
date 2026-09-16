(function () {
  "use strict";

  const form = document.querySelector(".php-email-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";
    form.querySelector("button[type=submit]").disabled = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        if (response.ok) {
          loading.style.display = "none";
          sentMessage.style.display = "block";
          form.reset();
        } else {
          return response.json().then((data) => {
            throw new Error(
              data.errors ? data.errors.map((error) => error.message).join(", ") : "Something went wrong. Please try again."
            );
          });
        }
      })
      .catch((error) => {
        loading.style.display = "none";
        errorMessage.innerText = error.message;
        errorMessage.style.display = "block";
      })
      .finally(() => {
        form.querySelector("button[type=submit]").disabled = false;
      });
  });
})();
