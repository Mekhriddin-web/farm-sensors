import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Feature, Map, View } from 'ol';
import { Circle } from 'ol/geom';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';

const SensorDetail = ({ sensors }) => {
    const { id } = useParams();
    const { name, coordinates } = sensors.find(sensor => sensor.id === id);
    const mapElement = useRef();

    useEffect(() => {
        const circleFeature = new Feature({
            geometry: new Circle(
                fromLonLat([coordinates[0], coordinates[1]]),
                50
            ),
        });

        circleFeature.setStyle(
            new Style({
                renderer(coordinates, state) {
                    const [[x, y], [x1, y1]] = coordinates;
                    const ctx = state.context;
                    const dx = x1 - x;
                    const dy = y1 - y;
                    const radius = Math.sqrt(dx * dx + dy * dy);

                    const innerRadius = 0;
                    const outerRadius = radius * 1.4;

                    const gradient = ctx.createRadialGradient(
                        x,
                        y,
                        innerRadius,
                        x,
                        y,
                        outerRadius
                    );
                    gradient.addColorStop(0, 'rgba(255,0,0,0)');
                    gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
                    gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.strokeStyle = 'rgba(255,0,0,1)';
                    ctx.stroke();
                },
            })
        );

        new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                    visible: true,
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [circleFeature],
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat([coordinates[0], coordinates[1]]),
                zoom: 16,
            }),
        });
    }, [coordinates]);

    return (
        <>
            <Button component={Link} to='/' variant='contained'>
                Back
            </Button>
            <Typography variant='h4' sx={{ mt: 2 }} gutterBottom>
                {name}
            </Typography>
            <Typography variant='body1'>longitude: {coordinates[0]}</Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
                latitude: {coordinates[1]}
            </Typography>
            <div
                style={{ aspectRatio: '16 / 9' }}
                ref={mapElement}
                className='map-container'
            />
        </>
    );
};

export default SensorDetail;
