import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import $ from 'jquery';

class LoginForm extends Component {
    submitClick = (e) => {
        this.email_val = $('#email_val').val();
        this.pwd_val = $('#pwd_val').val();
        if(this.email_val === '' || this.pwd_val === ''){
            this.sweetalert('이메일과 비밀번호를 확인해주세요.', '', 'info', '닫기')
        }else{
            axios.post('/api/LoginForm?type=signin', {
                is_Email: this.email_val,
                is_Password: this.pwd_val
            })
            .then( response => {
                var userid = response.data.json[0].useremail
                var username = response.data.json[0].username
                var upw = response.data.json[0].userpassword
                
                if(userid != null && userid != ''){
                    this.sweetalert('로그인 되었습니다.', '', 'info', '닫기')

                    setTimeout(function() {
                        window.location.href = '/SoftwareList';
                    }.bind(this),1000);
                }else{
                    this.sweetalert('이메일과 비밀번호를 확인해주세요.', '', 'info', '닫기')
                }
            })
            .catch( error => {this.sweetalert('이메일과 비밀번호를 확인해주세요.', '', 'info', '닫기')} );
        }
    }

    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    render () {
        return (
            <section className="main">
                <div className="m_login">
                <h3><span><img src={require("../img/main/log_img.png")} alt="" />
                </span>LOGIN</h3>
                <div className="log_box">
                    <div className="in_ty1">
                        <span><img src={require("../img/main/m_log_i3.png")} alt="" /></span>
                        <input type="text" id="email_val" placeholder="이메일" />
                    </div>
                    <div  className="in_ty1">
                        <span className="ic_2">
                            <img src={require("../img/main/m_log_i2.png")} alt="" />
                        </span>
                        <input type="password" id="pwd_val" placeholder="비밀번호" />
                    </div>
                    <ul className="af">
                        <li><Link to={'/register'}>회원가입</Link></li>
                        <li className="pwr_b"><a href="#n">비밀번호 재설정</a></li>
                    </ul>
                    <div className="s_bt" type="" onClick={(e) => this.submitClick(e)}>로그인</div>
                </div>
                </div>
            </section>
        );
    }
}

export default LoginForm;