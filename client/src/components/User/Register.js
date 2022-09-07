import React, { Component } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import $ from 'jquery';

const SubmitButton = () => {
    const navigate = useNavigate();

    async function submitClick(type, e) {
        console.log(type);
        fnSignInsert(type, e);
    }

    function sweetalert(title, contents, icon, confirmButtonText) {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
        });
    }

    async function fnSignInsert(type, e) {
        var jsonstr = $("form[name='frm']").serialize();
        jsonstr = decodeURIComponent(jsonstr);
        var Json_form = JSON.stringify(jsonstr).replace(/\"/gi, '');
        Json_form = "{\"" + Json_form.replace(/\&/g, '\",\"').replace(/=/gi, '\":"') + "\"}";
        console.log(Json_form);
        try {
            const response = await fetch('/api/register?type=' + type, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: Json_form,
            });
            const body = await response.text();
            console.log(body);
            if (body === "succ") {
                Swal.fire({
                    title: '회원가입이 완료되었습니다.',
                    icon: 'info',
                    confirmButtonText: '닫기'
                }).then(() => {
                    navigate('/');
                });
            } else {
                sweetalert('작업중 오류가 발생하였습니다.', body, 'error', '닫기');
            }
        } catch (error) {
            sweetalert('작업중 오류가 발생하였습니다.', error, 'error', '닫기');
        }
    }

    return (
        <div className="btn_confirm">
            <div className="bt_ty bt_ty2 submit_ty1" onClick={(e) => submitClick('signup', e)}>회원가입</div>
        </div>
    )
}

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    render () {
        return (
            <div>
                <section className="sub_wrap" >
                    <article className="s_cnt re_1 ct1">
                        <div className="li_top">
                            <h2 className="s_tit1">회원가입</h2>
                            <form method="post" name="frm">
                                <div className="re1_wrap">
                                    <div className="re_cnt ct2">
                                        <table className="table_ty1">
                                            <tbody>
                                                <tr className="re_email">
                                                    <th>이메일</th>
                                                    <td>
                                                        <input id="email_val" type="text" name="is_Useremail1"
                                                        placeholder="이메일을 입력해주세요." onKeyPress={() => {}}/>
                                                        <span className="e_goll">@</span>
                                                        <select id="email2_val" name="is_Useremail2" className="select_ty1">
                                                                <option value="">선택하세요</option>
                                                                <option value='naver.com'>naver.com</option>
                                                                <option value='hanmail.net'>hanmail.net</option>
                                                                <option value='nate.com'>nate.com</option>
                                                                <option value='hotmail.com'>hotmail.com</option>
                                                                <option value='gmail.com'>gmail.com</option>
                                                                <option value='yahoo.co.kr'>yahoo.co.kr</option>
                                                                <option value='yahoo.com'>yahoo.com</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>비밀번호</th>
                                                    <td>
                                                        <input id="pwd_val" type="password" name="is_Password"
                                                        placeholder="비밀번호를 입력해주세요." onKeyPress={() => {}} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>비밀번호 확인</th>
                                                    <td>
                                                        <input id="pwd_cnf_val" type="password" name="is_Password"
                                                        placeholder="비밀번호를 다시 입력해주세요." onKeyPress={() => {}}/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>성명</th>
                                                    <td>
                                                        <input id="name_val" type="text" name="is_Username"
                                                        placeholder="성명을 입력해주세요." onKeyPress={() => {}}/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>소속 기관</th>
                                                    <td>
                                                        <input id="org_val" type="text" name="is_Organization"
                                                        placeholder="소속 기관명을 입력해주세요." />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>전공</th>
                                                    <td>
                                                        <input id="major_val" type="text" name="is_Usermajor"
                                                        placeholder="전공을 입력해주세요." />
                                                    </td>
                                                </tr>
                                                <tr className="tr_tel">
                                                    <th>핸드폰</th>
                                                    <td>
                                                        <select id="phone1_val" name="is_Userphone1" className="select_ty1">
                                                            <option value="">선택</option>
                                                            <option value="010">010</option>
                                                            <option value="011">011</option>
                                                            <option value="016">016</option>
                                                            <option value="017">017</option>
                                                            <option value="018">018</option>
                                                            <option value="019">019</option>
                                                        </select>
                                                        <span className="tel_dot">-</span>
                                                        <input id="phone2_val" name="is_Userphone2" max="9999"
                                                        maxLength="4" onChange={() => {}}/>
                                                        <span className="tel_dot">-</span>
                                                        <input id="phone3_val" name="is_Userphone3" max="9999"
                                                        maxLength="4" onChange={() => {}}/>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <SubmitButton/>
                            </form>
                        </div>
                    </article>
                </section>
            </div>
        );
    }
}

export default Register;