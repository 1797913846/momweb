//此为主页
import React from 'react';
//redux
//步骤一
import store from '../../store/store'
//引入请求接口
import httpAxios from '../../helpers/request';
import kline from './img/kline.png';
import './index.css';

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            username: ""
        };
    }
    //请求表格数据的操作
    componentDidMount = () => {

    }
    render() {
        const { username, textDom } = this.state;
        return (
            <div className="aboutBox">
                <div className="about">
                    <img src={kline} alt="" />
                    <div className="abouttext">
                        <div className="a1">&nbsp;&nbsp;&nbsp;&nbsp;仁信智投 ”是杭州诚讯科技有限公司旗下的专注于职业交易员孵化的公司，公司依托于高素质的专业人才和优秀的职业管理团队，以合作基金公司培养、孵化职业交易员为发展方向，为大期货投资爱好者提供一个一站式的“仁信”交流平台。</div>
                        <div className="a2">&nbsp;&nbsp;&nbsp;&nbsp;公司秉承合规、合理、稳健、共赢的经营理念，为盘手打造一个无门槛的实盘快速晋升通道，帮助盘手快速获得管理型账户，早日成为职业投资经理人。</div>
                        <div className="a2">&nbsp;&nbsp;&nbsp;&nbsp;借助合作机构平台的强大实力，我们对参与选拔的选手不收取任何费用，只要你的交易数据符合我司交易员选拔要求，将会被聘为我司职业交易员，由我公司提供优厚的薪资及福利待遇。</div>
                        <div className="a3">&nbsp;&nbsp;&nbsp;&nbsp;希望通过选拔，为我国金融市场发掘更多的实战人才，也为国内广大的民间交易员提供一展身手的舞台，以帮助更多的投资者圆梦。</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCenter;