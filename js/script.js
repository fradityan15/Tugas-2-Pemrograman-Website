const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const warning = document.getElementById('passwordWarning');
        
        if (!email || !password) {
            if (!password && warning) {
                warning.style.display = 'flex';
                warning.querySelector('.warning-text').innerText = 'Isi bidang ini.';
            }
            return;
        }

        if (typeof dataPengguna !== 'undefined') {
            const user = dataPengguna.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                if (warning) {
                    warning.style.display = 'flex';
                    warning.querySelector('.warning-text').innerText = 'Email atau password salah.';
                } else {
                    alert('Email atau password salah.');
                }
            }
        } else {
            console.error('Data pengguna tidak ditemukan. Pastikan data.js diload sebelum script.js');
        }
    });

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const warning = document.getElementById('passwordWarning');
            if (warning) warning.style.display = 'none';
        });
    }
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('show');
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}

function updateGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const hour = new Date().getHours();
        let timeGreeting = 'Selamat Pagi';
        
        if (hour >= 12 && hour < 15) timeGreeting = 'Selamat Siang';
        else if (hour >= 15 && hour < 18) timeGreeting = 'Selamat Sore';
        else if (hour >= 18) timeGreeting = 'Selamat Malam';

        if (user) {
            greetingEl.innerText = `${timeGreeting}, ${user.nama}!`;
        } else {
            greetingEl.innerText = `${timeGreeting}!`;
        }
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('laporanDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

function hideAllDashboardContent() {
    const menuGrid = document.querySelector('.menu-grid');
    const laporanContent = document.getElementById('laporanContent');
    const historiContent = document.getElementById('historiContent');
    const greeting = document.querySelector('.greeting');
    
    if (menuGrid) menuGrid.style.display = 'none';
    if (laporanContent) laporanContent.style.display = 'none';
    if (historiContent) historiContent.style.display = 'none';
    if (greeting) greeting.style.display = 'none';
}

function showLaporan(type) {
    hideAllDashboardContent();
    const content = document.getElementById('laporanContent');
    const title = document.getElementById('laporanTitle');
    const dataContainer = document.getElementById('laporanData');
    
    if (content && title && dataContainer) {
        content.style.display = 'block';
        if (type === 'progress') {
            title.innerText = 'Monitoring Progress DO Bahan Ajar';
            dataContainer.innerHTML = '<p>Menampilkan data progress DO bahan ajar saat ini...</p>';
        } else if (type === 'rekap') {
            title.innerText = 'Rekap Bahan Ajar';
            dataContainer.innerHTML = '<p>Menampilkan rekapitulasi data bahan ajar...</p>';
        }
    }
    
    const dropdown = document.getElementById('laporanDropdown');
    if (dropdown) dropdown.style.display = 'none';
}

function showHistori() {
    hideAllDashboardContent();
    const content = document.getElementById('historiContent');
    if (content) {
        content.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    
    const protectedPages = ['dashboard.html', 'stok.html', 'tracking.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            window.location.href = 'index.html';
        }
    }
});

const logoutLinks = document.querySelectorAll('a[href="index.html"]');
logoutLinks.forEach(link => {
    if (link.innerText.trim() === 'Logout') {
        link.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
        });
    }
});
