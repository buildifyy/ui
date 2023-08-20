import axios from "axios";
import { InstanceFormMetaData } from "@/models";

export class InstanceService {
  getInstanceCreateForm = async (
    templateId?: string,
  ): Promise<InstanceFormMetaData> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/instances/form/${templateId}`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
