import axios from "axios";

export class InstanceService {
  getInstanceCreateForm = async (templateId?: string): Promise<any> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/instances/form/${templateId}`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
