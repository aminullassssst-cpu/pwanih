(function () {
  // BUAT OVERLAY (JANGAN DITAMPILKAN DULU)
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
        background:#fff;
        padding:20px;
        border-radius:12px;
        text-align:center;
        max-width:300px;
      ">
        <img
          src="https://blogger.googleusercontent.com/img/a/AVvXsEibp8So29lFfnCiiAzxfl1zNbzGnIMTKbtV2DfrmAW4pPdjKbAdofREJGun78CjNIBwWSS5VI_CtsgHMZfvzmXemw1UMugWMZwp55BSOteKOxAuwa0jIiprhgilZ4YMnypI0k4SJe_sIXrJC-CkZyMwPU_EvvNLcYL4xK42Hniw_fAdc07p4e1RUwWSJVM_"
          style="width:170px;margin:0 auto 12px;display:block;"
        />
        <h3 style="font-weight:bold;margin-bottom:8px">
          Layanan Sedang Maintenance
        </h3>
        <p style="font-size:14px;color:#555">
          Mohon maaf, layanan sedang tidak tersedia
        </p>
      </div>
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
          // ONLINE → buka halaman
          document.body.style.visibility = "visible";
          overlay.style.display = "none";
        } else {
          // OFFLINE → tampilkan overlay
          overlay.style.display = "block";
          document.body.style.visibility = "visible";
        }
      });
    });
  });
})();