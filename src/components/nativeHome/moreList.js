import React ,{ReactDom}from 'react';
import {ListView, Icon} from 'antd-mobile';

const data = [
    {
        img: require("static/images/d1.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900gasdasdasdsadasdasdsadasd',
        price: 199,
    },
    {
        img: require("static/images/d2.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900g',
        price: 199,
    },
    {
        img: require("static/images/d3.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900g',
        price: 199,
    },
    {
        img: require("static/images/d4.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900g',
        price: 199,
    },
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class MoreList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
        };
    }
    componentDidMount() {

        const {scrollT} =this.props


            this.lv.scrollTo(0,scrollT-this.imgH.offsetHeight);

        // console.log(  window.getComputedStyle((this.imgH).height))

    }


    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {

        const {pagenum, isFetching, hasMore, fetchHomeList, pagesize} = this.props


        let num = pagenum

        if (isFetching && !hasMore) {
            return;
        }

        fetchHomeList({pagesize: pagesize, pagenum: ++num,})
    }


    render() {
        const {list, history, isFetching, hasMore} = this.props

        const row = (rowData, sectionID, rowID) => {

            return (
                <div key={rowID} className="goods" onClick={() => history.push(`/goodsDetail/${rowData.id}`)}>

                    <div className="img-info">

                        <img src={rowData.bigpic+'?imageMogr2/thumbnail/!30p'} alt="" ref={(el)=>this.imgH=el}/>


                    </div>

                    <div className="txt-info">
                        <p className="title">
                            {rowData.stitle}
                        </p>
                        <p className="price">￥{Number(rowData.zkprice).toFixed(2)}</p>
                    </div>


                </div>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(list)}
                renderFooter={() => (<div style={{padding: 30, textAlign: 'center', lineHeight: "1rem"}}>


                    { hasMore && isFetching && <span style={{marginTop:".3rem"}}><Icon type="loading"/></span>}

                    { hasMore && !isFetching && <span style={{marginTop:".3rem"}}><Icon type="loading"/></span>}

                    { !hasMore && !isFetching && <span style={{marginTop:".3rem"}}>已经到底啦</span>}
                </div>)}
                renderRow={row}
                // renderSeparator={separator}
                className="am-list"
                initialListSize={list.length}
                pageSize={20}
                useBodyScroll
                onScroll={() => {
                    // this.props.getScroll(window.scrollY)
                }}
                scrollRenderAheadDistance={2000}
                scrollEventThrottle={30}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={1000}
            />
        );
    }
}

export default MoreList;