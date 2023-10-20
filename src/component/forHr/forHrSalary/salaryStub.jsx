import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import HorizonLine from '../../horizonLine';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const SalaryStub = () => {
    const [rowData, setRowData] = useState([]);

    // const rowData = [
    //     {급여월: '2023-02', '급여 지급일': '2023-02-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
    //     {급여월: '2023-03', '급여 지급일': '2023-03-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
    //     {급여월: '2023-04', '급여 지급일': '2023-04-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
    //     {급여월: '2023-05', '급여 지급일': '2023-05-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
    //     {급여월: '2023-06', '급여 지급일': '2023-06-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
    // ];

    const [columnDefs, setColumnDefs] = useState([
        {field: '급여월', sortable: true, filter: true, width: '150px'},
        {field: '급여 지급일', sortable: true, filter: true, width: '180px'},
        {field: '지급 합계', sortable: true, filter: true, width: '180px'},
        {field: '공제 후 지급액', sortable: true, filter: true, width: '180px'},
    ]);

    useEffect(() => {
        const userId = sessionStorage.getItem('employeeId');

        if(userId) {
            axios.get(`http://146.56.98.153:8080/pays/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setRowData(response.data);
                    console.log("response.data", response.data);
                } else {
                    message.error('데이터를 불러오는데 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('데이터를 불러오는데 실패했습니다.', error);
            });
        }
    }, []);

    return (
        <SalaryStubContainer>
            <Title>급여 명세서</Title>
            <HorizonLine />
            <SalaryStubGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='multiple'
                />
            </SalaryStubGrid>
        </SalaryStubContainer>
    )
};

export default SalaryStub;

const SalaryStubContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const SalaryStubGrid = styled.div`
    width: 720px;
    height: 300px;
`
