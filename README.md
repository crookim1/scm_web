# SCM (Supply Chain Management) System

이파일을 보고 프론트엔드 + 프록시 서버를 만들거야. API목록과 몽고디비 컬렉션 잘 확인하고. 설명해준대로 코드 만들어줘.
가능하면 web과 모바일웹 다 되도록 하고 싶긴 해. ui는 작업자가 보기 편하도록 간단하면서도 강력하게 만들어줬으면 좋겠어
그리고, backend.md 파일을 만들어서 혹시 추가하거나 삭제해도 되는 API나 컬렉션이 있다면 정보를 넣어줬으면 좋겠어.
backend.md 파일은 다른 AI가보고 판단해서 백엔드개발을 진행할거니 AI가 잘 알아듣도록 정리해줘.

## 프로젝트 개요

이 프로젝트는 제조업체를 위한 SCM(Supply Chain Management) 시스템입니다. BOM(Bill of Materials) 관리, 생산 관리, 재고 관리 등의 기능을 제공합니다.
중소기업에서 쓰는 프로젝트로 소수의 사무직인원(1~2명)이 관리하고 이 시스템을 사용합니다.
작은 공장이고 창고는 3-5개를 운영합니다.

## 프로젝트 구조

### 1. API 백엔드 서버 (현재 프로젝트)

- 내부망에서만 접근 가능한 RESTful API 서버
- 제조업체의 핵심 비즈니스 로직 처리
- 데이터베이스 직접 접근

### 2. 프론트엔드 + 프록시 서버 (별도 프로젝트)

- Next.js 기반의 풀스택 애플리케이션
- 외부에서 접근 가능한 웹 인터페이스
- API 백엔드와의 통신 중계

## 기술 스택

### API 백엔드 서버

- Kotlin 1.9.25
- Spring Boot 3.4.5
- Spring Cloud 2024.0.0
- MongoDB
- MapStruct 1.5.5.Final
- Swagger/OpenAPI 2.4.0
- Java 21
- Gradle

### 프론트엔드 + 프록시 서버

- Next.js 14
- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- React Query
- Axios

## 아키텍처

### API 백엔드 서버

- Spring Boot 기반의 RESTful API 서버
- MongoDB를 사용한 데이터 저장
- MapStruct를 통한 DTO 매핑
- Swagger/OpenAPI를 통한 API 문서화
- 내부망 접근 제한

### 프론트엔드 + 프록시 서버

- Next.js 기반의 풀스택 애플리케이션
    - 프론트엔드: React + Material-UI
    - 백엔드: Node.js (API 프록시)
- API Routes를 통한 백엔드 통신
- 클라이언트 상태 관리
- 보안 및 인증 처리

### 프론트엔드 아키텍처 고려사항

1. API 통신 방식

- Next.js API Routes를 통한 프록시 서버 구현
- API 백엔드와의 통신 중계
- 요청/응답 변환 및 캐싱

2. 상태 관리

- Redux Toolkit: 전역 상태 관리
- React Query: 서버 상태 관리
- Context API: 테마, 인증 등

3. 컴포넌트 구조

- Atomic Design 패턴 적용
- 재사용 가능한 컴포넌트 설계
- TypeScript를 통한 타입 안정성

4. 성능 최적화

- Next.js의 SSR/SSG 활용
- 이미지 최적화
- 코드 스플리팅
- 번들 사이즈 최적화

5. 보안

- JWT 기반 인증
- API 요청 제한
- XSS 방지
- CORS 설정

## MongoDB 도큐먼트 구조

### 1. ProductDocument

- 제품 정보를 저장하는 컬렉션
- 필드:
    - id: String (MongoDB ObjectId)
    - code: String (제품 코드, unique)
    - name: String (제품명)
    - description: String? (설명)
    - category: String? (카테고리)
    - unit: String? (단위)
    - barcode: String? (바코드)
    - minimumQuantity: Long? (최소 재고량)
    - sellingPrice: Double? (판매가)
    - purchasePrice: Double? (구매가)
    - active: Boolean (활성화 여부)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 2. BomDocument

- BOM(자재 명세서) 정보를 저장하는 컬렉션
- 필드:
    - id: String
    - productId: String (완제품 ID)
    - version: String (BOM 버전)
    - description: String? (설명)
    - materials: List<BomMaterial> (구성 자재 목록)
    - active: Boolean
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 3. WarehouseDocument

- 창고 정보를 저장하는 컬렉션
- 필드:
    - id: String
    - code: String (창고 코드, unique)
    - name: String (창고명)
    - active: Boolean (활성화 여부)
    - deleted: Boolean (삭제 여부, 기본값 false)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 4. LocationDocument

- 창고 내 위치 정보를 저장하는 컬렉션
- 필드:
    - id: String
    - warehouseId: String (소속 창고 ID)
    - code: String (위치 코드)
    - name: String (위치명)
    - active: Boolean (활성화 여부)
    - deleted: Boolean (삭제 여부, 기본값 false)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 5. InventoryDocument

