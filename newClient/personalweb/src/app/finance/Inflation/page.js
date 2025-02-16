"use client";
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const INDICE_GENERAL = 'Índice general';

export default function InflationChart() {
    const containerRef = useRef(null);

    const [data, setData] = useState([]);
    const [availableClases, setAvailableClases] = useState([]);
    const [selectedClases, setSelectedClases] = useState([]);

    const [cursorData, setCursorData] = useState([]);

    useEffect(() => {
        fetch('/50904.csv')
            .then(response => response.text())
            .then(csv => {
                const parsedData = d3.dsvFormat(";").parse(csv, d => ({
                        Clases: d.Clases == INDICE_GENERAL ? d.Clases : d.Clases.split(' ')[1].replace(",",""),
                        'Tipo de dato': d['Tipo de dato'],
                        Periodo: new Date(d.Periodo.split('M')[0], d.Periodo.split('M')[1]),
                        Total: Number(d.Total.replace(',', '.')) || 0
                })).filter(d => !d['Tipo de dato'].includes('Variación')).sort((a, b) => a.Periodo - b.Periodo);
                setData(parsedData);


                const clasesSet = [...new Set(parsedData.map(item => item.Clases))];
                setAvailableClases(clasesSet);


                setSelectedClases(clasesSet.includes(INDICE_GENERAL) ? [INDICE_GENERAL] : [clasesSet[0]]);
            });
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        // Clear out any previous chart content
        d3.select(containerRef.current).selectAll("*").remove();

        const margin = { top: 20, right: 100, bottom: 30, left: 40 };
        const width = 928;
        const height = 600;

        // Filter the data based on the selected Clases
        const filteredData = data.filter(d =>
            selectedClases.includes(d.Clases)
        );
        console.log('filteredData', filteredData);

        if (filteredData.length === 0) {
            d3.select(containerRef.current)
                .append("div")
                .text("No data for the selected filters.");
            return;
        }

        const x = d3.scaleUtc()
            .domain(d3.extent(filteredData, d => d.Periodo))
            .range([margin.left, width - margin.right])
            .clamp(true)

        const series = d3.groups(filteredData, d => d.Clases).map(([key, values]) => {
            const baseValue = values[0].Total || 0.1;
            return {
                key,
                values: values.map(({Periodo, Total}) => ({
                    Date: Periodo,
                    value: Total / baseValue
                }))
            };
        });

        const allValues = series.flatMap(s => s.values.map(d => d.value));
        const y = d3.scaleLinear()
            .domain([d3.min(allValues) - 0.25, d3.max(allValues)])
            .range([height - margin.bottom, margin.top]);

        const bisect = d3.bisector(d => d.Date).left;

        const color = d3.scaleOrdinal(d3.schemeCategory10).domain(availableClases);

        const svg = d3.select(containerRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;");

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(
                d3.axisLeft(y)
                    .ticks(10) // or however many ticks you want
                    .tickFormat(d3.format(".2f")) // for example, format to 2 decimals
            )
            .call(g => {
                // Clone each tick line to make full-width grid lines
                g.selectAll(".tick line")
                    .clone()
                    .attr("x2", width - margin.left - margin.right)
                    .attr("stroke-opacity", 0.2);
            })
            .call(g => g.select(".domain").remove());


        const rule = svg.append("g")
            .append("line")
            .attr("y1", height)
            .attr("y2", 0)
            .attr("stroke", "black");

        // Create a line and a label for each series.
        const serie = svg.append("g")
            .style("font", "bold 10px sans-serif")
            .selectAll("g")
            .data(series)
            .join("g");

        const line = d3.line()
            .x(d => x(d.Date))
            .y(d => y(d.value));

        serie.append("path")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke", d => color(d.key))
            .attr("d", d => line(d.values));

        serie.append("text")
            .datum(d => ({key: d.key, value: d.values[d.values.length - 1].value}))
            .attr("fill", d => color(d.key))
            .attr("paint-order", "stroke")
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("x", x.range()[1] + 3)
            .attr("y", d => y(d.value))
            .attr("dy", "0.35em")
            .text(d => d.key);

        function update(date) {
            date = d3.utcDay.round(date);
            rule.attr("transform", `translate(${x(date) + 0.5},0)`);
            serie.attr("transform", ({values}) => {
                const i = bisect(values, date, 0, values.length - 1);
                return `translate(0,${y(1) - y(values[i].value / values[0].value)})`;
            });
            svg.property("value", date).dispatch("input");
        }

        d3.transition()
            .ease(d3.easeCubicOut)
            .duration(1500)
            .tween("periodo", () => {
                const i = d3.interpolateDate(x.domain()[1], x.domain()[0]);
                return t => update(i(t));
            });

        svg.on("mousemove touchmove", function(event) {

            update(x.invert(d3.pointer(event, this)[0]));

            const [mx] = d3.pointer(event, svg.node());
            const date = x.invert(mx);
            console.log(date)
        });
    }, [data, selectedClases]);

    // Handlers for when the multi‑select values change.
    const handleClasesChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value).sort()
        setSelectedClases(options);
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Controls: select the Clases */}
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginRight: '1rem' }}>
                    Clases:
                    <select
                        multiple
                        value={selectedClases}
                        onChange={handleClasesChange}
                        style={{ marginLeft: "0.5rem", width: "200px", height: "120px" }}
                    >
                        {availableClases.map(clase => (
                            <option key={clase} value={clase}>{clase}</option>
                        ))}
                    </select>
                </label>
            </div>
            {/* Chart container */}
            <svg ref={containerRef} />

            {/* Legend on the side */}
            <div style={{ width: "150px", marginLeft: "1rem" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#fff" /* or your color */ }}>Legend</h4>
                {selectedClases.map((clase) => (
                    <div
                        key={clase}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <div
                            style={{
                                width: "1rem",
                                height: "1rem",
                                background: d3.schemeCategory10[
                                availableClases.indexOf(clase) % 10
                                    ],
                                marginRight: "0.5rem"
                            }}
                        />
                        <span style={{ color: "#fff"}}>{clase}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
