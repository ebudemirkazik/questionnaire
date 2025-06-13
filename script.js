document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");
  const resultDiv = document.getElementById("result");
  const answersDiv = document.getElementById("answers");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Form verilerini al
    const name = document.getElementById("name").value;
    const q1 = document.querySelector('input[name="q1"]:checked').value;

    // Önce sonucu ekranda gösterelim
    answersDiv.innerHTML = `
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>Hangi Proje:</strong> ${q1}</p>
    `;

    // Sonuç kutusunu göster
    resultDiv.classList.remove("hidden");

    // Google Sheet'e gönder
    sendDataToGoogleSheet(name, q1);

    // İsteğe bağlı: formu sıfırla
    form.reset();
  });

  // Google Sheet'e veri gönderme fonksiyonu
  function sendDataToGoogleSheet(name, q1) {
    const apiUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTC2zF3guiLMU7hMe8tzKwXjryIkhoO6XJtFBQp-wfoEiPNKgIiBXshVJEkwtpMyYq2IBNsvRa8o2ih/pubhtml?gid=0&single=true"; // Örnek: https://script.google.com/macros/s/AKfycxxxxxxx/exec

    fetch(apiUrl, {
      method: "POST",
      mode: "no-cors", // CORS hatası olmaması için
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        q1: q1,
      }),
    })
      .then(() => {
        console.log("Veri Google Sheet'e gönderildi!");
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }
});
