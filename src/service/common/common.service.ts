import { Dropdown } from "@/models";
import axios from "axios";

export class CommonService {
  getAttributeTypeDropdown = async (): Promise<Dropdown[]> => {
    const url = `http://localhost:8080/api/v1/attribute-types`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getMetricTypeDropdown = async (): Promise<Dropdown[]> => {
    const url = `http://localhost:8080/api/v1/metric-types`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
