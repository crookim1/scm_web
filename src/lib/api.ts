import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8090';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
api.interceptors.request.use(
    config => {
        // 여기에 인증 토큰 등을 추가할 수 있습니다
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 에러 처리 로직을 추가할 수 있습니다
        return Promise.reject(error);
    }
);
