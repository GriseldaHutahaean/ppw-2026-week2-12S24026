const API_BASE = './data';

class ApiService {
  async fetchJson(fileName) {
    try {
      const response = await fetch(`${API_BASE}/${fileName}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Gagal memuat ${fileName} dengan status ${response.status}.`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${fileName}]`, error);
      throw new Error(error.message || 'Terjadi kesalahan saat mengambil data.');
    }
  }

  async fetchProfile() {
    return this.fetchJson('profile.json');
  }

  async fetchProjects() {
    return this.fetchJson('projects.json');
  }

  async fetchServices() {
    return this.fetchJson('services.json');
  }

  async submitServiceOrder(payload) {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const order = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `order-${Date.now()}`,
      ...payload,
      submittedAt: new Date().toISOString()
    };

    return {
      success: true,
      data: order
    };
  }
}

const apiService = new ApiService();
window.ApiService = apiService;

export default apiService;
