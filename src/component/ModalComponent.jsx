import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { savedData } from '../data.js';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Modal, Button, message } from 'antd';

const ModalComponent = ({ selectedRefId: propSelectedRefId, onChange }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowData, setRowData] = useState('');
    const [selectedRefId, setSelectedReferrer] = useState(propSelectedRefId);

    const gridRef = useRef(null);

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    useEffect(() => {
        axios
            .get('http://146.56.98.153:8080/plas/approvers', {
                headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                setRowData(response.data);
                }
            })
            .catch((error) => {
                message.error('데이터를 불러오는데 실패했습니다.');
            });
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {headerName: '이름', field: 'name', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {headerName: '부서', field: 'deptName', sortable: true, filter: true},
        {headerName: '팀번호', field: 'teamNum', sortable: true, filter: true},
        {headerName: '직급', field: 'position', sortable: true, filter: true},
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
            cellDataType: false,
        };
    }, []);

    const referrers = [];

    const SelectReferrerhandler = (value) => {
        setSelectedReferrer(value);
        onChange(value);
    };

    const onRowSelected = useCallback((event) => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        if (selectedRows.length === 1) {
            setSelectedReferrer(selectedRows[0].employeeId);
            setModalOpen(false);
            onChange(selectedRows[0].employeeId);
            savedData.elecReq.selectedRefAssigner = selectedRows[0].employeeId
        } 
    }, [onChange]);

    return(
        <ModalContainer>
            <FileTitle>참조자</FileTitle><Div/>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                {selectedRefId ? selectedRefId : '참조자'}
            </Button>
                <Modal
                    title='참조자'
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <GridContainer> 
                        <div style={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                            <div>{[referrers]}</div>
                            <div style={{ flexGrow: '1' }}>
                                <div style={gridStyle} className="ag-theme-alpine">
                                    <AgGridReact
                                        ref={gridRef}
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        defaultColDef={defaultColDef}
                                        rowSelection={'single'}
                                        animateRows={true}
                                        onRowSelected={onRowSelected}
                                    />
                                </div>
                            </div>
                        </div>
                    </GridContainer>
                </Modal>
        </ModalContainer>
    );
};

export default ModalComponent;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-right: 20px;
`;

const GridContainer = styled.div`
    width: 400px;
    height: 100px;
`

const FileTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding-top: 5px;
    padding-right: 15px;
`;

const Div = styled.div`
    padding: 8px;
`;