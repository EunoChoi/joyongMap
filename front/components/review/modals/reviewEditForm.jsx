import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import Load_Filtered from '../functions/Load_Filtered'
import Load_AllReview from '../functions/Load_AllReview'
import FormContent from "./modalStyles/reviewForm.style";
import OuterModal from "./modalStyles/outerModalStyle1";
import { SmallBtn } from '../../../styles/btnStyles';

const ReviewEditForm = ({ currentReview, closeIsEditing, editDongInfo, reviewType, currentState, more, setList, setReviewCnt, reviewCnt, setAvgIdx, lv}) => {

    
    const [review, setReview] = useState({
        guId: currentReview.guId,
        dongId: currentReview.dongId,
        title: currentReview.title,
        description: currentReview.description,
        noiseLevel: currentReview.noiseLevel,
    });

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const reviewId = currentReview._id;
        // PUT
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${reviewId}`, review);
            closeIsEditing();
            try{
                // GET
                if(reviewType=='default'){
                    Load_AllReview(
                        currentState, more, setList, setReviewCnt, reviewCnt, setAvgIdx)
                }
                if(reviewType=='filter'){
                    Load_Filtered(
                        currentState, more, setList, setReviewCnt, reviewCnt, setAvgIdx, lv)
                }
            }
            catch{
                console.log('수정 이후 get 오류')
            }
        } catch (e) {
            console.log("수정 오류", e);
        }
    }

    // modal off (when get out of modal)
    const modalRef = useRef();
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeIsEditing();
        }
    };
    
    return (
        <>
            <OuterModal></OuterModal>
            <FormContent ref={ modalRef } onChange={ handleReviewChange }>
                <div className="formCon">
                    <form onSubmit={ handleUpdateSubmit }>
                        <h3>소음 리뷰 <span>수정하기</span></h3>
                        <div className="content">
                            <p className="title">지역 선택을 선택해주세요.</p>
                            <div className="selectBox">
                                <select name="guId" disabled={ review.guId }>
                                    <option value={review.guId}>{editDongInfo.guName}</option>
                                </select>
                                <select name="dongId" id="" disabled={ review.dongId }>
                                    <option value={review.dongId}>{editDongInfo.name}</option>
                                </select>
                            </div>
                        </div>

                        <div className="content">
                            <p className="title">소음에 대한 상세 설명을 작성해주세요.</p>
                            <div className="inputBox">
                                <input
                                    type="text"
                                    placeholder="제목을 입력해 주세요."
                                    name="title"
                                    value={review.title}
                                />

                                <textarea 
                                    name="description"
                                    value={review.description}
                                    placeholder="내용을 입력해주세요."
                                ></textarea>
                            </div>
                        </div>
                        <br></br>

                        <div className="content">
                            <p className="title">내가 느낀 소음은 어느 정도였나요?</p>

                            <ul className="radioBox"> 
                                <li className="good">
                                    <input id="good" type="radio" name="noiseLevel" value='3' />
                                    <label for="good">좋음</label>
                                    <p>좋음</p>
                                </li>
                                <li className="soso">
                                    <input id="soso" type="radio" name="noiseLevel" value='2' />
                                    <label for='soso'>보통</label>
                                    <p>보통</p>
                                </li>
                                <li className="bad">
                                    <input id="bad" type="radio" name="noiseLevel" value='1' />
                                    <label for='bad'>나쁨</label>
                                    <p>나쁨</p>
                                </li>
                            </ul>
                        </div>

                        <div className="btnBox content">
                            <SmallBtn onClick={ closeIsEditing }>취소</SmallBtn>
                            <SmallBtn type="submit" check='yes'>확인</SmallBtn>
                        </div>
                    </form>
                </div>
            </FormContent>
        </>
    )

}

export default ReviewEditForm;
