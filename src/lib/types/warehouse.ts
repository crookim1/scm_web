export interface Warehouse {
    id: string;
    code: string;
    name: string;
    isActive: boolean;
    createdDateTime: string;
    updatedDateTime?: string;
}

export interface ApiResponse<T> {
    statusCode: number;
    meta: {
        responseDateTime: string;
    };
    data: T;
}

export interface CreateWarehouseRequest {
    code: string;
    name: string;
    isActive?: boolean;
}

export interface UpdateWarehouseRequest {
    code?: string;
    name?: string;
    isActive?: boolean;
}
