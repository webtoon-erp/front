import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

const ViewList = () => {

    const rowData = [
        {제목: 'title1', 요청자: 'employee1', 납기일: '2023-06-15', 승인자: 'employee3', 상태: '승인'},
        {제목: 'title2', 요청자: 'employee2', 납기일: '2023-06-30', 승인자: 'employee3', 상태: '승인'},
        {제목: 'title3', 요청자: 'employee3', 납기일: '2023-07-03', 승인자: 'employee2', 상태: '승인'},
        {제목: 'title4', 요청자: 'employee4', 납기일: '2023-07-14', 승인자: '', 상태: '대기'},
    ];

    const columnDefs = [
        {field: '제목', sortable: true, filter: true},
        {field: '요청자', sortable: true, filter: true},
        {field: '납기일', sortable: true, filter: true},
        {field: '승인자', sortable: true, filter: true},
        {
            field: '상태',
            sortable: true,
            filter: true,
            cellStyle: params=> {
                if(params.value === '승인' ) {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                }else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
            }
        },
    ];
    
    return(
        <ViewListContainer>
            <RequestListGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='multiple'
                    domLayout= 'autoHeight'
                    pagination= {true}
                    paginationPageSize= '10'
                />
            </RequestListGrid>
        </ViewListContainer>
    );
};
export default ViewList;

const ViewListContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const RequestListGrid = styled.div`
    width: auto;
    height: auto;
    overflow: hidden;
`

// 추후 ag-grid에 적용 가능할 시 사용
// const StateBox = styled.div`
//     width: 20px;
//     height: 15px;
//     border-radius: 50px;
//     background-color: #91CDF2;
//     color: ${theme.colors.white};
//     box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
//     text-align: center;
// `
