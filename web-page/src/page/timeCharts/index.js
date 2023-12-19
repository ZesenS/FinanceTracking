import * as d3 from 'd3';
import TChartsCss from "./style.module.css"
import { useEffect, useState } from "react"
import { http } from '../../utils/request';
function TimeChart() {

    const [timeUnit, setTimeUnit] = useState("year");
    const [times, setTimes] = useState([]);
    const [values, setValues] = useState([]);

    const displayLine = () => {
        const svg = d3.select("#line");
        svg.selectAll('*').remove(); // 清空SVG元素的所有子元素
        const margin = 200; // 通过 margin 外边距调整位置
        const width = svg.attr("width") - margin;
        const height = svg.attr("height") - margin;
        // 创建“组”元素，调整了图表在 SVG 中的位置
        var g = svg
            .append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
        // 设置x y 列尺
        // scaleBand() 序数比例尺常用于离散值，如年份
        // padding 用于调整条之间的距离

        var xScale = d3.scaleBand().range([0, width]).padding(0.4).domain(times);
        var yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(values)]);
        g.append("g")
            .call(d3.axisBottom(xScale)) // 调用一个 x 轴生成器
            .attr("transform", "translate(0," + height + ")") // 平移 x轴位置
            .append("text") // 在之前创建的分组元素内部附加一个文本元素。
            .attr("y", height - 250) // 设置文本元素在y坐标的位置
            .attr("x", width - 100) // 设置文本在x坐标的位置
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text(" 年份"); // 设置文本内容

        g.append("g")
            .call(
                d3
                    .axisLeft(yScale)
                    .tickFormat(function (d) {
                        return "$" + d;

                    })
                    .ticks(10)
            )
            .attr("transform", "translate(0," + 0 + ")")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text(" 股价");

        const line = d3.line()
            .x((d, i) => xScale(times[i]))
            .y((d) => yScale(d));

        g.append('path')
            .datum(values)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', 'blue');

    }

    const displayBar = () => {
        const svg = d3.select("#bar");
        svg.selectAll('*').remove(); // 清空SVG元素的所有子元素
        const margin = 200; // 通过 margin 外边距调整位置
        const width = svg.attr("width") - margin;
        const height = svg.attr("height") - margin;
        // 创建“组”元素，调整了图表在 SVG 中的位置
        var g = svg
            .append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        var xScale = d3.scaleBand().range([0, width]).padding(0.4).domain(times);
        var yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(values)]);

        g.append("g")
            .call(d3.axisBottom(xScale)) // 调用一个 x 轴生成器
            .attr("transform", "translate(0," + height + ")") // 平移 x轴位置
            .append("text") // 在之前创建的分组元素内部附加一个文本元素。
            .attr("y", height - 250) // 设置文本元素在y坐标的位置
            .attr("x", width - 100) // 设置文本在x坐标的位置
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text(" 年份"); // 设置文本内容

        g.append("g")
            .call(
                d3
                    .axisLeft(yScale)
                    .tickFormat(function (d) {
                        return "$" + d;
                    })
                    .ticks(10)
            )
            .attr("transform", "translate(0," + 0 + ")")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text(" 股价");

        g.selectAll(".bar")
            .data(values)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (_, i) {
                return xScale(times[i]);
            })
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return height - yScale(d);
            })
            .attr("fill", "gray");
    }

    async function getData(time = "year") {
        const response = await http.get(`http://127.0.0.1:8000/timechart/?time=${time}`)
        setTimes(response.data.x)
        setValues(response.data.y)
    }
    useEffect(() => {
        getData();
        displayBar();
        displayLine();
    }, [])
    useEffect(() => {
        displayBar();
        displayLine();
    }, [times, values])

    return (
        <>
            <div className="graphSection" id={TChartsCss.barChart}>
                <div>
                    <h5> 金钱流动柱状图</h5>
                </div>
                <div>
                    <div>
                        <div className={timeUnit === "week" ? TChartsCss.selectionOnBar : ""} onClick={() => { setTimeUnit("week"); getData("week") }}></div>
                        <h6>这个星期</h6>
                    </div>
                    <div>
                        <div className={timeUnit === "month" ? TChartsCss.selectionOnBar : ""} onClick={() => { setTimeUnit("month"); getData("month") }}></div>
                        <h6>这个月</h6>
                    </div>
                    <div>
                        <div className={timeUnit === "year" ? TChartsCss.selectionOnBar : ""} onClick={() => { setTimeUnit("year"); getData() }}></div>
                        <h6>这一年</h6>
                    </div>
                </div>
                <svg width="600" height="500" id='bar' className={TChartsCss.svg}></svg>
            </div>
            <div className="graphSection" id={TChartsCss.lineChart}>
                <div>
                    <h5> 金钱流动折线图</h5>
                </div>
                <div>
                    <div>
                        <div>
                            <h6>Week </h6>
                            <div>
                                <ul>
                                    <li>上周</li>
                                    <li>这周</li>
                                </ul>
                            </div>

                        </div>
                        <div>
                            <h6>Month </h6>
                            <div>
                                <ul>
                                    <li>上月</li>
                                    <li>本月</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h6>Year </h6>
                            <div>
                                <ul>
                                    <li>去年</li>
                                    <li>本年</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <svg width="600" height="500" id='line' className={TChartsCss.svg}></svg>
            </div>
        </>
    )
}

export default TimeChart;