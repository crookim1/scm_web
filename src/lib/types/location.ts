export interface Location {
    id: string;
    warehouseId: string;
    code: string;
    name: string;
    type: string;
    active: boolean;
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
    active?: boolean;
}

export interface UpdateLocationRequest {
    warehouseId: string;
    code: string;
    name?: string;
    active?: boolean;
}
