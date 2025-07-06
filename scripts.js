// Theme Toggle Functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const icon = document.getElementById('toggle-icon');

if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
        toggleSwitch.checked = true;
        icon.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
        icon.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        icon.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Initialize Threat Gauge
function initThreatGauge() {
    const canvas = document.getElementById('threatGauge');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const value = 65; // Example threat score
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Draw value arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (value / 100));
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--dark-accent');
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Initialize Activity Chart
function initActivityChart() {
    const ctx = document.getElementById('activityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Digital Activity',
                data: [12, 19, 3, 5, 2, 3, 15],
                backgroundColor: 'rgba(0, 245, 255, 0.1)',
                borderColor: 'rgba(0, 245, 255, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--dark-text')
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--dark-text')
                    }
                }
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThreatGauge();
    initActivityChart();
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .team-card').forEach(card => {
        observer.observe(card);
    });
});