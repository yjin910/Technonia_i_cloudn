function getBorderString() {
    let str = ' M 20 0 L 20 0.02 L 30 0.023 L 30 0 Z';

    return str;
}

function getLayoutForComfortRegion() {
    let str = getBorderString();

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