import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import axios from 'axios';
import cookie from 'react-cookies';

class SoftwareView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile : null
        }
    }

    componentDidMount() {
        this.loginCheck();
    }

    loginCheck = async() => {
        axios.post('/api/LoginForm?type=SessionConfirm',{
            token1: cookie.load('userid'),
            token2: cookie.load('username')
        }).then( res => {
            let password = cookie.load('userpassword');
            if (password !== undefined) {
                axios.post('/api/LoginForm?type=SessionSignin',{
                    is_Email:res.data.token1,
                    is_Token: password
                }).then (response => {
                    if (response.data.json[0].useremail === undefined) {
                        this.noPermission();
                    }
                }).catch (response => {this.noPermission()})
            } else {
                this.noPermission();
            }
        }).catch (res => {this.noPermission()});
    }

    noPermission = (e) => {
        if (window.location.hash != 'nocookie') {
            this.remove_cookie();
            window.location.href ='/login/#nocookie'
        }
    }

    remove_cookie = (e) => {
        cookie.remove('userid', {path:'/'})
        cookie.remove('username', {path:'/'})
        cookie.remove('userpassword', {path:'/'})
    }

    submitClick = async (type, e) => {

        this.Swt_toolname_checker = $('#is_Swt_toolname').val();
        this.Swt_demo_site_checker = $('#is_Swt_demo_site').val();
        this.Giturl_checker = $('#is_Giturl').val();
        this.Comments_checker = $('#is_Comments').val();
        this.Swt_function_checker = $('#is_Swt_function').val();

        this.fnValidate = (e) => {
            if(this.Swt_toolname_checker === '') {
                $('#is_Swt_toolname').addClass('border_validate_err');
                alert('??? ????????? ?????? ??????????????????.')
                return false;
            }
            $('#is_Swt_toolname').removeClass('border_validate_err');

            if(this.Swt_demo_site_checker === '') {
                $('#is_Swt_demo_site').addClass('border_validate_err');
                alert('?????? URL??? ?????? ??????????????????.')
                return false;
            }
            $('#is_Swt_demo_site').removeClass('border_validate_err');

            if(this.Giturl_checker === '') {
                $('#is_Giturl').addClass('border_validate_err');
                alert('Github URL??? ?????? ??????????????????.')
                return false;
            }
            $('#is_Giturl').removeClass('border_validate_err');

            if(this.Comments_checker === '') {
                $('#is_Comments').addClass('border_validate_err');
                alert('????????? ?????? ??????????????????.')
                return false;
            }
            $('#is_Comments').removeClass('border_validate_err');

            if(this.Swt_function_checker === '') {
                $('#is_Swt_function').addClass('border_validate_err');
                alert('??????????????? ?????? ??????????????????.')
                return false;
            }
            $('#is_Swt_function').removeClass('border_validate_err');
            return true;
        }

        if(this.fnValidate()){
            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
            Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";
        
            try {
                const response = await fetch('/api/Swtool?type='+type, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: Json_form,
                });
                const body = await response.text();
                if(body == "succ"){
                    if(type == 'save'){
                        this.sweetalertSucc('Software Tools ????????? ?????????????????????.', false)
                    }
                    setTimeout(function() {
                        this.props.history.push('/SoftwareList');
                        }.bind(this),1500
                    );
                }else{
                    alert('????????? ????????? ?????????????????????.')
                }  
            } catch (error) {
                alert('????????? ????????? ?????????????????????.')
            }
        }
    };

    sweetalertSucc = (title, showConfirmButton) => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: title,
            showConfirmButton: showConfirmButton,
            timer: 1000
        })
    }

    handleFileInput(type, e) {
        if (type == 'file') {
            $('#imagefile').val(e.target.files[0].name)
        } else if (type == 'file2') {
            $('#imagefile2').val(e.target.files[0].name)
        } else if (type == 'manual') {
            $('#manualfile').val(e.target.files[0].name)
        }
        this.setState({
            selectedFile : e.target.files[0]
        })
        setTimeout(function() {
            if (type == 'manual') {
                this.handlePostManual();
            } else {
                this.handlePostImage(type);
            }
        }.bind(this),1);
    }

    handlePostManual() {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        return axios.post("/api/upload?type=uploads/swmanual/",formData)
        .then(res => {
            $('is_ManualName').remove()
            $('#upload_manual').prepend('<input id="is_ManualName" type = "hidden" name = "is_ManualName" value = "/swmanual/'+res.data.filename+'"/>')
        }).catch(error => {
            alert('?????? ??? ????????? ??????????????????.',error,'error','??????');
        })
    }

    handlePostImage(type) {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        return axios.post("/api/upload?type=uploads/image/",formData)
        .then(res => {
            console.log(type);
            console.log(res);
            if(type =='file'){
                $('#is_MainImg').remove()
                $('#uploadimg').remove()
                $('#upload_img').prepend('<img id="uploadimg" src="/image/'
                +res.data.filename+'"/>')
                $('#upload_img').prepend('<input id="is_MainImg" type="hidden"'
                +'name="is_MainImg" value="/image/'+res.data.filename+'"/>')
            }else if(type =='file2'){
                $('#is_LabelImg').remove()
                $('#uploadimg2').remove()
                $('#upload_img2').prepend('<img id="uploadimg2" src="/image/'
                +res.data.filename+'"/>')
                $('#upload_img2').prepend('<input id="is_LabelImg" type="hidden"'
                +'name="is_LabelImg" value="/image/'+res.data.filename+'"/>')
            }
        }).catch(error => {
            alert('?????? ??? ????????? ??????????????????.',error,'error','??????');
        })
    }   

    render () {
        return (
            <section className="sub_wrap">
                <article className="s_cnt mp_pro_li ct1">
                    <div className="li_top">
                        <h2 className="s_tit1">Software Tools ??????/??????</h2>
                    </div>
                    <div className="bo_w re1_wrap re1_wrap_writer">
                        <form name="frm" id="frm" action="" method="post" >
                            <input id="is_Swtcode" type="hidden" name="is_Swtcode" />
                            <input id="is_Email" type="hidden" name="is_Email" value="guest" />
                            <article className="res_w">
                                <p className="ment" style={{"textAlign": "right"}}>
                                    <span className="red">(*)</span>????????? ?????????????????? ?????????.
                                </p>
                                <div className="tb_outline">
                                    <table className="table_ty1">
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label htmlFor="is_Swt_toolname">??? ??????<span className="red">(*)</span></label>
                                                </th>
                                                <td>
                                                    <input type="text" name="is_Swt_toolname" id="is_Swt_toolname" className="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label htmlFor="is_Swt_demo_site">?????? URL<span className="red">(*)</span></label>
                                                </th>
                                                <td>
                                                    <input type="text" name="is_Swt_demo_site" id="is_Swt_demo_site" className="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label htmlFor="is_Giturl">Github URL<span className="red">(*)</span></label>
                                                </th>
                                                <td>
                                                    <input type="text" name="is_Giturl" id="is_Giturl" className="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label htmlFor="is_Comments">??????<span className="red">(*)</span></label>
                                                </th>
                                                <td>
                                                    <textarea name="is_Comments" id="is_Comments" rows="" cols=""></textarea>
                                                </td>
                                            </tr>
                                            <tr className="div_tb_tr fileb">
                                                <th>
                                                    ????????? ?????? #1
                                                </th>
                                                <td className="fileBox fileBox_w1">
                                                    <label htmlFor="uploadBtn1" className="btn_file">????????????</label>
                                                    <input type="text" id="manualfile" className="fileName fileName1" readOnly="readOnly" placeholder="????????? ?????? ??????"/>
                                                    <input type="file" id="uploadBtn1" className="uploadBtn uploadBtn1" onChange={e => this.handleFileInput('manual',e)}/>	
                                                    <div id="upload_manual">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    ?????? ?????????
                                                </th>
                                                <td className="fileBox fileBox1">
                                                    <label htmlFor='imageSelect' className="btn_file">????????????</label>
                                                    <input type="text" id="imagefile" className="fileName fileName1" readOnly="readonly" placeholder="????????? ?????? ??????"/>
                                                    <input type="file" id="imageSelect" className="uploadBtn uploadBtn1" onChange={e => this.handleFileInput('file',e)}/>
                                                    <div id="upload_img">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    ?????? ?????????
                                                </th>
                                                <td className="fileBox fileBox2">
                                                    <label htmlFor='imageSelect2' className="btn_file">????????????</label>
                                                    <input type="text" id="imagefile2" className="fileName fileName1" readOnly="readOnly" placeholder="????????? ?????? ??????"/>
                                                    <input type="file" id="imageSelect2" className="uploadBtn uploadBtn1" onChange={e => this.handleFileInput('file2',e)}/>
                                                    <div id="upload_img2">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label htmlFor="is_Swt_function">?????? ??????<span className="red">(*)</span></label>
                                                </th>
                                                <td>
                                                    <textarea name="is_Swt_function" id="is_Swt_function" rows="" cols=""></textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="btn_confirm mt20" style={{"marginBottom": "44px"}}>
                                        <Link to={'/SoftwareList'} className="bt_ty bt_ty1 cancel_ty1">??????</Link>
                                        <a href="#" className="bt_ty bt_ty2 submit_ty1 saveclass" onClick={(e) => this.submitClick('save', e)}>??????</a>
                                    </div>
                                </div>
                            </article>
                        </form>	
                    </div> 
                </article>
            </section>
        );
    }
}

export default SoftwareView;