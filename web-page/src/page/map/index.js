import * as d3 from "d3"
import { useEffect, useRef, useState } from "react"
import nyJson from "../../data/ny.geojson"
import mapCss from "./map.module.css"
import { http } from "../../utils/request"

function Map() {
    const areaInfo = useRef(null);
    const [info, setInfo] = useState({})
    const weeks = ["今天", "这周", "上周"]
    async function getData() {
        const response = await http.get("http://127.0.0.1:8000/map/")
        setInfo(response.data)
    }
    function mapInit() {
        const width = 800;
        const height = 800;
        const margin = { top: 10, left: 40, bottom: 40, right: 10 };
        const svg = d3.select("#map");
        svg.attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", width)
            .attr("height", height)

        // 创建组
        const group = svg.append("g")
            .attr("id", "maingroup")
            .attr("transform", `translate(${margin.left} ${margin.top})`)
        d3.json(nyJson).then(function (data) {
            const colorScale = d3.scaleOrdinal().range(d3.quantize(d3.interpolateWarm, data.features.length));
            const projection = d3.geoMercator().fitExtent(
                [
                    [0, 50], //左上角坐标,
                    [width, 700], //右下角坐标,一般是撑满svg
                ],
                data
            );
            const path = d3.geoPath().projection(projection);

            group.append("g")
                .lower()
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", d => colorScale(d.properties.boro_name))
                .on('mouseover', function (d) {
                    d3.select(this).classed(mapCss.selectedArea, true)
                    let name = this.querySelector('title').textContent
                    areaInfo.current.querySelector('h4').textContent = name + " "
                    areaInfo.current.style.visibility = 'visible';
                    let allLiElements = areaInfo.current.querySelectorAll('li');
                    // 将NodeList转换为数组
                    let liArray = Array.from(allLiElements);
                    for (let i = 0; i < liArray.length; i++) {
                        liArray[i].textContent = liArray[i].textContent + `: ${info[name][i]}`;
                    }
                })
                .on('mouseout', function (d) {
                    d3.select(this).classed(mapCss.selectedArea, false)
                    areaInfo.current.style.visibility = 'hidden'
                    let allLiElements = areaInfo.current.querySelectorAll('li');
                    // 将NodeList转换为数组
                    let liArray = Array.from(allLiElements);
                    for (let i = 0; i < liArray.length; i++) {
                        liArray[i].textContent = `${weeks[i]}花费`;
                    }
                })
                .append("title")
                .text(d => d.properties.boro_name)
        })

    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        mapInit();
    }, [info])

    return (
        <div id={mapCss.mapDiv}>
            <svg id="map"></svg>
            <div className={mapCss.areaInfo} ref={areaInfo}>
                <h4>布鲁克林 </h4>
                <ul>
                    <li>今天花费</li>
                    <li>这周花费</li>
                    <li>上周花费</li>
                </ul>
            </div>

        </div>

    )
}


export default Map