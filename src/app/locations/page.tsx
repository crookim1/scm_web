'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Chip,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Location, CreateLocationRequest, UpdateLocationRequest } from '@/lib/types/location';
import { Warehouse } from '@/lib/types/warehouse';
import { locationApi } from '@/lib/api/location';
import { warehouseApi } from '@/lib/api/warehouse';

export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [open, setOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(null);
    const [formData, setFormData] = useState<CreateLocationRequest>({
        warehouseId: '',
        code: '',
        name: '',
        type: '',
        active: true,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [locationsData, warehousesData] = await Promise.all([
                locationApi.getLocations(),
                warehouseApi.getWarehouses(),
            ]);
            setLocations(locationsData);
            setWarehouses(warehousesData);
        } catch (error: any) {
            console.error('데이터를 불러오는데 실패했습니다:', error);
            alert(error.response?.data?.detail || '데이터를 불러오는데 실패했습니다.');
        }
    };

    const handleOpen = (location?: Location) => {
        if (location) {
            setEditingLocation(location);
            setFormData({
                warehouseId: location.warehouseId,
                code: location.code,
                name: location.name,
                type: location.type,
                active: location.active,
            });
        } else {
            setEditingLocation(null);
            setFormData({
                warehouseId: '',
                code: '',
                name: '',
                type: '',
                active: true,
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingLocation(null);
        setFormData({
            warehouseId: '',
            code: '',
            name: '',
            type: '',
            active: true,
        });
    };

    const handleSubmit = async () => {
        try {
            if (editingLocation) {
                await locationApi.updateLocation(editingLocation.id, formData);
            } else {
                await locationApi.createLocation(formData);
            }
            handleClose();
            loadData();
        } catch (error: any) {
            console.error('위치 저장에 실패했습니다:', error);
            alert(error.response?.data?.detail || '위치 저장에 실패했습니다.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('정말로 이 위치를 삭제하시겠습니까?')) {
            try {
                await locationApi.deleteLocation(id);
                loadData();
            } catch (error: any) {
                console.error('위치 삭제에 실패했습니다:', error);
                alert(error.response?.data?.detail || '위치 삭제에 실패했습니다.');
            }
        }
    };

    const getWarehouseCode = (warehouseId: string) => {
        const warehouse = warehouses.find(w => w.id === warehouseId);
        return warehouse ? warehouse.code : '삭제된 창고';
    };

    const getWarehouseStatus = (warehouseId: string) => {
        const warehouse = warehouses.find(w => w.id === warehouseId);
        return warehouse ? warehouse.active : false;
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">위치 관리</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
                    새 위치
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>창고</TableCell>
                            <TableCell>코드</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>유형</TableCell>
                            <TableCell>위치 상태</TableCell>
                            <TableCell>창고 상태</TableCell>
                            <TableCell>생성일</TableCell>
                            <TableCell>수정일</TableCell>
                            <TableCell>작업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map(location => (
                            <TableRow key={location.id}>
                                <TableCell>{getWarehouseCode(location.warehouseId)}</TableCell>
                                <TableCell>{location.code}</TableCell>
                                <TableCell>{location.name}</TableCell>
                                <TableCell>{location.type}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={location.active ? '활성' : '비활성'}
                                        color={location.active ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={
                                            getWarehouseStatus(location.warehouseId)
                                                ? '활성'
                                                : '비활성'
                                        }
                                        color={
                                            getWarehouseStatus(location.warehouseId)
                                                ? 'success'
                                                : 'error'
                                        }
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(location.createdDateTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {location.updatedDateTime
                                        ? new Date(location.updatedDateTime).toLocaleString()
                                        : '-'}
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleOpen(location)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(location.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingLocation ? '위치 수정' : '새 위치'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {editingLocation ? (
                            <TextField
                                label="창고"
                                value={getWarehouseCode(formData.warehouseId)}
                                disabled
                                fullWidth
                            />
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel>창고</InputLabel>
                                <Select
                                    value={formData.warehouseId}
                                    label="창고"
                                    onChange={e =>
                                        setFormData({ ...formData, warehouseId: e.target.value })
                                    }
                                >
                                    {warehouses.map(warehouse => (
                                        <MenuItem key={warehouse.id} value={warehouse.id}>
                                            {warehouse.name} ({warehouse.code})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <TextField
                            label="코드"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="이름"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.active}
                                    onChange={e =>
                                        setFormData({ ...formData, active: e.target.checked })
                                    }
                                />
                            }
                            label="활성 상태"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
