import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const SensorItem = ({ id, name, description }) => {
    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='h5' color='text.secondary' gutterBottom>
                    {name}
                </Typography>
                <Typography variant='body2'>{description}</Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/sensor/${id}`} size='small'>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default SensorItem;
