/**
 * DIYA HANEEN - PORTFOLIO INTERACTIVITY SCRIPT
 * Handles theme toggling, project/cert modals, contact form validation,
 * clipboard copying, toast notifications, and scrollspy navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME TOGGLING (DARK / LIGHT) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('diya_portfolio_theme') || 'dark';

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('diya_portfolio_theme', theme);
  }

  setTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme} mode!`, 'info');
    });
  }

  // --- 2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT (SCROLLSPY) ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add background blur/border on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active state
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // --- 3. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // --- 4. BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 5. RESUME MODAL & PRINT HANDLER ---
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const openResumeBtn2 = document.getElementById('open-resume-btn-2');
  const closeResumeModal = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (openResumeBtn2) openResumeBtn2.addEventListener('click', openResume);
  if (closeResumeModal) closeResumeModal.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- 6. PROJECT DETAILS MODAL ---
  const projectModal = document.getElementById('project-modal');
  const closeProjectModal = document.getElementById('close-project-modal');
  const projectModalContent = document.getElementById('project-modal-content');
  const projectButtons = document.querySelectorAll('.open-details-btn');

  const projectData = {
    railway: {
      title: "Railway Management System",
      year: "2025 – 2026",
      role: "Core Team Member | Software Development",
      summary: "A robust software solution developed to streamline booking, general-to-sleeper upgrade management, and real-time validation across rail operations.",
      features: [
        "Self-Service Upgrade Pipeline: Passengers with valid general tickets can request real-time upgrades to unreserved sleeper berths.",
        "Algorithmic Seat Allocation: Checks live sleeper vacancy matrices and calculates the exact fare differential automatically.",
        "Secure Verification: Generates a timestamped digital upgrade authorization token for ticket checking staff.",
        "Modular OOP Architecture: Clean separation of passenger logic, inventory status, and billing modules."
      ],
      techStack: ["Java", "Python", "Database / SQL", "Object-Oriented Design", "VS Code", "Git"],
      learnings: "Deepened practical knowledge in multi-module system architecture, handling race conditions during ticket assignment, and writing maintainable code."
    },
    drone: {
      title: "Drone-Based Surveillance Systems",
      year: "Academic Project",
      role: "Team Member | Technical Project",
      summary: "An aerial inspection and monitoring project integrating microcontrollers, avionics sensors, and optical payload feeds for remote surveillance.",
      features: [
        "Avionics & Flight Hardware: Assembly and calibration of brushless motors, ESCs, power distribution, and multi-axis gyroscopic sensors.",
        "Flight Control & Telemetry: Configured flight controller algorithms to maintain altitude lock and autonomous hovering stability.",
        "Camera Feed Monitoring: Live streaming setup to feed wireless visual data to a ground station dashboard for security and reconnaissance.",
        "Fail-safe Protocols: Implemented return-to-home and low-battery auto-landing safety behaviors."
      ],
      techStack: ["C++ / Embedded logic", "Flight Controllers", "Drone Avionics", "Optical Sensors", "Telemetry Links"],
      learnings: "Gained invaluable experience in hardware-software interaction, real-time sensor calibration, and multidisciplinary engineering teamwork."
    }
  };

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (data && projectModalContent) {
        projectModalContent.innerHTML = `
          <div class="project-modal-details">
            <div class="modal-badge-row">
              <span class="tech-pill">${data.year}</span>
              <span class="tech-pill">${data.role}</span>
            </div>

            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 0.5rem;">${data.title}</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">${data.summary}</p>

            <div class="modal-info-block">
              <h4>Key Implementations &amp; Features</h4>
              <ul>
                ${data.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>

            <div class="modal-info-block">
              <h4>Technologies &amp; Tools Utilized</h4>
              <div class="project-tech-stack" style="margin-top: 0.5rem;">
                ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
              </div>
            </div>

            <div class="modal-info-block">
              <h4>Key Takeaways</h4>
              <p>${data.learnings}</p>
            </div>
          </div>
        `;
        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', () => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // --- 7. CERTIFICATION MODAL ---
  const certModal = document.getElementById('cert-modal');
  const closeCertModal = document.getElementById('close-cert-modal');
  const certModalContent = document.getElementById('cert-modal-content');
  const certButtons = document.querySelectorAll('.open-cert-modal');

  const certData = {
    ai: {
      title: "Introduction to Artificial Intelligence",
      issuer: "Simplilearn SkillUp",
      overview: "An industry-aligned certification covering foundational AI paradigms, data processing approaches, algorithms, and real-world industrial deployments.",
      modules: [
        "Core Concepts of Artificial Intelligence & Machine Learning",
        "Supervised, Unsupervised & Reinforcement Learning models",
        "Neural Networks, Deep Learning & Computer Vision basics",
        "Natural Language Processing (NLP) & GenAI horizons",
        "Ethical considerations and AI governance"
      ]
    },
    python: {
      title: "Introduction to Python",
      issuer: "Simplilearn SkillUp",
      overview: "Comprehensive verification of core Python development competencies, programmatic logic, data handling, and object-oriented architectures.",
      modules: [
        "Python Syntax, Variables, Operators & Flow Control",
        "Data structures: Lists, Tuples, Dictionaries & Sets",
        "Functions, Lambda Expressions & Modularization",
        "Object-Oriented Programming (OOP) in Python",
        "File Operations, Exception Handling & Debugging"
      ]
    }
  };

  certButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const certKey = btn.getAttribute('data-cert');
      const data = certData[certKey];
      if (data && certModalContent) {
        certModalContent.innerHTML = `
          <div class="project-modal-details">
            <span style="color: var(--accent-primary); font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">
              ${data.issuer}
            </span>
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem;">${data.title}</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">${data.overview}</p>

            <div class="modal-info-block">
              <h4>Core Curriculum &amp; Competencies</h4>
              <ul>
                ${data.modules.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>

            <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.25); display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-shield-halved" style="color: #10b981; font-size: 1.4rem;"></i>
              <div>
                <strong style="color: #10b981; display: block; font-size: 0.9rem;">Verified Credential</strong>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Issued by Simplilearn SkillUp • Diya Haneen</span>
              </div>
            </div>
          </div>
        `;
        certModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeCertModal) {
    closeCertModal.addEventListener('click', () => {
      certModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close modals on clicking outside window
  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
    if (e.target === projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (e.target === certModal) {
      certModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      if (projectModal) projectModal.classList.remove('open');
      if (certModal) certModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // --- 8. COPY TO CLIPBOARD ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
          // Icon feedback
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'fa-solid fa-check';
            setTimeout(() => {
              icon.className = 'fa-regular fa-copy';
            }, 2000);
          }
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else if (textToCopy) {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied "${text}" to clipboard!`, 'success');
  }

  // --- 9. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('has-error');
      }

      if (isValid) {
        // Submit button loading animation
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;

          // Show success alert
          if (formAlert) {
            formAlert.className = 'form-alert success';
            formAlert.innerHTML = `
              <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}!</strong><br>
              Your message has been sent successfully. Diya will get in touch with you shortly at ${emailInput.value.trim()}.
            `;
          }

          showToast("Message sent successfully!", "success");
          contactForm.reset();

          setTimeout(() => {
            if (formAlert) formAlert.style.display = 'none';
          }, 8000);
        }, 1200);
      }
    });

    // Clear error on input
    ['name', 'email', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.closest('.form-group').classList.remove('has-error');
        });
      }
    });
  }

  // --- 10. TOAST NOTIFICATION UTILITY ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconClass = 'fa-solid fa-info-circle';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';

    toast.innerHTML = `<i class="${iconClass}" style="color: var(--accent-primary);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }
});
