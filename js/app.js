import apiService from './api-service.js';

const STORAGE_KEY = 'portfolio_service_orders';

const escapeHTML = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

class PortfolioApp {
  constructor() {
    this.state = {
      profile: null,
      projects: [],
      services: [],
      filteredProjects: [],
      currentFilter: 'all',
      orders: this.getStoredOrders()
    };

    this.elements = {
      profileName: document.getElementById('profile-name'),
      profileNim: document.getElementById('profile-nim'),
      profileLocation: document.getElementById('profile-location'),
      profileStatus: document.getElementById('profile-status'),
      profileEmail: document.getElementById('profile-email'),
      profilePhone: document.getElementById('profile-phone'),
      heroBio: document.getElementById('hero-bio'),
      aboutProfile: document.getElementById('about-profile'),
      aboutPillars: document.getElementById('about-pillars'),
      skillsContainer: document.getElementById('skills-container'),
      filters: document.getElementById('project-filters'),
      projectContainer: document.getElementById('projects-container'),
      projectsLoading: document.getElementById('projects-loading'),
      projectsError: document.getElementById('projects-error'),
      projectsEmpty: document.getElementById('projects-empty'),
      servicesContainer: document.getElementById('services-container'),
      orderBadge: document.getElementById('orders-badge'),
      notificationMenu: document.querySelector('.notification-menu'),
      notificationToggle: document.getElementById('notifications-toggle'),
      notificationPanel: document.getElementById('notifications-panel'),
      notificationsList: document.getElementById('notifications-list'),
      serviceSelect: document.getElementById('select-topik'),
      consultationForm: document.getElementById('consultation-form'),
      submitButton: document.getElementById('submit-order-btn'),
      formFeedback: document.getElementById('form-feedback'),
      modal: document.getElementById('universalProjectModal'),
      modalTitle: document.getElementById('modal-project-title'),
      modalCategory: document.getElementById('modal-project-category'),
      modalDescription: document.getElementById('modal-project-description'),
      modalTags: document.getElementById('modal-project-tags'),
      modalMetrics: document.getElementById('modal-project-metrics'),
      modalLink: document.getElementById('modal-project-link')
    };
  }

