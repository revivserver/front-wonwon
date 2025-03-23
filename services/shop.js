import axios from 'axios';
import qs from 'qs';
import config from '@/config/index';

class ShopService {
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
      this.instance = new ShopService();
    }
    return this.instance;
  }

  async GetByID(documentId) {
    const populate_section =
      '?populate[0]=shop_repair_tag_links&populate[1]=shop_repair_tag_links.repair_tag&populate[2]=shop_operating_times';
    const url = `/api/shops/${documentId}?${populate_section}`;
    const resp = await this.axiosClient.get(url);
    console.log(resp);
    return resp.data?.data;
  }

  async GetReviewsByShopID(id) {
    return [];

    // const url = `/api/reviews?filters[shop]=${id}&populate=deep`;
    const url = `/api/reviews?filters[shop]=${id}`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async GetShopsBySearch(searchText, checkedRepairTagText) {
    const query = qs.stringify(
      {
        filters: {
          shop_repair_tag_links: {
            repair_tag: {
              documentId: {
                $in: checkedRepairTagText
              }
            }
          },
          $or: [
            {
              name: { $containsi: searchText }
            },
            {
              province: { $containsi: searchText }
            },
            {
              district: { $containsi: searchText }
            },
            {
              sub_district: { $containsi: searchText }
            },
            {
              address_detail: { $containsi: searchText }
            },
            {
              landmark: { $containsi: searchText }
            }
          ]
        }
      },
      {
        encodeValuesOnly: true // prettify URL
      }
    );
    const populate_section =
      '?populate[0]=shop_repair_tag_links&populate[1]=shop_repair_tag_links.repair_tag&populate[2]=shop_operating_times';
    const url = `/api/shops?${query}&sort[0]=name&pagination[pageSize]=150&${populate_section}`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async getAllShops() {
    const populate_section =
      '?populate[0]=shop_repair_tag_links&populate[1]=shop_repair_tag_links.repair_tag&populate[2]=shop_operating_times';
    const url = `/api/Shops/?sort[0]=name&populate=*&pagination[pageSize]=150&${populate_section}`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }
}

const ShopServiceInstance = ShopService.Instance();

export default ShopServiceInstance;
export { ShopServiceInstance, ShopService };
