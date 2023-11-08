import { DropdownData } from "@/models";
import { RelationshipData } from "@/models/relationship-data";
import axios from "axios";

export class CommonService {
  getAttributeTypeDropdown = async (): Promise<DropdownData[]> => {
    const url = `http://localhost:8080/api/v1/attribute-types`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getMetricTypeDropdown = async (): Promise<DropdownData[]> => {
    const url = `http://localhost:8080/api/v1/metric-types`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getUnitDropdown = async (): Promise<DropdownData[]> => {
    const url = `http://localhost:8080/api/v1/units`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getRelationships = async (): Promise<RelationshipData[]> => {
    const url = `http://localhost:8080/api/v1/relationships`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
