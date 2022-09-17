import { Grid } from '@mui/material';
import SensorItem from './SensorItem';

const SensorList = ({ sensors }) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {sensors.map(sensor => (
                <Grid item xs={12} sm={6} key={sensor.id}>
                    <SensorItem
                        id={sensor.id}
                        name={sensor.name}
                        description={sensor.description}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default SensorList;