  getStoredOrders() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Unable to read order history:', error);
      return [];
    }
  }

  saveOrders() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.orders));
  }

  updateOrderBadge() {
    const count = this.state.orders.length;
    if (this.elements.orderBadge) {
      this.elements.orderBadge.textContent = count > 99 ? '99+' : String(count);
    }
    this.elements.notificationToggle?.setAttribute(
      'aria-label',
      `Lihat ${count} pesanan layanan`
    );
  }

  renderNotifications() {
    if (!this.elements.notificationsList) return;

    if (!this.state.orders.length) {
      this.elements.notificationsList.innerHTML = '<p class="notification-empty">Belum ada pesanan layanan.</p>';
      return;
    }

    this.elements.notificationsList.innerHTML = this.state.orders.slice().reverse().map((order) => {
      const submittedDate = order.submittedAt && !Number.isNaN(Date.parse(order.submittedAt))
        ? new Date(order.submittedAt).toLocaleString('id-ID')
        : 'Waktu tidak tersedia';
      const serviceName = this.state.services.find((service) => service.id === order.topik)?.name || order.topik;
      const details = [
        ['Nama', order.nama],
        ['Email', order.email],
        ['Telepon', order.telepon],
        ['Institusi', order.institusi || '-'],
        ['Topik', serviceName],
        ['Tanggal rencana', order.tanggal],
        ['Durasi', order.durasi ? `${order.durasi} jam` : '-'],
        ['Moda diskusi', order.moda_diskusi],
        ['Pesan', order.pesan],
        ['Persetujuan', order.persetujuan ? 'Disetujui' : 'Tidak dicentang']
      ];

      return `
        <article class="notification-order">
          <div class="notification-order-heading">
            <h3>${escapeHTML(order.nama || 'Pemesan')}</h3>
            <time datetime="${escapeHTML(order.submittedAt || '')}">${escapeHTML(submittedDate)}</time>
          </div>
          <p class="notification-order-topic">${escapeHTML(serviceName || 'Topik tidak tersedia')}</p>
          <details>
            <summary>Lihat data formulir</summary>
            <dl class="notification-details">
              ${details.map(([label, value]) => `
                <div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value || '-')}</dd></div>
              `).join('')}
            </dl>
          </details>
        </article>
      `;
    }).join('');
  }

  positionNotificationPanel() {
    const toggle = this.elements.notificationToggle;
    const panel = this.elements.notificationPanel;
    if (!toggle || !panel) return;

    const toggleBounds = toggle.getBoundingClientRect();
    const panelWidth = Math.min(400, window.innerWidth - 24);
    const left = Math.max(12, Math.min(toggleBounds.right - panelWidth, window.innerWidth - panelWidth - 12));
    panel.style.left = `${left}px`;
    panel.style.top = `${toggleBounds.bottom + 12}px`;
  }

  async init() {
    this.showLoadingState();

    try {
      const [profile, projects, services] = await Promise.all([
        apiService.fetchProfile(),
        apiService.fetchProjects(),
        apiService.fetchServices()
      ]);

      this.state.profile = profile;
      this.state.projects = Array.isArray(projects) ? projects : [];
      this.state.services = Array.isArray(services) ? services : [];

      this.renderProfile();
      this.renderSkills();
      this.renderFilters();
      this.renderServices();
      this.renderProjects();
      this.updateOrderBadge();
      this.renderNotifications();
      this.attachEvents();
      this.hideLoadingState();
    } catch (error) {
      this.hideLoadingState();
      this.showErrorState(error.message || 'Data gagal dimuat.');
    }
  }

  showLoadingState() {
    this.elements.projectsLoading?.classList.remove('hidden');
    this.elements.projectsError?.classList.add('hidden');
    this.elements.projectsEmpty?.classList.add('hidden');
  }

  hideLoadingState() {
    this.elements.projectsLoading?.classList.add('hidden');
  }

  showErrorState(message) {
    if (this.elements.projectsError) {
      this.elements.projectsError.classList.remove('hidden');
      this.elements.projectsError.innerHTML = `<strong>Gagal memuat data.</strong> ${escapeHTML(message)}`;
    }
  }

  renderProfile() {
    const profile = this.state.profile;
    if (!profile) return;

    const { name, nim, location, institution, faculty, email, phone, bio, stats, about } = profile;

    this.elements.profileName.textContent = name;
    this.elements.profileNim.textContent = `NIM: ${nim}`;
    this.elements.profileLocation.textContent = location;
    this.elements.profileStatus.textContent = `${institution} · ${faculty}`;
    this.elements.profileEmail.textContent = email;
    this.elements.profileEmail.href = `mailto:${email}`;
    this.elements.profilePhone.textContent = phone;
    this.elements.profilePhone.href = `tel:${phone.replace(/\s+/g, '')}`;

    if (this.elements.heroBio) {
      this.elements.heroBio.innerHTML = `Halo! Saya <strong>${escapeHTML(name)}</strong>, calon analis sistem dan pengembang antarmuka berbasis data. ${escapeHTML(bio)}`;
    }

    if (Array.isArray(stats) && this.elements.aboutProfile) {
      const statHtml = stats.map((item) => `
        <div class="highlight-item">
          <span class="highlight-number">${escapeHTML(item.value)}</span>
          <span class="highlight-label">${escapeHTML(item.label)}</span>
        </div>
      `).join('');

      const heroHighlights = document.querySelector('.hero-highlights');
      if (heroHighlights) {
        heroHighlights.innerHTML = statHtml;
      }
    }

    if (this.elements.aboutProfile && about) {
      const paragraphHtml = (about.paragraphs || [])
        .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
        .join('');

      this.elements.aboutProfile.innerHTML = `
        <h3 class="narrative-title">Visi &amp; Komitmen Profesional</h3>
        <p class="narrative-lead">${escapeHTML(about.lead)}</p>
        ${paragraphHtml}
      `;
    }

    if (this.elements.aboutPillars && Array.isArray(about?.pillars)) {
      this.elements.aboutPillars.innerHTML = about.pillars.map((pillar, index) => `
        <article class="pillar-card">
          <div class="pillar-icon" aria-hidden="true">&bull; ${String(index + 1).padStart(2, '0')}</div>
          <div class="pillar-body">
            <h4>${escapeHTML(pillar.title)}</h4>
            <p>${escapeHTML(pillar.description)}</p>
          </div>
        </article>
      `).join('');
    }
  }

  renderSkills() {
    const skills = this.state.profile?.skills || [];
    if (!this.elements.skillsContainer || !skills.length) return;

    this.elements.skillsContainer.innerHTML = skills.map((skillGroup) => `
      <article class="skill-group-card">
        <div class="skill-header">
          <span class="skill-domain-badge">${escapeHTML(skillGroup.domain)}</span>
          <h3 class="skill-group-title">${escapeHTML(skillGroup.title)}</h3>
        </div>
        <p class="skill-group-desc">${escapeHTML(skillGroup.description)}</p>
        <ul class="tag-pill-list" aria-label="${escapeHTML(skillGroup.title)}">
          ${skillGroup.items.map((item) => `<li class="tag-pill">${escapeHTML(item)}</li>`).join('')}
        </ul>
      </article>
    `).join('');
  }

  renderFilters() {
    const categories = ['all', ...new Set(this.state.projects.map((project) => project.category).filter(Boolean))];

    this.elements.filters.innerHTML = categories.map((category) => {
      const label = category === 'all' ? 'Semua' : category;
      const activeClass = category === this.state.currentFilter ? 'active' : '';
      return `<button type="button" class="filter-chip ${activeClass}" data-filter="${escapeHTML(category)}">${escapeHTML(label)}</button>`;
    }).join('');
  }

  renderProjects() {
    const allProjects = this.state.projects || [];
    const filter = this.state.currentFilter || 'all';
    const filteredProjects = filter === 'all'
      ? allProjects
      : allProjects.filter((project) => project.category === filter);

    this.state.filteredProjects = filteredProjects;

    this.elements.projectContainer.innerHTML = filteredProjects.map((project) => `
      <article class="project-spotlight-card project-card" data-project-id="${escapeHTML(project.id)}" tabindex="0" role="button" aria-label="Lihat detail ${escapeHTML(project.title)}">
        <div class="project-card-header">
          <span class="project-year-badge">${escapeHTML(project.metrics?.year || '2026')} &bull; Proyek Akademik</span>
          <span class="project-category-tag">${escapeHTML(project.category)}</span>
        </div>
        <h3 class="project-card-title">${escapeHTML(project.title)}</h3>
        <p class="project-card-desc">${escapeHTML(project.description)}</p>
        <div class="project-tech-footer">
          ${project.tags.map((tag) => `<span class="tech-chip">${escapeHTML(tag)}</span>`).join('')}
        </div>
      </article>
    `).join('');

    if (!filteredProjects.length) {
      this.elements.projectsEmpty.classList.remove('hidden');
      this.elements.projectContainer.classList.add('is-empty');
      return;
    }

    this.elements.projectsEmpty.classList.add('hidden');
    this.elements.projectContainer.classList.remove('is-empty');
  }

  renderServices() {
    if (!this.elements.servicesContainer || !this.state.services.length) return;

    this.elements.servicesContainer.innerHTML = this.state.services.map((service) => `
      <article class="service-card" data-service-id="${escapeHTML(service.id)}">
        <span class="service-category">${escapeHTML(service.category)}</span>
        <h3>${escapeHTML(service.name)}</h3>
        <p>${escapeHTML(service.description)}</p>
        <ul>
          ${service.features.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}
        </ul>
        <div class="service-footer">
          <span class="service-price">${escapeHTML(service.price)}</span>
          <button type="button" class="btn btn-secondary service-select-btn" data-service-id="${escapeHTML(service.id)}">Pilih layanan</button>
        </div>
      </article>
    `).join('');

    const selectOptions = this.state.services.map((service) => `
      <option value="${escapeHTML(service.id)}">${escapeHTML(service.name)}</option>
    `).join('');

    if (this.elements.serviceSelect) {
      this.elements.serviceSelect.innerHTML = `
        <option value="" disabled selected>-- Pilih Topik Konsultasi --</option>
        ${selectOptions}
      `;
    }
  }

  attachEvents() {
    this.elements.notificationToggle?.addEventListener('click', () => {
      const isOpen = !this.elements.notificationPanel.classList.contains('hidden');
      if (!isOpen) this.positionNotificationPanel();
      this.elements.notificationPanel.classList.toggle('hidden', isOpen);
      this.elements.notificationToggle.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) this.renderNotifications();
    });

    window.addEventListener('resize', () => {
      if (!this.elements.notificationPanel?.classList.contains('hidden')) {
        this.positionNotificationPanel();
      }
    });

    document.addEventListener('click', (event) => {
      if (this.elements.notificationMenu?.contains(event.target)) return;
      this.elements.notificationPanel?.classList.add('hidden');
      this.elements.notificationToggle?.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      this.elements.notificationPanel?.classList.add('hidden');
      this.elements.notificationToggle?.setAttribute('aria-expanded', 'false');
    });

    this.elements.filters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;

      this.state.currentFilter = button.dataset.filter;
      this.renderFilters();
      this.renderProjects();
    });

    this.elements.projectContainer.addEventListener('click', (event) => {
      const card = event.target.closest('[data-project-id]');
      if (!card) return;
      this.openProjectModal(card.dataset.projectId);
    });

    this.elements.projectContainer.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('[data-project-id]');
      if (!card) return;
      event.preventDefault();
      this.openProjectModal(card.dataset.projectId);
    });

    this.elements.servicesContainer?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-service-id]');
      if (!button) return;
      const serviceId = button.dataset.serviceId;
      if (this.elements.serviceSelect) {
        this.elements.serviceSelect.value = serviceId;
      }
      this.elements.consultationForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.elements.consultationForm?.querySelector('[name="nama"]')?.focus({ preventScroll: true });
    });

    this.elements.consultationForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit(event);
    });
  }

  openProjectModal(projectId) {
    const project = this.state.projects.find((item) => item.id === projectId);
    if (!project) return;

    if (!this.elements.modal) return;

    const modal = new bootstrap.Modal(this.elements.modal);

    this.elements.modalTitle.textContent = project.title;
    this.elements.modalCategory.textContent = project.category;
    this.elements.modalDescription.textContent = project.description;
    this.elements.modalTags.innerHTML = project.tags.map((tag) => `<span class="project-tag">${escapeHTML(tag)}</span>`).join('');

    this.elements.modalMetrics.innerHTML = Object.entries(project.metrics || {})
      .map(([key, value]) => `<li><span>${escapeHTML(key)}</span> <strong>${escapeHTML(value)}</strong></li>`)
      .join('');

    if (project.link && project.link !== '#') {
      this.elements.modalLink.href = project.link;
      this.elements.modalLink.classList.remove('hidden');
    } else {
      this.elements.modalLink.classList.add('hidden');
    }

    modal.show();
  }

  async handleFormSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    this.elements.formFeedback?.classList.add('hidden');
    this.elements.formFeedback?.classList.remove('is-error');

    this.elements.submitButton.disabled = true;
    this.elements.submitButton.classList.add('is-loading');
    const originalText = this.elements.submitButton.querySelector('.btn-text')?.textContent || 'Kirim';
    const buttonLabel = this.elements.submitButton.querySelector('.btn-text');
    if (buttonLabel) buttonLabel.textContent = 'Mengirim...';

    try {
      const response = await apiService.submitServiceOrder(payload);
      this.state.orders.push(response.data);
      this.saveOrders();
      this.updateOrderBadge();
      this.renderNotifications();
      this.elements.consultationForm.reset();
      if (this.elements.formFeedback) {
        this.elements.formFeedback.textContent = 'Permintaan layanan berhasil dikirim. Buka ikon lonceng untuk melihat data pesanan.';
        this.elements.formFeedback.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Unable to submit service order:', error);
      if (this.elements.formFeedback) {
        this.elements.formFeedback.textContent = 'Permintaan belum berhasil dikirim. Silakan coba kembali.';
        this.elements.formFeedback.classList.remove('hidden');
        this.elements.formFeedback.classList.add('is-error');
      }
    } finally {
      this.elements.submitButton.disabled = false;
      this.elements.submitButton.classList.remove('is-loading');
      if (buttonLabel) buttonLabel.textContent = originalText;
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
