import { InstanceFormData, InstanceFormMetaData } from "@/models";
import axios, { AxiosResponse } from "axios";

export class InstanceService {
  getInstanceCreateForm = async (
    templateId?: string
  ): Promise<InstanceFormMetaData> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/instances/form/${templateId}`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getInstance = async (templateId?: string): Promise<InstanceFormData> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/instances/${templateId}`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getInstanceList = async (): Promise<InstanceFormData[]> => {
    const url = "http://localhost:8080/api/v1/tenants/the-binary/instances";

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getApplicableRelationshipInstances = async (
    parentTemplate?: string,
    relationshipTemplateId?: string
  ): Promise<InstanceFormData[]> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/parents/${parentTemplate}/relationships/${relationshipTemplateId}/instances`;

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  createInstance = async (data: InstanceFormData): Promise<number> => {
    const url = "http://localhost:8080/api/v1/tenants/the-binary/instances";

    try {
      const response = await axios.post<InstanceFormData, AxiosResponse>(
        url,
        data
      );
      return response.status;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  updateInstance = async (data: InstanceFormData): Promise<number> => {
    const url = `http://localhost:8080/api/v1/tenants/the-binary/instances/${data.basicInformation.externalId}`;

    try {
      const response = await axios.put<InstanceFormData, AxiosResponse>(
        url,
        data
      );
      return response.status;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
