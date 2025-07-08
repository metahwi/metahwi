// Language Toggle Functionality
let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ko' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-ko]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update animated title
    updateAnimatedTitle();
    
    // Update project content
    updateProjectContent();
}

// Animated Title Rotation
const titles = {
    en: ['Architect', 'Creator', 'Entrepreneur', 'Developer', 'Engineer'],
    ko: ['아키텍트', '크리에이터', '사업가', '개발자', '엔지니어']
};

let currentTitleIndex = 0;

function updateAnimatedTitle() {
    const titleElement = document.getElementById('animatedTitle');
    if (titleElement) {
        const currentTitles = titles[currentLanguage];
        
        // Reset animation and clear text
        titleElement.style.animation = 'none';
        titleElement.textContent = '';
        
        setTimeout(() => {
            titleElement.textContent = currentTitles[currentTitleIndex];
            titleElement.style.animation = 'typing 3s steps(20, end), blink-caret 0.75s step-end infinite';
        }, 100);
    }
}

function rotateTitle() {
    currentTitleIndex = (currentTitleIndex + 1) % titles[currentLanguage].length;
    updateAnimatedTitle();
}

// Start title rotation
setInterval(rotateTitle, 3000);

// Interactive Timeline
function initializeTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineDot = document.getElementById('timelineDot');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineContainer || !timelineProgress || !timelineDot) return;
    
    function updateTimeline() {
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerHeight = containerRect.height;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate progress based on scroll position
        const startOffset = containerTop - windowHeight * 0.8;
        const endOffset = containerTop + containerHeight - windowHeight * 0.2;
        const scrollProgress = Math.max(0, Math.min(1, (scrollTop - startOffset) / (endOffset - startOffset)));
        
        // Update progress line
        timelineProgress.style.height = `${scrollProgress * 100}%`;
        
        // Update dot position - make sure it's visible and moving
        const dotPosition = scrollProgress * (containerHeight - 60); // Adjust for better visibility
        timelineDot.style.top = `${dotPosition}px`;
        timelineDot.style.display = 'block'; // Ensure it's visible
        
        // Add glow effect when scrolling
        if (scrollProgress > 0 && scrollProgress < 1) {
            timelineDot.style.boxShadow = '0 4px 20px rgba(242, 80, 34, 0.6), 0 0 30px rgba(242, 80, 34, 0.4)';
            timelineDot.style.transform = 'scale(1.2)';
        } else {
            timelineDot.style.boxShadow = '0 4px 12px rgba(242, 80, 34, 0.3)';
            timelineDot.style.transform = 'scale(1)';
        }
        
        // Animate timeline items
        timelineItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            const isVisible = itemCenter < windowHeight * 0.8 && itemCenter > windowHeight * 0.2;
            
            if (isVisible) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            } else {
                item.style.opacity = '0.7';
                item.style.transform = 'translateX(20px)';
            }
        });
    }
    
    // Initialize timeline items
    timelineItems.forEach(item => {
        item.style.transition = 'all 0.6s ease';
        item.style.opacity = '0.7';
        item.style.transform = 'translateX(20px)';
    });
    
    // Update on scroll
    window.addEventListener('scroll', updateTimeline);
    updateTimeline(); // Initial call
}

