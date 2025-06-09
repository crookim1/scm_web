'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
    Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Warehouse, CreateWarehouseRequest, UpdateWarehouseRequest } from '@/lib/types/warehouse';
import { warehouseApi } from '@/lib/api/warehouse';

export default function WarehousesPage() {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [open, setOpen] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
    const [formData, setFormData] = useState<CreateWarehouseRequest>({
        code: '',
        name: '',
        active: true,
    });

    useEffect(() => {
        loadWarehouses();
    }, []);

    const loadWarehouses = async () => {
        try {
            const data = await warehouseApi.getWarehouses();
            setWarehouses(data);
        } catch (error: any) {
            console.error('창고 목록을 불러오는데 실패했습니다:', error);
            alert(error.response?.data?.message || '창고 목록을 불러오는데 실패했습니다.');
        }
    };

    const handleOpen = (warehouse?: Warehouse) => {
        if (warehouse) {
            setEditingWarehouse(warehouse);
            setFormData({
                code: warehouse.code,
                name: warehouse.name,
                active: warehouse.active,
            });
        } else {
            setEditingWarehouse(null);
            setFormData({
                code: '',
                name: '',
                active: true,
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingWarehouse(null);
        setFormData({
            code: '',
            name: '',
            active: true,
        });
    };

    const handleSubmit = async () => {
        try {
            if (editingWarehouse) {
                await warehouseApi.updateWarehouse(editingWarehouse.id, formData);
            } else {
                await warehouseApi.createWarehouse(formData);
            }
            handleClose();
            loadWarehouses();
        } catch (error: any) {
            console.error('창고 저장에 실패했습니다:', error);
            alert(error.response?.data?.message || '창고 저장에 실패했습니다.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('정말로 이 창고를 삭제하시겠습니까?')) {
            try {
                await warehouseApi.deleteWarehouse(id);
                loadWarehouses();
            } catch (error: any) {
                console.error('창고 삭제에 실패했습니다:', error);
                alert(error.response?.data?.message || '창고 삭제에 실패했습니다.');
            }
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">창고 관리</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
                    새 창고
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>코드</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>생성일</TableCell>
                            <TableCell>수정일</TableCell>
                            <TableCell>작업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {warehouses.map(warehouse => (
                            <TableRow key={warehouse.id}>
                                <TableCell>{warehouse.code}</TableCell>
                                <TableCell>{warehouse.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={warehouse.active ? '활성' : '비활성'}
                                        color={warehouse.active ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(warehouse.createdDateTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {warehouse.updatedDateTime
                                        ? new Date(warehouse.updatedDateTime).toLocaleString()
                                        : '-'}
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleOpen(warehouse)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(warehouse.id)}
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
                <DialogTitle>{editingWarehouse ? '창고 수정' : '새 창고'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="코드"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            fullWidth
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
