import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';

class SoftwareList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseSwtoolList: null,
            append_SwtoolList: null,
        }
    }

    componentDidMount() {
        this.loginCheck()
        this.callSwToolListApi()
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

    callSwToolListApi = async () => {
        axios.post('/api/Swtool?type=list', {
        })
        .then( response => {
            try {
                // 이거는 안됨...
                // this.setState({ responseSwtoolList: response });
                // this.setState({ append_SwtoolList: this.SwToolListAppend() });
                // 이거는 됨
                this.setState({ append_SwtoolList: this.SwToolListAppend2(response) });
            } catch (error) {
                alert('작업중 오류가 발생하였습니다.');
            }
        })
        .catch( error => {alert('작업중 오류가 발생하였습니다.');return false;} );
    }
    // 이거는 안됨...
    SwToolListAppend = () => {
        let result = []
        var SwToolList = this.state.responseSwtoolList.data
        
        for(let i=0; i<SwToolList.json.length; i++){
            var data = SwToolList.json[i]

            result.push(
                <tr key = "{data}" className="hidden_type">
                    <td>{data.swt_toolname}</td>
                    <td>{data.swt_function}</td>
                    <td>{data.reg_date.substr(0,10)}</td>
                    <td>
                        <Link to={'/SwDetailView/'+data.swt_code} 
                        className="bt_c1 bt_c2 w50_b">수정</Link>
                        <a href="#n" className="bt_c1 w50_b" >삭제</a>
                    </td>
                </tr>
            )
        }
        return result
    }
    // 이거는 됨
    SwToolListAppend2 = (res) => {
        let result = []
        var SwToolList = res.data
        
        for(let i=0; i<SwToolList.json.length; i++){
            var data = SwToolList.json[i]
            result.push(
                <tr key = "{data}" className="hidden_type">
                    <td>{data.swt_toolname}</td>
                    <td>{data.swt_function}</td>
                    <td>{data.reg_date.substr(0,10)}</td>
                    <td>
                        <Link to={'/SwDetailView/'+data.swt_code} 
                        className="bt_c1 bt_c2 w50_b">수정</Link>
                        <a id = {data.swt_code} href="#n" className="bt_c1 w50_b" onClick={(e) => {this.deleteSwtool(e)}}>삭제</a>
                    </td>
                </tr>
            )
        }
        return result
    }

    deleteSwtool = (e) => {
        let eventTarget = e.target;
        this.sweetAlertDelete('정말 삭제하시겠습니까?',function() {
            axios.post('/api/Swtool?type=delete',{
                is_Swtcode : eventTarget.getAttribute('id')
            }).then((res) => {
                this.callSwToolListApi()
            }).catch( error => {
                alert('작업 중 에러가 발생했습니다.');
                return false;
            })
        }.bind(this))
    }

    sweetAlertDelete = (title,callBackFunc) => {
        Swal.fire({
            title : title,
            text : "",
            icon : 'warning',
            showCancelButton : true,
            confirmButtonColor : "#3085d6",
            cancelButtonColor : "#d33",
            confirmButtonText : "Yes"
        }).then((result) => {
            if (result.value) {
                Swal.fire('Deleted!!','삭제되었습니다.','success')
            } else {
                return false;
            }
            callBackFunc();
        })
    }

    render () {
        return (
            <section className="sub_wrap" >
                <article className="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                    <div className="li_top">
                        <h2 className="s_tit1">Software Tools 목록</h2>
                        <div className="li_top_sch af">
                        <Link to={'/SwView'} className="sch_bt2 wi_au">Tool 등록</Link>
                        </div>
                    </div>

                    <div className="list_cont list_cont_admin">
                        <table className="table_ty1 ad_tlist">
                            <thead>
                                <tr>
                                    <th>툴 이름</th>
                                    <th>기능</th>
                                    <th>등록일</th>
                                    <th>기능</th>
                                </tr>
                            </thead>
                        </table>	
                        <table className="table_ty2 ad_tlist">
                            <tbody>
                                {this.state.append_SwtoolList}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        );
    }
}

export default SoftwareList;