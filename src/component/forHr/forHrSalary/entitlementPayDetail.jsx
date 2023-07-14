import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import HorizonLine from '../../horizonLine';

const EntitlementPayDetail = () => {
    const rowData = [
        {'자격증 명': '정보처리기사', 지급액: '150,000'},
    ];

    const columnDefs = [
        {field: '자격증 명'},
        {field: '지급액'},
    ];

    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, []);

    return (
        <EntitlementPayDetailContainer>
            <Title>자격수당 상세</Title>
            <HorizonLine />
            <EntitlementPayGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='multiple'
                />
            </EntitlementPayGrid>
        </EntitlementPayDetailContainer>
        
    )
};

export default EntitlementPayDetail;

const EntitlementPayDetailContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const EntitlementPayGrid = styled.div`
    width: 405px;
    height: 261px;
`