// Project Data
const projects = {
    blockchain: {
        en: {
            title: 'Blockchain Charity Platform',
            description: 'Full-stack donation platform with React/Node.js and Solidity smart contracts, attracting 200+ DAUs with automated transparency tracking.',
            tech: ['React', 'Solidity', 'Node.js', 'Web3']
        },
        ko: {
            title: '블록체인 자선 플랫폼',
            description: 'React/Node.js와 Solidity 스마트 계약을 사용한 풀스택 기부 플랫폼으로 200명 이상의 일일 활성 사용자와 자동화된 투명성 추적 기능을 제공합니다.',
            tech: ['React', 'Solidity', 'Node.js', 'Web3']
        },
        image: 'src/images/src/images/blockchain_charity.jpg',
        subImages: ['src/images/investment_dashboard.jpg', 'src/images/threejs_portfolio.jpg']
    },
    investment: {
        en: {
            title: 'Investment Strategy Portfolio',
            description: 'Quantitative investment strategies and portfolio optimization with advanced analytics and real-time market data processing.',
            tech: ['Python', 'React', 'D3.js', 'PostgreSQL']
        },
        ko: {
            title: '투자 전략 포트폴리오',
            description: '고급 분석과 실시간 시장 데이터 처리를 통한 정량적 투자 전략 및 포트폴리오 최적화.',
            tech: ['Python', 'React', 'D3.js', 'PostgreSQL']
        },
        image: 'src/images/investment_dashboard.jpg',
        subImages: ['src/images/blockchain_charity.jpg', 'src/images/ml_analytics.jpg']
    },
    threejs: {
        en: {
            title: 'Three.js Interactive Experience',
            description: 'Immersive 3D web experience showcasing creative development capabilities with WebGL and interactive animations.',
            tech: ['Three.js', 'WebGL', 'JavaScript', 'GLSL']
        },
        ko: {
            title: 'Three.js 인터랙티브 경험',
            description: 'WebGL과 인터랙티브 애니메이션을 통한 창의적 개발 역량을 보여주는 몰입형 3D 웹 경험.',
            tech: ['Three.js', 'WebGL', 'JavaScript', 'GLSL']
        },
        image: 'src/images/threejs_portfolio.jpg',
        subImages: ['src/images/healthcare_iot.jpg', 'src/images/veggie_meter.jpg']
    },
    ml: {
        en: {
            title: 'ML Analytics Dashboard',
            description: 'Engineered predictive ML models using Python/scikit-learn achieving 92% accuracy in multi-class data analysis.',
            tech: ['Python', 'scikit-learn', 'React', 'FastAPI']
        },
        ko: {
            title: 'ML 분석 대시보드',
            description: 'Python/scikit-learn을 사용한 예측 ML 모델을 구축하여 다중 클래스 데이터 분석에서 92% 정확도를 달성했습니다.',
            tech: ['Python', 'scikit-learn', 'React', 'FastAPI']
        },
        image: 'src/images/ml_analytics.jpg',
        subImages: ['src/images/investment_dashboard.jpg', 'src/images/blockchain_charity.jpg']
    },
    healthcare: {
        en: {
            title: 'Healthcare IoT Analytics',
            description: 'IoT sensor validation with Samsung R&D, developing computer vision algorithms for 70+ wheelchair participants.',
            tech: ['Python', 'OpenCV', 'IoT', 'TensorFlow']
        },
        ko: {
            title: '헬스케어 IoT 분석',
            description: '삼성 R&D와 함께 IoT 센서 검증을 수행하고 70명 이상의 휠체어 참가자를 위한 컴퓨터 비전 알고리즘을 개발했습니다.',
            tech: ['Python', 'OpenCV', 'IoT', 'TensorFlow']
        },
        image: 'src/images/healthcare_iot.jpg',
        subImages: ['src/images/threejs_portfolio.jpg', 'src/images/ml_analytics.jpg']
    },
    veggie: {
        en: {
            title: 'NYU Veggie Meter Health Analytics',
            description: 'Collaborated with NYU Langone analyzing 300+ participant health data using SAS/Python/R statistical modeling.',
            tech: ['Python', 'R', 'SAS', 'Statistical Modeling']
        },
        ko: {
            title: 'NYU 베지 미터 건강 분석',
            description: 'NYU Langone과 협력하여 SAS/Python/R 통계 모델링을 사용해 300명 이상의 참가자 건강 데이터를 분석했습니다.',
            tech: ['Python', 'R', 'SAS', 'Statistical Modeling']
        },
        image: 'src/images/veggie_meter.jpg',
        subImages: ['src/images/healthcare_iot.jpg', 'src/images/blockchain_charity.jpg']
    }
};

let currentProject = 'blockchain';

function updateProjectContent() {
    const project = projects[currentProject];
    const content = project[currentLanguage];
    
    // Update main monitor
    document.getElementById('mainProjectTitle').textContent = content.title;
    document.getElementById('mainProjectDesc').textContent = content.description;
    document.getElementById('mainProjectImage').src = project.image;
    
    // Update tech stack
    const techStack = document.getElementById('mainTechStack');
    techStack.innerHTML = content.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Update sub-monitors
    document.getElementById('subMonitor1').src = project.subImages[0];
    document.getElementById('subMonitor2').src = project.subImages[1];
}

function switchProject(projectKey) {
    if (currentProject === projectKey) return;
    
    currentProject = projectKey;
    
    // Update active button
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.project === projectKey) {
            btn.classList.add('active');
        }
    });
    
    // Add transition effect
    const mainScreen = document.getElementById('mainScreen');
    mainScreen.style.opacity = '0.7';
    mainScreen.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        updateProjectContent();
        mainScreen.style.opacity = '1';
        mainScreen.style.transform = 'scale(1)';
    }, 300);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Parallax Effect for Hero Section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const profileImage = document.querySelector('.profile-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && profileImage) {
            profileImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTimeline();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeParallax();
    
    // Set up project navigation
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchProject(btn.dataset.project);
        });
    });
    
    // Initialize project content
    updateProjectContent();
    
    // Add scroll-based navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const projectKeys = Object.keys(projects);
        const currentIndex = projectKeys.indexOf(currentProject);
        let newIndex;
        
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : projectKeys.length - 1;
        } else {
            newIndex = currentIndex < projectKeys.length - 1 ? currentIndex + 1 : 0;
        }
        
        switchProject(projectKeys[newIndex]);
    }
});

