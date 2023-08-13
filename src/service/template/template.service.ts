import { TemplateFormData } from "../../models";
import axios, { AxiosResponse } from "axios";

export class TemplateService {
  getTemplate = async (templateId?: string): Promise<TemplateFormData> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/templates/${templateId}`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getTemplateList = async (): Promise<TemplateFormData[]> => {
    const url = "http://localhost:8080/api/v1/tenants/the-binary/templates";

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  createTemplate = async (data: TemplateFormData): Promise<number> => {
    const url = "http://localhost:8080/api/v1/tenants/the-binary/templates";

    try {
      const response = await axios.post<TemplateFormData, AxiosResponse>(
        url,
        data,
      );
      return response.status;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
