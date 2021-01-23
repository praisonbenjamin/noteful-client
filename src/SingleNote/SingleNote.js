import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import './SingleNote.css'

class SingleNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        onDeleteNote: () => { }
    }

    deleteButton = (e) => {
        e.stopPropagation();
        const { deleteItem } = this.context;
        fetch(`https://pacific-forest-89244.herokuapp.com/api/note/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('There was an error in deletion')
                }
                return response;
            })
            .then(() => {
                deleteItem(this.props.id);
                this.props.onDeleteNote()
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        let date = new Date(this.props.date_modified);
        let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

        return (
            <div className='Note'>
                <Link to={`/note/${this.props.id}`}>
                    <h2>{this.props.note_name}</h2>
                </Link>
                <div className='note-details'>
                    <p>
                        Date Modified: {formatDate}
                    </p>
                    <button onClick={this.deleteButton}>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

SingleNote.propTypes = {
    modified: PropTypes.string,
    name: PropTypes.string,
    onDeleteNote: PropTypes.func
}

export default SingleNote;