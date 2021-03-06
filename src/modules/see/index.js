//此为主页
import React from 'react';
//redux
//步骤一
import store from '../../store/store'
//引入请求接口
import httpAxios from '../../helpers/request';
import star from './img/star.png';
import './index.css';

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            username: "",
            text: [{ title: '从联系客服到入金交易一般要多久？', content: '我们的报名流程是，盘手先下载交易软件，我们提供空交易账号，盘手先了解熟悉软件，如果没问题的话盘手提供身份证正面、出金银行卡正面、手机号码给客服，客服做好合同发给盘手，盘手入金到公司支付宝或法人银行卡里，开始参与选拔。' },
            { title: '如何确保盘手保证金安全？', content: '参加选拔，都可先签选拔合同，然后再入金交易。盘手可以前来公司现场办理报名，外地的盘手也可采取扫描、传真或快递方式签订选拔合同。合同中写明操盘手保证金和盈亏都归操盘手个人所有，公司将与盘手签约并提供账户供其操作。' },
            { title: '国内期货交易手续费是多少？', content: '为了减少盘手的压力，我们不收利息，只收交易所2倍手续费，且没有交易频度要求，比如原油交易所手续费是20元，我们也收20元，总共40元手续费，其它品种手续费可以问客服。' },
            { title: '对国内交易品种有什么要求？', content: '我们只做国内5大期货交易所所有期货品种主力和次主力合约的选拔（股指期货、国债期货、原油期货多可以交易），外盘期货暂时不能交易.' },
            { title: '能否做外盘期货？', content: '	不能，我们只进行国内商品期货选拔。' },
            { title: '入金时间？', content: '白天：8:30到15:00，晚上：20:30到11:00，入金时间，我们收到资金后，一般30分钟内入到交易账户。' },
            { title: '出金时间？', content: '白天：9:00到16:00，出金尽量提前联系客服， 我们在白天交易时间才能出金，提交出入金申请后，资金一般1小时内到账。' },
            { title: '隔夜时间指？', content: '	下午收盘15:00到晚上开盘21:00，晚上收盘到早上9:00开盘这两个时间段。' },
            { title: '隔夜能否留仓？', content: '隔夜默认留仓为自有资金两倍，比如客户自有资金1万，隔夜可以留2万的持仓，对于做趋势为主的盘手，隔夜最高可以向客服申请，放大到3倍，即可以留仓3万。' },
            { title: '周末节假日留仓问题？', content: '正常周末留仓为自有资金两倍，比如客户自有资金1万，隔夜可以留2万的持仓。周一至周五里面任一一天放假 和 3天以上的放假，只能为自有资金持仓过节。' },
            { title: '止盈止损是否支持云端挂单？', content: '手机金汇交易软件，支持云端止盈止损。单子下好之后，在持仓单里点击要设置的那个单子，会弹出止损止盈设置窗口，然后设置止损止盈就好了。' },
            {
                title: '软件下载注意？', content: "非交易时间，交易服务器在维护保养，交易账号登录不上，请在交易日8:30—16:00，20:30—3:00，这两个交易时间段登录账号。"
            },
            { title: '如何识别真假盘？', content: "	有假盘嫌疑，要结合下面几条才能确认：1、挂单交易，看是穿价成交，还是排队排到了成交，穿价成交可以判定为假盘；2、在冷门合约上挂单，看挂单数量能否增长，增长了可以判定为真盘；4、让选拔公司客服提供保证金监控中心的交易记录。这条要求，客服工作量比较大，因为要在总账户上，在所有交易数据中，把你的交易记录找出来给你（找找有点累的，尽量少用：）。3、关于我们 MoM (Manager of Mangers) 模式也被称为精选多元管理人，通过优中选优的方法，筛选基金管理人或资产管理人，让这些最顶尖的专业人士来管理资产，而自身则通过动态地跟踪、监督、管理他们，及时调整资产配置方案，来收获利益。简而言之，MoM是找最优秀的投顾组成团队、分配资金、操盘投资，既发挥团队力量，又不限制个人风格。 " }
            ],
            textDom: ''
        };
    }
    //请求表格数据的操作
    componentDidMount = () => {
        let textDom = this.state.text.map(item => (
            <div className='textbox'>
                <div className='topbox'>
                    <img src={star} alt="" />
                    <span>{item.title}</span>
                </div>
                <div className='bottombox'>{item.content}</div>
            </div>
        ))
        this.setState({
            textDom: textDom
        });
    }
    render() {
        const { username, textDom } = this.state;
        return (
            <div className="seebox">
                <div className="hstitle">常见问题汇总</div>
                {textDom}
            </div>
        );
    }
}

export default UserCenter;