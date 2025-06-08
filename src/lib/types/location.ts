export interface Location {
    id: string;
    warehouseId: string;
    code: string;
    name: string;
    type: string;
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

export interface CreateLocationRequest {
    warehouseId: string;
    code: string;
    name: string;
    type: string;
    isActive?: boolean;
}

export interface UpdateLocationRequest {
    name?: string;
    type?: string;
    isActive?: boolean;
}
