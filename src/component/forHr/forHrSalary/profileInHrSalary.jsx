import styled from 'styled-components';
import theme from '../../../style/theme';

const FakeProfileData = [
    {
        id: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        name: 'employee 1',
        dep: '인사부',
        rank: '사원',
        empId: 1234,
        joinDate: '2022-07-13',
        phone: '010-1234-1234',
        email: 'employee1@gmail.com',
        depPhone: '123-123',
        account: '12345-67-890',
    },
];

const ProfileInHrSalary = () => {
    return (
        <ProfileInHrSalaryContainer>
                    <ProfileImgContainer>
                        <Img src={FakeProfileData[0].imageUrl} alt={`${FakeProfileData[0].rank} ${FakeProfileData[0].name}의 프로필 사진`} />
                    </ProfileImgContainer>
                    <ProfileInfoContainer>
                        <ProfileInfoBox>사원명 <ProfileInfoData>{FakeProfileData[0].name}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>부서 <ProfileInfoData>{FakeProfileData[0].dep}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>직급 <ProfileInfoData>{FakeProfileData[0].rank}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>사원번호 <ProfileInfoData>{FakeProfileData[0].empId}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>입사일 <ProfileInfoData>{FakeProfileData[0].joinDate}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>휴대전화 <ProfileInfoData>{FakeProfileData[0].phone}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>이메일 <ProfileInfoData>{FakeProfileData[0].email}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>부서전화 <ProfileInfoData>{FakeProfileData[0].depPhone}</ProfileInfoData></ProfileInfoBox>
                        <ProfileInfoBox>지급계좌 <ProfileInfoData>{FakeProfileData[0].account}</ProfileInfoData></ProfileInfoBox>
                    </ProfileInfoContainer>
        </ProfileInHrSalaryContainer>
    )
};

export default ProfileInHrSalary;

const ProfileInHrSalaryContainer = styled.div`
    display: flex;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const ProfileImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
`;

const ProfileInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`
const ProfileInfoBox = styled.div`
    display: flex;
    margin: 10px;
`
const ProfileInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
`