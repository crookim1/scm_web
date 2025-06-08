import {
    Location,
    CreateLocationRequest,
    UpdateLocationRequest,
    ApiResponse,
} from '../types/location';
import { api } from './api';

export const locationApi = {
    // 위치 목록 조회
    getLocations: async (): Promise<Location[]> => {
        const response = await api.get<ApiResponse<Location[]>>('/api/v1/locations');
        return response.data.data;
    },

    // 창고별 위치 조회
    getLocationsByWarehouse: async (warehouseId: string): Promise<Location[]> => {
        const response = await api.get<ApiResponse<Location[]>>(
            `/api/v1/locations/warehouses/${warehouseId}`
        );
        return response.data.data;
    },

    // 위치 상세 조회
    getLocation: async (id: string): Promise<Location> => {
        const response = await api.get<ApiResponse<Location>>(`/api/v1/locations/${id}`);
        return response.data.data;
    },

    // 위치 생성
    createLocation: async (data: CreateLocationRequest): Promise<Location> => {
        const response = await api.post<ApiResponse<Location>>('/api/v1/locations', data);
        return response.data.data;
    },

    // 위치 수정
    updateLocation: async (id: string, data: UpdateLocationRequest): Promise<Location> => {
        const response = await api.put<ApiResponse<Location>>(`/api/v1/locations/${id}`, data);
        return response.data.data;
    },

    // 위치 삭제
    deleteLocation: async (code: string): Promise<void> => {
        await api.delete<ApiResponse<void>>(`/api/v1/locations/${code}`);
    },
};
