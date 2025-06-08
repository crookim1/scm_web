import {
    Warehouse,
    CreateWarehouseRequest,
    UpdateWarehouseRequest,
    ApiResponse,
} from '../types/warehouse';
import { api } from './api';

export const warehouseApi = {
    // 창고 목록 조회
    getWarehouses: async (): Promise<Warehouse[]> => {
        const response = await api.get<ApiResponse<Warehouse[]>>('/api/v1/warehouses');
        return response.data.data;
    },

    // 창고 상세 조회
    getWarehouse: async (id: string): Promise<Warehouse> => {
        const response = await api.get<ApiResponse<Warehouse>>(`/api/v1/warehouses/${id}`);
        return response.data.data;
    },

    // 창고 생성
    createWarehouse: async (data: CreateWarehouseRequest): Promise<Warehouse> => {
        const response = await api.post<ApiResponse<Warehouse>>('/api/v1/warehouses', data);
        return response.data.data;
    },

    // 창고 수정
    updateWarehouse: async (id: string, data: UpdateWarehouseRequest): Promise<Warehouse> => {
        const response = await api.put<ApiResponse<Warehouse>>(`/api/v1/warehouses/${id}`, data);
        return response.data.data;
    },

    // 창고 삭제
    deleteWarehouse: async (id: string): Promise<void> => {
        await api.delete<ApiResponse<void>>(`/api/v1/warehouses/${id}`);
    },
};
