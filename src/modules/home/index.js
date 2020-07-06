//此为主页
import React from 'react';
import { Table, Pagination, Modal, Input, Button, DatePicker, Select, Tooltip, Popover } from 'antd';
import b1 from './img/b1.png';
//redux
//步骤一
import store from '../../store/store'
//引入请求接口
import httpAxios from '../../helpers/request';
import './index.css';
import logoimg from './img/banner.png';
import leftimg from './img/leftimg.png';
import t1 from './img/t1.png';
import t2 from './img/t2.png';
import t3 from './img/t3.png';
import t4 from './img/t4.png';
import t5 from './img/t5.png';
import k1 from './img/k1.png';
import top from './img/top.png';
import bottom from './img/bottom.png';
//引入数据字典
import { NAME } from '../../constants/name';

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [];
        this.state = {
            data: "",
            username: "",
            account_id: "",
            balance: "",
            parent_account_name: "",
            parent_account_code: "",
            invite_count: "",
            jinjiData: [
                {
                    t1: '晋级线：本金盈利＞10%',
                    t2: '淘汰线：本金亏损＞20% ',
                    t3: '助力资金：自由选择助力资金',
                    t4: '盈利分配：盈利全归盘手',
                    t5: '亏损风险：盘手承担'
                },
                {
                    t1: '晋级线：本金盈利＞15%',
                    t2: '降级线：本金亏损＞15%',
                    t3: '助力资金：一段资金翻翻',
                    t4: '盈利分配：盈利全归盘手',
                    t5: '亏损风险：盘手承担'
                }, {
                    t1: '晋级线：本金盈利＞25%',
                    t2: '淘汰线：降级线：本金亏损＞10%',
                    t3: '助力资金：二段资金翻翻',
                    t4: '盈利分配：盈利全归盘手',
                    t5: '亏损风险：盘手承担'
                }, {
                    t1: '晋级线：本金盈利＞30%',
                    t2: '淘汰线：本金亏损＞9%',
                    t3: '管理资金：等于MOM三段初始资金',
                    t4: '盈利分配：盘手提取30-70%盈利',
                    t5: '亏损风险：MOM炒手网承担'
                },
            ],
            jinDom: '',
            imgDom: '',
            rows: [],
            what: '',
            type: [],
            current: 1,
            total: '',
            pai: 'desc'
        };
    }
    //请求表格数据的操作
    componentDidMount = () => {
        let jinDom = this.state.jinjiData.map(item => (
            <div className='jinbox'>
                <div>{item.t1}</div>
                <div>{item.t2}</div>
                <div>{item.t3}</div>
                <div>{item.t4}</div>
                <div>{item.t5}</div>
            </div>
        ))
        this.setState({
            jinDom: jinDom
        });

        let imgDom = (<div className='timg'>
            <img src={t1} alt="" />
            <img src={t2} alt="" />
            <img src={t3} alt="" />
            <img src={t4} alt="" />
            <img src={t5} alt="" />
        </div>)
        this.setState({
            imgDom: imgDom,
            what: 'profit_percent'
        });
        this.getData('desc', 'profit_percent', 1);
        this.getZD();
    }
    getZD() {
        let url = '/api.v1/dictionary';
        let method = 'get';
        let beel = false;
        let options = null;
        httpAxios(url, method, beel, options).then(res => {
            if (res.code === 0) {
                this.setState({
                    type: res.data.type
                })
            }
        })
    }
    getData(sort, order, page) {
        if (!sort) {
            sort = ''
        }
        if (!order) {
            order = ''
        }
        let url = '/api.v1/ranking?sort=' + order + '&order=' + sort + '&page=' + page + '&size=12';
        let method = 'get';
        let beel = false;
        let options = null;
        httpAxios(url, method, beel, options).then(res => {
            if (res.code === 0) {
                res.data.rows.map((item, index) => {
                    if (index == 0) {
                        for (let key in item) {
                            if (item.hasOwnProperty(key)) {
                                NAME.map((item1, index1) => {
                                    if (key == item1.key) {
                                        this.columns.push({
                                            title: item1.name,
                                            dataIndex: item1.key,
                                            key: item1.key,
                                            align: 'center',
                                            ellipsis: true,
                                            width: 120
                                        })
                                    }
                                })
                            }
                        }
                    }
                    this.columns.push({
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        ellipsis: true,
                        width: 120,
                        dataIndex: 'operation',
                        render: (text, record) =>
                            <a onClick={() => this.changeLast(text, record)}><img src={k1} /></a>
                    })
                    this.columns = this.deteleObject(this.columns);
                })
                this.setState({
                    rows: res.data.rows,
                    total: res.data.total || null,
                }, () => {
                    let rows = this.state.rows.map(item => {
                        console.log('每个', item);
                        if (item.type == '0') {
                            item.type = '股票'
                        } else if (item.type == '1') {
                            item.type = '期货'
                        } else if (item.type == '2') {
                            item.type = '期权'
                        }
                        return item;
                    })
                    this.setState({
                        rows: rows
                    })
                    console.log('数据', this.state.rows, this.columns)
                });
            }
        })
    }
    //分页改变
    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        }, () => {
            this.getData('desc', 'profit_percent', this.state.current);
        });
    }
    //数组去重
    deteleObject(obj) {
        let uniques = [];
        let stringify = {};
        for (let i = 0; i < obj.length; i++) {
            let keys = Object.keys(obj[i]);
            keys.sort(function (a, b) {
                return (Number(a) - Number(b));
            });
            let str = '';
            for (let j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
            }
        }
        uniques = uniques;
        return uniques;
    }
    paixv(what, where) {
        console.log(what);
        if (what != this.state.what) {
            this.setState({
                pai: 'desc'
            }, () => {
                this.getData(this.state.pai, what, 1);
            })
        } else {
            if (where == 'desc') {
                this.setState({
                    pai: 'asc'
                }, () => {
                    this.getData(this.state.pai, what, 1);
                })
            } else if (where == 'asc') {
                this.setState({
                    pai: 'desc'
                }, () => {
                    this.getData(this.state.pai, what, 1);
                })
            }
        }
        this.setState({
            what: what
        })
        //this.getData('asc', what);
    }
    changeLast(text, record) {
        console.log(text, record);
        let uid = record.uid;
        let source = record.source;
        //
        let nickname = record.nickname;
        let profit_percent = record.profit_percent;
        let total_income_rate = record.total_income_rate;
        localStorage.setItem('uid', uid);
        localStorage.setItem('source', source);
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('profit_percent', profit_percent);
        localStorage.setItem('total_income_rate', total_income_rate);
        this.props.history.push({ pathname: '/k', query: { uid: uid, source: source, nickname: nickname, profit_percent: profit_percent, total_income_rate: total_income_rate } });
        //, { uid: uid, source: source }

    }
    render() {
        const { username, jinDom, imgDom, rows, what, total, pai } = this.state;
        const columns = this.columns;
        return (
            /**
             * dataSource为数据数组
             * columns为表格的描述配置，列明什么之类的
             */
            <div>
                <div className="bannerbox">
                    <div className="fontbox">
                        <div className="fontStyle font1">MOM 炒手网</div>
                        <div className="fontStyle font2">实盘选拔  不玩虚的！！！</div>
                        <div className="fontStyle font3">三段晋级！ 百万期货管理账户等你拿！！！</div>
                    </div>
                    <div className="topTitle">
                        <img src={leftimg} alt="" />
                        <span>晋级流程</span>
                    </div>
                    <div className="jinBbox">{jinDom}</div>
                </div>
                <div className="top2">
                    <div className="tcolor">
                        <img src={leftimg} alt="" />
                        <span>选拔流程</span>
                    </div>
                    <div className="timgbox">
                        {imgDom}
                    </div>
                </div>
                <div className="ttbox">
                    <div className="tcolor">
                        <img src={leftimg} alt="" />
                        <span>实战排行榜</span>
                    </div>
                    <div className="paixv">
                        <span className={what == 'profit_percent' ? 'pactive' : ''} onClick={() => this.paixv('profit_percent', pai)}>累计净值&nbsp;&nbsp;
                            {what == 'profit_percent' ? pai == 'asc' ? <img src={top} alt="" /> : <img src={bottom} alt="" /> : ''}
                        </span>
                        <span className={what == 'balance' ? 'pactive' : ''} onClick={() => this.paixv('balance', pai)}>当日权益&nbsp;&nbsp;{what == 'balance' ? pai == 'asc' ? <img src={top} alt="" /> : <img src={bottom} alt="" /> : ''}</span>
                        <span className={what == 'total_income_rate' ? 'pactive' : ''} onClick={() => this.paixv('total_income_rate', pai)}>累计收益率&nbsp;&nbsp;{what == 'total_income_rate' ? pai == 'asc' ? <img src={top} alt="" /> : <img src={bottom} alt="" /> : ''}</span>
                        <span className={what == 'total_profit_loss' ? 'pactive' : ''} onClick={() => this.paixv('total_profit_loss', pai)}>累计总盈亏&nbsp;&nbsp;{what == 'total_profit_loss' ? pai == 'asc' ? <img src={top} alt="" /> : <img src={bottom} alt="" /> : ''}</span>
                    </div>
                    <div className="tableBox1">
                        <Table dataSource={rows} columns={columns} size="small" scroll={{ y: 670 }} pagination={false} />
                        <div className="pagen">
                            <Pagination size="small" current={this.state.current} defaultPageSize={12} onChange={this.onChange} total={total} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCenter;