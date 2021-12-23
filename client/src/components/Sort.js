import { Dropdown, DropdownButton } from 'react-bootstrap';

const Sort = ({movies, setMovies}) => {    
    const updateSort = (e) => {
        if (e === 'Popularity Ascending') {
            return movies.sort((firstElement, secondElement) => { return firstElement.popularity - secondElement.popularity });
        } else if (e === 'Ratings Ascending') {
            return movies.sort((firstElement, secondElement) => { return firstElement.vote_average - secondElement.vote_average });
        } else if (e === 'Release Date Ascending') {
            return movies.sort((firstElement, secondElement) => { return new Date(firstElement.release_date) - new Date(secondElement.release_date) });
        } else if (e === 'Popularity Descending') {
            return movies.sort((firstElement, secondElement) => { return secondElement.popularity - firstElement.popularity });
        } else if (e === 'Ratings Descending') {
            return movies.sort((firstElement, secondElement) => { return secondElement.vote_average - firstElement.vote_average });
        } else if (e === 'Release Date Descending') {
            return movies.sort((firstElement, secondElement) => { return new Date(secondElement.release_date) -  new Date(firstElement.release_date) });
        } else {
            throw new Error('Error in updateSort');
        }
    }

    return (
        <DropdownButton title="Sort Movies By" variant="danger" size="lg" onSelect={(e) => setMovies(updateSort(e))}>
            <Dropdown.Item eventKey="Popularity Ascending">Popularity Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="Ratings Ascending">Ratings Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="Release Date Ascending">Release Date Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="Popularity Descending">Popularity Descending</Dropdown.Item>
            <Dropdown.Item eventKey="Ratings Descending">Ratings Descending</Dropdown.Item>
            <Dropdown.Item eventKey="Release Date Descending">Release Date Descending</Dropdown.Item>
        </DropdownButton>
    )
};

export default Sort;
