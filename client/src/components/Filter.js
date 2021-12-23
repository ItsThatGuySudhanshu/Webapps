import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Divider, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Filter = ({movies, setMovies, watchlist, setWatchlist}) => {
    const [database] = useState(movies);
    const [radio, setRadio] = useState('Everything');
    const [rating, setRating] = useState([0, 10]);
    const [minimumRating, setMinimumRating] = useState(0);

    // handles updating the movies when any of the filters change
    useEffect(
        () => {
            const updateMovies = () => {
                let filtered = [];
                if (watchlist !== null && setWatchlist !== null) {
                    if (radio === 'Everything') {
                        filtered = database;
                    } else if (radio === 'InWatchlist') {
                        filtered = watchlist;
                    } else if (radio === 'NotInWatchlist') {
                        filtered = database.filter(movie => {
                            for (let i = 0; i < watchlist.length; i++) 
                                if (watchlist[i].id === movie.id) return false;
                            return true;
                        });
                    } else 
                        throw new Error('There was an error!');
                }
                else {
                    filtered = database;
                }

                filtered = filtered.filter(movie => (movie.vote_average >= rating[0] && movie.vote_average <= rating[1] && movie.vote_count >= minimumRating));

                return filtered;
            }

            setMovies(updateMovies()); // eslint-disable-next-line   
        }, [radio, rating, minimumRating]);

    
    if (watchlist !== null) {
        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                    <Typography style={{ color: '#CC0000'}}>Filters</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                        <FormControl 
                            component="fieldset" 
                            focused={false}
                        >
                            <FormLabel component="legend">Show Me
                                <RadioGroup defaultValue={radio}>
                                    <FormControlLabel value="Everything" onChange={e => setRadio(e.currentTarget.value)} control={<Radio color="error"/>} label="Everything" />
                                    <FormControlLabel value="InWatchlist" onChange={e => setRadio(e.currentTarget.value)} control={<Radio color="error"/>} label="In My Watchlist" />
                                    <FormControlLabel value="NotInWatchlist" onChange={e => setRadio(e.currentTarget.value)} control={<Radio color="error"/>} label="Not In My Watchlist" />
                                </RadioGroup>
                            </FormLabel>
                            <br/>
                            <Divider />
                            <br/>
                            <FormLabel component="legend">Rating
                                <Slider
                                    style={{color: '#CC0000'}}
                                    valueLabelDisplay="auto"
                                    value={rating}
                                    onChange={(e, newRating) => setRating(newRating)}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                />
                            </FormLabel>
                            <Divider />
                            <br/>
                            <FormLabel component="legend">Minimum Number of Ratings
                                <Slider
                                    style={{color: '#CC0000'}}
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    value={minimumRating}
                                    onChange={(e, newMinimumRating) => setMinimumRating(newMinimumRating)}
                                    step={50}
                                    marks
                                    min={0}
                                    max={500}
                                />
                            </FormLabel>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </>
        );
    }
    else {
        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                    <Typography style={{ color: '#CC0000'}}>Filters</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                    <br/>
                        <FormControl 
                            component="fieldset" 
                            focused={false}
                        >
                            <FormLabel component="legend">Rating
                                <Slider
                                    style={{color: '#CC0000'}}
                                    valueLabelDisplay="auto"
                                    value={rating}
                                    onChange={(e, newRating) => setRating(newRating)}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                />
                            </FormLabel>
                            <Divider />
                            <br/>
                            <FormLabel component="legend">Minimum Number of Ratings
                                <Slider
                                    style={{color: '#CC0000'}}
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    value={minimumRating}
                                    onChange={(e, newMinimumRating) => setMinimumRating(newMinimumRating)}
                                    step={50}
                                    marks
                                    min={0}
                                    max={500}
                                />
                            </FormLabel>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </>
        );
    }
}

export default Filter;
