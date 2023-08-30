import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { Radio, Select, Space } from 'antd';
import FileInput from '../../fileUpload';

const options = [];

for (let i = 10; i < 20; i++) {
    options.push({
        value: 'employee' + i,
        label: 'employee' + i,
    });
}

const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

const CorporateCardUsageView = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            editorRef.current.setContent('<p>전자결재</p>');
        }
    };

    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const TodayDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        setTodayDate(TodayDate);
    }, []);

    return (
        <CorporateCardUsageContainer>
            <FlexBox>
                <Title>법인카드 사용내역서</Title>
                <Btn>요 청</Btn>
            </FlexBox>

            <InputTitle placeholder='제목을 입력해주세요.'/>

            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`
                    <div>
                        <h3>문서 종류: 법인카드 사용내역서</h3>
                        <p>&nbsp;</p>
                        <h3>1. 사용자 현황</h3>
                        <table border="1" style="width: 1000px;">
                            <tr>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">사용 부서</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">사용자</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">카드 번호</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">월 사용계</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <p>&nbsp;</p>
                        <h3>2. 비용항목별 소계</h3>
                        <table border="1" style="width: 1000px;">
                            <tr>
                                <th style="background-color: rgb(236, 240, 241); text-align: center; width: 400px;">비용 항목</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">전표 건수</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">금액 소계</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <p>&nbsp;</p>
                        <h3>3. 사용 상세 현황</h3>
                        <table border="1" style="width: 1000px;">
                            <tr>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">사용 일자</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">비용 항목 / 상세</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">거래처</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">금액</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">비고</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <p>&nbsp;</p>
                        <p>위와 같이 상신하오니  검토 후 재가 바랍니다.</p>
                    </div>
                `}
                apiKey='gkyfnz48wo3yqa2iodxgl1skx1rebhsdsdl0g5a6rt3pk1k2'
                id='electropaymentRuqeust'
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'searchreplace',
                        'fullscreen',
                        'media',
                        'table',
                        'code',
                        'help',
                        'emoticons',
                        'codesample',
                        'quickbars',
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'lists table link charmap searchreplace | ' +
                    'image media codesample emoticons fullscreen preview | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
                <FlexBox2>
                    <SubH>결재자:</SubH>
                    <Space
                        direction="vertical"
                        style={{
                        width: '250px',
                        marginRight: '30px',
                        }}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                            options={options}
                        />
                    </Space>
                    <SubH>참조자:</SubH>
                    <Space
                        direction="vertical"
                        style={{
                        width: '250px',
                        }}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                            options={options}
                        />
                    </Space>
                </FlexBox2>

                <FileInput />
            {/* <button onClick={log}>Log editor content</button> */}
        </CorporateCardUsageContainer>
    )
};

export default CorporateCardUsageView;

const CorporateCardUsageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 40px;
    margin-left: 40px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
`;

const FlexBox = styled.div`
    display: flex;
`

const FlexBox2 = styled.div`
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
`

const Btn = styled.button`
    width: 90px;
    height: 40px;
    background-color: ${theme.colors.btn};
    border: none;
    color: ${theme.colors.white};
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
    margin: 0px 15px 0px 720px;
    float: right;
`

const InputTitle = styled.input`
    width: 1080px; 
    height: 40px;
    margin-bottom: 10px;
    border: 2px solid #EEEEEE;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14px;
    &::placeholder {
        color: #C3C3C3;
        font-size: 14px;
    }
`

const SubH = styled.h4`
    margin: 5px 20px 0px 0px;
`