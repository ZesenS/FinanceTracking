import * as d3 from "d3"
import { useCallback, useEffect, useState } from "react";
import { http } from "../../utils/request";
import pieCss from "./pie.module.css"



function PieChart() {
    const colors = ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#8F8FBD'];
    const categories = ["美食", "交通", "娱乐", "网购", "护理", "其他"]
    const [percentage, setPercentage] = useState([])

    async function getData() {
        const response = await http.get("http://127.0.0.1:8000/piechart/")
        setPercentage(response.data.percentage);
    }
    const loadPieChart = useCallback(() => {
        const svg = d3.select("#pie1");
        var width = svg.attr("width");
        var height = svg.attr("height");
        var radius = Math.min(width, height) / 2;
        // 设置饼图颜色
        var color = d3.scaleOrdinal(colors);

        var g = svg
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // 创建匿名函数返回数据中百分比的值
        var pie = d3.pie().value(function (d) {
            return d;
        });

        var arc = d3
            .arc()
            .outerRadius(radius - 30)
            .innerRadius(90); // 0 时为饼图，非 0 为环形图

        // 定义标签所在位置
        var label = d3
            .arc()
            .outerRadius(radius)
            .innerRadius(radius - 100);


        // For each data point, create a group element
        var arcs = g
            .selectAll(".arc")
            .data(pie(percentage))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs
            .append("path")
            .attr("d", arc)
            .attr("fill", function (d, i) {

                return color(categories[i]);
            });

        arcs
            .append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .text(function (d, i) {
                return `${percentage[i]}%`;
            })
            .style("font-size", "12px");

        svg
            .append("g")
            .attr("transform", "translate(" + (width / 2 - 150) + "," + 20 + ")")
            .append("text")
            .text(" 桌面端浏览器市场份额统计（截至 2021 年 7 月）")
            .attr("class", "title");
    }, [percentage])

    useEffect(() => {
        getData();
    }, []); // Run once when the component mounts

    useEffect(() => {
        loadPieChart();
    }, [loadPieChart])
    return (
        <>
            <div className="graphSection" id={pieCss.pieSection1}>
                <div>
                    <h5> 金钱流动饼状图</h5>
                </div>
                <div>
                    <div>
                        {colors.slice(0, 3).map((color, index) => (
                            <div><div style={{ backgroundColor: color }}></div><h4>{categories[index]}</h4></div>
                        ))}
                    </div>
                    <div>
                        {colors.slice(-3).map((color, index) => (
                            <div><div style={{ backgroundColor: color }}></div><h4>{categories[index + 3]}</h4></div>
                        ))}
                    </div>
                </div>
                <svg width="460" height="410" id="pie1" className={pieCss.pieCharts}>
                </svg>
            </div>
        </>
    )
}

export default PieChart