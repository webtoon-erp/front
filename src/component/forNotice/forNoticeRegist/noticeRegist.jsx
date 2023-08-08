import styled from 'styled-components';
import theme from '../../../style/theme';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const NoticeRegist = () => {
    const editorRef = useRef();

    function onClickHandler() {
        console.log(editorRef.current.getContent());
    }

    return (
        <NoticeRegistContainer>
            <FlexBox>
                <Title>공지사항 등록</Title>
                <Btn onClick={onClickHandler}>등 록</Btn>
            </FlexBox>
            
            <Editor
                onInit={ (evt, editor) => editorRef.current = editor }
                initialValue='글을 입력하세요.'
                apiKey='f1xezzgkhg13spovg2f1h3yuong1qyb7aeaipvy78kq2srty'
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </NoticeRegistContainer>
    )
};

export default NoticeRegist;

const NoticeRegistContainer = styled.div`
    margin-top: 120px;
    padding: 10px;
`;

const Title = styled.div`
    font-size: 30px;
    margin-left: 10px;
    font-weight: bold;
`;

const Btn = styled.button`
    width: 100px;
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
    margin: 0px 15px 0px 15px;
`

const FlexBox = styled.div`
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
`