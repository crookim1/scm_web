import axios from 'axios';

// baseURL을 빈 문자열로 설정하여 경로 중복 방지
const baseURL = '';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
api.interceptors.request.use(
    config => {
        console.log('🚀 API 요청:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
            params: config.params,
        });
        return config;
    },
    error => {
        console.error('❌ API 요청 에러:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    response => {
        console.log('✅ API 응답:', {
            status: response.status,
            url: response.config.url,
            data: response.data,
        });
        return response;
    },
    error => {
        console.error('❌ API 응답 에러:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.message,
            data: error.response?.data,
        });
        return Promise.reject(error);
    }
);
