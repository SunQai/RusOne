/*
 * Functional JavaScript for RUSONE Website
 */

// ----------------------------------------------------
// 1. ДАННЫЕ АВТОМОБИЛЕЙ 
// ----------------------------------------------------
const cars = [
    {
        name: 'Geely Monjaro',
        image: "img/geely_monjaro_interior.webp",
        interiorImage: "img/geely_monjaro_exterior.webp",
        type: 'Crossover'
    },
    {
        name: 'Changan Uni-K',
        image: "img/changan_unik_interior.webp",
        interiorImage: "img/changan_unik_exterior.webp",
        type: 'Crossover'
    },
    {
        name: 'Toyota Sienna',
        image: "img/toyota_sienna_interior.webp",
        interiorImage: "img/toyota_sienna_exterior.webp",
        type: 'Minivan'
    },
    {
        name: 'Exeed VX',
        image: "img/exeed_vx_interior.webp",
        interiorImage: "img/exeed_vx_exterior.webp",
        type: 'SUV'
    },
    {
        name: 'Geely Coolray',
        image: "img/geely_coolray_interior.webp",
        interiorImage: "img/geely_coolray_exterior.webp",
        type: 'Crossover'
    },
    {
        name: 'Toyota Camry XV80',
        image: "img/toyota_camry_interior.webp",
        interiorImage: "img/toyota_camry_exterior.webp",
        type: 'Sedan'
    },
    {
        name: 'Toyota RAV4',
        image: "img/toyota_rav4_interior.webp",
        interiorImage: "img/toyota_rav4_exterior.webp",
        type: 'Crossover'
    },
    {
        name: 'Geely Boyue L',
        image: "img/geely_boyuel_interior.webp",
        interiorImage: "img/geely_boyuel_exterior.webp",
        type: 'SUV'
    },
];

let currentIndex = 0;
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const carsPagination = document.getElementById('cars-pagination');


// ----------------------------------------------------
// 2. ФУНКЦИИ КАПУСЕЛИ
// ----------------------------------------------------

function renderCarousel() {
    if (!carousel) return; // Проверка на существование элемента

    carousel.innerHTML = '';
    cars.forEach((car, index) => {
        const item = document.createElement('div');
        // Убраны явные границы в классе
        item.className = 'carousel-item flex-shrink-0 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] mx-2 sm:mx-4 rounded-3xl overflow-hidden glass-card cursor-pointer shadow-2xl';
        item.dataset.index = index;
        item.innerHTML = `
            <div class="relative w-full h-48 lg:h-64 overflow-hidden">
                <img src="${car.image}" alt="${car.name} interior" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40"></div>
                <div class="absolute bottom-4 left-4">
                    <span class="text-xs font-medium text-apple-text/70">${car.type}</span>
                    <h4 class="text-2xl font-bold text-apple-text">${car.name}</h4>
                </div>
            </div>
            <div class="p-4 lg:p-6 text-center">
                <p class="text-apple-text/80 text-sm mb-4">Полная русификация мультимедиа, Яндекс.Навигатор и YouTube.</p>
                <a href="https://wa.me/77073335550?text=Здравствуйте,%20хочу%20русифицировать%20${car.name}" target="_blank" class="text-apple-blue font-semibold text-sm hover:text-white transition duration-200">
                    Записаться на ${car.name} &rarr;
                </a>
            </div>
        `;
        carousel.appendChild(item);
    });
    
    // Создание пагинации
    if (carsPagination) {
        carsPagination.innerHTML = '';
        cars.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full bg-apple-border transition duration-300';
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                goToIndex(index);
            });
            carsPagination.appendChild(dot);
        });
    }
    
    updateCarousel();
}

function updateCarousel() {
    if (!carousel) return; 
    const items = Array.from(carousel.children);
    
    items.forEach((item, index) => {
        item.classList.remove('carousel-item-active');
        if (index === currentIndex) {
            item.classList.add('carousel-item-active');
        }
    });

    if (carsPagination) {
        Array.from(carsPagination.children).forEach((dot, index) => {
            dot.classList.remove('bg-apple-blue');
            dot.classList.add('bg-apple-border');
            if (index === currentIndex) {
                dot.classList.add('bg-apple-blue');
                dot.classList.remove('bg-apple-border');
            }
        });
    }
}

