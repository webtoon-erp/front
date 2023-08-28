import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';

const PurchaseOrderView = () => {
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
        <PurchaseOrderContainer>
            <FlexBox>
                <Title>구매 품의서</Title>
                <Btn>요 청</Btn>
            </FlexBox>

            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`
                    <div>
                        <h2>제목: 구매 품의</h2>
                        <p>&nbsp;</p>
                        <h3>문서 종류: 구매 품의서</h3>
                        <p>&nbsp;</p>
                        <h3>1. 목적</h3>
                        <p>- </p>
                        <p>&nbsp;</p>
                        <h3>2. 내역</h3>
                        <p>- 사용 일자: 년 월 일 (요일)</p>
                        <p>- 사용자: </p>
                        <p>- 구매 비용: ₩ 원</p>
                        <p>- 업체: </p>
                        <p>- 상세 내역</p>
                        <table border="1" style="width: 800px;">
                            <tr>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">부서 코드</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">사용 부서</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">구매 장비 내역</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center;">수량</th>
                                <th style="background-color: rgb(236, 240, 241); text-align: center; width: 150px;">금액</th>
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
                            <tr>
                            <td style="background-color: rgb(251, 238, 184); text-align: center;" colspan="4">합계</td>
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
            <button onClick={log}>Log editor content</button>
        </PurchaseOrderContainer>
    )
};

export default PurchaseOrderView;

const PurchaseOrderContainer = styled.div`
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
    margin: 0px 15px 0px 840px;
    float: right;
`