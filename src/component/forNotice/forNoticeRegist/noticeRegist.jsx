import styled from 'styled-components';
import theme from '../../../style/theme';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import FileInput from '../../fileUpload';
import { savedData } from '../../../data.js';
import { message } from 'antd';

const NoticeRegist = () => {
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedDep, setSelectedDep] = useState('');
    const [writer, setWriter] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const data = savedData.noticeAdd
        if (data.selectedTag !== null) setSelectedTag(data.selectedTag);
        if (data.selectedDep !== null) setSelectedDep(data.selectedDep);
        if (data.writer !== null) setWriter(data.writer);
        if (data.title !== null) setTitle(data.title);
        if (data.content !== null) setContent(data.content);
        if (data.selectedFile !== null) setSelectedFile(data.selectedFile);
    }, []);

    const handleSubmitClick = () => {
        //console.log(finalId, "finalId 결과값"); 
    
        axios.post('http://146.56.98.153:8080/notice',
            {
                selectedTag: selectedTag,           
                selectedDep: selectedDep,  
                writer: writer,  
                title: title,
                content: content,
                selectedFile: selectedFile,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((result) => {
                if (result.status === 'done') {
                    message.success(`공지사항이 정상적으로 등록되었습니다.`);
                } 
            })
            .catch((error) => {
                message.error('공지사항이 정상적으로 등록되지 않았습니다.');
                console.log(error);
            })
        };

        const assigners = [];
        const SelectedTagHandler = (e) => {
            setSelectedTag(e.target.value);
            savedData.noticeAdd.selectedTag = e.target.value;
        };
        const SelectedDepHandler = (e) => {
            setSelectedDep(e.target.value);
            savedData.noticeAdd.selectedDep = e.target.value;
        };
        const WriterHandler = (e) => {
            setWriter(e.target.value);
            savedData.noticeAdd.writer = e.target.value;
        };
        const TitleHandler = (e) => {
            setTitle(e.target.value);
            savedData.noticeAdd.title = e.target.value;
        };
        const ContentHandler = (e) => {
            setContent(e.target.value);
            savedData.noticeAdd.content = e.target.value;
        };
        const SelectedFileHandler = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedFile(event.target.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };    

    const editorRef = useRef();

    return (
        <NoticeRegistContainer>
            <FlexBox>
                <Title>공지사항 등록</Title>
                <Btn onClick={handleSubmitClick}>등 록</Btn>
            </FlexBox>

            <FlexBox2>
                <SelectTagContainer>
                    <select value={selectedTag} onChange={SelectedTagHandler}>
                        <option value="기본">태그 선택</option>
                        <option value="서비스">서비스</option>
                        <option value="시스템">시스템</option>
                        <option value="행사">행사</option>
                    </select>
                </SelectTagContainer>

                <SelectTagContainer>
                    <select value={selectedDep} onChange={SelectedDepHandler}>
                        <option value="기본">부서 선택</option>
                        <option value="인사부">인사부</option>
                        <option value="회계부">회계부</option>
                        <option value="웹툰관리부">웹툰관리부</option>
                        <option value="개발부">개발부</option>
                        <option value="기타">기타</option>
                    </select>
                </SelectTagContainer>
                
                <InputWriter type="text" placeholder='작성자' value={writer} onChange={WriterHandler} />
            </FlexBox2>

            <InputTitle type="text" placeholder='제목을 입력해주세요.' value={title} onChange={TitleHandler} />

            <Editor
                value={content} 
                onChange={ContentHandler}
                onInit={ (evt, editor) => editorRef.current = editor }
                initialValue='내용을 입력하세요.'
                apiKey='f1xezzgkhg13spovg2f1h3yuong1qyb7aeaipvy78kq2srty'
                id='tinyMce_editor'
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
            <FileInput />
        </NoticeRegistContainer>
    )
};

export default NoticeRegist;

const NoticeRegistContainer = styled.div`
    margin-top: 40px;
    padding: 10px;
`;

const Title = styled.div`
    font-size: 30px;
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
    margin-bottom: 50px;
    justify-content: space-between;
`

const FlexBox2 = styled.div`
    display: flex;
    align-items: center;
`

const InputTitle = styled.input`
    width: 1200px; 
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

const SelectTagContainer = styled.div`
    margin-bottom: 10px;
    select {
        width: 160px;
        height: 40px;
        border-radius: 7px;
        border: 1px solid #bfbfbf;
        color: #898989;
        padding: 3px;
        margin-right: 30px;
    }
`;

const InputWriter = styled.input`
    width: 170px; 
    height: 38px;
    margin-bottom: 10px;
    border: 1px solid #bfbfbf;
    border-radius: 7px;
    padding-left: 10px;
    margin-right: 30px;
    font-size: 14px;
    &::placeholder {
        color: #898989;
    }
`