function goToIndex(index) {
    currentIndex = (index + cars.length) % cars.length;
    const items = Array.from(carousel.children);
    if (items[currentIndex]) {
        items[currentIndex].scrollIntoView({
            behavior: 'smooth',
            inline: 'center' // Центрирует элемент в контейнере
        });
    }
    updateCarousel();
}

if (carousel) {
    carousel.addEventListener('scroll', () => {
        const items = Array.from(carousel.children);
        const scrollLeft = carousel.scrollLeft;
        
        let closestIndex = currentIndex;
        let minDiff = Infinity;

        items.forEach((item, index) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const containerCenter = scrollLeft + carousel.offsetWidth / 2;
            const diff = Math.abs(itemCenter - containerCenter);

            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = index;
            }
        });
        
        if (closestIndex !== currentIndex) {
            currentIndex = closestIndex;
            updateCarousel();
        }
    });
}


if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        goToIndex(currentIndex - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        goToIndex(currentIndex + 1);
    });
}

window.addEventListener('resize', updateCarousel);


// ----------------------------------------------------
// 3. ФУНКЦИИ АККОРДЕОНА (FAQ)
// ----------------------------------------------------

function toggleAccordion(button) {
    const icon = button.querySelector('.accordion-icon');
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Закрыть
    if (isExpanded) {
        content.style.maxHeight = null;
        content.style.opacity = '0';
        content.style.paddingTop = '0';
        button.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        icon.classList.remove('rotate');
    } 
    // Открыть
    else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = '1';
        content.style.paddingTop = '1rem';
        button.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        icon.classList.add('rotate');
    }
}


// ----------------------------------------------------
// 4. ФУНКЦИИ НАВИГАЦИИ (Мобильное меню)
// ----------------------------------------------------

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && menuClose && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.add('opacity-100'), 10);
    });

    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    });
}


// ----------------------------------------------------
// 5. ФУНКЦИИ КАРТЫ (Интерактивность)
// ----------------------------------------------------

function setupMapInteractivity() {
    const mapItems = [
        { btnId: 'btn-oskemen', pathId: 'map-oskemen', activeClass: 'active-oskemen' },
        { btnId: 'btn-semey', pathId: 'map-semey', activeClass: 'active-semey' },
    ];

    mapItems.forEach(({ btnId, pathId, activeClass }) => {
        const btn = document.getElementById(btnId);
        const mapPath = document.getElementById(pathId);

        if (btn && mapPath) {
            const activate = () => {
                // Сброс всех активных классов
                mapItems.forEach(item => {
                    document.getElementById(item.btnId)?.classList.remove(item.activeClass);
                    document.getElementById(item.pathId)?.classList.remove(item.activeClass);
                });
                
                // Установка активных классов для текущего элемента
                btn.classList.add(activeClass);
                mapPath.classList.add(activeClass);
            };

            btn.addEventListener('mouseenter', activate);
            btn.addEventListener('click', activate);
            mapPath.addEventListener('mouseenter', activate);
            mapPath.addEventListener('click', activate);
        }
    });
}


// ----------------------------------------------------
// 6. ФУНКЦИИ ОБРАБОТКИ ФОРМЫ (Hero Section)
// ----------------------------------------------------

