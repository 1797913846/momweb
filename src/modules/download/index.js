//此为主页
import React from 'react';
//redux
//步骤一
import store from '../../store/store'
//引入请求接口
import httpAxios from '../../helpers/request';
import './index.css';
import ios from './img/ios.png'
import az from './img/az.png'
import wh from './img/wh.png'
class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            username: "",
        };
    }
    //请求表格数据的操作
    componentDidMount = () => {

    }
    render() {
        const { username } = this.state;
        return (
            <div className="dbox">
                <div className="dsbox">
                    <div className="dstitle"><span>软件名称</span><span>软件说明</span><span>下载链接</span></div>
                    <div className="dcbox">
                        <img className="dd dimg" src={az} alt="" />
                        <div className="dd d1">随手易</div>
                        <div className="dd d2">
                            <div style={{ marginTop: '46px' }}>安卓手机：扫描二维码即可下载。</div>
                        </div>
                        {/* <div className="dd d3">下载</div> */}
                    </div>
                    <div className="dcbox">
                        <img className="dd dimg" src={ios} alt="" />
                        <div className="dd d1">随手易</div>
                        <div className="dd d2">
                            <div style={{ marginTop: '46px' }}>苹果手机：扫描二维码即可下载。</div>
                        </div>
                        {/* <div className="dd d3">下载</div> */}
                    </div>
                    <div className="dcbox">
                        <img className="dd dimg" src={wh} alt="" />
                        <div className="dd d1">文华财经</div>
                        <div className="dd d2">
                            <div>1.登陆路径：解压缩安装包后双击安装。</div>
                            <div>2.需申请交易权限。</div>
                            <div>3.非交易时间，交易服务器在维护保养，交易账号登录不上，请在交易日8:30—16:00，20:30—3:00，这两个交易时间段登录账号。</div>
                        </div>
                        <div className="dd d3"><a href="http://ftpc.wenhua.com.cn/files/Mytrader_setup/mytrader_zjshengda.exe" target="_blank">下载</a></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCenter;