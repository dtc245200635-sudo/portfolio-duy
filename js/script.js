document.addEventListener('DOMContentLoaded', () => {

    // 1. HIỆU ỨNG GÕ CHỮ TỰ ĐỘNG (TYPING ANIMATION)
    const typingElement = document.getElementById('typingText');
    const words = [
        "Sinh viên CNTT K23L",
        "Kỹ sư DevOps tương lai",
        "Quản trị Hệ thống & Linux",
        "Lập trình viên Web (JSP, Servlet)",
        "Docker & Nginx Enthusiast"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1600; // Dừng lại để người dùng đọc
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // 2. CHUYỂN ĐỔI CHẾ ĐỘ SÁNG / TỐI (THEME TOGGLE)
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Lấy theme đã lưu hoặc mặc định là dark
    const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio_theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
            themeBtn.style.color = '#f59e0b';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeBtn.style.color = '#2563eb';
        }
    }

    // 3. HIỆU ỨNG 3D TILT KHI RÊ CHUỘT LÊN THẺ (CARD TILT EFFECT)
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // 4. MENU MOBILE TOGGLE (DÀNH CHO ĐIỆN THOẠI)
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Đóng menu khi nhấp vào link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // 5. NAVBAR SHADOW ON SCROLL
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.navbar-header');
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0';
        }
    });
});

// 6. HÀM SAO CHÉP MÃ SV HOẶC EMAIL KÈM THÔNG BÁO TOAST
function copyText(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        // Đổi icon nút tạm thời thành dấu tích xanh
        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';

        // Hiện thông báo Toast
        const toast = document.getElementById('toast');
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã sao chép: <strong>${text}</strong>`;
        toast.classList.add('show');

        setTimeout(() => {
            btnElement.innerHTML = originalHtml;
            toast.classList.remove('show');
        }, 2200);
    }).catch(err => {
        console.error('Không thể sao chép: ', err);
    });
}