function setupFormHandling() {
    const form = document.getElementById('hero-contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();

            console.log('--- НОВАЯ ЗАЯВКА ---');
            console.log('Имя клиента:', name);
            console.log('Телефон:', phone);
            console.log('---------------------');

            alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с Вами в ближайшее время.`);
            
            // Очистка формы
            form.reset();
        });
    }
}


// ----------------------------------------------------
// 7. ФУНКЦИИ ФУТЕРА (Год) 
// ----------------------------------------------------

function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        if (currentYear > 2025) {
            yearSpan.textContent = currentYear;
        } else {
             // Оставляем 2025, как указано в ТЗ.
             yearSpan.textContent = '2025'; 
        }
    }
}


// ----------------------------------------------------
// 8. ФУНКЦИИ ДЕМО-БЛОКА (Из Index4.html)
// ----------------------------------------------------

let isRussian = false;

// 8.1. GMT+5 Clock with Language Logic
function updateClock() {
    const mainClock = document.getElementById('main-clock');
    const sbTime = document.getElementById('sb-time');
    const dateDisplay = document.getElementById('date-display');
    
    if (!mainClock || !sbTime || !dateDisplay) return;

    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    // GMT+5 for East Kazakhstan (VKO)
    const kzTime = new Date(utcTime + (3600000 * 5));

    const hours = String(kzTime.getHours()).padStart(2, '0');
    const minutes = String(kzTime.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    mainClock.innerText = timeString;
    sbTime.innerText = timeString;

    // Date Formatting
    const year = kzTime.getFullYear();
    const month = String(kzTime.getMonth() + 1).padStart(2, '0');
    const day = String(kzTime.getDate()).padStart(2, '0');
    
    // Dictionaries for Day Names
    const daysRu = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const daysCn = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    
    const dayIndex = kzTime.getDay();
    const dayName = isRussian ? daysRu[dayIndex] : daysCn[dayIndex];

    dateDisplay.innerText = `${year}-${month}-${day} ${dayName}`;
}

// 8.2. Volume Slider Logic
function setupVolumeSlider() {
    const volSlider = document.getElementById('vol-slider');
    const volFill = document.getElementById('vol-fill');
    const volVal = document.getElementById('vol-val');
    
    if (!volSlider) return;

    let isDragging = false;

    function setVolume(y) {
        const rect = volSlider.getBoundingClientRect();
        // Calculate height from bottom
        let height = rect.bottom - y;
        // Clamp values
        if (height < 0) height = 0;
        if (height > rect.height) height = rect.height;
        
        const percent = (height / rect.height) * 100;
        const value = Math.round((percent / 100) * 100); // Max volume 100

        volFill.style.height = `${percent}%`;
        volVal.innerText = value;
    }

    volSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        setVolume(e.clientY);
    });
    
    volSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        setVolume(e.touches[0].clientY);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            setVolume(e.clientY);
        }
    });
    
    window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length > 0) {
            setVolume(e.touches[0].clientY);
            e.preventDefault(); // Prevent scrolling while adjusting volume
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    window.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Set initial volume
    setVolume(volSlider.getBoundingClientRect().bottom - (volSlider.getBoundingClientRect().height * 0.4));
}

// 8.3. Translation Logic (Must be global for onclick in HTML)
window.translateSystem = function() {
    if (isRussian) return; // Already translated
    
    isRussian = true;
    const elements = document.querySelectorAll('.lang-text');
    
    elements.forEach(el => {
        // Simple fade effect manually
        el.style.opacity = 0;
        setTimeout(() => {
            el.innerText = el.getAttribute('data-ru');
            el.style.opacity = 1;
        }, 200);
    });

    // Trigger button animation
    const btn = document.querySelector('.rus-btn');
    if (btn) {
        btn.innerText = "Готово!";
        btn.style.background = "#fff";
        btn.style.color = "#0288d1";
    }
    
    // Force clock update to switch day language immediately
    updateClock();
}


// ----------------------------------------------------
// 9. ЗАПУСК ПРИЛОЖЕНИЯ
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    setupMapInteractivity();
    setCurrentYear();
    setupFormHandling(); 
    
    // Инициализация Демо-блока
    if (document.getElementById('vol-slider')) {
        setupVolumeSlider();
        // Запуск часов для демо-блока
        setInterval(updateClock, 1000);
        updateClock();
    }
    
    // Дополнительная центровка при загрузке
    setTimeout(() => {
        goToIndex(0); 
    }, 100);
});