- 재고 정보를 저장하는 컬렉션
- 필드:
    - id: String
    - productId: String (제품 ID)
    - warehouseId: String (창고 ID)
    - locationId: String (위치 ID)
    - quantity: Long (수량)
    - reservedQuantity: Long (예약 수량)
    - lotNumber: String? (로트 번호)
    - expiryDateTime: ZonedDateTime? (유통기한)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 6. InventoryReservationDocument

- 재고 예약 정보를 저장하는 컬렉션
- 필드:
    - id: String
    - inventoryId: String (재고 ID)
    - quantity: Long (예약 수량)
    - status: String (예약 상태)
    - purpose: String (예약 목적)
    - referenceId: String? (참조 ID)
    - referenceType: String (참조 유형)
    - expiryDateTime: ZonedDateTime? (만료일)
    - reason: String? (사유)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 7. StockTransactionDocument

- 재고 거래 이력을 저장하는 컬렉션
- 필드:
    - id: String
    - transactionNumber: String (거래 번호)
    - type: String (거래 유형: IN, OUT, TRANSFER)
    - productId: String (제품 ID)
    - warehouseId: String (창고 ID)
    - locationId: String? (위치 ID)
    - quantity: Long (수량)
    - referenceId: String? (참조 ID)
    - referenceType: String? (참조 유형)
    - status: String (거래 상태)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

### 8. ProductionHistoryDocument

- 생산 이력을 저장하는 컬렉션
- 필드:
    - id: String
    - bomId: String (BOM ID)
    - productId: String (제품 ID)
    - quantity: Long (생산 수량)
    - status: String (생산 상태)
    - startDateTime: ZonedDateTime? (시작 시간)
    - endDateTime: ZonedDateTime? (종료 시간)
    - createdDateTime: ZonedDateTime
    - updatedDateTime: ZonedDateTime?

## API 상세 명세

### 1. 제품 관리 API (/api/v1/products)

#### 제품 생성

```http
POST /api/v1/products
Content-Type: application/json

{
  "code": "string",          // 필수
  "name": "string",          // 필수
  "description": "string?",  // 선택
  "category": "string?",     // 선택
  "unit": "string?",         // 선택
  "barcode": "string?",      // 선택
  "minimumQuantity": 0,      // 선택, 최소 0
  "sellingPrice": 0.0,       // 선택, 최소 0
  "purchasePrice": 0.0,      // 선택, 최소 0
  "active": true            // 선택, 기본값 true
}
```

#### 제품 목록 조회

```http
GET /api/v1/products
```

#### 제품 상세 조회

```http
GET /api/v1/products/{code}
```

#### 제품 수정

```http
PUT /api/v1/products/{id}
Content-Type: application/json

{
  "code": "string?",         // 선택
  "name": "string?",         // 선택
  "description": "string?",  // 선택
  "category": "string?",     // 선택
  "unit": "string?",         // 선택
  "barcode": "string?",      // 선택
  "minimumQuantity": 0,      // 선택, 최소 0
  "sellingPrice": 0.0,       // 선택, 최소 0
  "purchasePrice": 0.0,      // 선택, 최소 0
  "active": true            // 선택
}
```

#### 제품 삭제

```http
DELETE /api/v1/products/{id}
```

### 2. 창고 관리 API (/api/v1/warehouses)

#### 창고 생성

```http
POST /api/v1/warehouses
Content-Type: application/json

{
  "code": "string",    // 필수
  "name": "string",    // 필수
  "active": true      // 선택, 기본값 true
}
```

#### 창고 목록 조회

```http
GET /api/v1/warehouses
```

#### 창고 상세 조회

```http
GET /api/v1/warehouses/{id}
GET /api/v1/warehouses/code/{code}
```

#### 창고 수정

```http
PUT /api/v1/warehouses/{id}
Content-Type: application/json

{
  "code": "string?",   // 선택
  "name": "string?",   // 선택
  "active": true      // 선택
}
```

#### 창고 삭제

```http
DELETE /api/v1/warehouses/{id}
```

- 실제로 데이터를 삭제하지 않고 deleted 필드를 true로 설정
- deleted가 true인 창고는 조회되지 않음
- 이미 삭제된 창고는 재삭제 불가

### 3. 위치 관리 API (/api/v1/locations)

#### 위치 생성

```http
POST /api/v1/locations
Content-Type: application/json

{
  "warehouseId": "string",  // 필수
  "name": "string",         // 필수
  "code": "string",         // 필수
  "active": true           // 선택, 기본값 true
}
```

#### 위치 목록 조회

```http
GET /api/v1/locations
```

#### 위치 상세 조회

```http
GET /api/v1/locations/{id}
```

#### 창고별 위치 조회

```http
GET /api/v1/locations/warehouses/{warehouseId}
```

#### 위치 수정

