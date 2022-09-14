import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import $ from 'jquery';
import axios from 'axios';

const GetParams = () => {
    let { email,token } = useParams();
    token = token.replace(/가/gi, "/");
    return (
        <>
            <input type="hidden" id="is_Useremail" name="is_Useremail" value={email}/>
            <input type="hidden" id="is_Token" name="is_Token" value={token}/>
        </>
    )
}

const PwChangeButton = () => {

    const navigate = useNavigate();

    function fnValidate(e) {
        var pattern1 = /[0-9]/;
        var pattern2 = /[a-zA-Z]/;
        var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;

        let pwd_val_checker = $('#pwd_val').val();
        let pwd_cnf_val_checker = $('#pwd_cnf_val').val();

        if(pwd_val_checker ==='') {
            $('#pwd_val').addClass('border_validate_err');
            sweetalert('비밀번호를 입력해주세요.', '', 'info', '닫기')
            return false;
        }
        if(pwd_val_checker !='') {
            var str = pwd_val_checker;
            if(str.search(/\s/) != -1) {
                $('#pwd_val').addClass('border_validate_err');
                sweetalert('비밀번호 공백을 제거해 주세요.', '', 'info', '닫기')
                return false;
            } 
            if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str)
            || str.length < 8 || str.length > 16) {
                $('#pwd_val').addClass('border_validate_err');
                sweetalert('8~16자 영문 대 소문자, 숫자\n 특수문자를 사용하세요.', '', 'info', '닫기')
                return false; 
            } 
        }
        $('#pwd_val').removeClass('border_validate_err');

        if(pwd_cnf_val_checker ==='') {
            $('#pwd_cnf_val').addClass('border_validate_err');
            sweetalert('비밀번호 확인을 입력해주세요.', '', 'info', '닫기')
            return false;
        }
        if(pwd_val_checker != pwd_cnf_val_checker) {
            $('#pwd_val').addClass('border_validate_err');
            $('#pwd_cnf_val').addClass('border_validate_err');
            sweetalert('비밀번호가 일치하지 않습니다.', '', 'info', '닫기')
            return false;
        }
        $('#pwd_cnf_val').removeClass('border_validate_err');
        return true;
    }

    async function submitClick(e) {
        if(fnValidate()){
            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
            Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";
            // console.log(Json_form)
            try {
                const response = await fetch('/api/register?type=pwdmodify', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: Json_form,
                });
                const body = await response.text();
                if(body == "succ"){
                    Swal.fire({
                        title : '비밀번호 수정이 완료됐습니다.',
                        icon : 'success',
                        cancelButtonText:'확인'
                    }).then(() => {
                        navigate('/');
                    })
                }else{
                    sweetalert('작업 중 오류가 발생하였습니다.', '', 'error', '닫기')
                }  
            } catch (error) {
                sweetalert('작업 중 오류가 발생하였습니다.', error, 'error', '닫기')
            }
        }
    };

    function sweetalert(title, contents, icon, confirmButtonText) {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    return (
        <a href="#n" className="bt_ty bt_ty_m bt_ty2 submit_ty1" onClick={(e) => submitClick(e)}>재설정</a>
    )
}

class PwChangeForm extends Component {
    constructor (props) {
    super(props);
        this.state = {
        }
    }

    componentDidMount() {
        axios.post('/api/LoginForm?type=emailtoken',{
            is_Email : $('#is_Useremail').val(),
            is_Token : $('#is_Token').val()
        }).then(
            res => {
                if (res.data.json[0].username == undefined) {
                    window.location.replace('about:blank')
                }
            }
        ).catch(error => {
            window.location.replace('about:blank')
        })
    }

    render () {
        return (
            <>
                <section className="main">
                    <div className="m_login">
                    <h3 className="pw_ls">비밀번호 재설정 <span className="compl1">완료</span></h3>
                        <form method="post" name="frm" action="">
                            <GetParams/>
                            <div className="log_box">
                                <div className="in_ty1">
                                    <span className="ic_2">
                                        <img src={require("../../img/main/m_log_i2.png")} alt="" />
                                    </span>
                                    <input type="password" id="pwd_val"
                                    name="is_Password" placeholder="새 비밀번호" />
                                    </div>
                                    <div className="in_ty1">
                                    <span className="ic_2">
                                        <img src={require("../../img/main/m_log_i2.png")} alt="" />
                                    </span>
                                    <input type="password" id="pwd_cnf_val"
                                    name="is_Password" placeholder="새 비밀번호 확인" />
                                    </div>
                                    <div className="btn_confirm btn_confirm_m">
                                    <Link to={'/'}>
                                        <div className="bt_ty bt_ty_m bt_ty1 cancel_ty1">취소</div>
                                    </Link>
                                    <PwChangeButton/>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </>
        );
    }
}

export default PwChangeForm;