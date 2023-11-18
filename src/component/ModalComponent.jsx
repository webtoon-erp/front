import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Modal, Button } from 'antd';

const ModalComponent = ({ modal }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    return(
        <ModalContainer>
            <FileTitle>{modal?.title}</FileTitle><Div/>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                {modal?.selectedId ? modal?.selectedId : modal?.title}
            </Button>
                <Modal
                    title={modal?.title}
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <GridContainer> 
                        <div style={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                            <div>{[modal?.assigners]}</div>
                            <div style={{ flexGrow: '1' }}>
                                <div style={gridStyle} className="ag-theme-alpine">
                                    <AgGridReact
                                        ref={modal?.ref}
                                        rowData={modal?.rowData}
                                        columnDefs={modal?.columnDefs}
                                        defaultColDef={modal?.defaultColDef}
                                        rowSelection={'single'}
                                        animateRows={true}
                                        onRowSelected={modal?.onRowSelected}
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