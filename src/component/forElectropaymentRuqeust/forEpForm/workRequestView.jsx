import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';

const WorkRequestView = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            editorRef.current.setContent('<p>전자결재</p>');
        }
    };

    return (
        <WorkRequestContainer>
            <FlexBox>
                <Title>연장/휴일근무 신청서</Title>
                <Btn>요 청</Btn>
            </FlexBox>

            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`
                    <div>
                        <h2>제목: 연장/휴일근무 신청</h2>
                        <p>&nbsp;</p>
                        <h3>문서 종류: 연장/휴일근무 신청서</h3>
                        <p>&nbsp;</p>
                        <table style="border-collapse: collapse; width: 100%; height: 141.297px; border-style: solid; margin-left: auto; margin-right: auto;" border="2" width="650">
                            <tbody>
                                <tr style="height: 16.7969px;">
                                    <td style="height: 16.7969px; width: 265.708%; text-align: center;" colspan="9" width="760"><strong>신&nbsp; 청&nbsp; 내&nbsp; 역</strong></td>
                                </tr>
                                <tr style="height: 17.7812px;">
                                    <td style="height: 17.7812px; width: 22.5612%; text-align: center;" colspan="2"><strong>소&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 속</strong></td>
                                    <td style="height: 17.7812px; width: 23.4548%; text-align: center;" colspan="2"><strong></strong></td>
                                    <td style="height: 17.7812px; width: 20.9192%; text-align: center;" colspan="2"><strong>직&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 급</strong></td>
                                    <td style="height: 17.7812px; width: 198.773%; text-align: center;" colspan="3"><strong></strong></td>
                                </tr>
                                <tr style="height: 17.7812px;">
                                    <td style="height: 17.7812px; width: 22.5612%; text-align: center;" colspan="2"><strong>연&nbsp; &nbsp; &nbsp; &nbsp;락&nbsp; &nbsp; &nbsp; &nbsp;처</strong></td>
                                    <td style="height: 17.7812px; width: 23.4548%; text-align: center;" colspan="2"><strong></strong></td>
                                    <td style="height: 17.7812px; width: 20.9192%; text-align: center;" colspan="2"><strong>성&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 명</strong></td>
                                    <td style="height: 17.7812px; width: 198.773%; text-align: center;" colspan="3"><strong></strong></td>
                                </tr>
                                <tr style="height: 17.7812px;">
                                    <td style="height: 17.7812px; width: 22.5612%; text-align: center;" colspan="2"><strong>근&nbsp; 무&nbsp; 예&nbsp; 정&nbsp; 일</strong></td>
                                    <td style="height: 17.7812px; width: 243.147%; text-align: center;" colspan="7"><strong>년&nbsp; &nbsp; &nbsp;월&nbsp; &nbsp; &nbsp; 일</strong></td>
                                </tr>
                                <tr style="height: 35.5938px;">
                                    <td style="height: 35.5938px; width: 22.5612%; text-align: center;" colspan="2"><strong>연 장 근 무 시 간</strong></td>
                                    <td style="height: 35.5938px; width: 13.7876%; text-align: center;"><strong>시작시간</strong></td>
                                    <td style="height: 35.5938px; width: 9.66719%; text-align: center;"><strong>00:00</strong></td>
                                    <td style="height: 35.5938px; width: 13.7876%; text-align: center;"><strong>종료시간</strong></td>
                                    <td style="height: 35.5938px; width: 7.13154%; text-align: center;"><strong>00:00</strong></td>
                                    <td style="height: 35.5938px; width: 16.3233%; text-align: center;"><strong>실근무시간</strong></td>
                                    <td style="height: 35.5938px; width: 182.45%; text-align: center;" colspan="2"><strong>(  ) 시간</strong></td>
                                </tr>
                                <tr style="height: 17.7812px;">
                                    <td style="height: 17.7812px; width: 22.5612%; text-align: center;" colspan="2"><strong>사&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 유</strong></td>
                                    <td style="height: 17.7812px; width: 243.147%; text-align: center;" colspan="7"><strong></strong></td>
                                </tr>
                                <tr style="height: 17.7812px;">
                                    <td style="height: 17.7812px; width: 22.5612%; text-align: center;" colspan="2"><strong>업&nbsp; &nbsp; 무&nbsp; &nbsp; 내&nbsp; &nbsp; 용</strong></td>
                                    <td style="height: 17.7812px; width: 243.147%; text-align: center;" colspan="7"><strong></strong></td>
                                </tr>
                            </tbody>
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
        </WorkRequestContainer>
    )
};

export default WorkRequestView;

const WorkRequestContainer = styled.div`
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
    margin: 0px 15px 0px 710px;
    float: right;
`