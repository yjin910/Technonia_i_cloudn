const ca = -5800.22006;
const cb = -5.516256;
const cc = -0.04864024;
const cd = 0.000041765;
const ce = -0.000000014452;
const cf = 6.5459673;
const Pvap_offset = 0.01;
const Y_offset = 0.62198;
const height_offset = 0.0000225577;
const height_exp = 5.25588;

const layoutHumi1 = 40;
const layoutHumi2 = 60;

function getBorderString(layout_xValues1, layout_yValues1, layout_xValues2, layout_yValues2) {
    let str = ' M ' + layout_xValues1[0] + ' ' + layout_yValues1[0];

    for (var i = 1; i < layout_xValues1.length; ++i) {
        str += ' L'
        str += layout_xValues1[i];
        str += ' '
        str += layout_yValues1[i];
    }

    for (var i = layout_xValues2.length - 1; i >= 0; --i) {
        str += ' L'
        str += layout_xValues2[i];
        str += ' '
        str += layout_yValues2[i];
    }

    str += ' Z'
    return str;
}

function getLayoutForComfortRegion(layout_xValues1, layout_yValues1, layout_xValues2, layout_yValues2) {
    let str = getBorderString(layout_xValues1, layout_yValues1, layout_xValues2, layout_yValues2);

    var layout = {
        title: 'Thermal Comfort Zone',
        xaxis: {
            range: [0, 50],
            zeroline: false
        },
        yaxis: {
            range: [0, 0.06],
            showgrid: false
        },
        width: 700,
        height: 700,
        shapes: [
            {
                type: 'path',
                path: str,
                opacity: 0.4,
                fillcolor: 'rgb(93, 164, 214)',
                line: {
                    color: 'rgb(93, 164, 214)'
                }
            }
        ]
    }

    return layout;
}

function calculateY(x, f, h) {
    let tk = x + 273.15;

    var val = ca / tk + cb + cc * tk + cd * Math.pow(tk, 2) + ce * Math.pow(tk, 3) + cf * Math.log(tk)
    var Psat = Math.exp(val);
    var Pvap = Pvap_offset * (f / 100) * Psat;
    var Patm = 1.01325 * Math.pow((1 - height_offset * h), height_exp);

    return (Y_offset * Pvap / (Patm - Pvap));
}

function draw(t, f, h) {
    try {
        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(0, 50, 0.5).toArray()

        const yValues1 = xValues.map((x) => { return calculateY(x, 10, h); });
        const yValues2 = xValues.map((x) => { return calculateY(x, 20, h); });
        const yValues3 = xValues.map((x) => { return calculateY(x, 30, h); });
        const yValues4 = xValues.map((x) => { return calculateY(x, 40, h); });
        const yValues5 = xValues.map((x) => { return calculateY(x, 50, h); });
        const yValues6 = xValues.map((x) => { return calculateY(x, 60, h); });
        const yValues7 = xValues.map((x) => { return calculateY(x, 70, h); });
        const yValues8 = xValues.map((x) => { return calculateY(x, 80, h); });
        const yValues9 = xValues.map((x) => { return calculateY(x, 90, h); });
        const yValues10 = xValues.map((x) => { return calculateY(x, 100, h); });

        const layout_xValues1 = math.range(20, 30, 0.5).toArray();
        const layout_xValues2 = math.range(20, 30, 0.5).toArray();
        const layout_yValues1 = layout_xValues1.map((x) => { return calculateY(x, layoutHumi1, h); });
        const layout_yValues2 = layout_xValues2.map((x) => { return calculateY(x, layoutHumi2, h); });

        // render the plot using plotly
        const trace1 = {
            x: xValues,
            y: yValues1,
            type: 'scatter'
        }

        const trace2 = {
            x: xValues,
            y: yValues2,
            type: 'scatter'
        }
        const trace3 = {
            x: xValues,
            y: yValues3,
            type: 'scatter'
        }
        const trace4 = {
            x: xValues,
            y: yValues4,
            type: 'scatter'
        }
        const trace5 = {
            x: xValues,
            y: yValues5,
            type: 'scatter'
        }
        const trace6 = {
            x: xValues,
            y: yValues6,
            type: 'scatter'
        }
        const trace7 = {
            x: xValues,
            y: yValues7,
            type: 'scatter'
        }
        const trace8 = {
            x: xValues,
            y: yValues8,
            type: 'scatter'
        }
        const trace9 = {
            x: xValues,
            y: yValues9,
            type: 'scatter'
        }
        const trace10 = {
            x: xValues,
            y: yValues10,
            type: 'scatter'
        }

        const layout = getLayoutForComfortRegion(layout_xValues1, layout_yValues1, layout_xValues2, layout_yValues2);

        const data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10]
        Plotly.newPlot('plot', data, layout)
    } catch (err) {
        console.error(err)
        alert(err)
    }
}