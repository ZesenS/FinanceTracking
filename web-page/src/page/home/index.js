import { Outlet } from 'react-router-dom';
import homeCss from "./home.module.css"
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div id={homeCss.header}>
                <div>个人财务追踪分析</div>
                <div>948952346@qq.com</div>
            </div>
            <div className={homeCss.container}>
                <div id={homeCss.naviBar}>
                    <div className={homeCss.sections}>
                        <h6>首页</h6>
                        <ul>
                            <li className={`${homeCss.currentSection} ${homeCss.pointer}`} onClick={() => { navigate("/") }}> 首页</li>
                            <li className={homeCss.pointer}> 搜索</li>
                        </ul>
                    </div>
                    <div className={homeCss.sections}>
                        <h6>数据表</h6>
                        <ul>
                            <li className={homeCss.pointer} onClick={() => { navigate("/timechart") }}> 时间分析表</li>
                            <li className={homeCss.pointer} onClick={() => { navigate("/map") }}> 地图分析表</li>
                            <li className={homeCss.pointer} onClick={() => { navigate("/piechart") }}> 类型分析表</li>
                            <li className={homeCss.pointer}> 评分分析表</li>
                            <li className={homeCss.pointer}> 总分析表</li>
                        </ul>
                    </div>
                    <div className={homeCss.sections}>
                        <h6>操作</h6>
                        <ul>
                            <li className={homeCss.pointer} onClick={() => { navigate("/expenses") }}> 数据操作</li>
                        </ul>
                    </div>
                </div>
                <div id={homeCss.subLayout}>
                    <Outlet></Outlet>
                </div>
            </div>

        </>
    )
}

export default Home