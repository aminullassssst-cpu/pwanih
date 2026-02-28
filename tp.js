(function () {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;
    inset:0;
    background: #202c3e;
    display:none;
    z-index:999999;
    pointer-events:auto;
  `;

  overlay.innerHTML = `
    <div style="
      height:100%;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        background:transaprent;
        padding:20px;
        border-radius:12px;
        text-align:center;
        max-width:300px;
      ">
      <img 
        src="https://blogger.googleusercontent.com/img/a/AVvXsEh3LNOYCxSah2eDsB2bvz7fmWSrQXM4cOcYVjeMQD-wEQabxSxOe_lbzHEPFeR6wDR8IN4LVRGTzp00J9W_Uw-Y38xmOtAthxurrMZ51umkDbkADGje4Hx3NmQh4s9dUFQRF6faqkV8NQCyCUY0T-cKNiQslWAfjBPzNLU-yL0bsxPlbArdGqZKzgqRqJbb"
        style="width:300px;margin-bottom:20px;"
      />
      <h2 style="font-size:1.2rem;margin:10px 0;color:#fff;">
        <b>Waduh, mohon maaf sob...</b>
      </h2>
      <p style="color:#fff;font-size:1rem;">
        Untuk sementara layanan ini sedang tidak tersedia karena sedang dalam pemeliharaan.
      </p>
    </div>
  `;

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(overlay);

    const pageKey = document.body.dataset.page;
    if (!pageKey) {
      document.body.style.visibility = "visible";
      return;
    }

    function loadScript(src) {
      return new Promise(res => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = res;
        document.head.appendChild(s);
      });
    }

    Promise.all([
      loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"),
      loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js")
    ]).then(() => {
      const firebaseConfig = {
        apiKey: "AIzaSyC6UMqwEL_BpL9b04fqm_WE5y3YfrlsoO4",
        authDomain: "sedangoffljne.firebaseapp.com",
        databaseURL: "https://sedangoffljne-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "sedangoffljne",
        storageBucket: "sedangoffljne.firebasestorage.app",
        messagingSenderId: "813148551072",
        appId: "1:813148551072:web:b9c772203adfead90c96c5"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const db = firebase.database();

      db.ref("appPages/" + pageKey).on("value", snap => {
        if (snap.val() === true) {
          
          document.body.style.visibility = "visible";
          overlay.style.display = "none";
        } else {
          
          overlay.style.display = "block";
          document.body.style.visibility = "visible";
        }
      });
    });
  });
})();
