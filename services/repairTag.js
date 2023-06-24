import axios from 'axios';
import config from '@/config/index';

class RepairTagService {
  instance = null;
  axiosClient = null;

  constructor(c, baseURL = config.apiBaseUrl) {
    if (c) {
      this.axiosClient = c;
      return;
    }
    this.axiosClient = axios.create({
      baseURL
    });
  }

  static Instance() {
    if (!this.instance) {
      this.instance = new RepairTagService();
    }
    return this.instance;
  }

  async getAllRepairTag() {
    const url = `/api/repair-tags/?populate=*`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }
}

const RepairTagServiceInstance = RepairTagService.Instance();

export default RepairTagServiceInstance;
export { RepairTagServiceInstance, RepairTagService };
