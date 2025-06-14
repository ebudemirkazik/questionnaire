document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");
  const resultDiv = document.getElementById("result");
  const answersDiv = document.getElementById("answers");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const q1 = document.querySelector('input[name="q1"]:checked').value;

    // Sonuçları ekranda göster
    answersDiv.innerHTML = `
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>Hangi Proje:</strong> ${q1}</p>
    `;
    resultDiv.classList.remove("hidden");

    // Google Sheet'e gönder
    sendDataToGoogleSheet(name, q1);

    // Formu sıfırla
    form.reset();
  });

  function sendDataToGoogleSheet(name, q1) {
    const apiUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTC2zF3guiLMU7hMe8tzKwXjryIkhoO6XJtFBQp-wfoEiPNKgIiBXshVJEkwtpMyYq2IBNsvRa8o2ih/pubhtml?gid=0&single=true"; // 👈 BURAYI KENDİ URL'İNLE DEĞİŞTİR

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        q1: q1,
      }),
    })
      .then(() => {
        console.log("✅ Veri başarıyla Google Sheet'e gönderildi.");
      })
      .catch((error) => {
        console.error("❌ Hata oluştu:", error);
      });
  }
});
