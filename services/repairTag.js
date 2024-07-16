import axios from 'axios';
import config from '@/config/index';
import qs from 'qs';

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
    // FIXME: uncomment when update version
    // const query = qs.stringify(
    //   {
    //     filters: { id: { $in: [1, 2, 3, 4, 5, 6, 7, 8] } }
    //   },
    //   {
    //     encodeValuesOnly: true
    //   }
    // );
    // const url = `/api/repair-tags?${query}&sort[0]=id&populate=*`;

    const url = `/api/repair-tags/?populate=*&pagination[pageSize]=100&sort[0]=id`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }
}

const RepairTagServiceInstance = RepairTagService.Instance();

export default RepairTagServiceInstance;
export { RepairTagServiceInstance, RepairTagService };
