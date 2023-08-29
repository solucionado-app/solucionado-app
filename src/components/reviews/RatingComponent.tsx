import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import { Star } from 'lucide-react';
import { type ControllerRenderProps } from 'react-hook-form';

const labels: { [index: string]: string } = {
    0.5: 'Malo',
    1: 'Malo+',
    1.5: 'Pobre',
    2: 'Pobre+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Bueno',
    4: 'Bueno+',
    4.5: 'Excelente',
    5: 'Excelente+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value] ?? ''}`;
}

interface Props {
    field: ControllerRenderProps<{
        content?: string | undefined;
        rating: number;
    }, "rating">;
}

export default function HoverRating({ field }: Props) {
    const [value, setValue] = React.useState<number | null>(field.value);
    const [hover, setHover] = React.useState(-1);

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(_event, newValue) => {
                    field.onChange(newValue);
                    setValue(newValue);
                }}
                onChangeActive={(_event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}

