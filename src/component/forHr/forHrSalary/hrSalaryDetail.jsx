import styled from 'styled-components';
import theme from '../../../style/theme';
import HorizonLine from '../../horizonLine';

const FakeSalData = [
    {
        id: 1,
        account: '국민은행 12345-67-890',
        anuSal: '36,000,000',
        monSal: '2,084,669',
        extraPay: '130,050',
        entitlementPay: '150,000',
    },
];

const HrSalaryDetail = () => {
    return (
        <HrSalaryDetailContainer>
            <Title>급여 상세</Title>
            <HorizonLine />
            <DetailContentContainer>
                <SalaryInfoBox>지급계좌 <SalaryInfoData>{FakeSalData[0].account}</SalaryInfoData></SalaryInfoBox>
                <SalaryInfoBox>연봉 <SalaryInfoData>{FakeSalData[0].anuSal}</SalaryInfoData></SalaryInfoBox>
                <SalaryInfoBox>월급 <SalaryInfoData>{FakeSalData[0].monSal}</SalaryInfoData></SalaryInfoBox>
                <SalaryInfoBox>추가수당 <SalaryInfoData>{FakeSalData[0].extraPay}</SalaryInfoData></SalaryInfoBox>
                <SalaryInfoBox>자격수당 <SalaryInfoData>{FakeSalData[0].entitlementPay}</SalaryInfoData></SalaryInfoBox>
            </DetailContentContainer>
        </HrSalaryDetailContainer>
    )
};

export default HrSalaryDetail;

const HrSalaryDetailContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const DetailContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 10px;
`;

const SalaryInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const SalaryInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
`