```http
PUT /api/v1/locations/{id}
Content-Type: application/json

{
  "warehouseId": "string",  // 필수
  "code": "string",    // 필수, 위치 코드
  "name": "string?",    // 선택, 위치명
  "active": true       // 선택, 활성화 여부
}
```

#### 위치 삭제

```http
DELETE /api/v1/locations/{id}
```

- 실제로 데이터를 삭제하지 않고 deleted 필드를 true로 설정
- deleted가 true인 위치는 조회되지 않음
- 이미 삭제된 위치는 재삭제 불가

### 4. 재고 관리 API (/api/v1/inventories)

#### 재고 목록 조회

```http
GET /api/v1/inventories
```

#### 상품별 재고 조회

```http
GET /api/v1/inventories/products/{productCode}
```

#### 창고별 재고 조회

```http
GET /api/v1/inventories/warehouses/{warehouseCode}
```

#### 창고 및 위치별 재고 조회

```http
GET /api/v1/inventories/warehouses/{warehouseCode}/locations/{locationCode}
```

#### 재고 상세 조회

```http
GET /api/v1/inventories/{id}
```

#### 재고 입고

```http
POST /api/v1/inventories/receipt
Content-Type: application/json

{
  "productId": "string",     // 필수
  "warehouseId": "string",   // 필수
  "locationId": "string",    // 선택
  "quantity": 0,             // 필수, 최소 0
  "lotNumber": "string?",    // 선택
  "expiryDateTime": "string?"    // 선택, ISO-8601 형식
}
```

#### 재고 수량 조정

```http
POST /api/v1/inventories/{inventoryId}/adjust
Content-Type: application/json

{
  "quantity": 0,        // 필수, 최소 0
  "reason": "string?"   // 선택
}
```

#### 재고 출고

```http
POST /api/v1/inventories/{inventoryId}/issue
Content-Type: application/json

{
  "quantity": 0    // 필수, 최소 1
}
```

#### 재고 이동

```http
POST /api/v1/inventories/{inventoryId}/transfer
Content-Type: application/json

{
  "toWarehouseId": "string",  // 필수
  "toLocationId": "string",   // 선택
  "quantity": 0              // 필수, 최소 1
}
```

#### 재고 예약

```http
POST /api/v1/inventories/{id}/reserve
Content-Type: application/json

{
  "quantity": 0,                    // 필수, 최소 1
  "purpose": "string",              // 필수
  "referenceId": "string?",         // 선택
  "referenceType": "string",        // 선택, 기본값 "OTHER"
  "expiryDateTime": "string?",          // 선택, ISO-8601 형식
  "reason": "string?"               // 선택
}
```

#### 재고 예약 취소

```http
POST /api/v1/inventories/reservations/{reservationId}/cancel
Content-Type: application/json

{
  "reason": "string?"    // 선택
}
```

#### 재고 검색

```http
GET /api/v1/inventories/search
Query Parameters:
  - productId: string?
  - warehouseId: string?
  - locationId: string?
  - lotNumber: string?
  - minQuantity: number?
  - maxQuantity: number?
  - minExpiryDateTime: string? (ISO-8601)
  - maxExpiryDateTime: string? (ISO-8601)
```

### 5. BOM 관리 API (/api/v1/boms)

#### BOM 생성

```http
POST /api/v1/boms
Content-Type: application/json

{
  "productId": "string",     // 필수
  "version": "string",       // 필수
  "description": "string?",  // 선택
  "materials": [            // 필수
    {
      "productId": "string",     // 필수
      "quantity": 0.0,           // 필수, 최소 0.001
      "unit": "string",          // 선택, 기본값 "KG"
      "description": "string?"   // 선택
    }
  ]
}
```

#### BOM 조회

```http
GET /api/v1/boms/{id}
```

#### 제품별 BOM 조회

```http
GET /api/v1/boms/products/{productId}
```

#### BOM 수정

```http
PUT /api/v1/boms/{id}
Content-Type: application/json

{
  "description": "string?"    // 선택
}
```

#### BOM 삭제

```http
DELETE /api/v1/boms/{id}
```

### 6. 생산 관리 API (/api/v1/production-history)

#### 생산 이력 생성

```http
POST /api/v1/production-history
Content-Type: application/json

{
  // ProductionHistory 모델의 모든 필드
}
```

#### 생산 이력 목록 조회

```http
GET /api/v1/production-history
```

#### 생산 이력 상세 조회

```http
GET /api/v1/production-history/{id}
```

### 7. 재고 거래 이력 API (/api/v1/stock-transactions)

#### 거래 이력 목록 조회

```http
GET /api/v1/stock-transactions
```

#### 거래 번호로 조회

```http
GET /api/v1/stock-transactions/{transactionNumber}
```

#### 제품별 거래 이력 조회

```http
GET /api/v1/stock-transactions/products/{productCode}
```

#### 창고별 거래 이력 조회

```http
GET /api/v1/stock-transactions/warehouses/{warehouseCode}
```

#### 미매칭 생산 출고 거래 조회

```http
GET /api/v1/stock-transactions/unmatched-production-out
```
